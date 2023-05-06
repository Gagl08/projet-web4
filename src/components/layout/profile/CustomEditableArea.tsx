import {
  Editable,
  EditablePreview,
  EditableTextarea,
  FormControl,
  FormErrorMessage,
  FormLabel,
} from '@chakra-ui/react';
import {Controller, ControllerProps} from 'react-hook-form';

type CustomEditableProps = {
  label: string;
  isDisabled?: boolean;
} & Omit<ControllerProps, 'render'>;

export default function CustomEditableArea(props: CustomEditableProps) {
  const {
    defaultValue,
    label,
    name,
    isDisabled = false,
    ...controllerProps
  } = props;

  return (
      <Controller{...controllerProps} name={name} defaultValue={defaultValue}
                 render={({field, fieldState: {invalid, error}}) => (
                     <FormControl id={name} isInvalid={invalid}>
                       <FormLabel as="legend" htmlFor={name}>{label}</FormLabel>
                       <Editable{...field} id={name} fontWeight="bold"
                                width={'100%'} isDisabled={isDisabled}
                                placeholder={'Non renseigné'}
                                color={isDisabled ? 'gray.500' : undefined}>
                         <EditablePreview/>
                         <EditableTextarea/>
                       </Editable>
                       <FormErrorMessage as="b">{error?.message}</FormErrorMessage>
                     </FormControl>
                 )}/>
  );
}
