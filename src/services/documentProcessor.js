/**
* Enhanced document processing service
*/

export const parseDocument = async (file) => {
const fileType = file.type;
const fileName = file.name.toLowerCase();

try {
if (fileType === 'application/pdf' || fileName.endsWith('.pdf')) {
return await parsePDF(file);
} else if (fileType === 'application/json' || fileName.endsWith('.json')) {
return await parseJSON(file);
} else if (fileType === 'text/plain' || fileName.endsWith('.txt')) {
return await parseText(file);
} else if (fileName.endsWith('.csv')) {
return await parseCSV(file);
} else if (fileName.endsWith('.md')) {
return await parseText(file);
} else if (fileType.includes('spreadsheet') || fileName.endsWith('.xlsx')) {
return await parseSpreadsheet(file);
} else if (fileType.includes('document') || fileName.endsWith('.docx')) {
return await parseWordDoc(file);
} else {
throw new Error(`Unsupported file type: ${fileType}`);
}
} catch (error) {
console.error('Document parsing failed:', error);
throw new Error(`Failed to parse document: ${error.message}`);
}
};

const parseText = async (file) => {
return new Promise((resolve, reject) => {
const reader = new FileReader();
reader.onload = (e) => resolve(e.target.result);
reader.onerror = () => reject(new Error('Failed to read text file'));
reader.readAsText(file);
});
};

const parseJSON = async (file) => {
const text = await parseText(file);
try {
const json = JSON.parse(text);
return JSON.stringify(json, null, 2);
} catch (error) {
throw new Error('Invalid JSON format');
}
};

const parseCSV = async (file) => {
const text = await parseText(file);
const lines = text.split('\n').slice(0, 100); // Limit for performance
return `CSV Data (${lines.length} rows):\n\n${lines.join('\n')}`;
};

const parsePDF = async (file) => {
// For production, integrate pdf.js or similar library
return `PDF Document: ${file.name}
Size: ${(file.size / 1024).toFixed(1)} KB
Pages: [Requires PDF.js integration]

Note: Full PDF text extraction requires additional setup.
For now, the document metadata has been captured.`;
};

const parseSpreadsheet = async (file) => {
// For production, integrate SheetJS or similar
return `Spreadsheet: ${file.name}
Size: ${(file.size / 1024).toFixed(1)} KB
Format: ${file.type}

Note: Full spreadsheet parsing requires SheetJS integration.
Document metadata captured.`;
};

const parseWordDoc = async (file) => {
// For production, integrate mammoth.js or similar
return `Word Document: ${file.name}
Size: ${(file.size / 1024).toFixed(1)} KB
Format: ${file.type}

Note: Full document text extraction requires mammoth.js integration.
Document metadata captured.`;
};

export const validateFile = (file) => {
const maxSize = 10 * 1024 * 1024; // 10MB
const allowedExtensions = ['.pdf', '.txt', '.json', '.csv', '.md', '.xlsx', '.docx'];


if (file.size > maxSize) {
throw new Error('File size must be less than 10MB');
}


const extension = file.name.toLowerCase().match(/\.[^.]+$/)?.[0];
if (!extension || !allowedExtensions.includes(extension)) {
throw new Error(`Unsupported file type. Allowed: ${allowedExtensions.join(', ')}`);
}


return true;
};
