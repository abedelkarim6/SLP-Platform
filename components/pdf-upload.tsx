"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Upload, FileText, Loader2, AlertCircle } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"

interface PDFUploadProps {
  onAnalysisComplete: (recommendations: any[]) => void
  patientInfo: {
    age: number
    disorders: string[]
    currentGoals?: string[]
    sessionHistory?: string[]
  }
}

export function PDFUpload({ onAnalysisComplete, patientInfo }: PDFUploadProps) {
  const [file, setFile] = useState<File | null>(null)
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const extractTextFromPDF = async (file: File): Promise<string> => {
    // In a real implementation, you would use a PDF parsing library
    // For now, we'll simulate PDF text extraction
    return new Promise((resolve) => {
      const reader = new FileReader()
      reader.onload = () => {
        // Simulate PDF text extraction
        const mockText = `
          Speech-Language Pathology Assessment Report
          
          Patient demonstrates difficulty with /r/ sound production in all positions.
          Articulation errors noted in conversational speech with 40% accuracy.
          Receptive language skills within normal limits for age.
          Expressive language shows mild delays in complex sentence structure.
          
          Recommendations:
          - Focus on /r/ sound production using visual and tactile cues
          - Implement structured language activities for sentence expansion
          - Use minimal pairs for sound discrimination
          - Incorporate play-based therapy for engagement
        `
        resolve(mockText)
      }
      reader.readAsText(file)
    })
  }

  const handleFileUpload = async () => {
    if (!file) return

    setIsAnalyzing(true)
    setError(null)

    try {
      // Extract text from PDF
      const documentText = await extractTextFromPDF(file)

      // Import AI service dynamically to avoid build issues
      const { analyzeDocumentForTherapy } = await import("@/lib/ai-service")

      // Generate recommendations
      const recommendations = await analyzeDocumentForTherapy(documentText, patientInfo)

      onAnalysisComplete(recommendations)
    } catch (err) {
      console.error("Error analyzing document:", err)
      setError("Failed to analyze document. Please try again.")
    } finally {
      setIsAnalyzing(false)
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Upload className="h-5 w-5" />
          Upload Assessment Document
        </CardTitle>
        <CardDescription>Upload a PDF assessment report to get AI-powered therapy recommendations</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="pdf-upload">Select PDF Document</Label>
          <Input
            id="pdf-upload"
            type="file"
            accept=".pdf"
            onChange={(e) => setFile(e.target.files?.[0] || null)}
            disabled={isAnalyzing}
          />
        </div>

        {file && (
          <div className="flex items-center gap-2 p-3 bg-muted rounded-lg">
            <FileText className="h-4 w-4" />
            <span className="text-sm">{file.name}</span>
            <span className="text-xs text-muted-foreground">({(file.size / 1024 / 1024).toFixed(2)} MB)</span>
          </div>
        )}

        {error && (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        <Button onClick={handleFileUpload} disabled={!file || isAnalyzing} className="w-full">
          {isAnalyzing ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Analyzing Document...
            </>
          ) : (
            <>
              <Upload className="mr-2 h-4 w-4" />
              Analyze Document
            </>
          )}
        </Button>
      </CardContent>
    </Card>
  )
}
