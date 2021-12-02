import React, { useEffect, useMemo, useState } from "react";
import { DataTableCtxType } from "./types";

const DataTableCtx = React.createContext<DataTableCtxType>({} as DataTableCtxType);

const DataTableProvider = ({ children, data, defaultColumns, caption, captionPlacement, numeric }: any) => {
  const [state, setState] = useState<Omit<DataTableCtxType, "children">>({
    data,
    defaultColumns,
    caption,
    captionPlacement,
    numeric,
  });

  useEffect(() => {
    setState({ data, defaultColumns, caption, captionPlacement, numeric });
  }, [data, defaultColumns, caption, captionPlacement, numeric]);

  // const updateColumns = useMemo(
  //   () => (columns: string[]) => {
  //     console.log("in updateColumns", columns);
  //     setState({ ...state, defaultColumns: [...defaultColumns, "todd"] });
  //   },
  //   [state]
  // );
  const updateColumns = (columns: string[]) => {
    console.log("in updateColumns", columns);
    setState({ ...state, defaultColumns: [...defaultColumns, ...columns] });
  };

  const value = useMemo(() => ({ state, updateColumns, defaultColumns, data }), [data, defaultColumns, state]);

  return <DataTableCtx.Provider value={value}>{children}</DataTableCtx.Provider>;
};

const useDataTable = () => {
  const context = React.useContext(DataTableCtx);

  if (context === undefined) {
    throw new Error("useDataTable must be used within a DataTableProvider");
  }
  return context;
};

export { DataTableProvider, useDataTable };
