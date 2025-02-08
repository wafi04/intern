import { LucideIcon } from "lucide-react";
import { ReactNode } from "react";

export interface LayoutProps {
  children: ReactNode;
  className?: string;
  requireAuth?: boolean;
  title?: string;
}
export type API_RESPONSE<T> = {
  statusCode: number;
  message: string;
  data: T;
};

// Tipe Menu Item
export interface MenuItemProps {
  icon: LucideIcon;
  label: string;
  path: string;
}
