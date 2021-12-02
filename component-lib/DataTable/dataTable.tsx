import React from "react";
import { Table as ChakraTable, Container, Thead, Tbody, Tfoot, Tr, Th, Td, TableCaption } from "@chakra-ui/react";
import Link from "next/link";
import { DataTableProps, DataTableCtxType, DropDownProps, DataType } from "./types";
import { DataTableProvider, useDataTable } from "./datatableProvider";
import { DropDown, Options } from "../DropDown/dropDown";

/**
 * DataTable is the main entry point for the DataTable component.
 * It wraps the component in a DataTableProvider to provide the data and
 * and internal state mechanisms to the children.
 *
 * @param {array} defaultColumns - The default columns to show in the table.
 * @param {array} data - The data to display in the table.
 * @param {object} linkColumns - The columns to link the id and provide a <Link/> component.
 *  @param {string} linkColumns.field - The field to link.
 *  @param {string} linkColumns.href - The href to link to.
 *  @param {string} route - The route to link to.
 * @param {string} caption - The caption to display above the table.
 * @param {string} captionPlacement - The placement of the caption.
 * @param {boolean} numeric - Whether the table should be numeric.
 * @param {React.ReactNode} children - The children of the DataTable.
 */
const DataTable: React.FC<DataTableProps> = ({
  defaultColumns,
  data,
  linkColumns,
  children,
  caption,
  captionPlacement,
  numeric,
  ...rest
}) => {
  /**
   * Clone the children and add the data an linkColumns props
   * so any child of Datatable can access them.
   */
  const modifiedChildren = React.Children.map(children, (child, index) => {
    return React.cloneElement(child as React.ReactElement<any>, {
      data,
      linkColumns,
      defaultColumns,
    });
  });
  return (
    <DataTableProvider
      data={data}
      defaultColumns={defaultColumns}
      caption={caption}
      captionPlacement={captionPlacement}
      numeric={numeric}
    >
      <DataTableMain linkColumns={linkColumns} {...rest}>
        {modifiedChildren}
      </DataTableMain>
    </DataTableProvider>
  );
};

/**
 * Renders the main DataTable component.
 *
 * @param {React.ReactNode} children - The children of the DataTable.
 */
const DataTableMain: React.FC<Partial<DataTableProps>> = ({
  children,
  linkColumns,
  ...rest
}: Partial<DataTableProps>) => {
  const { data, defaultColumns, caption, captionPlacement, numeric, state } = useDataTable();

  return (
    <>
      <ChakraTable variant='simple' {...rest}>
        <TableCaption placement={captionPlacement}>{caption}</TableCaption>
        <Thead>
          <TitleRow defaultColumns={state.defaultColumns} />
        </Thead>
        <Tbody>
          {data.map(row => {
            return (
              <Tr key={row.id}>
                {state.defaultColumns.map(column => {
                  return !Array.isArray(row[column]) ? (
                    linkColumns?.field === column ? (
                      <Td key={column}>
                        <Link href={`${linkColumns.route}/${row[linkColumns.to]}`}>{row[column]}</Link>
                      </Td>
                    ) : (
                      <Td key={column} isNumeric={numeric}>
                        {row[column]}
                      </Td>
                    )
                  ) : (
                    <Td key={column}></Td>
                  );
                })}
              </Tr>
            );
          })}
        </Tbody>
        <Tfoot>
          <TitleRow defaultColumns={defaultColumns} />
        </Tfoot>
      </ChakraTable>
      {children}
    </>
  );
};

const TitleRow: React.FC<Partial<DataTableCtxType>> = ({ defaultColumns }: Partial<DataTableCtxType>) => {
  return (
    <Tr>
      {defaultColumns?.map((column: string) => (
        <Th key={column}>{column}</Th>
      ))}
    </Tr>
  );
};

const TableDropdown: React.FC<DropDownProps> = ({
  data,
  defaultColumns,
  linkColumns,
  fieldToUse,
  isMultiSelect = true,
}: DropDownProps) => {
  const { updateColumns } = useDataTable();
  // const columns = Object.keys(Object.assign({}, ...data)).filter(c => c !== "id");
  let columnsNames: Options[] = [];
  if (fieldToUse === "columns") {
    columnsNames = Object.keys(data[0]).reduce((acc: Options[], curr) => {
      acc.push({ label: curr, value: curr });
      return acc;
    }, []);
  }

  const getColumns = (val: any) => {
    const keys: string[] = [];
    Object.keys(val).forEach((key, idx) => {
      keys.push(val[idx].label);
    });

    updateColumns(keys);
  };
  return (
    <DropDown
      name='Columns'
      isMulti={isMultiSelect}
      options={columnsNames}
      onChange={val => {
        getColumns(val);
      }}
    />
  );
};

export { DataTable, TableDropdown };
