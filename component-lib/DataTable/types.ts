export type ColumnType = {
  Header: string;
  accessor: string;
};

export type DataType = {
  [key: string]: string | number;
};

export type DataTableProps = DataTableCtxType & {
  linkColumns?: {
    field: string;
    to: string;
    route?: string;
  };
};

export type DataTableCtxType = {
  defaultColumns?: string[];
  updateColumns?: (columns: string[]) => void;
  data: DataType[];
  caption?: string;
  captionPlacement?: "top" | "bottom";
  numeric?: boolean;
  children?: React.ReactNode;
};

export interface DropDownProps {
  data?: Pick<DataTableCtxType, "data">;
  defaultColumns?: string[];
  linkColumns?: {
    field: string;
    to: string;
    route?: string;
  };
  fieldToUse: string;
  useColumns?: boolean;
  isMultiSelect?: boolean;
  updateColumns: (columns: any) => void;
}
