import type { Ticket } from "../data/tickets";
import ProductGrid from "./ProductGrid";

interface MainPanelProps {
  title: string;
  tickets: Ticket[];
}

export function MainPanel({ title, tickets }: MainPanelProps) {
  return (
    <div className="p-4">
      <ProductGrid />
    </div>
  );
}
