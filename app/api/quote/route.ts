import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const { name, age, insuranceType, coverage } = await req.json();

    // In a real production app, this is stored in process.env.OPENROUTER_API_KEY
    // We keep it server-side to hide it from the client bundle.
    const OPENROUTER_API_KEY = process.env.OPENROUTER_API_KEY;

    const systemPrompt = `You are a high-end luxury insurance advisor representing BimaKavach. 
The client, ${name} (age ${age}), is requesting a private risk audit for ${insuranceType} with a coverage requirement of ${coverage}.
Write a highly professional, bespoke, 3-sentence welcome message acknowledging their status and confirming that a senior advisor will construct their private portfolio. Do not use generic terms like "free quote" or "policy".`;

    const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${OPENROUTER_API_KEY}`,
        'Content-Type': 'application/json',
        'HTTP-Referer': 'https://hilalmehdi.github.io/insurance-premium/',
        'X-Title': 'BimaKavach',
      },
      body: JSON.stringify({
        model: 'google/gemini-2.5-flash',
        messages: [{ role: 'user', content: systemPrompt }]
      })
    });

    if (!response.ok) {
      throw new Error('API Error');
    }

    const data = await response.json();
    return NextResponse.json({ message: data.choices[0].message.content });
  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json({ message: "Welcome to BimaKavach. Our private concierge desk will contact you shortly to begin your exclusive risk audit." });
  }
}
