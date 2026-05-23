const express = require('express');
const cors = require('cors');
const { GoogleGenAI } = require('@google/genai');

const app = express();
app.use(cors());
app.use(express.json());

// Initialize the Gemini AI client
// Note: It automatically looks for an environment variable named GEMINI_API_KEY
const ai = new GoogleGenAI({ apiKey: "AIzaSyDiYsWWLKUiMmvck6eM2G-llEMpUZY7bpU" });

app.post('/api/generate-docs', async (req, res) => {
    const { code } = req.body;

    if (!code) {
        return res.status(400).json({ error: "No code provided!" });
    }

    try {
        // Constructing a strict prompt for the AI to follow
        const prompt = `
        You are an expert technical writer. Analyze the following code codebase snippet and generate structured, production-ready Markdown documentation.
        
        Include these exact sections:
        1. ## Code Overview (What this code does in simple terms)
        2. ## Architecture & Functions (Break down functions, parameters, and return types in a clean list or table)
        3. ## Usage Example (Provide a clean example of how to use or run this code)
        4. ## Suggestions for Improvement (Any bugs, bottlenecks, or optimizations you notice)

        Format everything beautifully using standard Markdown. Do not include any introductory conversation like "Sure, here is your documentation". Start directly with the Markdown.

        Here is the code:
        \`\`\`
        ${code}
        \`\`\`
        `;

        // Requesting the AI to generate content
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: prompt,
        });

        res.json({ documentation: response.text });

    } catch (error) {
        console.error("AI Error:", error);
        res.status(500).json({ error: "Failed to generate documentation. Check your API key configuration." });
    }
});

const PORT = 5000;
app.listen(PORT, () => {
    console.log(`🚀 Backend server running on http://localhost:${PORT}`);
});