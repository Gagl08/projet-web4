import {
  Box,
  FormLabel,
  Slider,
  SliderFilledTrack,
  SliderThumb,
  SliderTrack,
  Tooltip,
} from "@chakra-ui/react";
import { Controller, ControllerProps } from "react-hook-form";

import { FaWalking } from "react-icons/fa";

type CustomSliderProps = {
  label: string;
  defaultValue: [number, number];
  sliderDistanceValue: number;
  setSliderDistanceValue: React.Dispatch<React.SetStateAction<number>>;
  showTooltipDistance: boolean;
  setShowTooltipDistance: React.Dispatch<React.SetStateAction<boolean>>;
  name: string;
} & Omit<ControllerProps, "render">;

export default function CustomSlider(props: CustomSliderProps) {
  const {
    defaultValue,
    label,
    sliderDistanceValue,
    setSliderDistanceValue,
    showTooltipDistance,
    setShowTooltipDistance,
    name,
    ...controllerProps
  } = props;

  return (
    <>
      <FormLabel as={"legend"} htmlFor={name}>
        {label}
      </FormLabel>
      <Controller
        {...controllerProps}
        name={name}
        render={({ field: { onChange } }) => (
          <Slider
            aria-label={"distance"}
            min={20}
            max={100}
            id={"distance"}
            color={"pink.500"}
            defaultValue={defaultValue}
            onChange={(v) => {
              setSliderDistanceValue(v);
              onChange(v);
            }}
            onMouseEnter={() => setShowTooltipDistance(true)}
            onMouseLeave={() => setShowTooltipDistance(false)}
          >
            <SliderTrack>
              <SliderFilledTrack bgColor={"purple.500"} />
            </SliderTrack>
            <Tooltip
              hasArrow
              bg="purple.500"
              color="white"
              placement="top"
              isOpen={showTooltipDistance}
              label={`${sliderDistanceValue} km`}
            >
              <SliderThumb boxSize={6}>
                <Box color={"purple.500"} as={FaWalking} />
              </SliderThumb>
            </Tooltip>
          </Slider>
        )}
      />
    </>
  );
}
