import { FormLabel, HStack, Radio, RadioGroup } from "@chakra-ui/react";
import { Gender } from "@prisma/client";
import { Controller, ControllerProps } from "react-hook-form";

type CustomRadioGenderProps = {
  label: string;
} & Omit<ControllerProps, "render">;

export default function CustomRadioGender(props: CustomRadioGenderProps) {
  const { defaultValue, label, name, ...controllerProps } = props;

  const getTextGender = (gender: string) => {
    switch (gender) {
      case Gender.MALE:
        return "Homme";
      case Gender.FEMALE:
        return "Femme";
      case Gender.OTHER:
        return "Autre";
      case Gender.UNKNOWN:
        return "Non renseigné";
    }
  };

  return (
    <>
      <FormLabel as={"legend"} htmlFor={name}>
        {label}
      </FormLabel>
      <Controller
        {...controllerProps}
        name={name}
        render={({ field }) => {
          return (
            <RadioGroup
              {...field}
              colorScheme={"purple"}
              id={name}
              as="b"
              defaultValue={defaultValue}
            >
              <HStack spacing={"0.5rem"}>
                <Radio value={Gender.MALE}>{getTextGender(Gender.MALE)}</Radio>
                <Radio value={Gender.FEMALE}>
                  {getTextGender(Gender.FEMALE)}
                </Radio>
                <Radio value={Gender.OTHER}>
                  {getTextGender(Gender.OTHER)}
                </Radio>
                <Radio value={Gender.UNKNOWN}>
                  {getTextGender(Gender.UNKNOWN)}
                </Radio>
              </HStack>
            </RadioGroup>
          );
        }}
      />
    </>
  );
}
