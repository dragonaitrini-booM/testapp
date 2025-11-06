import { useReducer, useEffect } from 'react';

// Default configuration
const defaultConfig = {
activeDatasetIndex: 0,
aiModel: 'Kimi K2 Instructor',
temperature: 0.7,
processingMode: 'Interactive', // 'Interactive' or 'Batch'
datasets: [
{
id: 'dataset-1',
name: 'Dataset 1',
description: 'Upload your first business documents',
documents: [],
createdAt: new Date().toISOString(),
lastModified: new Date().toISOString()
},
{
id: 'dataset-2',
name: 'Dataset 2',
description: 'Upload your second set of documents',
documents: [],
createdAt: new Date().toISOString(),
lastModified: new Date().toISOString()
},
{
id: 'dataset-3',
name: 'Dataset 3',
description: 'Upload your third set of documents',
documents: [],
createdAt: new Date().toISOString(),
lastModified: new Date().toISOString()
}
],
theme: 'light'
};

// Reducer for state management
const datasetReducer = (state, action) => {
switch (action.type) {
case 'SET_ACTIVE_DATASET':
return {
...state,
activeDatasetIndex: Math.max(0, Math.min(state.datasets.length - 1, action.payload))
};

case 'UPDATE_DATASET': {
const { index, updates } = action.payload;
const updatedDatasets = state.datasets.map((dataset, i) =>
i === index
? { ...dataset, ...updates, lastModified: new Date().toISOString() }
: dataset
);
return { ...state, datasets: updatedDatasets };
}

case 'ADD_DOCUMENT': {
const { datasetIndex, document } = action.payload;
const updatedDatasets = state.datasets.map((dataset, i) =>
i === datasetIndex
? {
...dataset,
documents: [...dataset.documents, document],
lastModified: new Date().toISOString()
}
: dataset
);
return { ...state, datasets: updatedDatasets };
}

case 'REMOVE_DOCUMENT': {
const { datasetIndex, documentId } = action.payload;
const updatedDatasets = state.datasets.map((dataset, i) =>
i === datasetIndex
? {
...dataset,
documents: dataset.documents.filter(doc => doc.id !== documentId),
lastModified: new Date().toISOString()
}
: dataset
);
return { ...state, datasets: updatedDatasets };
}

case 'UPDATE_SETTINGS': {
return { ...state, ...action.payload };
}

case 'TOGGLE_THEME':
return {
...state,
theme: state.theme === 'light' ? 'dark' : 'light'
};

case 'RESET_DATASET': {
const { index } = action.payload;
const updatedDatasets = state.datasets.map((dataset, i) =>
i === index
? {
...dataset,
documents: [],
lastModified: new Date().toISOString()
}
: dataset
);
return { ...state, datasets: updatedDatasets };
}

case 'RESET_ALL':
return defaultConfig;

default:
return state;
}
};

// Custom hook
export const useDatasetManager = () => {
const [config, dispatch] = useReducer(datasetReducer, defaultConfig);

// Apply theme
useEffect(() => {
if (typeof document !== 'undefined') {
document.documentElement.classList.toggle('dark', config.theme === 'dark');
}
}, [config.theme]);

return [config, dispatch];
};

export default useDatasetManager;
