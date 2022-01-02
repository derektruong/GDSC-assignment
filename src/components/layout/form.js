import React, { useState, useEffect, useContext } from 'react';
import {
  useColorMode,
  useColorModeValue,
  useToast,
  chakra,
  Box,
  Stack,
  IconButton,
  Button,
  Flex,
} from '@chakra-ui/react';
import { FaMoon, FaSun } from 'react-icons/fa';
import {
  IoChevronBackCircleOutline,
  IoChevronForwardCircleOutline,
} from 'react-icons/io5';
import _ from 'lodash';
import axios from 'axios';
import Section from './section';
import FormContext from '../../store/form-context';

const Form = React.memo((props) => {
  const { toggleColorMode } = useColorMode();
  const toast = useToast();
  const bg = useColorModeValue('gray.200', 'gray.800');
  const SwitchIcon = useColorModeValue(FaMoon, FaSun);
  const ctx = useContext(FormContext);
  const [sectionOrderState, setSectionOrderState] = useState(0);
  const [formData, setFormData] = useState({});

  useEffect(() => {
    try {
      const getData = async () => {
        try {
          const res = await axios.get(
            'https://gist.githubusercontent.com/bittermeatball/7854f3d7950469b0203a068fcaf27908/raw/1de87462c4f8c2fd0bfb9d452b246c92697b2eee/sample.json'
          );

          setFormData(res.data);
        } catch (error) {
          throw new Error(error);
        }
      };

      getData();
    } catch (error) {
      console.log(error);
    }
  }, []);

  useEffect(() => {
    if (formData.sections) {
      ctx.resetSections(formData.sections);
    }
  }, [ctx, formData.sections]);

  const mainTitle = _.get(formData, 'title', '');
  const mainDescription = _.get(formData, 'description', '');
  const numOfSections = _.get(formData, 'sections.length', 0);

  const clickBackHandler = () => {
    ctx.updateQuestionsToSections(sectionOrderState);
    setSectionOrderState(sectionOrderState - 1);
  };

  const clickNextHandler = () => {
    const res = ctx.checkFormValid(sectionOrderState);
    if (!res) {
      (() =>
        toast({
          title: 'Đã xảy ra lỗi',
          description: 'Có lỗi xảy ra, kiểm tra lại các ô có hợp lệ hay không',
          position: 'top-right',
          status: 'error',
          duration: 5000,
          isClosable: true,
        }))();
      return;
    }
    if (res) {
      ctx.updateQuestionsToSections(sectionOrderState);
      setSectionOrderState(sectionOrderState + 1);
    }
  };

  return (
    <React.Fragment>
      <IconButton
        pos={{ base: 'relative', md: 'fixed' }}
        size="md"
        fontSize="lg"
        aria-label={`Switch to ${bg} mode`}
        variant="ghost"
        color="current"
        m={{ base: '0', md: '3' }}
        onClick={toggleColorMode}
        icon={<SwitchIcon />}
      />
      <Flex
        direction={{ base: 'column', md: 'row' }}
        bg={bg}
        px={{ base: '2%', md: '10%' }}
        py={24}
        mx="auto"
        w={{ base: 'full', md: 'full' }}
        h="100vh"
      >
        <Box
          pos={{ base: 'relative', md: 'fixed' }}
          maxWidth={{ base: 'auto', md: '30%' }}
          w={{ base: 'full', md: 11 / 12, xl: 9 / 12 }}
          mx="auto"
          pr={{ md: 20 }}
        >
          <chakra.h2
            fontSize={{ base: '3xl', sm: '4xl' }}
            fontWeight="extrabold"
            lineHeight="shorter"
            color={useColorModeValue('gray.700', 'gray.100')}
            mb={6}
          >
            {mainTitle}
          </chakra.h2>
          <chakra.p
            mb={6}
            fontSize={{ base: 'lg', md: 'xl' }}
            color={useColorModeValue('gray.500', 'gray.200')}
          >
            {mainDescription}
          </chakra.p>
          <Stack direction="row">
            {sectionOrderState > 0 && (
              <Button
                leftIcon={<IoChevronBackCircleOutline />}
                colorScheme="blue"
                variant="outline"
                onClick={clickBackHandler}
              >
                Back
              </Button>
            )}
            {sectionOrderState < numOfSections - 1 && (
              <Button
                rightIcon={<IoChevronForwardCircleOutline />}
                colorScheme="blue"
                variant="outline"
                onClick={clickNextHandler}
              >
                Next
              </Button>
            )}
          </Stack>
        </Box>
        <Box
          w={{ base: 'full' }}
          mx="auto"
          ml={{ md: '40%' }}
          textAlign="center"
        >
          {ctx.sections.length >= 1 && (
            <Section
              title={
                ctx.sections[sectionOrderState].title
                  ? ctx.sections[sectionOrderState].title
                  : ''
              }
              description={
                ctx.sections[sectionOrderState].description
                  ? ctx.sections[sectionOrderState].description
                  : ''
              }
              index={sectionOrderState}
              questions={
                ctx.sections && ctx.sections[sectionOrderState].questions
                  ? ctx.sections[sectionOrderState].questions
                  : []
              }
            />
          )}
        </Box>
      </Flex>
    </React.Fragment>
  );
});

export default Form;
