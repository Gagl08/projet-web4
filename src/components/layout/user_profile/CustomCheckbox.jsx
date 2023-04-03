import {
  Badge,
  useCheckbox,
  Text,
  Flex,
  chakra,
  Box,
  Tag,
  TagLeftIcon,
  TagLabel,
} from "@chakra-ui/react";

import { IoAdd, IoRemove } from "react-icons/io5";

export default function CustomCheckbox(props) {
  const { text, checked, value } = props;
  const { state, getInputProps, getCheckboxProps, getLabelProps, htmlProps } =
    useCheckbox(props);

  return (
    <chakra.label
      //   colorScheme={"purple"}
      variant={state.isChecked ? "solid" : "outline"}
      cursor="pointer"
      {...htmlProps}
    >
      <input {...getInputProps()} hidden />
      {state.isChecked ? (
        <Tag
          {...getCheckboxProps()}
          colorScheme={"purple"}
          {...getLabelProps()}
        >
          <TagLeftIcon as={IoRemove} />
          <TagLabel>{text}</TagLabel>
        </Tag>
      ) : (
        <Tag
          {...getCheckboxProps()}
          colorScheme={"purple"}
          variant={"outline"}
          {...getLabelProps()}
        >
          <TagLeftIcon as={IoAdd} />
          <TagLabel>{text}</TagLabel>
        </Tag>
      )}
    </chakra.label>
  );
}
