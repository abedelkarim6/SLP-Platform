import { generateText } from "ai"
import { openai } from "@ai-sdk/openai"

export interface TherapyRecommendation {
  title: string
  description: string
  category: string
  confidence: "High" | "Medium" | "Low"
  activities: string[]
  duration: string
  frequency: string
}

export async function analyzeDocumentForTherapy(
  documentText: string,
  patientInfo: {
    age: number
    disorders: string[]
    currentGoals?: string[]
    sessionHistory?: string[]
  },
): Promise<TherapyRecommendation[]> {
  const prompt = `
    As a speech-language pathology expert, analyze the following document and patient information to provide therapy recommendations.

    Document Content:
    ${documentText}

    Patient Information:
    - Age: ${patientInfo.age}
    - Disorders: ${patientInfo.disorders.join(", ")}
    - Current Goals: ${patientInfo.currentGoals?.join(", ") || "None specified"}
    - Recent Session Notes: ${patientInfo.sessionHistory?.join("; ") || "None available"}

    Please provide 3-5 specific therapy recommendations in JSON format with the following structure:
    {
      "recommendations": [
        {
          "title": "Specific therapy technique name",
          "description": "Detailed description of the therapy approach",
          "category": "Category (e.g., Articulation, Language, Fluency, Voice)",
          "confidence": "High/Medium/Low",
          "activities": ["Activity 1", "Activity 2", "Activity 3"],
          "duration": "Recommended session duration",
          "frequency": "Recommended frequency"
        }
      ]
    }

    Base your recommendations on evidence-based practices and ensure they are appropriate for the patient's age and specific disorders.
  `

  try {
    const { text } = await generateText({
      model: openai("gpt-4o"),
      prompt,
      temperature: 0.3,
    })

    const parsed = JSON.parse(text)
    return parsed.recommendations
  } catch (error) {
    console.error("Error generating AI recommendations:", error)
    throw new Error("Failed to generate therapy recommendations")
  }
}

export async function generateSessionQuestions(patientInfo: {
  name: string
  age: number
  disorders: string[]
  lastSessionNotes?: string
  currentGoals?: string[]
}): Promise<string[]> {
  const prompt = `
    Generate 5-7 relevant questions for a speech therapy session report for:
    
    Patient: ${patientInfo.name}, Age: ${patientInfo.age}
    Disorders: ${patientInfo.disorders.join(", ")}
    Last Session Notes: ${patientInfo.lastSessionNotes || "None available"}
    Current Goals: ${patientInfo.currentGoals?.join(", ") || "None specified"}

    Questions should be specific, measurable, and help track progress. Return as a JSON array of strings.
  `

  try {
    const { text } = await generateText({
      model: openai("gpt-4o"),
      prompt,
      temperature: 0.4,
    })

    return JSON.parse(text)
  } catch (error) {
    console.error("Error generating session questions:", error)
    return [
      "What specific sounds or words did the patient work on today?",
      "What was the accuracy percentage for target sounds?",
      "How did the patient respond to different cueing strategies?",
      "What activities were most engaging for the patient?",
      "What homework or practice activities were assigned?",
    ]
  }
}
