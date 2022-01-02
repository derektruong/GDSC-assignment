import React, { useEffect, useContext } from 'react';
import {
  useColorModeValue,
  chakra,
  Box,
  SimpleGrid,
  GridItem,
  Stack,
} from '@chakra-ui/react';
import Question from './question';
import FormContext from '../../store/form-context';

const Section = (props) => {
  const ctx = useContext(FormContext);
  const { title, description, index } = props;

  useEffect(() => {
    ctx.resetQuestions(index);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [index]);

  console.log(ctx.questions);
  const questions = ctx.questions;

  return (
    <Box bg={useColorModeValue('inherit', 'inherit')}>
      <Box>
        <SimpleGrid
          display={{ base: 'initial', md: 'grid' }}
          columns={{ md: 1 }}
          spacing={{ md: 6 }}
        >
          <GridItem mt={[5, null, 0]} colSpan={{ md: 2 }}>
            <chakra.form
              method="POST"
              shadow="base"
              rounded={[null, 'md']}
              overflow={{ sm: 'hidden' }}
            >
              <Stack
                px={4}
                py={5}
                bg={useColorModeValue('white', 'gray.700')}
                spacing={6}
                p={{ sm: 6 }}
              >
                <Box textAlign="left">
                  <chakra.h4 fontWeight="bold" fontSize={20}>
                    {title}
                  </chakra.h4>
                  <chakra.p>
                    {description}
                  </chakra.p>
                </Box>

                {/* Add question here */}
                {questions && (
                  <Question questions={questions} key={'question'} />
                )}
              </Stack>
            </chakra.form>
          </GridItem>
        </SimpleGrid>
      </Box>
    </Box>
  );
};

export default Section;
