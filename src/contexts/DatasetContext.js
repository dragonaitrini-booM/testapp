import React, { createContext, useContext } from 'react';
import { useDatasetManagerReducer } from '../hooks/useDatasetManager';

const DatasetContext = createContext();

export function DatasetProvider({ children }) {
  const datasetManager = useDatasetManagerReducer();
  return <DatasetContext.Provider value={datasetManager}>{children}</DatasetContext.Provider>;
}

export function useDatasetManager() {
  return useContext(DatasetContext);
}
