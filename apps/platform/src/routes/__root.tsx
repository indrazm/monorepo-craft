import { createRootRoute, Link, Outlet } from '@tanstack/react-router'

export const Route = createRootRoute({
  component: () => (
    <main>
      <nav>
        <Link to="/" activeOptions={{ exact: true }}>
          Home
        </Link>
        <Link to="/about">About</Link>
      </nav>
      <Outlet />
    </main>
  ),
  notFoundComponent: () => <h1>Page not found</h1>,
})
