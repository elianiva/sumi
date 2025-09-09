import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/designs/toggle')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/designs/toggle"!</div>
}
