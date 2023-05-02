import {
  Editable,
  EditablePreview,
  FormControl,
  FormHelperText,
  FormLabel,
  UseEditableProps,
} from "@chakra-ui/react";

type CustomEditableProps = {
  id: string;
  label: string;
  helperText?: string;
} & UseEditableProps;

export default function CustomEditable(props: CustomEditableProps) {
  const { label, id, helperText = "", ...UseEditableProps } = props;

  return (
    <FormControl>
      <FormLabel as="legend" htmlFor={id}>
        {label}
      </FormLabel>
      <Editable
        {...UseEditableProps}
        fontWeight="bold"
        isDisabled={true}
        placeholder={"Non renseigné"}
        color={"gray.500"}
      >
        <EditablePreview />
      </Editable>
      <FormHelperText>{helperText}</FormHelperText>
    </FormControl>
  );
}
