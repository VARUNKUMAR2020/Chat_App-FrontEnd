import {
  Box,
  Container,
  Flex,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
} from '@chakra-ui/react';
import React, { useEffect } from 'react';
import Login from '../Components/Authentication/Login';
import SignUp from '../Components/Authentication/SignUp';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faArrowRightToBracket,
  faCat,
  faUserPlus,
} from '@fortawesome/free-solid-svg-icons';

const HomePage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('userInfo'));

    if (user) navigate('/chats');
  }, [navigate]);

  return (
    <Container maxW='xl' centerContent className='container-home'>
      <Box d='flex' justifyContent='center' p={3} w='100%' m='40px 0 15px 0'>
        <Text
          fontSize='4xl'
          className='heading'
          marginLeft='175px'
          color='white'
        >
          <FontAwesomeIcon icon={faCat} /> ChatCat
        </Text>
      </Box>
      <Box w='100%' p={4} borderRadius='lg'>
        <Tabs isFitted variant='soft-rounded'>
          <TabList mb='1em'>
            <Tab color='white' className='heading'>
              <FontAwesomeIcon icon={faArrowRightToBracket} className='icon' />
              Login
            </Tab>
            <Tab color='white' className='heading'>
              <FontAwesomeIcon icon={faUserPlus} className='icon' />
              Sign Up
            </Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              <Login />
            </TabPanel>
            <TabPanel>
              <SignUp />
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
    </Container>
  );
};

export default HomePage;
