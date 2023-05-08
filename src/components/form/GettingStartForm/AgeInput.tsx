import {
  Button,
  RangeSlider,
  RangeSliderFilledTrack, RangeSliderThumb,
  RangeSliderTrack, Tooltip,
} from '@chakra-ui/react';
import {useDispatch} from 'react-redux';
import {useState} from 'react';

const AgeInput = () => {
  const dispatch = useDispatch();
  const [age, setAge] = useState([18, 25]);
  return (
      <>
        <RangeSlider mb={5} min={18} max={99} step={2} value={age}
                     onChange={(newAge) => setAge(newAge)}>
          <RangeSliderTrack><RangeSliderFilledTrack/></RangeSliderTrack>
          {age.map((value, index) => (
              <Tooltip key={index} isOpen hasArrow placement={'top'}
                       label={`${value}`}>
                <RangeSliderThumb index={index}/>
              </Tooltip>
          ))}
        </RangeSlider>

        <Button onClick={() => dispatch({
          type: 'gettingStartForm/setInput',
          payload: {
            inputs: {'ages': age},
            message: `Entre ${age[0]} et ${age[1]} ans`,
          },
        })}>Envoyer</Button>

      </>
  );
};

export default AgeInput;