import {Badge, Flex} from '@chakra-ui/react';

type Props = {
  passions: string[],
  userPassions?: string[]
}

export default function PassionBadgeList({passions, userPassions = []}: Props) {
  return (
      <Flex gap={'0.5rem'} mt={'1vh'}>
        {passions.map((passion, index) =>
            <Badge key={index} colorScheme={
              userPassions.includes(passion) ? 'purple' : 'ghost'
            }
            >#{passion}</Badge>,
        )}
      </Flex>
  );
}