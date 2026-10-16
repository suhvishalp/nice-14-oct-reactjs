export type Priority = "low" | "medium" | "high";

export type Status = "open" | "in-progress" | "resolved";

export interface Ticket {
  id: number
  title: string
  customer: string
  priority: Priority
  status: Status
  assignee?: string
}

export const tickets: Ticket[] = [
  {
    id: 1042,
    title: 'Cannot log in after password reset',
    customer: 'Northwind Traders',
    priority: 'high',
    status: 'open',
    assignee: 'Priya',
  },
  {
    id: 1043,
    title: 'Invoice shows wrong VAT rate',
    customer: 'Contoso Ltd',
    priority: 'medium',
    status: 'open',
  },
  {
    id: 1044,
    title: 'CSV export times out for large reports',
    customer: 'Fabrikam Inc',
    priority: 'high',
    status: 'in-progress',
    assignee: 'Marco',
  },
  {
    id: 1045,
    title: 'Feature request: dark mode',
    customer: 'Adventure Works',
    priority: 'low',
    status: 'open',
  },
  {
    id: 1046,
    title: 'Update billing address',
    customer: 'Tailspin Toys',
    priority: 'low',
    status: 'resolved',
    assignee: 'Aisha',
  },
]

export interface Queue {
  id: string
  label: string
  count: number
}

export const queues: Queue[] = [
  { id: 'inbox', label: 'Inbox', count: 12 },
  { id: 'mine', label: 'My tickets', count: 4 },
  { id: 'unassigned', label: 'Unassigned', count: 3 },
  { id: 'billing', label: 'Billing', count: 5 },
  { id: 'technical', label: 'Technical', count: 7 },
  { id: 'resolved', label: 'Resolved', count: 31 },
]