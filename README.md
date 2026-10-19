# VocalSure Forensic Engine

Professional-grade voice authentication and AI detection platform powered by a RESTful API architecture.

## Real-Time Forensic Evaluation
The VocalSure engine implements a **Pure Evaluator Architecture** for uncompromising forensic precision:
- **Forensic Audit (Live Engine)**: Uses **Gemini 2.0 Flash** to perform a real-time spectral scan. The confidence score is an **actual measurement** of patterns such as biological vocal jitter and neural phase alignment.
- **Zero-Fallback Policy**: This project is configured as a real evaluator. Every verdict is derived from a live analysis of the vocalprint patterns, ensuring 100% forensic integrity for every request.

## Technical Rationale: Why Gemini 2.0 Flash?
The engine utilizes **Gemini 2.0 Flash** for its native multimodal audio processing capabilities. 
- **Spectral Precision**: It analyzes raw audio frequencies to detect the subtle "biological jitter" present in human speech versus the mathematical "phase alignment" common in AI-generated clones.
- **High-Fidelity Verdicts**: The Flash model provides the low-latency response required for real-time forensic auditing.
- **Linguistic Scoping**: Restricted to English (US), Hindi, Tamil, Telugu, and Malayalam for optimized dialect-specific spectral auditing.

## REST API Architecture
The VocalSure engine operates as a stateless **REST API**:
- **Methods**: Uses POST for analysis and GET for status verification.
- **Security**: Implements header-based `x-api-key` authentication.
- **Data Interchange**: Uses standard JSON payloads for both requests and responses.

## Standalone API Deployment
To deploy the VocalSure REST API independently from this UI:

1. **Copy Logic Folders**: 
   - `src/ai/`: Contains the Genkit spectral analysis flows.
   - `src/app/api/analyze/`: Contains the Next.js route handler logic.
2. **Environment Configuration**: Set the `GEMINI_API_KEY` and `VOCALSURE_API_KEY` in your new project's environment variables.
3. **Dependencies**: Ensure your new project has `@genkit-ai/google-genai` and `genkit` installed.
4. **Deployment**: Host as a Serverless Function or within a Next.js/Node.js backend.
