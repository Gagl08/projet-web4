import {Button} from '@chakra-ui/react';
import {ReactJSXElement} from '@emotion/react/types/jsx-namespace';

type Props = {
  children?: ReactJSXElement
  onClickHandler: () => void
  leftIcon ?: ReactJSXElement
}

export default function LeftPanelButton(props: Props) {
  const {children, onClickHandler, leftIcon: icon} = props;

  return (
      <Button
          colorScheme={'purple'}
          variant={'ghost'}
          width={'100%'}
          justifyContent={'left'}
          onClick={onClickHandler}
          leftIcon={icon}
          fontWeight={'bold'}
          fontSize={'1.2rem'}
      >{children}</Button>
  );
}