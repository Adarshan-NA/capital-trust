export type RiskLevel = "low" | "medium" | "high";

export type CaseRow = {
  id: string;
  status: string;
  documentType: string;
  employment: string;
  income: string;
  intendedUse: string;
  submittedAt: string; // ISO string
  customer: {
    email: string;
    firstName: string;
    lastName: string;
    city: string;
    province: string;
    postal: string;
  };
  risk: { level: RiskLevel } | null;
};

export type ListResponse = {
  rows: CaseRow[];
  total: number;
  page: number;
  pageSize: number;
};

export type CaseNote = {
  id: string;
  body: string;
  createdAt: string; // ISO
  author: { id: string; email: string };
};

export type AuditLog = {
  id: string;
  createdAt: string; // ISO
  event: string;
  data: Record<string, unknown> | null;
};

export type CaseFull = CaseRow & {
  notes: CaseNote[];
  audits: AuditLog[];
};
