export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      ewaste_requests: {
        Row: {
          id: string
          user_id: string
          title: string
          description: string | null
          image_url: string
          status: 'pending' | 'approved' | 'rejected' | 'sold'
          price_estimate: number | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          title: string
          description?: string | null
          image_url: string
          status?: 'pending' | 'approved' | 'rejected' | 'sold'
          price_estimate?: number | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          title?: string
          description?: string | null
          image_url?: string
          status?: 'pending' | 'approved' | 'rejected' | 'sold'
          price_estimate?: number | null
          created_at?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "ewaste_requests_user_id_fkey"
            columns: ["user_id"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      // ... other existing tables
    }
  }
}