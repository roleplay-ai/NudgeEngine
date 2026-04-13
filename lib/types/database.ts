export type Role = 'superadmin' | 'hr' | 'participant' | 'trainer';
export type CohortPhase = 'pre' | 'live' | 'post' | 'completed';
export type ActionStatus = 'pending' | 'active' | 'done';
export type ActionCategory = 'Feedback' | 'Coaching' | 'Motivation' | 'Self' | 'Custom';
export type PostPhase = 'pre' | 'post';

export interface Database {
  public: {
    Tables: {
      organisations: {
        Row: {
          id: string;
          name: string;
          created_at: string;
        };
        Insert: Omit<organisations_Row, 'id' | 'created_at'>;
        Update: Partial<Omit<organisations_Row, 'id'>>;
      };
      profiles: {
        Row: {
          id: string;
          organisation_id: string | null;
          full_name: string | null;
          role: Role;
          avatar_initials: string | null;
          created_at: string;
        };
        Insert: Omit<profiles_Row, 'created_at'>;
        Update: Partial<Omit<profiles_Row, 'id'>>;
      };
      cohorts: {
        Row: {
          id: string;
          organisation_id: string | null;
          name: string;
          trainer_id: string | null;
          training_date: string | null;
          duration: string | null;
          phase: CohortPhase;
          created_by: string | null;
          created_at: string;
        };
        Insert: Omit<cohorts_Row, 'id' | 'created_at'>;
        Update: Partial<Omit<cohorts_Row, 'id'>>;
      };
      cohort_participants: {
        Row: {
          cohort_id: string;
          participant_id: string;
          confirmed_attendance: boolean;
        };
        Insert: cohort_participants_Row;
        Update: Partial<cohort_participants_Row>;
      };
      expectations: {
        Row: {
          id: string;
          participant_id: string;
          cohort_id: string;
          challenge: string | null;
          skill_improvement: string | null;
          success_definition: string | null;
          created_at: string;
        };
        Insert: Omit<expectations_Row, 'id' | 'created_at'>;
        Update: Partial<Omit<expectations_Row, 'id'>>;
      };
      skill_ratings: {
        Row: {
          id: string;
          participant_id: string;
          cohort_id: string;
          rating: number;
          created_at: string;
        };
        Insert: Omit<skill_ratings_Row, 'id' | 'created_at'>;
        Update: Partial<Omit<skill_ratings_Row, 'id'>>;
      };
      intros: {
        Row: {
          id: string;
          participant_id: string;
          cohort_id: string;
          role_text: string | null;
          goal: string | null;
          fun_fact: string | null;
          created_at: string;
        };
        Insert: Omit<intros_Row, 'id' | 'created_at'>;
        Update: Partial<Omit<intros_Row, 'id'>>;
      };
      pre_reads: {
        Row: {
          id: string;
          cohort_id: string;
          title: string;
          file_url: string | null;
          display_order: number;
        };
        Insert: Omit<pre_reads_Row, 'id'>;
        Update: Partial<Omit<pre_reads_Row, 'id'>>;
      };
      pre_read_completions: {
        Row: {
          pre_read_id: string;
          participant_id: string;
          read_at: string;
        };
        Insert: pre_read_completions_Row;
        Update: Partial<pre_read_completions_Row>;
      };
      commitment_plans: {
        Row: {
          id: string;
          participant_id: string;
          cohort_id: string;
          commitment: string | null;
          why: string | null;
          blockers: string | null;
          is_public: boolean;
          created_at: string;
        };
        Insert: Omit<commitment_plans_Row, 'id' | 'created_at'>;
        Update: Partial<Omit<commitment_plans_Row, 'id'>>;
      };
      actions: {
        Row: {
          id: string;
          cohort_id: string | null;
          category: ActionCategory;
          action_text: string;
          is_custom: boolean;
        };
        Insert: Omit<actions_Row, 'id'>;
        Update: Partial<Omit<actions_Row, 'id'>>;
      };
      participant_actions: {
        Row: {
          id: string;
          participant_id: string;
          cohort_id: string;
          action_id: string | null;
          custom_text: string | null;
          status: ActionStatus;
          completed_at: string | null;
          xp_earned: number;
        };
        Insert: Omit<participant_actions_Row, 'id'>;
        Update: Partial<Omit<participant_actions_Row, 'id'>>;
      };
      buddy_pairs: {
        Row: {
          cohort_id: string;
          participant_id: string;
          buddy_id: string;
        };
        Insert: buddy_pairs_Row;
        Update: Partial<buddy_pairs_Row>;
      };
      community_posts: {
        Row: {
          id: string;
          cohort_id: string;
          author_id: string;
          content: string;
          phase: PostPhase;
          is_public: boolean;
          created_at: string;
        };
        Insert: Omit<community_posts_Row, 'id' | 'created_at'>;
        Update: Partial<Omit<community_posts_Row, 'id'>>;
      };
      post_likes: {
        Row: {
          post_id: string;
          user_id: string;
        };
        Insert: post_likes_Row;
        Update: Partial<post_likes_Row>;
      };
    };
  };
}

// Convenience row type aliases
type organisations_Row = Database['public']['Tables']['organisations']['Row'];
type profiles_Row = Database['public']['Tables']['profiles']['Row'];
type cohorts_Row = Database['public']['Tables']['cohorts']['Row'];
type cohort_participants_Row = Database['public']['Tables']['cohort_participants']['Row'];
type expectations_Row = Database['public']['Tables']['expectations']['Row'];
type skill_ratings_Row = Database['public']['Tables']['skill_ratings']['Row'];
type intros_Row = Database['public']['Tables']['intros']['Row'];
type pre_reads_Row = Database['public']['Tables']['pre_reads']['Row'];
type pre_read_completions_Row = Database['public']['Tables']['pre_read_completions']['Row'];
type commitment_plans_Row = Database['public']['Tables']['commitment_plans']['Row'];
type actions_Row = Database['public']['Tables']['actions']['Row'];
type participant_actions_Row = Database['public']['Tables']['participant_actions']['Row'];
type buddy_pairs_Row = Database['public']['Tables']['buddy_pairs']['Row'];
type community_posts_Row = Database['public']['Tables']['community_posts']['Row'];
type post_likes_Row = Database['public']['Tables']['post_likes']['Row'];

// Exported convenience types
export type Profile = Database['public']['Tables']['profiles']['Row'];
export type Cohort = Database['public']['Tables']['cohorts']['Row'];
export type CohortParticipant = Database['public']['Tables']['cohort_participants']['Row'];
export type Expectation = Database['public']['Tables']['expectations']['Row'];
export type SkillRating = Database['public']['Tables']['skill_ratings']['Row'];
export type Intro = Database['public']['Tables']['intros']['Row'];
export type PreRead = Database['public']['Tables']['pre_reads']['Row'];
export type PreReadCompletion = Database['public']['Tables']['pre_read_completions']['Row'];
export type CommitmentPlan = Database['public']['Tables']['commitment_plans']['Row'];
export type Action = Database['public']['Tables']['actions']['Row'];
export type ParticipantAction = Database['public']['Tables']['participant_actions']['Row'];
export type BuddyPair = Database['public']['Tables']['buddy_pairs']['Row'];
export type CommunityPost = Database['public']['Tables']['community_posts']['Row'];
export type PostLike = Database['public']['Tables']['post_likes']['Row'];
