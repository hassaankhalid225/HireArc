/**
 * API Service Layer
 * ─────────────────
 * All external HTTP calls go through here.
 * Replace BASE_URL with your actual backend URL via environment variable.
 *
 * Usage:
 *   import { apiClient } from "@/services/api";
 *   const data = await apiClient.get<Job[]>("/jobs");
 */

const BASE_URL = process.env.NEXT_PUBLIC_API_URL ?? "https://api.HireArc.dev/v1";

type HttpMethod = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";

interface RequestOptions {
  method?: HttpMethod;
  body?: unknown;
  headers?: Record<string, string>;
  /** abort signal for cancellation */
  signal?: AbortSignal;
}

async function request<T>(
  path: string,
  { method = "GET", body, headers = {}, signal }: RequestOptions = {}
): Promise<T> {
  const res = await fetch(`${BASE_URL}${path}`, {
    method,
    signal,
    headers: {
      "Content-Type": "application/json",
      // Authorization: `Bearer ${getToken()}`,   ← uncomment when auth is ready
      ...headers,
    },
    body: body ? JSON.stringify(body) : undefined,
  });

  if (!res.ok) {
    const errorPayload = await res.json().catch(() => ({}));
    throw { status: res.status, ...errorPayload };
  }

  return res.json() as Promise<T>;
}

export const apiClient = {
  get: <T>(path: string, opts?: RequestOptions) =>
    request<T>(path, { ...opts, method: "GET" }),

  post: <T>(path: string, body: unknown, opts?: RequestOptions) =>
    request<T>(path, { ...opts, method: "POST", body }),

  put: <T>(path: string, body: unknown, opts?: RequestOptions) =>
    request<T>(path, { ...opts, method: "PUT", body }),

  patch: <T>(path: string, body: unknown, opts?: RequestOptions) =>
    request<T>(path, { ...opts, method: "PATCH", body }),

  delete: <T>(path: string, opts?: RequestOptions) =>
    request<T>(path, { ...opts, method: "DELETE" }),
};
