import { Badge, Flex, Tag } from "@chakra-ui/react";

type Props = {
  passions: string[];
  userPassions?: string[];
};

export default function PassionTagList({ passions, userPassions = [] }: Props) {
  return (
    <Flex gap={"0.5rem"} mt={"1vh"}>
      {passions.map((passion, index) => (
        <Tag
          key={index}
          variant={userPassions.includes(passion) ? "subtle" : "outline"}
          colorScheme={"purple"}
        >
          {passion}
        </Tag>
      ))}
    </Flex>
  );
}
