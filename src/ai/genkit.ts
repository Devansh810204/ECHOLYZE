
import { genkit } from 'genkit';
import { googleAI } from '@genkit-ai/google-genai';

/**
 * Genkit configuration for VocalSure.
 * Optimized with Gemini 2.0 Flash for ultra-fast real-time forensic analysis.
 */
export const ai = genkit({
  plugins: [
    googleAI({
      apiKey: "AIzaSyDtzhCl1jXkOIl6VbpBZOM2-_gzuVAYVKk"
    }),
  ],
  model: 'googleai/gemini-2.0-flash',
});
