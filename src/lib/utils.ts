import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatDescription(html: string) {
  if (!html) return "";

  // 1. Decode HTML entities
  let decoded = html
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&amp;/g, "&")
    .replace(/&nbsp;/g, " ");

  // 2. Remove messy Slack/RichText wrappers but keep structure tags
  // These are common in scraped job descriptions (like Reddit/Slack blocks)
  const wrappersToRemove = [
    "content-intro",
    "c-message_kit__blocks",
    "c-message__message_blocks",
    "p-block_kit_renderer",
    "p-rich_text_block",
    "p-rich_text_section",
  ];

  wrappersToRemove.forEach((cls) => {
    const regex = new RegExp(`<div[^>]*class="[^"]*${cls}[^"]*"[^>]*>`, "gi");
    decoded = decoded.replace(regex, "");
  });

  // Remove remaining empty/unnecessary divs but keep p, ul, li, etc.
  decoded = decoded.replace(/<\/div>/gi, "\n");
  
  // Clean up excessive newlines
  decoded = decoded.replace(/\n\s*\n/g, "\n\n").trim();

  return decoded;
}

