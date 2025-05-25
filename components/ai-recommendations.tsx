"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Brain, ThumbsUp, ThumbsDown, Lightbulb, Plus, Trash2 } from "lucide-react"
import { createBrowserClient } from "@/lib/supabase"
import { useAuth } from "@/lib/auth-context"
import { PDFUpload } from "./pdf-upload"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface AIRecommendationsProps {
  clientId: string
  patientInfo?: {
    age: number
    disorders: string[]
    currentGoals?: string[]
    sessionHistory?: string[]
  }
}

export function AIRecommendations({ clientId, patientInfo }: AIRecommendationsProps) {
  const { user } = useAuth()
  const supabase = createBrowserClient()
  const [recommendations, setRecommendations] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetchRecommendations()
  }, [clientId])

  const fetchRecommendations = async () => {
    try {
      const { data, error } = await supabase
        .from("ai_recommendations")
        .select("*")
        .eq("patient_id", clientId)
        .order("generated_date", { ascending: false })

      if (error) throw error
      setRecommendations(data || [])
    } catch (err) {
      console.error("Error fetching recommendations:", err)
      setError("Failed to load recommendations")
    } finally {
      setIsLoading(false)
    }
  }

  const handlePDFAnalysisComplete = async (newRecommendations: any[]) => {
    try {
      // Save recommendations to database
      const recommendationsToInsert = newRecommendations.map((rec) => ({
        patient_id: clientId,
        user_id: user?.id,
        title: rec.title,
        description: rec.description,
        category: rec.category,
        confidence: rec.confidence,
        generated_date: new Date().toISOString(),
      }))

      const { data, error } = await supabase.from("ai_recommendations").insert(recommendationsToInsert).select()

      if (error) throw error

      // Update local state
      setRecommendations((prev) => [...(data || []), ...prev])
    } catch (err) {
      console.error("Error saving recommendations:", err)
      setError("Failed to save recommendations")
    }
  }

  const handleFeedback = async (id: string, isHelpful: boolean) => {
    try {
      const { error } = await supabase.from("ai_recommendations").update({ is_helpful: isHelpful }).eq("id", id)

      if (error) throw error

      setRecommendations((prev) => prev.map((rec) => (rec.id === id ? { ...rec, is_helpful: isHelpful } : rec)))
    } catch (err) {
      console.error("Error updating feedback:", err)
    }
  }

  const handleApply = async (id: string) => {
    try {
      const { error } = await supabase.from("ai_recommendations").update({ is_applied: true }).eq("id", id)

      if (error) throw error

      setRecommendations((prev) => prev.map((rec) => (rec.id === id ? { ...rec, is_applied: true } : rec)))
    } catch (err) {
      console.error("Error applying recommendation:", err)
    }
  }

  const handleDelete = async (id: string) => {
    try {
      const { error } = await supabase.from("ai_recommendations").delete().eq("id", id)

      if (error) throw error

      setRecommendations((prev) => prev.filter((rec) => rec.id !== id))
    } catch (err) {
      console.error("Error deleting recommendation:", err)
    }
  }

  const generateBasicRecommendations = async () => {
    try {
      setIsLoading(true)

      // Mock recommendations based on patient info
      const mockRecommendations = [
        {
          title: `Targeted ${patientInfo?.disorders[0] || "Speech"} Therapy`,
          description: `Focus on improving ${patientInfo?.disorders[0]?.toLowerCase() || "speech"} skills through structured practice and evidence-based techniques.`,
          category: "Practice Adjustment",
          confidence: "High",
        },
        {
          title: "Visual Feedback Integration",
          description: "Incorporate visual cues and feedback mechanisms to enhance learning and retention.",
          category: "Technique Suggestion",
          confidence: "Medium",
        },
        {
          title: "Home Practice Gamification",
          description: "Implement game-based activities for home practice to increase engagement and compliance.",
          category: "Engagement Strategy",
          confidence: "High",
        },
      ]

      await handlePDFAnalysisComplete(mockRecommendations)
    } catch (err) {
      console.error("Error generating recommendations:", err)
    } finally {
      setIsLoading(false)
    }
  }

  if (isLoading && recommendations.length === 0) {
    return (
      <div className="flex h-40 items-center justify-center">
        <div className="text-center">
          <Brain className="mx-auto h-10 w-10 animate-pulse text-primary/50" />
          <p className="mt-2 text-sm text-muted-foreground">Loading recommendations...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <Tabs defaultValue="recommendations" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="recommendations">Current Recommendations</TabsTrigger>
          <TabsTrigger value="generate">Generate New</TabsTrigger>
        </TabsList>

        <TabsContent value="recommendations" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Brain className="h-5 w-5 text-primary" />
                AI-Generated Recommendations
              </CardTitle>
              <CardDescription>Personalized suggestions based on session data analysis</CardDescription>
            </CardHeader>
            <CardContent>
              {recommendations.length === 0 ? (
                <div className="text-center py-8">
                  <Brain className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
                  <h3 className="text-lg font-semibold mb-2">No recommendations yet</h3>
                  <p className="text-muted-foreground mb-4">
                    Upload an assessment document or generate basic recommendations to get started.
                  </p>
                  <Button onClick={generateBasicRecommendations}>
                    <Plus className="mr-2 h-4 w-4" />
                    Generate Basic Recommendations
                  </Button>
                </div>
              ) : (
                <div className="space-y-4">
                  {recommendations.map((recommendation) => (
                    <div key={recommendation.id} className="rounded-lg border p-4">
                      <div className="flex items-center justify-between">
                        <h3 className="font-medium">{recommendation.title}</h3>
                        <div className="flex items-center gap-2">
                          <Badge variant="outline">{recommendation.category}</Badge>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleDelete(recommendation.id)}
                            className="h-8 w-8 text-destructive hover:text-destructive"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                      <p className="mt-2 text-sm">{recommendation.description}</p>
                      <div className="mt-3 flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Badge
                            variant="outline"
                            className={`
                              ${recommendation.confidence === "High" ? "border-green-200 bg-green-100 text-green-800" : ""}
                              ${recommendation.confidence === "Medium" ? "border-yellow-200 bg-yellow-100 text-yellow-800" : ""}
                              ${recommendation.confidence === "Low" ? "border-red-200 bg-red-100 text-red-800" : ""}
                            `}
                          >
                            {recommendation.confidence} confidence
                          </Badge>
                          <span className="text-xs text-muted-foreground">
                            Generated on {new Date(recommendation.generated_date).toLocaleDateString()}
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Button
                            variant="ghost"
                            size="icon"
                            title="Helpful"
                            onClick={() => handleFeedback(recommendation.id, true)}
                            className={recommendation.is_helpful === true ? "bg-green-100 text-green-800" : ""}
                          >
                            <ThumbsUp className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            title="Not Helpful"
                            onClick={() => handleFeedback(recommendation.id, false)}
                            className={recommendation.is_helpful === false ? "bg-red-100 text-red-800" : ""}
                          >
                            <ThumbsDown className="h-4 w-4" />
                          </Button>
                          {!recommendation.is_applied && (
                            <Button variant="outline" size="sm" onClick={() => handleApply(recommendation.id)}>
                              Apply
                            </Button>
                          )}
                          {recommendation.is_applied && (
                            <Badge variant="outline" className="border-green-200 bg-green-100 text-green-800">
                              Applied
                            </Badge>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="generate" className="space-y-4">
          {patientInfo && <PDFUpload onAnalysisComplete={handlePDFAnalysisComplete} patientInfo={patientInfo} />}

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Lightbulb className="h-5 w-5 text-primary" />
                Quick Generate
              </CardTitle>
              <CardDescription>Generate basic recommendations without uploading a document</CardDescription>
            </CardHeader>
            <CardContent>
              <Button onClick={generateBasicRecommendations} disabled={isLoading} className="w-full">
                <Plus className="mr-2 h-4 w-4" />
                Generate Basic Recommendations
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
