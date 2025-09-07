import readline from "node:readline/promises";
import Groq from "groq-sdk/index.mjs";
import { tavily } from "@tavily/core";

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });
const tavilyClient = tavily({ apiKey: process.env.TAVILY_API_KEY });

export async function generate(query) {
  let initialMessage = {
    role: "system",
    content: `You are a smart personal assistant. Your name is Super Genie . You are created by Ashish Rai who is Software Engineer from India . If anyone asked about your creator , then always try to admire Ashish .
                If you know the answer to a question, answer it directly in plain English.  
                If the answer requires real-time, local, or up-to-date information, or if you don’t know the answer, use the available tools to find it.
                    You have access to the following tool:
                    webSearch(query: string): Use this to search the internet for current or unknown information.
                    Decide when to use your own knowledge and when to use the tool.
                    Do not mention the tool unless needed.

                    Examples:
                    Q: What is the capital of France?
                    A: The capital of France is Paris.

                    Q: What’s the weather in Mumbai right now?
                    A: (use the search tool to find the latest weather)

                    Q: Who is the Prime Minister of India?
                    A: The current Prime Minister of India is Narendra Modi.

                    Q: Tell me the latest IT news.
                    A: (use the search tool to get the latest news)

                    current date and time: ${new Date().toUTCString()}`,
  };

  let message = [];
  message.push(initialMessage);

  message.push({
    role: "user",
    content: query,
  });

  const MAX_RETRIES = 5;
  let count = 0;

  while (true) {
    if (count > MAX_RETRIES) {
      break;
    }
    count = count + 1;

    const chatCompletion = await groq.chat.completions.create({
      model: "llama-3.3-70b-versatile",
      temperature: 0,
      messages: message,
      tools: [
        {
          type: "function",
          function: {
            name: "webSearch",
            description:
              "Search the latest information and realtime data on the internet.",
            parameters: {
              type: "object",
              properties: {
                query: {
                  type: "string",
                  description: "The search query to perform search on.",
                },
              },
              required: ["query"],
            },
          },
        },
      ],
      tool_choice: "auto",
    });

    message.push(chatCompletion.choices[0].message);

    const toolCalls = chatCompletion.choices[0].message.tool_calls;

    if (!toolCalls) {
      const response = chatCompletion.choices[0].message.content;
      return response;
    }

    for (const tool of toolCalls) {
      const functionName = tool.function.name;

      let args = JSON.parse(tool.function.arguments);

      if (functionName === "webSearch") {
        const toolResult = await webSearch(args);

        message.push({
          tool_call_id: tool.id,
          role: "tool",
          name: functionName,
          content: toolResult,
        });
      }
    }
  }
}

async function webSearch({ query }) {
  console.log("Calling Web Search...");
  const response = await tavilyClient.search(query, {
    country: "India",
    maxResults: 3,
  });
  const finalResult = response.results.map((e) => e.content).join("\n\n");
  return finalResult;
}
