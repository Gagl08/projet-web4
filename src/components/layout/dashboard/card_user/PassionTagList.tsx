import {Flex, Tag} from '@chakra-ui/react';

type Props = {
  passions: string[];
  userPassions?: string[];
  listPassions?: Object[];
};

const PassionTagList = ({passions, userPassions = [], listPassions}: Props) => (
    <Flex gap={'0.5rem'} mt={'1vh'} flexWrap="wrap">
      {passions.map((passionID, index) => (
          <Tag variant={userPassions.includes(passionID) ? 'subtle' : 'outline'}
               key={index}>
            {listPassions?.find((passion) => passion.id === passionID)?.name}
          </Tag>
      ))}
    </Flex>
);

export default PassionTagList;