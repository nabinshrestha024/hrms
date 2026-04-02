import { useEffect, useState } from 'react';
import type { ToastActionElement } from '../primitives/toast';

const TOAST_LIMIT = 3;
const TOAST_DISMISS_DELAY = 5000;

type ToastVariant = 'default' | 'destructive' | 'success';

export interface ToastData {
  id: string;
  title?: string;
  description?: string;
  variant?: ToastVariant;
  action?: ToastActionElement;
  open: boolean;
}

type ToastInput = Omit<ToastData, 'id' | 'open'>;

// ---------------------------------------------------------------------------
// Module-level state + subscriber pattern
// ---------------------------------------------------------------------------

let toasts: ToastData[] = [];
let count = 0;
const listeners: Set<() => void> = new Set();

function emitChange() {
  for (const listener of listeners) {
    listener();
  }
}

function genId() {
  count = (count + 1) % Number.MAX_SAFE_INTEGER;
  return count.toString();
}

function addToast(input: ToastInput): string {
  const id = genId();

  toasts = [{ ...input, id, open: true }, ...toasts].slice(0, TOAST_LIMIT);
  emitChange();

  // Auto-dismiss
  setTimeout(() => {
    dismiss(id);
  }, TOAST_DISMISS_DELAY);

  return id;
}

function dismiss(toastId: string) {
  toasts = toasts.map((t) => (t.id === toastId ? { ...t, open: false } : t));
  emitChange();

  // Remove from list after close animation
  setTimeout(() => {
    toasts = toasts.filter((t) => t.id !== toastId);
    emitChange();
  }, 300);
}

// ---------------------------------------------------------------------------
// Public API
// ---------------------------------------------------------------------------

function toast(input: ToastInput) {
  return addToast(input);
}

function useToast() {
  const [, setState] = useState(0);

  useEffect(() => {
    const listener = () => setState((s) => s + 1);
    listeners.add(listener);
    return () => {
      listeners.delete(listener);
    };
  }, []);

  return {
    toasts,
    toast,
    dismiss,
  } as const;
}

export { useToast, toast, dismiss };
