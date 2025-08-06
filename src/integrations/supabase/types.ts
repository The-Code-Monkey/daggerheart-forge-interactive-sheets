export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instanciate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "12.2.3 (519615d)"
  }
  public: {
    Tables: {
      ancestries: {
        Row: {
          created_at: string
          description: string | null
          features: Json | null
          id: number
          image: string | null
          isHomebrew: boolean | null
          name: string | null
          slug: string | null
          user_id: string | null
        }
        Insert: {
          created_at?: string
          description?: string | null
          features?: Json | null
          id?: number
          image?: string | null
          isHomebrew?: boolean | null
          name?: string | null
          slug?: string | null
          user_id?: string | null
        }
        Update: {
          created_at?: string
          description?: string | null
          features?: Json | null
          id?: number
          image?: string | null
          isHomebrew?: boolean | null
          name?: string | null
          slug?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "ancestries_user_id_fkey1"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      campaigns: {
        Row: {
          additional: Json | null
          created_at: string
          description: string | null
          featured: boolean | null
          id: number
          isPublic: boolean | null
          last_played: string | null
          max_player_count: number | null
          name: string | null
          status: string | null
          user_id: string | null
        }
        Insert: {
          additional?: Json | null
          created_at?: string
          description?: string | null
          featured?: boolean | null
          id?: number
          isPublic?: boolean | null
          last_played?: string | null
          max_player_count?: number | null
          name?: string | null
          status?: string | null
          user_id?: string | null
        }
        Update: {
          additional?: Json | null
          created_at?: string
          description?: string | null
          featured?: boolean | null
          id?: number
          isPublic?: boolean | null
          last_played?: string | null
          max_player_count?: number | null
          name?: string | null
          status?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "campaigns_user_id_fkey1"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      campaigns_players: {
        Row: {
          campaign_id: number | null
          character_id: string | null
          created_at: string
          id: number
        }
        Insert: {
          campaign_id?: number | null
          character_id?: string | null
          created_at?: string
          id?: number
        }
        Update: {
          campaign_id?: number | null
          character_id?: string | null
          created_at?: string
          id?: number
        }
        Relationships: [
          {
            foreignKeyName: "campaigns_players_campaign_id_fkey"
            columns: ["campaign_id"]
            isOneToOne: false
            referencedRelation: "campaigns"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "campaigns_players_character_id_fkey"
            columns: ["character_id"]
            isOneToOne: false
            referencedRelation: "characters"
            referencedColumns: ["id"]
          },
        ]
      }
      cards: {
        Row: {
          additional: Json | null
          cost: number | null
          created_at: string
          description: string | null
          domain_id: number | null
          id: number
          level: number | null
          name: string | null
        }
        Insert: {
          additional?: Json | null
          cost?: number | null
          created_at?: string
          description?: string | null
          domain_id?: number | null
          id?: number
          level?: number | null
          name?: string | null
        }
        Update: {
          additional?: Json | null
          cost?: number | null
          created_at?: string
          description?: string | null
          domain_id?: number | null
          id?: number
          level?: number | null
          name?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "cards_domain_id_fkey"
            columns: ["domain_id"]
            isOneToOne: false
            referencedRelation: "domains"
            referencedColumns: ["id"]
          },
        ]
      }
      characters: {
        Row: {
          additional: Json | null
          age: number | null
          ancestry: number | null
          background: string | null
          class: number | null
          community: number | null
          complete: boolean | null
          created_at: string | null
          current_hp: number | null
          gender: string | null
          hope: number | null
          id: string
          inventory: Json | null
          items_inventory: Json | null
          level: number | null
          max_hp: number | null
          name: string
          pronouns: string | null
          stats: Json | null
          stress: number | null
          subclass: number | null
          tier: number | null
          updated_at: string | null
          user_id: string
        }
        Insert: {
          additional?: Json | null
          age?: number | null
          ancestry?: number | null
          background?: string | null
          class?: number | null
          community?: number | null
          complete?: boolean | null
          created_at?: string | null
          current_hp?: number | null
          gender?: string | null
          hope?: number | null
          id?: string
          inventory?: Json | null
          items_inventory?: Json | null
          level?: number | null
          max_hp?: number | null
          name: string
          pronouns?: string | null
          stats?: Json | null
          stress?: number | null
          subclass?: number | null
          tier?: number | null
          updated_at?: string | null
          user_id: string
        }
        Update: {
          additional?: Json | null
          age?: number | null
          ancestry?: number | null
          background?: string | null
          class?: number | null
          community?: number | null
          complete?: boolean | null
          created_at?: string | null
          current_hp?: number | null
          gender?: string | null
          hope?: number | null
          id?: string
          inventory?: Json | null
          items_inventory?: Json | null
          level?: number | null
          max_hp?: number | null
          name?: string
          pronouns?: string | null
          stats?: Json | null
          stress?: number | null
          subclass?: number | null
          tier?: number | null
          updated_at?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "characters_ancestry_fkey"
            columns: ["ancestry"]
            isOneToOne: false
            referencedRelation: "ancestries"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "characters_class_fkey"
            columns: ["class"]
            isOneToOne: false
            referencedRelation: "classes"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "characters_community_fkey"
            columns: ["community"]
            isOneToOne: false
            referencedRelation: "communities"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "characters_subclass_fkey"
            columns: ["subclass"]
            isOneToOne: false
            referencedRelation: "subclasses"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "characters_user_id_fkey1"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      classes: {
        Row: {
          additional: Json | null
          base_evasion: number | null
          base_hp: number | null
          class_items: string | null
          created_at: string
          description: string | null
          features: Json | null
          id: number
          isHomebrew: boolean | null
          isPublished: boolean | null
          name: string | null
          slug: string | null
          user_id: string | null
        }
        Insert: {
          additional?: Json | null
          base_evasion?: number | null
          base_hp?: number | null
          class_items?: string | null
          created_at?: string
          description?: string | null
          features?: Json | null
          id?: number
          isHomebrew?: boolean | null
          isPublished?: boolean | null
          name?: string | null
          slug?: string | null
          user_id?: string | null
        }
        Update: {
          additional?: Json | null
          base_evasion?: number | null
          base_hp?: number | null
          class_items?: string | null
          created_at?: string
          description?: string | null
          features?: Json | null
          id?: number
          isHomebrew?: boolean | null
          isPublished?: boolean | null
          name?: string | null
          slug?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "classes_user_id_fkey1"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      classes_domains: {
        Row: {
          class_id: number | null
          domain_id: number | null
          id: number
        }
        Insert: {
          class_id?: number | null
          domain_id?: number | null
          id?: number
        }
        Update: {
          class_id?: number | null
          domain_id?: number | null
          id?: number
        }
        Relationships: [
          {
            foreignKeyName: "classes_domains_class_id_fkey"
            columns: ["class_id"]
            isOneToOne: false
            referencedRelation: "classes"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "classes_domains_domain_id_fkey"
            columns: ["domain_id"]
            isOneToOne: false
            referencedRelation: "domains"
            referencedColumns: ["id"]
          },
        ]
      }
      communities: {
        Row: {
          created_at: string
          description: string | null
          features: Json | null
          id: number
          isHomebrew: boolean | null
          name: string | null
        }
        Insert: {
          created_at?: string
          description?: string | null
          features?: Json | null
          id?: number
          isHomebrew?: boolean | null
          name?: string | null
        }
        Update: {
          created_at?: string
          description?: string | null
          features?: Json | null
          id?: number
          isHomebrew?: boolean | null
          name?: string | null
        }
        Relationships: []
      }
      domains: {
        Row: {
          created_at: string
          description: string | null
          id: number
          isHomebrew: boolean | null
          isPublished: boolean | null
          name: string | null
          user_id: string | null
        }
        Insert: {
          created_at?: string
          description?: string | null
          id?: number
          isHomebrew?: boolean | null
          isPublished?: boolean | null
          name?: string | null
          user_id?: string | null
        }
        Update: {
          created_at?: string
          description?: string | null
          id?: number
          isHomebrew?: boolean | null
          isPublished?: boolean | null
          name?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "domains_user_id_fkey1"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      items: {
        Row: {
          burden: string | null
          created_at: string
          damage: Json | null
          damage_type: string | null
          features: Json | null
          id: number
          isHomebrew: boolean | null
          isSecondary: boolean | null
          name: string | null
          range: string | null
          tier: number | null
          trait: string | null
          type: string | null
        }
        Insert: {
          burden?: string | null
          created_at?: string
          damage?: Json | null
          damage_type?: string | null
          features?: Json | null
          id?: number
          isHomebrew?: boolean | null
          isSecondary?: boolean | null
          name?: string | null
          range?: string | null
          tier?: number | null
          trait?: string | null
          type?: string | null
        }
        Update: {
          burden?: string | null
          created_at?: string
          damage?: Json | null
          damage_type?: string | null
          features?: Json | null
          id?: number
          isHomebrew?: boolean | null
          isSecondary?: boolean | null
          name?: string | null
          range?: string | null
          tier?: number | null
          trait?: string | null
          type?: string | null
        }
        Relationships: []
      }
      npcs: {
        Row: {
          campaign_id: number | null
          created_at: string
          description: string | null
          id: number
          name: string | null
          stats: Json | null
        }
        Insert: {
          campaign_id?: number | null
          created_at?: string
          description?: string | null
          id?: number
          name?: string | null
          stats?: Json | null
        }
        Update: {
          campaign_id?: number | null
          created_at?: string
          description?: string | null
          id?: number
          name?: string | null
          stats?: Json | null
        }
        Relationships: [
          {
            foreignKeyName: "npcs_campaign_id_fkey"
            columns: ["campaign_id"]
            isOneToOne: false
            referencedRelation: "campaigns"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          created_at: string | null
          id: string
          updated_at: string | null
          username: string | null
        }
        Insert: {
          created_at?: string | null
          id: string
          updated_at?: string | null
          username?: string | null
        }
        Update: {
          created_at?: string | null
          id?: string
          updated_at?: string | null
          username?: string | null
        }
        Relationships: []
      }
      sessions: {
        Row: {
          additional: Json | null
          campaign_id: number | null
          created_at: string
          id: number
          name: string | null
          notes: string | null
          play_date: string | null
          user_id: string | null
        }
        Insert: {
          additional?: Json | null
          campaign_id?: number | null
          created_at?: string
          id?: number
          name?: string | null
          notes?: string | null
          play_date?: string | null
          user_id?: string | null
        }
        Update: {
          additional?: Json | null
          campaign_id?: number | null
          created_at?: string
          id?: number
          name?: string | null
          notes?: string | null
          play_date?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "sessions_campaign_id_fkey"
            columns: ["campaign_id"]
            isOneToOne: false
            referencedRelation: "campaigns"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "sessions_user_id_fkey1"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      subclasses: {
        Row: {
          class_id: number | null
          created_at: string
          description: string | null
          features: Json | null
          id: number
          isHomebrew: boolean | null
          isPublished: boolean | null
          name: string | null
          user_id: string | null
        }
        Insert: {
          class_id?: number | null
          created_at?: string
          description?: string | null
          features?: Json | null
          id?: number
          isHomebrew?: boolean | null
          isPublished?: boolean | null
          name?: string | null
          user_id?: string | null
        }
        Update: {
          class_id?: number | null
          created_at?: string
          description?: string | null
          features?: Json | null
          id?: number
          isHomebrew?: boolean | null
          isPublished?: boolean | null
          name?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "subclasses_class_id_fkey"
            columns: ["class_id"]
            isOneToOne: false
            referencedRelation: "classes"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "subclasses_user_id_fkey1"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      campaigns_players_access: {
        Row: {
          id: number | null
        }
        Relationships: []
      }
      characters_no_rls: {
        Row: {
          id: string | null
          user_id: string | null
        }
        Relationships: []
      }
    }
    Functions: {
      get_campaigns_players_access: {
        Args: Record<PropertyKey, never>
        Returns: {
          id: number
        }[]
      }
      get_characters_no_rls: {
        Args: Record<PropertyKey, never>
        Returns: {
          id: string
          user_id: string
        }[]
      }
      getCharactersCount: {
        Args: Record<PropertyKey, never>
        Returns: number
      }
    }
    Enums: {
      [_ in never]: never
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
    Enums: {},
  },
} as const
