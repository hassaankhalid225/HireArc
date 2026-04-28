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

import { config } from "@/config";

const BASE_URL = config.BACKEND_URL;

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
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      // Authorization: `Bearer ${getToken()}`,   ← uncomment when auth is ready
      ...headers,
    },
    body: body ? JSON.stringify(body) : undefined,
  });

  const contentType = res.headers.get("content-type");
  const isJson = contentType && contentType.includes("application/json");

  if (!res.ok) {
    if (isJson) {
      const errorPayload = await res.json();
      throw { status: res.status, ...errorPayload };
    } else {
      const text = await res.text();
      throw { 
        status: res.status, 
        message: `HTTP Error ${res.status}`,
        details: text.substring(0, 100)
      };
    }
  }

  if (!isJson) {
    const text = await res.text();
    throw { 
      status: res.status, 
      message: "Expected JSON response but received something else.",
      details: text.substring(0, 100)
    };
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
