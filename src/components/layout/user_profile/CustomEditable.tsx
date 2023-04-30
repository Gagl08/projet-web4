import {
  Editable,
  EditableInput,
  EditablePreview,
  FormControl,
  FormErrorMessage,
  FormLabel,
} from "@chakra-ui/react";
import { Controller, ControllerProps } from "react-hook-form";

type CustomEditableProps = {
  label: string;
  isDisabled?: boolean;
} & Omit<ControllerProps, "render">;

export default function CustomEditable(props: CustomEditableProps) {
  const {
    defaultValue,
    label,
    name,
    isDisabled = false,
    ...controllerProps
  } = props;

  return (
    <Controller
      {...controllerProps}
      name={name}
      defaultValue={defaultValue}
      render={({ field, fieldState: { invalid, error } }) => {
        return (
          <FormControl id={name} isInvalid={invalid}>
            <FormLabel as="legend" htmlFor={name}>
              {label}
            </FormLabel>
            <Editable
              {...field}
              id={name}
              fontWeight="bold"
              isDisabled={isDisabled}
              placeholder={"Non renseigné"}
              color={isDisabled ? "gray.500" : undefined}
            >
              <EditablePreview />
              <EditableInput />
            </Editable>
            <FormErrorMessage as="b">{error?.message}</FormErrorMessage>
          </FormControl>
        );
      }}
    />
  );
}
