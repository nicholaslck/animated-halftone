import { defineConfig, s } from "velite";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";

// `s` is extended from Zod with some custom schemas,
// you can also import re-exported `z` from `velite` if you don't need these extension schemas.

export default defineConfig({
  markdown: {
    remarkPlugins: [remarkMath],
    rehypePlugins: [rehypeKatex],
  },
  output: {
    base: "/animated-halftone" // TODO: 
  },
  collections: {
    algoDescriptions: {
      name: "AlgorithmDescriptions", // collection type name
      pattern: "*.md", // content files glob pattern
      schema: s.object({
        slug: s.path(), // auto generate slug from file path
        metadata: s.metadata(), // extract markdown reading-time, word-count, etc.
        excerpt: s.excerpt(), // excerpt of markdown content
        content: s.markdown(), // transform markdown to html
      }),
    },
  },
});
