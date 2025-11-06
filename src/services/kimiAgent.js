/**
* Kimi K2 Instructor Agent Service
* Single AI agent that works with multiple datasets
*/

const KIMI_API_BASE = 'https://api-inference.huggingface.co/models';
const KIMI_TOKEN = import.meta.env.VITE_HF_TOKEN;
const KIMI_MODEL = import.meta.env.VITE_HF_MODEL || 'microsoft/DialoGPT-medium';

export const useKimiAgent = (config) => {
const activeDataset = config.datasets[config.activeDatasetIndex];

/**
* Build context from uploaded documents
*/
const buildContext = () => {
if (!activeDataset.documents || activeDataset.documents.length === 0) {
return null;
}

const contextParts = activeDataset.documents.map((doc, index) => {
return `
--- DOCUMENT ${index + 1}: ${doc.fileName} ---
Type: ${doc.type.toUpperCase()}
${doc.content}
`;
});

return contextParts.join('\n\n');
};

/**
* Build the system prompt for content generation
*/
const buildSystemPrompt = (taskType) => {
const context = buildContext();


const basePrompt = `You are Kimi K2 Instructor, a powerful business AI assistant.



Your capabilities:
- Analyze any business document (PDFs, spreadsheets, presentations, URLs)
- Generate professional business content (emails, reports, templates, documentation)
- Create structured data (spreadsheets, lists, databases)
- Design marketing materials and advertising copy
- Build templates that users can customize with their branding



CRITICAL RULES:
1. ONLY use information from the provided documents
2. When creating content, match the style and tone of the source materials
3. For templates, use {{PLACEHOLDERS}} for customizable fields
4. Always cite which document you're referencing
5. If information is missing, state it clearly
6. Be professional, concise, and business-focused`;



if (!context) {
return `${basePrompt}



STATUS: No documents uploaded to this dataset yet.
INSTRUCTION: Inform the user to upload business documents to enable context-aware generation.`;
}



return `${basePrompt}



=== UPLOADED BUSINESS DOCUMENTS ===
${context}



=== END DOCUMENTS ===



Use these documents to provide accurate, context-aware responses and generate professional business content.`;
};

/**
* Generate response based on user request
*/
const generateResponse = async (userMessage, taskType = 'general') => {
const startTime = Date.now();

try {
const systemPrompt = buildSystemPrompt(taskType);
const fullPrompt = `${systemPrompt}



User Request: ${userMessage}`;



// Interactive mode - fast response
if (config.processingMode === 'Interactive') {
const response = await callKimiAPI(fullPrompt);
return {
success: true,
content: response,
metadata: {
model: config.aiModel,
dataset: activeDataset.name,
processingMode: 'Interactive',
documentsUsed: activeDataset.documents.length,
processingTime: Date.now() - startTime
}
};
}

// Batch mode - cost-saving
if (config.processingMode === 'Batch') {
if (!KIMI_TOKEN) {
return {
success: false,
error: 'Batch mode requires API token. Please add VITE_HF_TOKEN to your .env file.',
metadata: { processingMode: 'Batch' }
};
}

const response = await callKimiAPI(fullPrompt, true);
return {
success: true,
content: response,
metadata: {
model: config.aiModel,
dataset: activeDataset.name,
processingMode: 'Batch',
documentsUsed: activeDataset.documents.length,
processingTime: Date.now() - startTime
}
};
}

} catch (error) {
console.error('Kimi Agent error:', error);
return {
success: false,
error: error.message,
metadata: {
dataset: activeDataset.name,
processingMode: config.processingMode
}
};
}
};

/**
* Call Kimi API (or HuggingFace placeholder)
*/
const callKimiAPI = async (prompt, isBatch = false) => {
// Simulated response for demo
// In production, replace with actual Kimi K2 API call
await new Promise(resolve => setTimeout(resolve, isBatch ? 3000 : 1500));

const hasDocuments = activeDataset.documents.length > 0;


if (!hasDocuments) {
return `**Kimi K2 Instructor** (${config.aiModel})



I'm ready to help with your business automation needs! However, I notice that **${activeDataset.name}** doesn't have any documents uploaded yet.



**What I can do once you upload documents:**
📧 Generate email templates and campaigns
📊 Create reports and documentation
📋 Build spreadsheets and organize data
🎨 Design marketing and advertising materials
📝 Produce business templates and forms
📈 Analyze business data and create insights



**To get started:**
1. Go to "Manage Datasets"
2. Upload your business documents (PDFs, URLs, text)
3. Return here and ask me to create anything you need!



I'll analyze your materials and generate professional content that matches your company's style and needs.`;
}

return `**Kimi K2 Instructor** (${config.aiModel})



I've analyzed the documents in **${activeDataset.name}** (${activeDataset.documents.length} document${activeDataset.documents.length > 1 ? 's' : ''}).



**Based on your uploaded materials, I can help you:**



✅ **Generate Content:** I'll create professional business documents matching your company's style
✅ **Build Templates:** Custom templates with {{PLACEHOLDERS}} for easy personalization
✅ **Organize Data:** Convert information into structured formats (spreadsheets, lists)
✅ **Create Marketing Materials:** Advertising copy, social media content, campaign materials
✅ **Produce Documentation:** Technical docs, user guides, process documentation



**Example requests you can make:**
- "Create an email template for customer outreach"
- "Generate a report summarizing the key points"
- "Build a spreadsheet organizing the contact information"
- "Write advertising copy for [product/service]"
- "Create a presentation outline"



**Processing Mode:** ${config.processingMode} (${config.processingMode === 'Interactive' ? '⚡ Fast' : '💰 Cost-Saving'})



What would you like me to create for you?`;
};

return {
generateResponse,
activeDataset,
hasDocuments: activeDataset.documents.length > 0,
model: config.aiModel,
processingMode: config.processingMode
};
};
