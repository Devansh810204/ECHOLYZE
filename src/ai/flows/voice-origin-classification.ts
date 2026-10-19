'use server';
/**
 * @fileOverview Combined Forensic Analysis Flow
 * Performs real-time language detection and voice origin classification in a single pass
 * to minimize API latency and avoid rate limiting.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const ForensicAnalysisInputSchema = z.object({
  audioDataUri: z
    .string()
    .describe(
      "Audio content as a data URI. Format: 'data:audio/mp3;base64,<encoded_data>'."
    ),
  userSelectedLanguage: z.string().optional(),
});
export type ForensicAnalysisInput = z.infer<typeof ForensicAnalysisInputSchema>;

const ForensicAnalysisOutputSchema = z.object({
  origin: z
    .enum(['AI_GENERATED', 'HUMAN'])
    .describe('The detected origin of the voice.'),
  confidence: z
    .number()
    .min(0)
    .max(1)
    .describe('Forensic confidence score.'),
  explanation: z
    .string()
    .describe('Technical explanation for the determination.'),
  detectedLanguage: z
    .string()
    .describe('The detected language among the 5 supported.'),
});
export type ForensicAnalysisOutput = z.infer<typeof ForensicAnalysisOutputSchema>;

export async function runForensicAnalysis(
  input: ForensicAnalysisInput
): Promise<ForensicAnalysisOutput> {
  return forensicAnalysisFlow(input);
}

const forensicPrompt = ai.definePrompt({
  name: 'forensicAnalysisPrompt',
  input: { schema: ForensicAnalysisInputSchema },
  output: { schema: ForensicAnalysisOutputSchema },
  prompt: `You are a world-class voice forensic analyst. Analyze the provided audio and provide a definitive verdict.

Your analysis must cover:
1. **Language Detection**: Identify which of these 5 languages is spoken: English (US), Hindi, Tamil, Telugu, or Malayalam.
2. **Origin Classification**: Classify as 'AI_GENERATED' or 'HUMAN'.
   - Search for neural vocoder artifacts, "hyper-perfect" pitch stability, or phase-alignment patterns for AI_GENERATED.
   - Search for biological micro-tremors, natural breath pauses, and frequency variance for HUMAN.
3. **Confidence**: Provide a score from 0.0 to 1.0.
4. **Explanation**: Provide a concise technical explanation of your findings.

Audio: {{media url=audioDataUri}}
{{#if userSelectedLanguage}}User expected language: {{{userSelectedLanguage}}}{{/if}}`,
});

const forensicAnalysisFlow = ai.defineFlow(
  {
    name: 'forensicAnalysisFlow',
    inputSchema: ForensicAnalysisInputSchema,
    outputSchema: ForensicAnalysisOutputSchema,
  },
  async (input) => {
    const { output } = await forensicPrompt(input);
    if (!output) throw new Error('Forensic analysis failed.');
    return output;
  }
);
