import { ReactNode } from "react";

export const ErrorMessage = ({ children }: { children: ReactNode }) => {
  return <div className="error">{children}</div>;
};
