import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_authorized/favorites/')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/_authorized/favorites/"!</div>
}
