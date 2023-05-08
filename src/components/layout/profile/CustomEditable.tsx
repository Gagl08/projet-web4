import {
  Editable,
  EditableInput,
  EditablePreview,
  FormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
} from '@chakra-ui/react';
import {Controller, ControllerProps} from 'react-hook-form';

type CustomEditableProps = {
  label: string;
  isDisabled?: boolean;
  helperText?: string;
} & Omit<ControllerProps, 'render'>;

export default function CustomEditable(props: CustomEditableProps) {
  const {
    defaultValue,
    label,
    name,
    helperText = '',
    isDisabled = false,
    ...controllerProps
  } = props;

  return (
      <Controller{...controllerProps} name={name} defaultValue={defaultValue}
                 render={({field, fieldState: {invalid, error}}) => (
                     <FormControl id={name} isInvalid={invalid}>
                       <FormLabel as="legend" htmlFor={name}>{label}</FormLabel>
                       <Editable{...field} id={name} fontWeight="bold"
                                isDisabled={isDisabled}
                                placeholder={'Non renseigné'}
                                color={isDisabled ? 'gray.500' : undefined}>
                         <EditablePreview/>
                         <EditableInput/>
                       </Editable>
                       <FormHelperText>{helperText}</FormHelperText>
                       <FormErrorMessage as="b">{error?.message}</FormErrorMessage>
                     </FormControl>
                 )}/>
  );
}
