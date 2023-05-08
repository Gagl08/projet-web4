import {
  useCheckbox,
  chakra,
  Tag,
  TagLeftIcon,
  TagLabel,
} from '@chakra-ui/react';

import {IoAdd, IoRemove} from 'react-icons/io5';

export default function CustomCheckbox(props) {
  const {text} = props;
  const {state, getInputProps, getCheckboxProps, getLabelProps, htmlProps} =
      useCheckbox(props);

  return (
      <chakra.label variant={state.isChecked ? 'solid' : 'outline'}
                    cursor="pointer" {...htmlProps}>
        <input {...getInputProps()} hidden/>

        <Tag {...getCheckboxProps()} variant={state.isChecked ? "solid" : "outline"} {...getLabelProps()}>
          {state.isChecked
           ? <TagLeftIcon as={IoRemove}/>
           : <TagLeftIcon as={IoAdd}/>
          }
          <TagLabel>{text}</TagLabel>
        </Tag>
      </chakra.label>
  );
}
