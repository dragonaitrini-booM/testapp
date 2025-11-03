// src/components/ListGroup.tsx
import React, { useState } from 'react';

type Stat = {
  label: string;
  value: string | number;
};

const stats: Stat[] = [
  { label: 'Pages trained', value: 387 },
  { label: 'Conversations today', value: 45 },
  { label: 'Response time', value: '0.8s' },
  { label: 'Accuracy', value: '98%' },
];

export default function ListGroup() {
  const [selectedIndex, setSelectedIndex] = useState(-1);

  return (
    <ul className="w-full space-y-2">
      {stats.map((item, index) => (
        <li
          key={item.label}
          className={`p-4 rounded-lg border transition-colors duration-150 cursor-pointer flex justify-between items-center ${
            selectedIndex === index
              ? 'bg-teal-50 border-teal-500 border-l-4 border-r border-t border-b'
              : 'bg-white border-gray-200 hover:bg-gray-50'
          }`}
          onClick={() => setSelectedIndex(index)}
          aria-selected={selectedIndex === index}
          role="option"
        >
          <span className="text-gray-700">{item.label}</span>
          <strong className="text-gray-900 font-medium">
            {typeof item.value === 'number'
              ? item.value.toLocaleString()
              : item.value}
          </strong>
        </li>
      ))}
    </ul>
  );
}