export interface OAuthProfile {
  provider: string;
  providerUserId: string;
  email: string;
  emailVerified: string;
  name: string;
}

export interface OAuthProvider {
  getAuthUrl(state: string): string;
  getUserPRofile(code: string): Promise<OAuthProfile>;
}
