import { Badge, ListGroup } from "react-bootstrap";
import { NavLink } from "react-router";
import type { Queue } from "../data/tickets";

interface SideNavProps {
  queues: Queue[];
}

export function SideNav({ queues }: SideNavProps) {
  return (
    <ListGroup variant="flush">
      <NavLink
        to="/"
        className={({ isActive }) =>
          `list-group-item list-group-item-action
           ${isActive ? "active" : ""}`
        }
      >
        Inbox
      </NavLink>

      <NavLink
        to="/products"
        className={({ isActive }) =>
          `list-group-item list-group-item-action
           ${isActive ? "active" : ""}`
        }
      >
        Products
      </NavLink>

      <NavLink
        to="/register"
        className={({ isActive }) =>
          `list-group-item list-group-item-action
           ${isActive ? "active" : ""}`
        }
      >
        Register
      </NavLink>
    </ListGroup>
  );
}
