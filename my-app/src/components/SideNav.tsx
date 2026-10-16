import { Badge, ListGroup } from 'react-bootstrap'
import type { Queue } from '../data/tickets'

interface SideNavProps {
  queues: Queue[]
  activeId: string
}

export function SideNav({ queues, activeId }: SideNavProps) {
  return (
    <ListGroup variant="flush">
      {queues.map((queue) => (
        <ListGroup.Item
          key={queue.id}
          action
          href={`#${queue.id}`}
          active={queue.id === activeId}
          className="d-flex justify-content-between align-items-center"
        >
          {queue.label}
          <Badge bg="secondary" pill>
            {queue.count}
          </Badge>
        </ListGroup.Item>
      ))}
    </ListGroup>
  )
}