import React, { useEffect, useMemo, useState } from "react";
import { Props, TestCtxType } from "../types";

const TestCtx = React.createContext<TestCtxType>({} as TestCtxType);

const TestProvider = ({ children }: Props) => {
  const [state, setState] = useState<Omit<TestCtxType, "children">>({});

  useEffect(() => {

  }, []);


  const value = useMemo(() => ({ state, setState }), [state]);

  return <TestCtx.Provider value={value}>{children}</TestCtx.Provider>;
};

const useTest = () => {
  const context = React.useContext(TestCtx);

  if (context === undefined) {
    throw new Error("useTest must be used within a TestProvider");
  }
  return context;
};

export { TestProvider, useTest };
