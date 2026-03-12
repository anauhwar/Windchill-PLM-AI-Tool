import { GoogleGenAI } from '@google/genai';

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export async function analyzeBOM(bomData: string, partsData: string) {
  const prompt = `
    You are an AI BOM (Bill of Materials) Analyzer.
    Analyze the following BOM and Parts data.
    Suggest optimizations, identify potential duplicate components, suggest cheaper alternatives if applicable, and detect any inconsistencies.
    
    Parts Data:
    ${partsData}
    
    BOM Data:
    ${bomData}
    
    Provide a structured analysis in Markdown.
  `;
  const response = await ai.models.generateContent({
    model: 'gemini-3.1-pro-preview',
    contents: prompt,
  });
  return response.text;
}

export async function analyzeImpact(partId: string, partName: string, impactGraph: string) {
  const prompt = `
    You are an Engineering Change Impact Analyzer.
    A change is proposed for Part: ${partId} (${partName}).
    Here is the upstream impact graph (where-used):
    ${impactGraph}
    
    Predict which products are affected, which suppliers are impacted, and estimate the qualitative cost/time impact.
    Provide a structured analysis in Markdown.
  `;
  const response = await ai.models.generateContent({
    model: 'gemini-3.1-pro-preview',
    contents: prompt,
  });
  return response.text;
}

export async function chatWithPLMAssistant(history: {role: string, text: string}[], message: string, contextData: string) {
  const conversation = history.map(h => `${h.role === 'user' ? 'User' : 'Assistant'}: ${h.text}`).join('\n');
  const prompt = `
    Windchill Database Extract:
    ${contextData}
    
    Conversation History:
    ${conversation}
    
    User: ${message}
    Assistant:
  `;
  
  const response = await ai.models.generateContent({
    model: 'gemini-3.1-pro-preview',
    contents: prompt,
    config: {
      systemInstruction: "You are a PLM Knowledge Assistant. Answer concisely and accurately based ONLY on the provided Windchill database extract. If the answer is not in the data, say you don't know.",
    }
  });
  return response.text;
}
