import OpenAI from "openai";

export const config = {
  runtime: "edge",
};

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export default async function handler(req) {
  try {
    const { message } = await req.json();

    const response = await client.responses.stream({
      model: "gpt-4.1",
      assistant_id: process.env.OFFERFINDER_AGENT_ID,
      input: message
    });

    return new Response(response.toReadableStream());

  } catch (error) {
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500 }
    );
  }
}

