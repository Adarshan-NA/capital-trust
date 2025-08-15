// Purpose: localStorage persistence for "Save & continue later" (without storing File blobs).
import { Onboarding } from "./validators";

const KEY = "ct_onboarding_v1";

// Persist only serializable fields (exclude files)
export type PersistedOnboarding = Onboarding;

export const saveDraft = (data: PersistedOnboarding) => {
  localStorage.setItem(KEY, JSON.stringify(data));
};

export const loadDraft = (): PersistedOnboarding | null => {
  const raw = localStorage.getItem(KEY);
  if (!raw) return null;
  try {
    return JSON.parse(raw);
  } catch {
    return null;
  }
};

export const clearDraft = () => localStorage.removeItem(KEY);
