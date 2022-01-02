import React, { useEffect, useContext } from 'react';
import {
  useColorModeValue,
  Box,
  FormControl,
  FormLabel,
  FormHelperText,
  Input,
} from '@chakra-ui/react';
import _ from 'lodash';
import useForm from '../../hooks/use-form';
import FormContext from '../../store/form-context';

const ShortText = (props) => {
  const formColorMode = useColorModeValue('gray.700', 'gray.50');
  const { question, index } = props;
  
  const questionTitle = _.get(question, 'question', '');
  const questionDescription = question.description ? question.description : '';
  const questionDefaultAnswer = question.value ? question.value : '';
  const isRequired = _.get(question, 'required', false);
  
  const ctx = useContext(FormContext);

  const validShortText = (value) => {
    if (isRequired) {
      return value.trim() !== '';
    }
    return true;
  };

  // hook for valid short text
  const { value, isValid, hasError, valueBlurHandler, valueChangeHandler } =
    useForm(validShortText, questionDefaultAnswer, 'SHORT_TEXT', index);

  useEffect(() => {
    console.log(isValid);
    ctx.setIsValidByIndex(index, isValid);
  }, [ctx, index, isValid]);

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
      <Input
        type="text"
        value={value}
        placeholder={questionDefaultAnswer}
        onBlur={valueBlurHandler}
        onChange={valueChangeHandler}
      />
      {hasError && (
        <FormHelperText textAlign="left" color="tomato" fontSize="sm">
          {'Cần điền thông tin vào ô này'}
        </FormHelperText>
      )}
    </FormControl>
  );
};

export default ShortText;
