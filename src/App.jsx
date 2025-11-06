import React, { useState } from 'react';
import Chat from './components/Chat';
import DatasetManager from './components/DatasetManager';
import { useDatasetManager } from './hooks/useDatasetManager';

function App() {
const [currentView, setCurrentView] = useState('chat');
const [config, dispatch] = useDatasetManager();

return (
<div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors">
{/* Header */}
<header className="bg-white dark:bg-gray-800 shadow-md border-b border-gray-200 dark:border-gray-700">
<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
<div className="flex items-center justify-between h-16">
<div className="flex items-center space-x-4">
<div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl
flex items-center justify-center">
<span className="text-white font-bold text-xl">AI</span>
</div>
<div>
<h1 className="text-xl font-bold text-gray-900 dark:text-white">
Business AI Platform
</h1>
<p className="text-xs text-gray-500 dark:text-gray-400">
{config.aiModel} • {config.datasets[config.activeDatasetIndex].name}
</p>
</div>
</div>

<nav className="flex space-x-2">
<button
onClick={() => setCurrentView('chat')}
className={`px-6 py-2 rounded-lg font-medium transition-all ${
currentView === 'chat'
? 'bg-blue-600 text-white shadow-lg'
: 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200'
}`}
>
💬 Chat
</button>
<button
onClick={() => setCurrentView('datasets')}
className={`px-6 py-2 rounded-lg font-medium transition-all ${
currentView === 'datasets'
? 'bg-blue-600 text-white shadow-lg'
: 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200'
}`}
>
📊 Manage Datasets
</button>
</nav>
</div>
</div>
</header>

{/* Main Content */}
<main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
{currentView === 'chat' ? (
<Chat config={config} />
) : (
<DatasetManager config={config} dispatch={dispatch} />
)}
</main>

{/* Footer */}
<footer className="bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 mt-12">
<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
<div className="flex items-center justify-between text-sm text-gray-600 dark:text-gray-400">
<div className="flex items-center space-x-4">
<span className="inline-flex items-center">
<span className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></span>
System Online
</span>
<span>•</span>
<span>Zero-Cost Infrastructure</span>
<span>•</span>
<span>{config.aiModel}</span>
</div>
<div className="flex items-center space-x-4">
<span>Theme: {config.theme === 'light' ? '☀️ Light' : '🌙 Dark'}</span>
<span>•</span>
<span>Mode: {config.processingMode === 'Interactive' ? '⚡ Interactive' : '💰 Batch'}</span>
</div>
</div>
</div>
</footer>
</div>
);
}

export default App;
