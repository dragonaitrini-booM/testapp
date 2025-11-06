import React, { useState, useRef, useEffect } from 'react';
import { useKimiAgent } from '../services/kimiAgent';
import { detectContentType, generatePrompt } from '../services/contentGenerator';
import { exportContent } from '../utils/exportHelper';

const Chat = ({ config }) => {
const [messages, setMessages] = useState([]);
const [input, setInput] = useState('');
const [isProcessing, setIsProcessing] = useState(false);
const messagesEndRef = useRef(null);

const { generateResponse, activeDataset, hasDocuments, model, processingMode } = useKimiAgent(config);

// Auto-scroll
useEffect(() => {
messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
}, [messages, isProcessing]);

const handleSubmit = async (e) => {
e.preventDefault();
if (!input.trim() || isProcessing) return;

const userMessage = input.trim();


// Add user message
const userMsg = {
id: Date.now(),
role: 'user',
content: userMessage,
timestamp: new Date().toISOString()
};


setMessages(prev => [...prev, userMsg]);
setInput('');
setIsProcessing(true);

try {
// Detect content type
const contentType = detectContentType(userMessage);


// Generate response
const result = await generateResponse(userMessage, contentType);


// Add AI response
const aiMsg = {
id: Date.now() + 1,
role: 'assistant',
content: result.content || result.error,
success: result.success,
metadata: result.metadata,
timestamp: new Date().toISOString()
};


setMessages(prev => [...prev, aiMsg]);


} catch (error) {
console.error('Chat error:', error);
const errorMsg = {
id: Date.now() + 1,
role: 'assistant',
content: `Error: ${error.message}`,
success: false,
timestamp: new Date().toISOString()
};
setMessages(prev => [...prev, errorMsg]);
} finally {
setIsProcessing(false);
}
};

const handleExport = (message) => {
exportContent(message.content, activeDataset.name);
};

const clearChat = () => {
if (window.confirm('Clear all messages? This cannot be undone.')) {
setMessages([]);
}
};

return (
<div className="flex flex-col h-[calc(100vh-180px)]">
{/* Header */}
<div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-4 mb-4">
<div className="flex items-center justify-between">
<div>
<h2 className="text-2xl font-bold text-gray-900 dark:text-white">
<span className="text-blue-600">Kimi K2 Instructor</span>
</h2>
<div className="flex items-center space-x-4 text-sm text-gray-600 dark:text-gray-400 mt-1">
<span>📊 Dataset: <strong>{activeDataset.name}</strong></span>
<span>📄 Documents: <strong>{activeDataset.documents.length}</strong></span>
<span>{processingMode === 'Interactive' ? '⚡ Interactive' : '💰 Batch'}</span>
</div>
</div>
{messages.length > 0 && (
<button
onClick={clearChat}
className="px-3 py-2 text-sm bg-gray-200 hover:bg-gray-300 dark:bg-gray-700
dark:hover:bg-gray-600 rounded-lg transition-colors"
>
Clear Chat
</button>
)}
</div>
</div>

{/* Messages */}
<div className="flex-1 bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden">
<div className="h-full overflow-y-auto p-6 space-y-4">
{messages.length === 0 && !isProcessing ? (
<div className="text-center py-12">
<div className="text-6xl mb-4">🤖</div>
<h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
Ready to Create Business Content
</h3>
<p className="text-gray-600 dark:text-gray-400 mb-4">
{hasDocuments
? `I've analyzed ${activeDataset.documents.length} document${activeDataset.documents.length > 1 ? 's' : ''} in ${activeDataset.name}`
: 'Upload documents to get started with context-aware generation'
}
</p>
<div className="max-w-md mx-auto text-left bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
<p className="font-semibold mb-2">💡 What I can create:</p>
<ul className="text-sm space-y-1 text-gray-700 dark:text-gray-300">
<li>📧 Email templates and campaigns</li>
<li>📊 Reports and documentation</li>
<li>📋 Spreadsheets and data organization</li>
<li>🎨 Marketing and advertising materials</li>
<li>📝 Business templates and forms</li>
</ul>
</div>
</div>
) : (
<>
{messages.map((msg) => (
<div
key={msg.id}
className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
>
<div
className={`max-w-[80%] p-4 rounded-lg ${
msg.role === 'user'
? 'bg-blue-600 text-white'
: msg.success === false
? 'bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800'
: 'bg-gray-100 dark:bg-gray-700'
}`}
>
<div className="whitespace-pre-wrap break-words">
{msg.content}
</div>


{msg.role === 'assistant' && msg.success !== false && (
<div className="mt-3 flex items-center gap-2">
<button
onClick={() => handleExport(msg)}
className="px-3 py-1 text-xs bg-blue-100 dark:bg-blue-900 text-blue-800
dark:text-blue-200 rounded hover:bg-blue-200 dark:hover:bg-blue-800
transition-colors"
>
💾 Export
</button>
{msg.metadata && (
<span className="text-xs opacity-75">
{msg.metadata.processingTime}ms
</span>
)}
</div>
)}


<div className="text-xs opacity-50 mt-2">
{new Date(msg.timestamp).toLocaleTimeString()}
</div>
</div>
</div>
))}


{isProcessing && (
<div className="flex justify-start">
<div className="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg">
<div className="flex items-center space-x-3">
<div className="animate-spin h-5 w-5 border-2 border-blue-500 border-t-transparent rounded-full" />
<span className="font-medium">
{processingMode === 'Interactive'
? 'Generating content...'
: 'Processing in batch mode...'}
</span>
</div>
</div>
</div>
)}

</>
)}


<div ref={messagesEndRef} />
</div>
</div>

{/* Input */}
<form onSubmit={handleSubmit} className="mt-4 flex gap-3">
<input
type="text"
value={input}
onChange={(e) => setInput(e.target.value)}
placeholder="Ask me to create emails, reports, templates, spreadsheets..."
disabled={isProcessing}
className="flex-1 p-4 border rounded-xl bg-white dark:bg-gray-700
dark:border-gray-600 focus:ring-2 focus:ring-blue-500
disabled:opacity-50 transition-colors"
/>
<button
type="submit"
disabled={isProcessing || !input.trim()}
className={`px-8 py-4 font-medium rounded-xl transition-all ${
isProcessing || !input.trim()
? 'bg-gray-300 dark:bg-gray-700 cursor-not-allowed'
: 'bg-blue-600 hover:bg-blue-700 text-white shadow-lg active:scale-95'
}`}
>
{isProcessing ? '⏳' : 'Send'}
</button>
</form>
</div>
);
};

export default Chat;
