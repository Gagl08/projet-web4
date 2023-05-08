import {
  Box,
  FormLabel,
  RangeSlider,
  RangeSliderFilledTrack,
  RangeSliderThumb,
  RangeSliderTrack,
  Tooltip,
} from '@chakra-ui/react';
import {Controller, ControllerProps} from 'react-hook-form';

import {FaGreaterThan, FaLessThan} from 'react-icons/fa';

type CustomRangeSliderProps = {
  label: string;
  defaultValue: [number, number];
  sliderAgeValue: number[];
  setSliderAgeValue: React.Dispatch<React.SetStateAction<number[]>>;
  showTooltipAge: boolean;
  setShowTooltipAge: React.Dispatch<React.SetStateAction<boolean>>;
  name: string;
} & Omit<ControllerProps, 'render'>;

export default function CustomRangeSlider(props: CustomRangeSliderProps) {
  const {
    defaultValue,
    label,
    setSliderAgeValue,
    setShowTooltipAge,
    showTooltipAge,
    sliderAgeValue,
    name,
    ...controllerProps
  } = props;

  return (
      <>
        <FormLabel as={'legend'} htmlFor={name}>{label}</FormLabel>
        <Controller{...controllerProps} name={name}
                   render={({field: {onChange}}) => (
                       <RangeSlider aria-label={['min', 'max']} min={18}
                                    max={99}
                                    id={name} color={'pink.500'}
                                    defaultValue={defaultValue}
                                    onChange={(v: [number, number]) => {
                                      setSliderAgeValue(v);
                                      onChange(v);
                                    }}
                                    onMouseEnter={() => setShowTooltipAge(true)}
                                    onMouseLeave={() => setShowTooltipAge(false)}>
                         <RangeSliderTrack>
                           <RangeSliderFilledTrack bgColor={'purple.500'}/>
                         </RangeSliderTrack>
                         <Tooltip hasArrow bg="purple.500" color="white"
                                  placement="top" isOpen={showTooltipAge}
                                  label={`${sliderAgeValue[0]}`}>
                           <RangeSliderThumb boxSize={6} index={0}>
                             <Box color={'purple.500'} as={FaLessThan}/>
                           </RangeSliderThumb>
                         </Tooltip>

                         <Tooltip hasArrow bg="purple.500" color="white"
                                  placement="top" isOpen={showTooltipAge}
                                  label={`${sliderAgeValue[1]}`}>
                           <RangeSliderThumb boxSize={6} index={1}>
                             <Box color={'purple.500'} as={FaGreaterThan}/>
                           </RangeSliderThumb>
                         </Tooltip>
                       </RangeSlider>
                   )}/>
      </>
  );
}
