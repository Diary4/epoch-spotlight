import { cn } from "@/lib/utils";
import { libraryShell } from "./libraryLayout";

type LibraryPageShellProps = {
  children: React.ReactNode;
  className?: string;
};

export default function LibraryPageShell({ children, className }: LibraryPageShellProps) {
  return <div className={cn(libraryShell, className)}>{children}</div>;
}
