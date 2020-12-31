import React, { useEffect } from "react";

export const DocumentTitle: React.FC<{ title: string }> = ({ title, children }) => {
  useEffect(() => {
    document.title = title;
  }, [title]);

  return <>{children}</>;
};
