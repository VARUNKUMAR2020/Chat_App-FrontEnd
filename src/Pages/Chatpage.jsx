import { Box, Flex } from '@chakra-ui/react';
import { ChatState } from '../ContextProvider/Context';
import SideDrawer from '../Components/Miscellaneous/SideDrawer';
import MyChat from '../Components/MyChat';
import ChatBox from '../Components/ChatBox';
import { useState } from 'react';

const Chatpage = () => {
  const { user } = ChatState();
  const [fetchAgain, setFetchAgain] = useState(false);

  return (
    <div style={{ width: '100%' }}>
      {user && <SideDrawer />}
      <Box>
        <Flex justifyContent='space-between' w='100%' h='91.5vh' p='10px'>
          {user && <MyChat fetchAgain={fetchAgain} />}
          {user && (
            <ChatBox fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} />
          )}
        </Flex>
      </Box>
    </div>
  );
};

export default Chatpage;
