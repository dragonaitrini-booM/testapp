const inMemoryDB = {
  // Simulating a database of documents
  documents: {
    marketing: [
      { id: 'doc1', content: 'Marketing document 1: Best practices for SEO.' },
      { id: 'doc2', content: 'Marketing document 2: A guide to social media campaigns.' },
    ],
    development: [
      { id: 'doc3', content: 'Development document 1: Building scalable applications with React.' },
      { id: 'doc4', content: 'Development document 2: Understanding asynchronous JavaScript.' },
    ],
    sales: [
      { id: 'doc5', content: 'Sales document 1: Techniques for closing deals.' },
      { id: 'doc6', content: 'Sales document 2: How to build a strong sales pipeline.' },
    ],
  },
};

const kimiAgent = {
  async getCompletion(prompt, datasetName) {
    const dataset = inMemoryDB.documents[datasetName.toLowerCase()];
    if (!dataset) {
      return {
        success: false,
        error: 'Dataset not found',
      };
    }

    const context = dataset.map((doc) => doc.content).join('\n');
    const fullPrompt = `Context: ${context}\n\nUser Prompt: ${prompt}\n\nKimi K2 Instructor:`;

    // Simulate an API call to the Kimi K2 Instructor model
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          success: true,
          completion: `Based on the ${datasetName} dataset, here is the response to your prompt: "${prompt}"`,
        });
      }, 1000);
    });
  },
};

export default kimiAgent;
