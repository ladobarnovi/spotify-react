import { createContext, ReactNode, useContext } from "react";

interface IScrollParentContext {
  scrollParent: HTMLElement | undefined;
}

export const ScrollParentContext = createContext<IScrollParentContext | null>(null);

export const useScrollParentContext = () => {
  const context = useContext(ScrollParentContext);

  if (!context) throw new Error("useScrollParentContext must be used within ScrollParentContext");

  return context;
}

interface IProps {
  children: ReactNode;
  scrollParent: HTMLElement | undefined;
}

export function ScrollParentProvider({ children, scrollParent }: IProps) {
  return (
    <ScrollParentContext.Provider value={{ scrollParent }}>
      {children}
    </ScrollParentContext.Provider>
  )
}
