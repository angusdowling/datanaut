/**
 * Generated by orval v7.7.0 🍺
 * Do not edit manually.
 * backend
 * OpenAPI spec version: 1.0
 */
import type { AppColumn } from "./appColumn";
import type { AppRow } from "./appRow";
import type { Workspace } from "./workspace";

export interface AppTable {
  id?: string;
  /** @nullable */
  name?: string | null;
  workspaceId?: string;
  createdBy?: string;
  createdAt?: string;
  updatedAt?: string;
  /** @nullable */
  appColumns?: AppColumn[] | null;
  /** @nullable */
  appRows?: AppRow[] | null;
  workspace?: Workspace;
}
