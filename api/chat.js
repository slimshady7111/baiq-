import axios from "axios";

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });

  const { messages } = req.body;
  try {
    const response = await axios.post("https://api.openai.com/v1/chat/completions", {
      model: "gpt-4o-mini",
      messages,
    }, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
      },
    });

    res.status(200).json({ reply: response.data.choices[0].message.content });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
        }
    
