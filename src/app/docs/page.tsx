"use client";

import { useState } from 'react';
import { 
  Lock, 
  Send,
  Code,
  AlertCircle,
  FileX,
  ShieldAlert,
  Globe,
  Terminal,
  Copy,
  Check
} from 'lucide-react';
import { Card } from '@/components/ui/card';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';

export default function DocsPage() {
  const { toast } = useToast();
  const [copied, setCopied] = useState(false);
  const displayEndpoint = "/api/analyze";

  const handleCopy = () => {
    navigator.clipboard.writeText(window.location.origin + displayEndpoint);
    setCopied(true);
    toast({
      title: "Link Copied",
      description: "API endpoint copied to clipboard.",
    });
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="container mx-auto px-4 pt-32 pb-12 max-w-4xl">
      <div className="space-y-16">
        <section id="introduction" className="text-center">
          <div className="flex justify-center mb-8">
            <div className="bg-primary/10 p-4 rounded-3xl border border-primary/20">
              <Code className="h-10 w-10 text-primary" />
            </div>
          </div>
          <h1 className="text-5xl font-headline font-bold text-primary mb-6 uppercase">VocalSure API</h1>
          <p className="text-xl text-muted-foreground leading-relaxed mb-8 mx-auto max-w-2xl">
            Integrate world-class voice forensic analysis. Our API provides real-time AI_GENERATED vs HUMAN classification.
          </p>
        </section>

        <section id="authentication" className="space-y-6 max-w-2xl mx-auto py-10 border-y border-white/5">
          <div className="flex items-center gap-3 justify-center">
            <Lock className="h-6 w-6 text-primary" />
            <h2 className="text-3xl font-headline font-bold">Authentication</h2>
          </div>
          <p className="text-center text-muted-foreground text-sm">
            Include your secret key in the x-api-key header.
          </p>
          <div className="flex justify-center font-code text-xs">
            <span className="bg-secondary px-6 py-3 rounded-full border border-white/5 text-muted-foreground">
              Header Key: <span className="text-accent font-bold">x-api-key</span>
            </span>
          </div>
        </section>

        <section id="endpoint" className="space-y-12">
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <Terminal className="h-6 w-6 text-primary" />
              <h2 className="text-3xl font-headline font-bold">API Endpoint</h2>
            </div>
            <div className="bg-secondary/20 border border-white/5 rounded-2xl p-6 flex flex-col md:flex-row items-center justify-between gap-4 group">
              <div className="flex items-center gap-4 overflow-hidden w-full">
                <span className="bg-primary text-primary-foreground px-3 py-1 rounded-md text-xs font-bold uppercase shrink-0">POST</span>
                <code className="text-accent font-code font-bold text-sm md:text-lg break-all">
                  {displayEndpoint}
                </code>
              </div>
              <Button 
                variant="outline" 
                size="sm" 
                onClick={handleCopy}
                className="shrink-0 bg-background/50 border-white/10 hover:bg-primary hover:text-white transition-all gap-2"
              >
                {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                {copied ? "Copied" : "Copy Link"}
              </Button>
            </div>
          </div>

          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <Send className="h-6 w-6 text-primary" />
              <h2 className="text-3xl font-headline font-bold">Request Payload</h2>
            </div>

            <Card className="bg-secondary/20 border-white/5 overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow className="border-white/5 bg-secondary/40">
                    <TableHead className="font-bold text-primary">Field</TableHead>
                    <TableHead className="font-bold">Type</TableHead>
                    <TableHead className="font-bold">Description</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow className="border-white/5">
                    <TableCell className="font-code text-accent font-bold">language</TableCell>
                    <TableCell>string</TableCell>
                    <TableCell className="text-muted-foreground">English (US) / Hindi / Tamil / Malayalam / Telugu</TableCell>
                  </TableRow>
                  <TableRow className="border-white/5">
                    <TableCell className="font-code text-accent font-bold">audioBase64</TableCell>
                    <TableCell>string</TableCell>
                    <TableCell className="text-muted-foreground">Base64-encoded audio string (MP3)</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </Card>
          </div>

          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <Globe className="h-6 w-6 text-primary" />
              <h2 className="text-3xl font-headline font-bold">Success Response</h2>
            </div>
            <div className="bg-black/80 rounded-2xl p-8 font-code text-sm text-green-300 shadow-2xl border border-white/5 overflow-x-auto">
              <pre>{`{
  "status": "success",
  "language": "English (US)",
  "classification": "AI_GENERATED",
  "confidenceScore": 0.96,
  "explanation": "Forensic scan detected characteristic neural vocoder artifacts..."
}`}</pre>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
