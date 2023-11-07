import { Box } from '@chakra-ui/react';
import { ChatState } from '../ContextProvider/Context';
import SingleChat from './SingleChat';

const ChatBox = ({ fetchAgain, setFetchAgain }) => {
  const { selectedChat } = ChatState();

  return (
    <Box
      d={{ base: selectedChat ? 'flex' : 'none', md: 'flex' }}
      alignItems='center'
      flexDir='column'
      p={3}
      bg='#DDE6ED'
      w={{ base: '100%', md: '68%' }}
      borderRadius='lg'
    >
      <SingleChat fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} />
    </Box>
  );
};

export default ChatBox;
