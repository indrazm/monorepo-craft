import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/')({
  component: () => (
    <section>
      <h1>Platform</h1>
      <p>React + Vite + TanStack Router</p>
      <p>
        Edit <code>src/routes/index.tsx</code> to get started.
      </p>
      <a href="/api/health" target="_blank" rel="noreferrer">
        Check API health
      </a>
    </section>
  ),
})
