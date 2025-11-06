import { useReducer } from 'react';

const initialState = {
  datasets: [
    { id: 1, name: 'Marketing', documents: [], active: true },
    { id: 2, name: 'Development', documents: [], active: false },
    { id: 3, name: 'Sales', documents: [], active: false },
  ],
};

function datasetManagerReducer(state, action) {
  switch (action.type) {
    case 'ADD_DATASET':
      return {
        ...state,
        datasets: [...state.datasets, { id: Date.now(), name: action.payload.name, documents: [], active: false }],
      };
    case 'DELETE_DATASET':
      return {
        ...state,
        datasets: state.datasets.filter((dataset) => dataset.id !== action.payload.id),
      };
    case 'ACTIVATE_DATASET':
      return {
        ...state,
        datasets: state.datasets.map((dataset) => ({
          ...dataset,
          active: dataset.id === action.payload.id,
        })),
      };
    case 'ADD_DOCUMENT':
      return {
        ...state,
        datasets: state.datasets.map((dataset) =>
          dataset.id === action.payload.datasetId
            ? { ...dataset, documents: [...dataset.documents, action.payload.document] }
            : dataset
        ),
      };
    default:
      return state;
  }
}

export function useDatasetManagerReducer() {
  const [state, dispatch] = useReducer(datasetManagerReducer, initialState);

  const addDataset = (name) => dispatch({ type: 'ADD_DATASET', payload: { name } });
  const deleteDataset = (id) => dispatch({ type: 'DELETE_DATASET', payload: { id } });
  const activateDataset = (id) => dispatch({ type: 'ACTIVATE_DATASET', payload: { id } });
  const addDocument = (datasetId, document) => dispatch({ type: 'ADD_DOCUMENT', payload: { datasetId, document } });

  return {
    ...state,
    addDataset,
    deleteDataset,
    activateDataset,
    addDocument,
  };
}
