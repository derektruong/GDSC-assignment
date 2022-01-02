import React, { useEffect, useContext } from 'react';
import {
  useColorModeValue,
  Box,
  FormControl,
  FormLabel,
  FormHelperText,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
} from '@chakra-ui/react';
import _ from 'lodash';
import FormContext from '../../store/form-context';

const Number = (props) => {
  const formColorMode = useColorModeValue('gray.700', 'gray.50');
  const { question, index } = props;

  const questionTitle = _.get(question, 'question', '');
  const questionDescription =
    question && question.description ? question.description : '';
  const isRequired = _.get(question, 'required', false);
  const attrs = _.get(question, 'attrs', null);
  const questionDefaultAnswer =
    question && question.value
      ? question.value
      : attrs.min;

  const ctx = useContext(FormContext);

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

      {attrs && (
        <NumberInput
          step={1}
          defaultValue={questionDefaultAnswer}
          min={attrs.min}
          max={attrs.max}
          onChange={(value) => {
            ctx.setValueByIndex(index, value);
          }}
        >
          <NumberInputField />
          <NumberInputStepper>
            <NumberIncrementStepper />
            <NumberDecrementStepper />
          </NumberInputStepper>
        </NumberInput>
      )}
    </FormControl>
  );
};

export default Number;
