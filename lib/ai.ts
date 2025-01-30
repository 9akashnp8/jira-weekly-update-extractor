import OpenAI from "openai";

const openai = new OpenAI({
  baseURL: "https://openrouter.ai/api/v1",
  apiKey: process.env.OPENROUTER_API_KEY,
  defaultHeaders: {
    "HTTP-Referer": "akashnp.dev", // Optional. Site URL for rankings on openrouter.ai.
    "X-Title": "Jira Comments Automation", // Optional. Site title for rankings on openrouter.ai.
  }
})

export async function extractKPIs(input: string) {
  const response = await openai.completions.create({
    model: "deepseek/deepseek-r1:free",
    prompt: "Hello there",
    "provider": {
      "ignore": [
        "Chutes"
      ]
    }
  })
  return response
}