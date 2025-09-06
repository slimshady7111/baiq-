// /api/chat.js
import OpenAI from "openai";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { message } = req.body;
    if (!message) {
      return res.status(400).json({ error: "Message is required" });
    }

    // Ambil API Key dari Environment Variable
    const openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });

    // Panggil model terbaru
    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini", // bisa diganti ke "gpt-4o" kalau mau
      messages: [
        { role: "system", content: "Kamu adalah Baiq+, AI sederhana yang ramah dan membantu." },
        { role: "user", content: message },
      ],
    });

    const reply = completion.choices[0].message.content;

    res.status(200).json({ response: reply });
  } catch (error) {
    console.error("OpenAI API Error:", error);
    res.status(500).json({ response: "Maaf, saya tidak bisa menjawab." });
  }
      }
        
