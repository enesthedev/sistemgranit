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
    PostgrestVersion: "14.1"
  }
  graphql_public: {
    Tables: {
      [_ in never]: never
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      graphql: {
        Args: {
          extensions?: Json
          operationName?: string
          query?: string
          variables?: Json
        }
        Returns: Json
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
  public: {
    Tables: {
      analytics_events: {
        Row: {
          created_at: string | null
          event_data: Json | null
          event_name: string
          id: string
          page_path: string | null
          session_id: string
          visitor_id: string
        }
        Insert: {
          created_at?: string | null
          event_data?: Json | null
          event_name: string
          id?: string
          page_path?: string | null
          session_id: string
          visitor_id: string
        }
        Update: {
          created_at?: string | null
          event_data?: Json | null
          event_name?: string
          id?: string
          page_path?: string | null
          session_id?: string
          visitor_id?: string
        }
        Relationships: []
      }
      categories: {
        Row: {
          created_at: string
          description: string | null
          id: string
          image_url: string | null
          name: string
          seo_description: string | null
          seo_title: string | null
          slug: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          description?: string | null
          id?: string
          image_url?: string | null
          name: string
          seo_description?: string | null
          seo_title?: string | null
          slug: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          description?: string | null
          id?: string
          image_url?: string | null
          name?: string
          seo_description?: string | null
          seo_title?: string | null
          slug?: string
          updated_at?: string
        }
        Relationships: []
      }
      page_views: {
        Row: {
          browser: string | null
          browser_version: string | null
          created_at: string | null
          device_type: string | null
          id: string
          language: string | null
          os: string | null
          os_version: string | null
          page_path: string
          page_title: string | null
          referrer: string | null
          referrer_domain: string | null
          screen_height: number | null
          screen_width: number | null
          session_id: string
          timezone: string | null
          user_agent: string | null
          viewport_height: number | null
          viewport_width: number | null
          visitor_id: string
        }
        Insert: {
          browser?: string | null
          browser_version?: string | null
          created_at?: string | null
          device_type?: string | null
          id?: string
          language?: string | null
          os?: string | null
          os_version?: string | null
          page_path: string
          page_title?: string | null
          referrer?: string | null
          referrer_domain?: string | null
          screen_height?: number | null
          screen_width?: number | null
          session_id: string
          timezone?: string | null
          user_agent?: string | null
          viewport_height?: number | null
          viewport_width?: number | null
          visitor_id: string
        }
        Update: {
          browser?: string | null
          browser_version?: string | null
          created_at?: string | null
          device_type?: string | null
          id?: string
          language?: string | null
          os?: string | null
          os_version?: string | null
          page_path?: string
          page_title?: string | null
          referrer?: string | null
          referrer_domain?: string | null
          screen_height?: number | null
          screen_width?: number | null
          session_id?: string
          timezone?: string | null
          user_agent?: string | null
          viewport_height?: number | null
          viewport_width?: number | null
          visitor_id?: string
        }
        Relationships: []
      }
      products: {
        Row: {
          abrasion_resistance: string | null
          applications:
            | Database["public"]["Enums"]["product_application"][]
            | null
          available_thicknesses: number[] | null
          category: Database["public"]["Enums"]["product_category"]
          category_id: string | null
          color_primary: string | null
          color_secondary: string | null
          compressive_strength: number | null
          created_at: string | null
          created_by: string | null
          currency: string | null
          density: number | null
          description: string | null
          finish_types: Database["public"]["Enums"]["product_finish"][] | null
          flexural_strength: number | null
          frost_resistant: boolean | null
          hardness_mohs: number | null
          id: string
          images: string[] | null
          is_suitable_for_exterior: boolean | null
          is_suitable_for_kitchen: boolean | null
          max_slab_length: number | null
          max_slab_width: number | null
          min_order_quantity: number | null
          name: string
          origin_country: string | null
          origin_region: string | null
          pattern: Database["public"]["Enums"]["product_pattern"] | null
          price_per_sqm: number | null
          seo_description: string | null
          seo_title: string | null
          slug: string
          status: Database["public"]["Enums"]["product_status"]
          tags: string[] | null
          thumbnail: string | null
          updated_at: string | null
          water_absorption: number | null
        }
        Insert: {
          abrasion_resistance?: string | null
          applications?:
            | Database["public"]["Enums"]["product_application"][]
            | null
          available_thicknesses?: number[] | null
          category?: Database["public"]["Enums"]["product_category"]
          category_id?: string | null
          color_primary?: string | null
          color_secondary?: string | null
          compressive_strength?: number | null
          created_at?: string | null
          created_by?: string | null
          currency?: string | null
          density?: number | null
          description?: string | null
          finish_types?: Database["public"]["Enums"]["product_finish"][] | null
          flexural_strength?: number | null
          frost_resistant?: boolean | null
          hardness_mohs?: number | null
          id?: string
          images?: string[] | null
          is_suitable_for_exterior?: boolean | null
          is_suitable_for_kitchen?: boolean | null
          max_slab_length?: number | null
          max_slab_width?: number | null
          min_order_quantity?: number | null
          name: string
          origin_country?: string | null
          origin_region?: string | null
          pattern?: Database["public"]["Enums"]["product_pattern"] | null
          price_per_sqm?: number | null
          seo_description?: string | null
          seo_title?: string | null
          slug: string
          status?: Database["public"]["Enums"]["product_status"]
          tags?: string[] | null
          thumbnail?: string | null
          updated_at?: string | null
          water_absorption?: number | null
        }
        Update: {
          abrasion_resistance?: string | null
          applications?:
            | Database["public"]["Enums"]["product_application"][]
            | null
          available_thicknesses?: number[] | null
          category?: Database["public"]["Enums"]["product_category"]
          category_id?: string | null
          color_primary?: string | null
          color_secondary?: string | null
          compressive_strength?: number | null
          created_at?: string | null
          created_by?: string | null
          currency?: string | null
          density?: number | null
          description?: string | null
          finish_types?: Database["public"]["Enums"]["product_finish"][] | null
          flexural_strength?: number | null
          frost_resistant?: boolean | null
          hardness_mohs?: number | null
          id?: string
          images?: string[] | null
          is_suitable_for_exterior?: boolean | null
          is_suitable_for_kitchen?: boolean | null
          max_slab_length?: number | null
          max_slab_width?: number | null
          min_order_quantity?: number | null
          name?: string
          origin_country?: string | null
          origin_region?: string | null
          pattern?: Database["public"]["Enums"]["product_pattern"] | null
          price_per_sqm?: number | null
          seo_description?: string | null
          seo_title?: string | null
          slug?: string
          status?: Database["public"]["Enums"]["product_status"]
          tags?: string[] | null
          thumbnail?: string | null
          updated_at?: string | null
          water_absorption?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "products_category_id_fkey"
            columns: ["category_id"]
            isOneToOne: false
            referencedRelation: "categories"
            referencedColumns: ["id"]
          },
        ]
      }
      sessions: {
        Row: {
          browser: string | null
          created_at: string | null
          device_type: string | null
          duration_seconds: number | null
          ended_at: string | null
          entry_page: string | null
          exit_page: string | null
          id: string
          is_bounce: boolean | null
          os: string | null
          page_count: number | null
          referrer: string | null
          referrer_domain: string | null
          started_at: string | null
          updated_at: string | null
          visitor_id: string
        }
        Insert: {
          browser?: string | null
          created_at?: string | null
          device_type?: string | null
          duration_seconds?: number | null
          ended_at?: string | null
          entry_page?: string | null
          exit_page?: string | null
          id?: string
          is_bounce?: boolean | null
          os?: string | null
          page_count?: number | null
          referrer?: string | null
          referrer_domain?: string | null
          started_at?: string | null
          updated_at?: string | null
          visitor_id: string
        }
        Update: {
          browser?: string | null
          created_at?: string | null
          device_type?: string | null
          duration_seconds?: number | null
          ended_at?: string | null
          entry_page?: string | null
          exit_page?: string | null
          id?: string
          is_bounce?: boolean | null
          os?: string | null
          page_count?: number | null
          referrer?: string | null
          referrer_domain?: string | null
          started_at?: string | null
          updated_at?: string | null
          visitor_id?: string
        }
        Relationships: []
      }
      slug_history: {
        Row: {
          created_at: string
          id: string
          new_slug: string
          old_slug: string
          product_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          new_slug: string
          old_slug: string
          product_id: string
        }
        Update: {
          created_at?: string
          id?: string
          new_slug?: string
          old_slug?: string
          product_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "slug_history_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "products"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      analytics_daily_stats: {
        Row: {
          date: string | null
          page_views: number | null
          sessions: number | null
          unique_visitors: number | null
        }
        Relationships: []
      }
    }
    Functions: {
      refresh_analytics_daily_stats: { Args: never; Returns: undefined }
    }
    Enums: {
      product_application:
        | "flooring"
        | "wall_cladding"
        | "countertops"
        | "stairs"
        | "bathroom"
        | "outdoor"
        | "pool"
        | "fireplace"
      product_category:
        | "marble"
        | "granite"
        | "travertine"
        | "onyx"
        | "limestone"
        | "quartzite"
      product_finish:
        | "polished"
        | "honed"
        | "brushed"
        | "flamed"
        | "tumbled"
        | "sandblasted"
        | "leathered"
      product_pattern:
        | "veined"
        | "speckled"
        | "uniform"
        | "cloudy"
        | "flowery"
        | "layered"
      product_status: "active" | "draft" | "archived"
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
  graphql_public: {
    Enums: {},
  },
  public: {
    Enums: {
      product_application: [
        "flooring",
        "wall_cladding",
        "countertops",
        "stairs",
        "bathroom",
        "outdoor",
        "pool",
        "fireplace",
      ],
      product_category: [
        "marble",
        "granite",
        "travertine",
        "onyx",
        "limestone",
        "quartzite",
      ],
      product_finish: [
        "polished",
        "honed",
        "brushed",
        "flamed",
        "tumbled",
        "sandblasted",
        "leathered",
      ],
      product_pattern: [
        "veined",
        "speckled",
        "uniform",
        "cloudy",
        "flowery",
        "layered",
      ],
      product_status: ["active", "draft", "archived"],
    },
  },
} as const
