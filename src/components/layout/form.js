import React, { useState, useEffect, useRef } from 'react';
import {
  useColorMode,
  useColorModeValue,
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

const Form = (props) => {
  const { toggleColorMode } = useColorMode();
  const bg = useColorModeValue('gray.100', 'gray.800');
  const SwitchIcon = useColorModeValue(FaMoon, FaSun);
  const [sectionOrderState, setSectionOrderState] = useState(1);
  const [mainTitle, setMainTitle] = useState('');
  const [mainDescription, setMainDescription] = useState('');
  const [numOfSections, setNumOfSections] = useState(0);

  useEffect(() => {
    try {
      const getData = async () => {
        try {
          const res = await axios.get(
            'https://gist.githubusercontent.com/bittermeatball/7854f3d7950469b0203a068fcaf27908/raw/1de87462c4f8c2fd0bfb9d452b246c92697b2eee/sample.json'
          );
          const data = res.data;
          setMainTitle(_.get(data, 'title', ''));
          setMainDescription(_.get(data, 'description', ''));
          setNumOfSections(_.get(data, 'sections.length', 0));
          console.log(data);
        } catch (error) {
          throw new Error(error);
        }
      };

      getData();
    } catch (error) {
      console.log(error);
    }
  }, []);

  const clickBackHandler = () => {
    setSectionOrderState(sectionOrderState - 1);
  };

  const clickNextHandler = () => {
    setSectionOrderState(sectionOrderState + 1);
  };

  console.log(sectionOrderState);

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
            {sectionOrderState > 1 && (
              <Button
                leftIcon={<IoChevronBackCircleOutline />}
                colorScheme="blue"
                variant="outline"
                onClick={clickBackHandler}
              >
                Back
              </Button>
            )}
            {sectionOrderState < numOfSections && (
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
          <Section />
        </Box>
      </Flex>
    </React.Fragment>
  );
};

export default Form;
