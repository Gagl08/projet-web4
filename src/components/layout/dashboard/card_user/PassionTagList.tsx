import { Badge, Flex, Tag } from "@chakra-ui/react";

type Props = {
  passions: string[];
  userPassions?: string[];
  listPassions?: Object[];
};

export default function PassionTagList({
  passions,
  userPassions = [],
  listPassions,
}: Props) {
  return (
    <Flex gap={"0.5rem"} mt={"1vh"} flexWrap="wrap">
      {passions.map((passionID, index) => (
        <Tag
          key={index}
          variant={userPassions.includes(passionID) ? "subtle" : "outline"}
          colorScheme={"purple"}
        >
          {listPassions?.find((passion) => passion.id === passionID)?.name}
        </Tag>
      ))}
    </Flex>
  );
}
