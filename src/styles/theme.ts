import {extendTheme, withDefaultColorScheme} from '@chakra-ui/react';


const theme = extendTheme(
    {},
    withDefaultColorScheme({ colorScheme: 'purple' })
);

export default theme;