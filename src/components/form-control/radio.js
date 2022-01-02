import React, { useEffect, useContext } from 'react';
import {
  useColorModeValue,
  Stack,
  Box,
  FormControl,
  FormLabel,
  FormHelperText,
  RadioGroup,
  Radio,
} from '@chakra-ui/react';
import _ from 'lodash';
import useForm from '../../hooks/use-form';
import FormContext from '../../store/form-context';

const RadioControl = (props) => {
  const formColorMode = useColorModeValue('gray.700', 'gray.50');
  const { question, index } = props;

  const questionTitle = _.get(question, 'question', '');
  const questionDescription = question.description ? question.description : '';
  const questionDefaultAnswer = question.value
    ? question.value.toString()
    : '';
  const isRequired = _.get(question, 'required', false);
  const questionOptions = _.get(question, 'options', []);

  const ctx = useContext(FormContext);

  const validRadio = (value) => {
    if (isRequired) {
      return value !== '';
    }
    return true;
  };

  // hook for valid short text
  const { value, isValid, hasError, valueBlurHandler, valueChangeHandler } =
    useForm(validRadio, questionDefaultAnswer, 'RADIO', index);

  useEffect(() => {
    ctx.setIsValidByIndex(index, isValid);
  }, [ctx, index, isValid]);

  const radioOptions = questionOptions.map((option, index) => {
    return (
      <Radio value={option.value.toString()} key={index}>
        {option.text}
      </Radio>
    );
  });

  return (
    <FormControl isRequired={isRequired}>
      <Box mb={1}>
        <FormLabel fontSize="sm" fontWeight="md" color={formColorMode} my={0}>
          {questionTitle}
        </FormLabel>
        {questionDescription && (
          <FormHelperText textAlign="left" my={0}>
            {questionDescription}
          </FormHelperText>
        )}
      </Box>

      <RadioGroup value={value} onChange={valueChangeHandler} onBlur={valueBlurHandler}>
        <Stack direction="column">{radioOptions}</Stack>
      </RadioGroup>
      {hasError && (
        <FormHelperText textAlign="left" color="tomato" fontSize="sm">
          {'Cần chọn đúng'}
        </FormHelperText>
      )}
    </FormControl>
  );
};

export default RadioControl;
