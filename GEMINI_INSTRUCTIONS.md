# Gemini Instructions & Project Context

## User Context

**Profile**: 5+ Years Angular Developer.
**Goal**: Learning Next.js by building a Product Viewer app.
**Style**: Topic-by-topic implementation.

## Critical Rules for AI Assistant

1.  **Angular Comparisons**: ALWAYS explain Next.js concepts by comparing them to Angular concepts (e.g., Components, Services, Observables vs Promises).
2.  **Educational Comments**: Add `// CONCEPT:` blocks directly in the code to explain _why_ something is done.
3.  **UI Constraints**:
    - **Force Light Mode**: Black text on white background. No dark mode.
    - **Simple CSS**: Use standard Tailwind. No fancy animations unless requested.

## Project Architecture Standards

- **Routing**: Use Route Groups `(group)` for layout isolation.
- **Data**: Use Private Folders `_folder` for mock data/utils.
- **Structure**: Default to Server Components. Use `use client` only for interactivity.
