// src/app/api/carbon-coach/route.ts
import { NextResponse } from 'next/server';
import { generateCoachResponse } from '@/lib/gemini';
import { CoachInputSchema } from '@/lib/validators';

export async function POST(request: Request) {
  try {
    const body = await request.json();

    // Validate chat request payload
    const parsedInput = CoachInputSchema.parse(body);

    // Call Gemini API to get coach chat reply
    const text = await generateCoachResponse({
      message: parsedInput.message,
      history: parsedInput.history,
      score: parsedInput.score,
      aura: parsedInput.aura,
      narrative: parsedInput.narrative
    });

    return NextResponse.json({ text });
  } catch (error) {
    console.error('API Error in /api/carbon-coach:', error);
    const err = error as { message?: string; name?: string };
    return NextResponse.json(
      { error: err?.message || 'Failed to generate coach response' },
      { status: err?.name === 'ZodError' ? 400 : 500 }
    );
  }
}
