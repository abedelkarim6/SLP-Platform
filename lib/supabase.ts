import { createClient } from "@supabase/supabase-js"

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Server-side client for server actions
export const createServerClient = () => {
  return createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!)
}

// Database types
export interface Patient {
  id: string
  user_id: string
  first_name: string
  last_name: string
  date_of_birth: string
  gender: "Male" | "Female" | "Other"
  parent_name?: string
  parent_phone?: string
  parent_email?: string
  address?: string
  start_date: string
  referred_by?: string
  notes?: string
  status: "Active" | "On Hold" | "Inactive"
  created_at: string
  updated_at: string
}

export interface Disorder {
  id: string
  name: string
  description?: string
  created_at: string
}

export interface Session {
  id: string
  patient_id: string
  user_id: string
  session_date: string
  duration: number
  session_type: "In-person" | "Virtual"
  focus_area?: string
  notes?: string
  homework?: string
  created_at: string
  updated_at: string
}

export interface Report {
  id: string
  session_id: string
  patient_id: string
  user_id: string
  title: string
  content: any
  ai_questions: any
  created_at: string
  updated_at: string
}

export interface AIRecommendation {
  id: string
  patient_id: string
  user_id: string
  title: string
  description: string
  category: string
  confidence: "High" | "Medium" | "Low"
  is_applied: boolean
  is_helpful?: boolean
  generated_date: string
  created_at: string
}

export interface Goal {
  id: string
  patient_id: string
  user_id: string
  title: string
  description?: string
  target_date?: string
  status: "Active" | "Completed" | "On Hold"
  progress: number
  created_at: string
  updated_at: string
}

export interface Task {
  id: string
  user_id: string
  patient_id?: string
  title: string
  description?: string
  due_date?: string
  priority: "High" | "Medium" | "Low"
  completed: boolean
  created_at: string
  updated_at: string
}
