import { useEffect, useState } from "react";
import { Select, AsyncSelect, CreatableSelect, AsyncCreatableSelect } from "chakra-react-select";

export interface Options {
  label: string;
  value: string;
  variant?: string;
  colorScheme?: string;
  isFixed?: boolean;
}
interface Props {
  isMulti?: boolean;
  name: string;
  options: Options[];
  placeholder?: string;
  closeMenuOnSelect?: boolean;
  disabled?: boolean;
  tagVariant?: "subtle" | "solid" | "outline";
  colorScheme?: string;
  hasStickyGroupHeaders?: boolean;
  onChange?: (value: string) => void;
}

const DropDown: React.FC<Props> = ({
  isMulti = false,
  name,
  options,
  placeholder,
  disabled,
  hasStickyGroupHeaders = false,
  colorScheme,
  tagVariant,
  onChange,
}: Props) => {
  console.log("options: ", options);
  return (
    <Select
      isMulti={isMulti}
      name={name}
      options={options}
      placeholder={placeholder}
      closeMenuOnSelect={false}
      onChange={(values: any) => onChange && onChange(values)}
      isDisabled={disabled}
      hasStickyGroupHeaders={hasStickyGroupHeaders}
    />
  );
};

export { DropDown };
