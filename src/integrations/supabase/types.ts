export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "13.0.4"
  }
  public: {
    Tables: {
      bookings: {
        Row: {
          actual_end: string | null
          actual_start: string | null
          address: string
          appliance: string
          category: string
          completion_photos: string[] | null
          created_at: string
          customer_name: string
          customer_signature: string | null
          email: string | null
          id: string
          location: string | null
          location_coordinates: unknown | null
          notes: string | null
          phone: string
          preferred_date: string | null
          preferred_time: string | null
          priority: Database["public"]["Enums"]["booking_priority"] | null
          problem: string
          scheduled_end: string | null
          scheduled_start: string | null
          service_id: string | null
          status: Database["public"]["Enums"]["booking_status"]
          technician_id: string | null
          total_cost: number | null
          updated_at: string
          urgency: string | null
          user_id: string
        }
        Insert: {
          actual_end?: string | null
          actual_start?: string | null
          address: string
          appliance: string
          category: string
          completion_photos?: string[] | null
          created_at?: string
          customer_name: string
          customer_signature?: string | null
          email?: string | null
          id?: string
          location?: string | null
          location_coordinates?: unknown | null
          notes?: string | null
          phone: string
          preferred_date?: string | null
          preferred_time?: string | null
          priority?: Database["public"]["Enums"]["booking_priority"] | null
          problem: string
          scheduled_end?: string | null
          scheduled_start?: string | null
          service_id?: string | null
          status?: Database["public"]["Enums"]["booking_status"]
          technician_id?: string | null
          total_cost?: number | null
          updated_at?: string
          urgency?: string | null
          user_id: string
        }
        Update: {
          actual_end?: string | null
          actual_start?: string | null
          address?: string
          appliance?: string
          category?: string
          completion_photos?: string[] | null
          created_at?: string
          customer_name?: string
          customer_signature?: string | null
          email?: string | null
          id?: string
          location?: string | null
          location_coordinates?: unknown | null
          notes?: string | null
          phone?: string
          preferred_date?: string | null
          preferred_time?: string | null
          priority?: Database["public"]["Enums"]["booking_priority"] | null
          problem?: string
          scheduled_end?: string | null
          scheduled_start?: string | null
          service_id?: string | null
          status?: Database["public"]["Enums"]["booking_status"]
          technician_id?: string | null
          total_cost?: number | null
          updated_at?: string
          urgency?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "bookings_service_id_fkey"
            columns: ["service_id"]
            isOneToOne: false
            referencedRelation: "services"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "bookings_technician_id_fkey"
            columns: ["technician_id"]
            isOneToOne: false
            referencedRelation: "technicians"
            referencedColumns: ["id"]
          },
        ]
      }
      payments: {
        Row: {
          amount: number
          booking_id: string | null
          created_at: string | null
          id: string
          paid_at: string | null
          payment_method: Database["public"]["Enums"]["payment_method"]
          payment_status: Database["public"]["Enums"]["payment_status"] | null
          stripe_payment_intent_id: string | null
          transaction_id: string | null
          updated_at: string | null
        }
        Insert: {
          amount: number
          booking_id?: string | null
          created_at?: string | null
          id?: string
          paid_at?: string | null
          payment_method: Database["public"]["Enums"]["payment_method"]
          payment_status?: Database["public"]["Enums"]["payment_status"] | null
          stripe_payment_intent_id?: string | null
          transaction_id?: string | null
          updated_at?: string | null
        }
        Update: {
          amount?: number
          booking_id?: string | null
          created_at?: string | null
          id?: string
          paid_at?: string | null
          payment_method?: Database["public"]["Enums"]["payment_method"]
          payment_status?: Database["public"]["Enums"]["payment_status"] | null
          stripe_payment_intent_id?: string | null
          transaction_id?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "payments_booking_id_fkey"
            columns: ["booking_id"]
            isOneToOne: false
            referencedRelation: "bookings"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          address: Json | null
          created_at: string
          emergency_contact: Json | null
          full_name: string | null
          id: string
          phone: string | null
          preferences: Json | null
          updated_at: string
        }
        Insert: {
          address?: Json | null
          created_at?: string
          emergency_contact?: Json | null
          full_name?: string | null
          id: string
          phone?: string | null
          preferences?: Json | null
          updated_at?: string
        }
        Update: {
          address?: Json | null
          created_at?: string
          emergency_contact?: Json | null
          full_name?: string | null
          id?: string
          phone?: string | null
          preferences?: Json | null
          updated_at?: string
        }
        Relationships: []
      }
      reviews_ratings: {
        Row: {
          booking_id: string | null
          created_at: string | null
          id: string
          rating: number | null
          review_text: string | null
          technician_id: string | null
          updated_at: string | null
          user_id: string | null
        }
        Insert: {
          booking_id?: string | null
          created_at?: string | null
          id?: string
          rating?: number | null
          review_text?: string | null
          technician_id?: string | null
          updated_at?: string | null
          user_id?: string | null
        }
        Update: {
          booking_id?: string | null
          created_at?: string | null
          id?: string
          rating?: number | null
          review_text?: string | null
          technician_id?: string | null
          updated_at?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "reviews_ratings_booking_id_fkey"
            columns: ["booking_id"]
            isOneToOne: false
            referencedRelation: "bookings"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "reviews_ratings_technician_id_fkey"
            columns: ["technician_id"]
            isOneToOne: false
            referencedRelation: "technicians"
            referencedColumns: ["id"]
          },
        ]
      }
      service_categories: {
        Row: {
          created_at: string | null
          description: string | null
          icon: string | null
          id: string
          is_active: boolean | null
          name: string
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          description?: string | null
          icon?: string | null
          id?: string
          is_active?: boolean | null
          name: string
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          description?: string | null
          icon?: string | null
          id?: string
          is_active?: boolean | null
          name?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      services: {
        Row: {
          base_price: number | null
          category_id: string | null
          created_at: string | null
          description: string | null
          estimated_duration: number | null
          id: string
          is_active: boolean | null
          name: string
          updated_at: string | null
        }
        Insert: {
          base_price?: number | null
          category_id?: string | null
          created_at?: string | null
          description?: string | null
          estimated_duration?: number | null
          id?: string
          is_active?: boolean | null
          name: string
          updated_at?: string | null
        }
        Update: {
          base_price?: number | null
          category_id?: string | null
          created_at?: string | null
          description?: string | null
          estimated_duration?: number | null
          id?: string
          is_active?: boolean | null
          name?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "services_category_id_fkey"
            columns: ["category_id"]
            isOneToOne: false
            referencedRelation: "service_categories"
            referencedColumns: ["id"]
          },
        ]
      }
      technicians: {
        Row: {
          created_at: string | null
          email: string | null
          full_name: string
          id: string
          location: Json | null
          phone: string
          rating: number | null
          specialties: string[] | null
          status: Database["public"]["Enums"]["technician_status"] | null
          total_jobs: number | null
          updated_at: string | null
          user_id: string | null
        }
        Insert: {
          created_at?: string | null
          email?: string | null
          full_name: string
          id?: string
          location?: Json | null
          phone: string
          rating?: number | null
          specialties?: string[] | null
          status?: Database["public"]["Enums"]["technician_status"] | null
          total_jobs?: number | null
          updated_at?: string | null
          user_id?: string | null
        }
        Update: {
          created_at?: string | null
          email?: string | null
          full_name?: string
          id?: string
          location?: Json | null
          phone?: string
          rating?: number | null
          specialties?: string[] | null
          status?: Database["public"]["Enums"]["technician_status"] | null
          total_jobs?: number | null
          updated_at?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      user_roles: {
        Row: {
          assigned_at: string | null
          assigned_by: string | null
          id: string
          role: Database["public"]["Enums"]["user_role"]
          user_id: string | null
        }
        Insert: {
          assigned_at?: string | null
          assigned_by?: string | null
          id?: string
          role?: Database["public"]["Enums"]["user_role"]
          user_id?: string | null
        }
        Update: {
          assigned_at?: string | null
          assigned_by?: string | null
          id?: string
          role?: Database["public"]["Enums"]["user_role"]
          user_id?: string | null
        }
        Relationships: []
      }
      warranties: {
        Row: {
          booking_id: string | null
          created_at: string | null
          end_date: string
          id: string
          start_date: string
          status: Database["public"]["Enums"]["warranty_status"] | null
          terms: string | null
          updated_at: string | null
          warranty_period: number | null
        }
        Insert: {
          booking_id?: string | null
          created_at?: string | null
          end_date: string
          id?: string
          start_date: string
          status?: Database["public"]["Enums"]["warranty_status"] | null
          terms?: string | null
          updated_at?: string | null
          warranty_period?: number | null
        }
        Update: {
          booking_id?: string | null
          created_at?: string | null
          end_date?: string
          id?: string
          start_date?: string
          status?: Database["public"]["Enums"]["warranty_status"] | null
          terms?: string | null
          updated_at?: string | null
          warranty_period?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "warranties_booking_id_fkey"
            columns: ["booking_id"]
            isOneToOne: false
            referencedRelation: "bookings"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      get_user_role: {
        Args: { user_uuid: string }
        Returns: string
      }
    }
    Enums: {
      booking_priority: "low" | "medium" | "high" | "urgent"
      booking_status:
        | "pending"
        | "confirmed"
        | "in-progress"
        | "completed"
        | "cancelled"
      payment_method: "card" | "cash" | "bank_transfer"
      payment_status: "pending" | "completed" | "failed" | "refunded"
      technician_status: "available" | "busy" | "offline" | "on_break"
      user_role: "admin" | "customer" | "technician" | "manager"
      warranty_status: "active" | "expired" | "voided"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      booking_priority: ["low", "medium", "high", "urgent"],
      booking_status: [
        "pending",
        "confirmed",
        "in-progress",
        "completed",
        "cancelled",
      ],
      payment_method: ["card", "cash", "bank_transfer"],
      payment_status: ["pending", "completed", "failed", "refunded"],
      technician_status: ["available", "busy", "offline", "on_break"],
      user_role: ["admin", "customer", "technician", "manager"],
      warranty_status: ["active", "expired", "voided"],
    },
  },
} as const
