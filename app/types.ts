// Re-export shared role type from the database types
export type { Role } from '../lib/types/database';

export type SuperAdminScreen =
  | 'sa-orgs'
  | 'sa-users';

export type HRScreen =
  | 'hr-impact'
  | 'hr-dashboard'
  | 'hr-create1'
  | 'hr-detail-post'
  | 'hr-detail-pre'
  | 'hr-detail-live';

export type ParticipantScreen =
  | 'p-pre-home'
  | 'p-expectations'
  | 'p-skillrating'
  | 'p-intro'
  | 'p-allset'
  | 'p-prereads'
  | 'p-community'
  | 'p-training'
  | 'p-post-home'
  | 'p-social';

export type TrainerScreen =
  | 't-overview'
  | 't-liveday'
  | 't-posttraining'
  | 't-community';

export type Screen = SuperAdminScreen | HRScreen | ParticipantScreen | TrainerScreen;
