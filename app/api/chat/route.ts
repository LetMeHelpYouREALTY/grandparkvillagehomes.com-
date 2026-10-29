import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";

// Created per request so builds succeed when CEREBRAS_API_KEY is not set.
function getCerebrasClient() {
  return new OpenAI({
    apiKey: process.env.CEREBRAS_API_KEY,
    baseURL: "https://api.cerebras.ai/v1",
  });
}

export async function POST(request: NextRequest) {
  try {
    const { prompt, conversation = [] } = await request.json();

    if (!prompt) {
      return NextResponse.json({ error: "Prompt is required" }, { status: 400 });
    }

    if (!process.env.CEREBRAS_API_KEY) {
      return NextResponse.json(
        { error: "Cerebras API key not configured" },
        { status: 500 },
      );
    }

    // Build messages array with system prompt and conversation history
    const messages: OpenAI.Chat.Completions.ChatCompletionMessageParam[] = [
      {
        role: "system",
        content:
          "You are a friendly real estate assistant for Dr. Jan Duffy, a REALTOR® licensed since 2008 · 35 years in Las Vegas. You specialize in Las Vegas and Henderson real estate. Be concise, warm, helpful, and professional. Always mention that users can contact Dr. Jan Duffy at (702) 500-1942 for personalized assistance.",
      },
      ...conversation,
      {
        role: "user",
        content: prompt,
      },
    ];

    const response = await getCerebrasClient().chat.completions.create({
      model: process.env.CEREBRAS_MODEL || "gpt-oss-120b",
      messages,
      temperature: 0.7,
      max_tokens: 500,
    });

    const reply = response.choices[0].message.content;

    return NextResponse.json({ reply });
  } catch (error) {
    console.error("Cerebras API error:", error);
    return NextResponse.json(
      { error: "Failed to generate response" },
      { status: 500 },
    );
  }
}
