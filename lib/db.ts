import { supabase } from "./supabase"
import type { Patient, Session } from "./supabase"

// Patient operations
export async function getPatients(userId: string) {
  const { data, error } = await supabase
    .from("patients")
    .select(`
      *,
      patient_disorders (
        disorder:disorders (*)
      )
    `)
    .eq("user_id", userId)
    .order("created_at", { ascending: false })

  if (error) throw error
  return data
}

export async function getPatient(id: string) {
  const { data, error } = await supabase
    .from("patients")
    .select(`
      *,
      patient_disorders (
        disorder:disorders (*)
      ),
      sessions (*),
      goals (*),
      ai_recommendations (*)
    `)
    .eq("id", id)
    .single()

  if (error) throw error
  return data
}

export async function createPatient(patient: Omit<Patient, "id" | "created_at" | "updated_at">) {
  const { data, error } = await supabase.from("patients").insert(patient).select().single()

  if (error) throw error
  return data
}

// Session operations
export async function getSessions(userId: string) {
  const { data, error } = await supabase
    .from("sessions")
    .select(`
      *,
      patient:patients (first_name, last_name)
    `)
    .eq("user_id", userId)
    .order("session_date", { ascending: false })

  if (error) throw error
  return data
}

export async function createSession(session: Omit<Session, "id" | "created_at" | "updated_at">) {
  const { data, error } = await supabase.from("sessions").insert(session).select().single()

  if (error) throw error
  return data
}

// Report operations
export async function getReports(userId: string) {
  const { data, error } = await supabase
    .from("reports")
    .select(`
      *,
      patient:patients (first_name, last_name),
      session:sessions (session_date)
    `)
    .eq("user_id", userId)
    .order("created_at", { ascending: false })

  if (error) throw error
  return data
}

// AI Recommendations
export async function getAIRecommendations(patientId: string) {
  const { data, error } = await supabase
    .from("ai_recommendations")
    .select("*")
    .eq("patient_id", patientId)
    .order("generated_date", { ascending: false })

  if (error) throw error
  return data
}

// Goals operations
export async function getGoals(userId: string) {
  const { data, error } = await supabase
    .from("goals")
    .select(`
      *,
      patient:patients (first_name, last_name)
    `)
    .eq("user_id", userId)
    .order("created_at", { ascending: false })

  if (error) throw error
  return data
}

// Tasks operations
export async function getTasks(userId: string) {
  const { data, error } = await supabase
    .from("tasks")
    .select(`
      *,
      patient:patients (first_name, last_name)
    `)
    .eq("user_id", userId)
    .order("due_date", { ascending: true })

  if (error) throw error
  return data
}

// Disorders
export async function getDisorders() {
  const { data, error } = await supabase.from("disorders").select("*").order("name")

  if (error) throw error
  return data
}
