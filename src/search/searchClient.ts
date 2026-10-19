import { flagEnabled } from "../flags";

export function activeSearchBackend() {
  return flagEnabled("search_failover_mode") ? "backup-index" : "primary-index";
}
