/**
* Content Generation Templates and Helpers
*/

export const contentTypes = {
EMAIL: 'email',
REPORT: 'report',
SPREADSHEET: 'spreadsheet',
TEMPLATE: 'template',
MARKETING: 'marketing',
DOCUMENTATION: 'documentation'
};

export const generatePrompt = (contentType, userRequest, context) => {
const prompts = {
[contentTypes.EMAIL]: `Create a professional email template based on the uploaded documents.

User Request: ${userRequest}

Requirements:
- Use {{PLACEHOLDERS}} for customizable fields (e.g., {{CUSTOMER_NAME}}, {{PRODUCT}})
- Match the tone and style from the source documents
- Include subject line and body
- Keep it professional and concise
- Format as ready-to-use template`,

[contentTypes.REPORT]: `Generate a professional business report based on the uploaded documents.

User Request: ${userRequest}

Requirements:
- Use clear sections with headers
- Include executive summary
- Cite specific data from source documents
- Use professional formatting
- Provide actionable insights`,

[contentTypes.SPREADSHEET]: `Create a structured spreadsheet/table based on the uploaded documents.

User Request: ${userRequest}

Requirements:
- Format as CSV or markdown table
- Use clear column headers
- Extract and organize relevant data
- Ensure data accuracy
- Make it ready for import`,

[contentTypes.TEMPLATE]: `Create a reusable business template based on the uploaded documents.

User Request: ${userRequest}

Requirements:
- Use {{PLACEHOLDERS}} for all variable content
- Match company style and branding
- Include instructions for customization
- Make it professional and polished
- Provide usage examples`,

[contentTypes.MARKETING]: `Create marketing/advertising content based on the uploaded documents.

User Request: ${userRequest}

Requirements:
- Match brand voice and messaging
- Include compelling copy
- Format appropriately for the medium
- Focus on benefits and value proposition
- Make it engaging and professional`,

[contentTypes.DOCUMENTATION]: `Create professional documentation based on the uploaded documents.

User Request: ${userRequest}

Requirements:
- Use clear structure and sections
- Include examples where relevant
- Make it easy to follow
- Use professional tone
- Ensure accuracy and completeness`
};

return prompts[contentType] || userRequest;
};

export const detectContentType = (userMessage) => {
const message = userMessage.toLowerCase();


if (message.includes('email') || message.includes('campaign')) {
return contentTypes.EMAIL;
}
if (message.includes('report') || message.includes('summary')) {
return contentTypes.REPORT;
}
if (message.includes('spreadsheet') || message.includes('csv') || message.includes('table')) {
return contentTypes.SPREADSHEET;
}
if (message.includes('template')) {
return contentTypes.TEMPLATE;
}
if (message.includes('marketing') || message.includes('advertising') || message.includes('ad')) {
return contentTypes.MARKETING;
}
if (message.includes('documentation') || message.includes('guide') || message.includes('manual')) {
return contentTypes.DOCUMENTATION;
}


return null;
};
