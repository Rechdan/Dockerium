import { createContext, memo, ReactNode, useContext, useMemo } from "react";

import { DashProps } from "_/components/dash";

type DashProviderProps = DashProps & {
  children?: ReactNode;
};

export type DashContext = DashProps;

export const dashContext = createContext<DashContext>({} as DashContext);

export const useDash = () => useContext(dashContext);

const DashProvider = memo(({ children, ...props }: DashProviderProps) => {
  const providerValue = useMemo<DashContext>(
    () => ({
      ...props,
    }),
    [props]
  );

  return <dashContext.Provider value={providerValue}>{children}</dashContext.Provider>;
});

export default DashProvider;
