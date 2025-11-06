import React from 'react';

export default function DatasetManager({ datasets, addDataset, deleteDataset, activateDataset }) {
  const activeDataset = datasets.find((d) => d.active);

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Dataset Manager</h2>
      <div className="mb-4">
        <h3 className="text-lg font-semibold">Active Dataset: {activeDataset?.name}</h3>
      </div>
      <div className="mb-4">
        <h3 className="text-lg font-semibold">All Datasets</h3>
        <ul className="list-disc pl-5">
          {datasets.map((dataset) => (
            <li key={dataset.id} className="flex items-center justify-between">
              <span>{dataset.name}</span>
              <div>
                <button
                  onClick={() => activateDataset(dataset.id)}
                  className={`px-2 py-1 text-sm rounded ${
                    dataset.active ? 'bg-green-500 text-white' : 'bg-gray-200'
                  }`}
                >
                  {dataset.active ? 'Active' : 'Set Active'}
                </button>
                <button
                  onClick={() => deleteDataset(dataset.id)}
                  className="px-2 py-1 text-sm rounded bg-red-500 text-white ml-2"
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
      <div>
        <h3 className="text-lg font-semibold">Add New Dataset</h3>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            const name = e.target.elements.name.value;
            if (name) {
              addDataset(name);
              e.target.elements.name.value = '';
            }
          }}
        >
          <input
            type="text"
            name="name"
            placeholder="New dataset name"
            className="border p-2 rounded"
          />
          <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded ml-2">
            Add
          </button>
        </form>
      </div>
    </div>
  );
}
