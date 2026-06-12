// src/app/api/generate-twin/route.ts
import { NextResponse } from 'next/server';
import { generateTwinNarrative } from '@/lib/gemini';
import { GenerateTwinInputSchema } from '@/lib/validators';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    // Validate request payload
    const parsedInput = GenerateTwinInputSchema.parse(body);

    // Call Gemini API to generate twin narrative and recommendations
    const data = await generateTwinNarrative({
      score: parsedInput.score,
      aura: parsedInput.aura,
      breakdown: parsedInput.breakdown,
      answers: parsedInput.answers
    });

    return NextResponse.json(data);
  } catch (error) {
    console.error('API Error in /api/generate-twin:', error);
    
    const err = error as { message?: string; name?: string };
    // Return structured error response
    return NextResponse.json(
      { error: err?.message || 'Failed to generate twin narrative' },
      { status: err?.name === 'ZodError' ? 400 : 500 }
    );
  }
}
