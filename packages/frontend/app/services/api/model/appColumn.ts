/**
 * Generated by orval v7.7.0 🍺
 * Do not edit manually.
 * Datanaut API
 * Datanaut is a cloud-based platform that combines the functionality of a spreadsheet with a database, allowing users to organize, collaborate on, and customize data in a visually intuitive interface
 * OpenAPI spec version: 1.0.0
 */
import type { AppColumnConfig } from "./appColumnConfig";

export interface AppColumn {
  /** The column's unique identifier */
  id: string;
  /** The ID of the table this column belongs to */
  table_id: string;
  /** The column's display name */
  name: string;
  /** The column's data type */
  type: string;
  /** Column-specific configuration */
  config: AppColumnConfig;
  /** Timestamp when column was created */
  created_at?: string;
  /** Timestamp when column was last updated */
  updated_at?: string;
}
