/**
 * Generated by orval v7.7.0 🍺
 * Do not edit manually.
 * backend
 * OpenAPI spec version: 1.0
 */
import type { TenantDto } from "./tenantDto";
import type { RoleDto } from "./roleDto";

export interface UserDto {
  id?: string;
  /** @nullable */
  email?: string | null;
  /** @nullable */
  name?: string | null;
  tenant?: TenantDto;
  role?: RoleDto;
  createdAt?: string;
  updatedAt?: string;
}
