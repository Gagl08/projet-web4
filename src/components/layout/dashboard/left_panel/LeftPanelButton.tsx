import {Button, ResponsiveValue} from '@chakra-ui/react';
import {ReactJSXElement} from '@emotion/react/types/jsx-namespace';

type Props = {
  children?: ReactJSXElement | string
  onClickHandler: () => void
  leftIcon?: ReactJSXElement,
  variant?: ResponsiveValue<'link' | 'outline' | string | 'ghost' | 'solid' | 'unstyled'>
}

export default function LeftPanelButton(props: Props) {
  const {children, onClickHandler, leftIcon: icon, variant = 'ghost'} = props;

  return (
      <Button variant={variant} width={'100%'} justifyContent={'left'}
              onClick={onClickHandler} leftIcon={icon} fontWeight={'bold'}
              fontSize={'1.2rem'}>
        {children}
      </Button>
  );
}