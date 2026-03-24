import { marked } from "https://cdn.jsdelivr.net/npm/marked/lib/marked.esm.js"

export function parseMarkdown(md) {
  return marked.parse(md)
}