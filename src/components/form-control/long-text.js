import React, { useEffect, useContext } from 'react';
import {
  useColorModeValue,
  Box,
  FormControl,
  FormLabel,
  FormHelperText,
  Textarea,
} from '@chakra-ui/react';
import _ from 'lodash';
import useForm from '../../hooks/use-form';
import FormContext from '../../store/form-context';

const LongText = (props) => {
  const formColorMode = useColorModeValue('gray.700', 'gray.50');
  const { question, index } = props;

  const questionTitle = _.get(question, 'question', '');
  const questionDescription = question.description ? question.description : '';
  const questionDefaultAnswer = question.value
    ? question.value
    : '';
  const isRequired = _.get(question, 'required', false);
  const attrs = _.get(question, 'attrs', null);

  const ctx = useContext(FormContext);

  const validLongText = (value) => {
    if (value.trim().length < attrs.min || value.trim().length > attrs.max) return false;
    if (isRequired) {
      return value.trim() !== '';
    }
    return true;
  };

  // hook for valid short text
  const { value, isValid, hasError, valueBlurHandler, valueChangeHandler } =
    useForm(validLongText, questionDefaultAnswer, 'LONG_TEXT', index);

  useEffect(() => {
    ctx.setIsValidByIndex(index, isValid);
  }, [ctx, index, isValid]);

  return (
    <FormControl>
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

      <Textarea
        value={value}
        mt={1}
        rows={3}
        shadow="sm"
        focusBorderColor="brand.400"
        fontSize={{ sm: 'sm' }}
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

export default LongText;
