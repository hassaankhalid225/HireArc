import Link from "next/link";
import { ReactNode } from "react";

interface CategoryCardProps {
  icon: ReactNode;
  name: string;
  count: string;
  color: string;
}

export default function CategoryCard({ icon, name, count, color }: CategoryCardProps) {
  return (
    <Link 
      href="#" 
      className="p-6 rounded-[var(--radius-lg)] bg-[var(--bg-card)] border border-transparent transition-all duration-300 hover:scale-[1.02] hover:shadow-[var(--shadow-card)] hover:border-[var(--primary)] group"
      style={{ backgroundColor: color }}
    >
      <div className="text-3xl mb-4 group-hover:scale-110 transition-transform">{icon}</div>
      <h3 className="text-lg font-bold mb-1">{name}</h3>
      <p className="text-[13px] text-[var(--text-muted)]">{count}</p>
    </Link>
  );
}
