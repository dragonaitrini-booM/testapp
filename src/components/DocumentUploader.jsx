import React, { useState } from 'react';
import { parseDocument, validateFile } from '../services/documentProcessor';

const DocumentUploader = ({ onDocumentAdd, documents, onDocumentRemove }) => {
const [uploading, setUploading] = useState(false);
const [dragOver, setDragOver] = useState(false);
const [error, setError] = useState(null);
const [urlInput, setUrlInput] = useState('');

const processFile = async (file) => {
setUploading(true);
setError(null);


try {
validateFile(file);
const content = await parseDocument(file);


const document = {
id: `doc-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
fileName: file.name,
fileSize: file.size,
type: 'file',
content,
uploadedAt: new Date().toISOString()
};


onDocumentAdd(document);
} catch (error) {
setError(error.message);
} finally {
setUploading(false);
}
};

const handleFileSelect = (e) => {
const file = e.target.files[0];
if (file) processFile(file);
};

const handleDrop = (e) => {
e.preventDefault();
setDragOver(false);
const file = e.dataTransfer.files[0];
if (file) processFile(file);
};

const handleUrlAdd = () => {
if (!urlInput.trim()) return;


try {
new URL(urlInput);
const document = {
id: `doc-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
fileName: urlInput.split('/').pop() || 'URL Source',
fileSize: 0,
type: 'url',
content: `URL Reference: ${urlInput}`,
uploadedAt: new Date().toISOString()
};
onDocumentAdd(document);
setUrlInput('');
} catch (error) {
setError('Please enter a valid URL');
}
};

return (
<div className="space-y-6">
{/* File Drop Zone */}
<div
onDrop={handleDrop}
onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
onDragLeave={(e) => { e.preventDefault(); setDragOver(false); }}
className={`border-2 border-dashed rounded-xl p-8 text-center transition-all ${
dragOver
? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20 scale-[1.02]'
: 'border-gray-300 dark:border-gray-600 hover:border-gray-400'
}`}
>
{uploading ? (
<div className="flex items-center justify-center space-x-3">
<div className="animate-spin h-8 w-8 border-3 border-blue-500 border-t-transparent rounded-full" />
<span className="text-lg font-medium">Processing document...</span>
</div>
) : (
<>
<div className="text-6xl mb-4">📄</div>
<p className="text-xl font-semibold mb-2">Drop your business documents here</p>
<p className="text-sm text-gray-600 dark:text-gray-400 mb-6">
Supports: PDF, TXT, JSON, CSV, MD, DOCX (max 10MB)
</p>
<input
type="file"
onChange={handleFileSelect}
accept=".pdf,.txt,.json,.csv,.md,.docx"
className="hidden"
id="file-upload"
/>
<label
htmlFor="file-upload"
className="inline-block px-6 py-3 bg-blue-600 text-white rounded-lg cursor-pointer
hover:bg-blue-700 transition-colors font-medium"
>
Choose File
</label>
</>
)}
</div>

{/* URL Input */}
<div className="border rounded-xl p-6 bg-gray-50 dark:bg-gray-800">
<h4 className="font-semibold mb-3 flex items-center">
🌐 Add URL or Website
</h4>
<div className="flex space-x-2">
<input
type="url"
value={urlInput}
onChange={(e) => setUrlInput(e.target.value)}
placeholder="https://example.com/your-content"
className="flex-1 p-2 border rounded dark:bg-gray-700 dark:border-gray-600"
onKeyPress={(e) => {
if (e.key === 'Enter') {
handleUrlAdd();
}
}}
/>
<button
onClick={handleUrlAdd}
className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition-colors"
>
Add URL
</button>
</div>
</div>

{/* Error Display */}
{error && (
<div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4">
<div className="flex items-center">
<span className="text-red-500 mr-2">⚠️</span>
<span className="text-red-800 dark:text-red-200 font-medium">{error}</span>
</div>
</div>
)}

{/* Document List */}
{documents && documents.length > 0 && (
<div className="space-y-3">
<h4 className="font-semibold">Uploaded Documents ({documents.length})</h4>
{documents.map((doc) => (
<div
key={doc.id}
className="bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600
rounded-lg p-4 flex items-start justify-between"
>
<div className="flex-1">
<div className="flex items-center space-x-2">
<span className="text-2xl">
{doc.type === 'url' ? '🌐' : '📄'}
</span>
<div>
<p className="font-semibold text-gray-900 dark:text-white">
{doc.fileName}
</p>
<div className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
<p>Type: {doc.type.toUpperCase()}</p>
{doc.fileSize > 0 && (
<p>Size: {(doc.fileSize / 1024).toFixed(1)} KB</p>
)}
<p>Uploaded: {new Date(doc.uploadedAt).toLocaleString()}</p>
</div>
</div>
</div>
{doc.content && (
<div className="mt-2 p-2 bg-gray-50 dark:bg-gray-800 rounded text-xs">
<p className="font-medium mb-1">Preview:</p>
<p className="text-gray-600 dark:text-gray-400 line-clamp-2">
{doc.content.slice(0, 150)}
{doc.content.length > 150 && '...'}
</p>
</div>
)}
</div>
<button
onClick={() => onDocumentRemove(doc.id)}
className="ml-4 text-red-600 hover:text-red-800 transition-colors p-2
hover:bg-red-100 dark:hover:bg-red-900/20 rounded"
title="Remove document"
>
✕
</button>
</div>
))}
</div>
)}
</div>
);
};

export default DocumentUploader;
