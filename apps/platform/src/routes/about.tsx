import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/about')({
  component: () => (
    <section>
      <h1>About</h1>
      <p>Add files in <code>src/routes</code> to create new routes.</p>
    </section>
  ),
})
