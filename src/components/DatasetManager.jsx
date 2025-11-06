import React, { useState } from 'react';
import DocumentUploader from './DocumentUploader';

const DatasetManager = ({ config, dispatch }) => {
const [activeTab, setActiveTab] = useState('datasets');
const activeDataset = config.datasets[config.activeDatasetIndex];

const handleDatasetSwitch = (index) => {
dispatch({ type: 'SET_ACTIVE_DATASET', payload: index });
};

const handleDatasetUpdate = (updates) => {
dispatch({
type: 'UPDATE_DATASET',
payload: { index: config.activeDatasetIndex, updates }
});
};

const handleDocumentAdd = (document) => {
dispatch({
type: 'ADD_DOCUMENT',
payload: { datasetIndex: config.activeDatasetIndex, document }
});
};

const handleDocumentRemove = (documentId) => {
dispatch({
type: 'REMOVE_DOCUMENT',
payload: { datasetIndex: config.activeDatasetIndex, documentId }
});
};

const handleResetDataset = () => {
if (window.confirm(`Clear all documents from ${activeDataset.name}? This cannot be undone.`)) {
dispatch({
type: 'RESET_DATASET',
payload: { index: config.activeDatasetIndex }
});
}
};

return (
<div className="max-w-6xl mx-auto p-6">
{/* Header */}
<div className="flex items-center justify-between mb-8">
<div>
<h2 className="text-3xl font-bold text-gray-900 dark:text-white">
Dataset Management
</h2>
<p className="text-gray-600 dark:text-gray-400 mt-1">
Manage your business documents and training data
</p>
</div>


<button
onClick={() => dispatch({ type: 'TOGGLE_THEME' })}
className="p-3 rounded-lg bg-gray-200 dark:bg-gray-700 hover:bg-gray-300
dark:hover:bg-gray-600 transition-colors"
>
{config.theme === 'light' ? '🌙' : '☀️'}
</button>
</div>

{/* Dataset Selector */}
<div className="mb-8">
<label className="block text-sm font-semibold mb-3 text-gray-700 dark:text-gray-300">
Active Dataset
</label>
<div className="grid grid-cols-1 md:grid-cols-3 gap-3">
{config.datasets.map((dataset, index) => (
<button
key={dataset.id}
onClick={() => handleDatasetSwitch(index)}
className={`p-4 rounded-xl text-left transition-all border-2 ${
config.activeDatasetIndex === index
? 'bg-blue-600 text-white border-blue-500 shadow-lg scale-[1.02]'
: 'bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 hover:border-blue-300'
}`}
>
<div className="font-bold text-lg">{dataset.name}</div>
<div className="text-sm opacity-75 mt-1">
{dataset.documents.length} document{dataset.documents.length !== 1 ? 's' : ''}
</div>
<div className="text-xs opacity-60 mt-1">
Modified: {new Date(dataset.lastModified).toLocaleDateString()}
</div>
</button>
))}
</div>
</div>

{/* Tabs */}
<div className="mb-6">
<div className="border-b border-gray-200 dark:border-gray-700">
<nav className="-mb-px flex space-x-8">
<button
onClick={() => setActiveTab('datasets')}
className={`py-2 px-1 border-b-2 font-medium text-sm ${
activeTab === 'datasets'
? 'border-blue-500 text-blue-600'
: 'border-transparent text-gray-500 hover:text-gray-700'
}`}
>
📄 Documents
</button>
<button
onClick={() => setActiveTab('settings')}
className={`py-2 px-1 border-b-2 font-medium text-sm ${
activeTab === 'settings'
? 'border-blue-500 text-blue-600'
: 'border-transparent text-gray-500 hover:text-gray-700'
}`}
>
⚙️ Settings
</button>
</nav>
</div>
</div>

{/* Content */}
<div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
<div className="lg:col-span-2">
<div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
{activeTab === 'datasets' ? (
<>
<h3 className="text-xl font-semibold mb-6">
{activeDataset.name}
</h3>


{/* Dataset Name & Description */}
<div className="mb-6">
<label className="block text-sm font-medium mb-2">Dataset Name</label>
<input
type="text"
value={activeDataset.name}
onChange={(e) => handleDatasetUpdate({ name: e.target.value })}
className="w-full p-3 border rounded-lg dark:bg-gray-700 dark:border-gray-600"
/>
</div>

<div className="mb-6">
<label className="block text-sm font-medium mb-2">Description</label>
<textarea
value={activeDataset.description}
onChange={(e) => handleDatasetUpdate({ description: e.target.value })}
rows={2}
className="w-full p-3 border rounded-lg dark:bg-gray-700 dark:border-gray-600"
/>
</div>

{/* Document Uploader */}
<DocumentUploader
onDocumentAdd={handleDocumentAdd}
documents={activeDataset.documents}
onDocumentRemove={handleDocumentRemove}
/>
</>
) : (
<>
<h3 className="text-xl font-semibold mb-6">AI Configuration</h3>


<div className="mb-6">
<label className="block text-sm font-medium mb-2">AI Model</label>
<input
type="text"
value={config.aiModel}
disabled
className="w-full p-3 border rounded-lg bg-gray-50 dark:bg-gray-700
dark:border-gray-600 cursor-not-allowed"
/>
<p className="text-xs text-gray-500 mt-1">
Kimi K2 Instructor handles all datasets
</p>
</div>

<div className="mb-6">
<label className="block text-sm font-medium mb-2">
Temperature: {config.temperature.toFixed(1)}
</label>
<input
type="range"
min="0"
max="2"
step="0.1"
value={config.temperature}
onChange={(e) => dispatch({
type: 'UPDATE_SETTINGS',
payload: { temperature: parseFloat(e.target.value) }
})}
className="w-full"
/>
<p className="text-xs text-gray-500 mt-1">
Lower = more focused, Higher = more creative
</p>
</div>

<div className="mb-6">
<label className="block text-sm font-medium mb-2">Processing Mode</label>
<select
value={config.processingMode}
onChange={(e) => dispatch({
type: 'UPDATE_SETTINGS',
payload: { processingMode: e.target.value }
})}
className="w-full p-3 border rounded-lg dark:bg-gray-700 dark:border-gray-600"
>
<option value="Interactive">⚡ Interactive (Fast)</option>
<option value="Batch">💰 Batch (Cost-Saving)</option>
</select>
</div>
</>
)}
</div>
</div>

{/* Sidebar */}
<div className="space-y-6">
<div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
<h4 className="font-semibold mb-4">Current Status</h4>
<div className="space-y-3 text-sm">
<div className="flex justify-between">
<span className="text-gray-600 dark:text-gray-400">Documents:</span>
<span className="font-medium">{activeDataset.documents.length}</span>
</div>
<div className="flex justify-between">
<span className="text-gray-600 dark:text-gray-400">AI Model:</span>
<span className="font-medium">{config.aiModel}</span>
</div>
<div className="flex justify-between">
<span className="text-gray-600 dark:text-gray-400">Mode:</span>
<span className="font-medium">
{config.processingMode === 'Interactive' ? '⚡ Fast' : '💰 Batch'}
</span>
</div>
</div>
</div>

<div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
<h4 className="font-semibold mb-4">Quick Actions</h4>
<button
onClick={handleResetDataset}
className="w-full px-4 py-2 bg-red-500 hover:bg-red-600 text-white
rounded-lg transition-colors"
>
Clear Dataset
</button>
</div>
</div>
</div>
</div>
);
};

export default DatasetManager;
