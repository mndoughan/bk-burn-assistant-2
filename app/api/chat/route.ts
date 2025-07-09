import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  const { prompt } = await req.json();
  const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

  const apiRes = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${OPENAI_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model: 'gpt-4',
      messages: [
        {
          role: 'system',
          content:
            'You are the BKSA Burn Assistant — a bilingual Arabic/English AI that helps users understand the calories, burn time, and allergens of Burger King Saudi meals. Respond in both English and Arabic.',
        },
        { role: 'user', content: prompt },
      ],
    }),
  });

  const json = await apiRes.json();
  const reply = json.choices?.[0]?.message?.content;
  return NextResponse.json({ reply });
}
