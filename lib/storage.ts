import type { ComparativeAuditResult } from "@/types/audit";

// In-memory cache for recent audits (in serverless environment, allows immediate retrieval & sharing)
const auditStore = new Map<string, ComparativeAuditResult>();

export function saveAuditToStore(id: string, data: ComparativeAuditResult) {
  auditStore.set(id, data);
}

export function getAuditFromStore(id: string): ComparativeAuditResult | null {
  return auditStore.get(id) || null;
}
