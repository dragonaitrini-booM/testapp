import React, { useState, useEffect } from 'react';
import kimiAgent from '../services/kimiAgent';

export default function Chat({ activeDataset }) {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSend = async () => {
    if (input.trim() === '') return;

    const newMessages = [...messages, { text: input, sender: 'user' }];
    setMessages(newMessages);
    setInput('');
    setIsLoading(true);

    const response = await kimiAgent.getCompletion(input, activeDataset.name);

    if (response.success) {
      setMessages([...newMessages, { text: response.completion, sender: 'agent' }]);
    } else {
      setMessages([...newMessages, { text: `Error: ${response.error}`, sender: 'agent' }]);
    }
    setIsLoading(false);
  };

  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 overflow-y-auto p-4">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'} mb-2`}
          >
            <div
              className={`rounded-lg px-4 py-2 ${
                message.sender === 'user' ? 'bg-blue-500 text-white' : 'bg-gray-200'
              }`}
            >
              {message.text}
            </div>
          </div>
        ))}
      </div>
      <div className="p-4">
        <div className="flex">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
            className="flex-1 border p-2 rounded-l-lg"
            placeholder="Type your message..."
          />
          <button
            onClick={handleSend}
            disabled={isLoading}
            className="bg-blue-500 text-white px-4 py-2 rounded-r-lg"
          >
            {isLoading ? 'Sending...' : 'Send'}
          </button>
        </div>
        <div className="text-sm text-gray-500 mt-2">
          <span>Active Dataset: {activeDataset?.name}</span>
          <span className="ml-4">AI Model: Kimi K2 Instructor</span>
        </div>
      </div>
    </div>
  );
}
