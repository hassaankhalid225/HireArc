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
  { method = "GET", body, headers = {}, signal: signalProp }: RequestOptions = {}
): Promise<T> {
  // Get admin token from local storage
  const adminToken = typeof window !== 'undefined' ? localStorage.getItem("JobSphere_Admin_Token") : null;
  
  // Setup timeout
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 8000); // 8 second timeout
  
  // Use either the passed signal or our timeout signal
  const signal = signalProp || controller.signal;

  try {
    const res = await fetch(`${BASE_URL}${path}`, {
      method,
      signal,
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        ...(adminToken ? { "X-Admin-Token": adminToken } : {}),
        ...headers,
      },
      body: body ? JSON.stringify(body) : undefined,
    });

    clearTimeout(timeoutId);

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
  } catch (error: any) {
    clearTimeout(timeoutId);
    if (error.name === 'AbortError') {
      throw { 
        status: 408, 
        message: "Request timeout — backend took too long to respond.",
        details: `Failed to fetch ${path} within 8s`
      };
    }
    throw error;
  }
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
