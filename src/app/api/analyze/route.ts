
import { NextRequest, NextResponse } from 'next/server';
import { runForensicAnalysis } from '@/ai/flows/voice-origin-classification';

const VALID_API_KEY = 'echolyze_api_2026';

export async function POST(req: NextRequest) {
  try {
    const apiKeyHeader = req.headers.get('x-api-key');
    if (apiKeyHeader !== VALID_API_KEY) {
      return NextResponse.json(
        { status: 'error', message: 'invalid api credentials' },
        { status: 401 }
      );
    }

    const body = await req.json();
    const { language, audioBase64 } = body;

    if (!audioBase64) {
      return NextResponse.json(
        { status: 'error', message: 'audioBase64 is required' },
        { status: 400 }
      );
    }

    // Ensure it's a valid data URI
    const audioDataUri = audioBase64.startsWith('data:') 
      ? audioBase64 
      : `data:audio/mp3;base64,${audioBase64}`;

    const result = await runForensicAnalysis({ 
      audioDataUri, 
      userSelectedLanguage: language 
    });

    return NextResponse.json({
      status: 'success',
      language: result.detectedLanguage,
      classification: result.origin,
      confidenceScore: result.confidence,
      explanation: result.explanation
    });

  } catch (error: any) {
    console.error('Forensic Engine Error:', error);
    return NextResponse.json(
      { 
        status: 'error', 
        message: error.message || 'The forensic evaluator failed to process the stream.' 
      },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json({
    status: 'success',
    message: 'VocalSure Forensic API is active. Use POST with x-api-key.'
  });
}
