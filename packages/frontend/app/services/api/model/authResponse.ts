/**
 * Generated by orval v7.7.0 🍺
 * Do not edit manually.
 * backend
 * OpenAPI spec version: 1.0
 */
import type { UserResponse } from "./userResponse";

export interface AuthResponse {
  user?: UserResponse;
  /** @nullable */
  accessToken?: string | null;
  /** @nullable */
  refreshToken?: string | null;
}
