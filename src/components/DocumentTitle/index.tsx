import { useEffect, ReactNode } from "react";

export const DocumentTitle = ({ title, children }: { title: string; children: ReactNode }) => {
  useEffect(() => {
    document.title = title;
  }, [title]);

  return children;
};
