import { Box, Button, Stack, useToast, Text, Flex } from '@chakra-ui/react';
import { ChatState } from '../ContextProvider/Context';
import { useEffect, useState } from 'react';
import { AddIcon } from '@chakra-ui/icons';
import ChatLoading from './ChatLoading';
import axios from 'axios';
import GroupChatModal from './Miscellaneous/GroupChatModel';
import { getSender } from '../Config/ChatLogic';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons';

const MyChat = ({ fetchAgain }) => {
  const [loggedUser, setLoggedUser] = useState();
  const { selectedChat, setSelectedChat, user, chats, setChats } = ChatState();

  const toast = useToast();

  const fetchChats = async () => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };

      const { data } = await axios.get('/api/chat', config);

      setChats(data);
    } catch (error) {
      toast({
        title: 'Error Occured!',
        description: 'Failed to Load the chats',
        status: 'error',
        duration: 5000,
        isClosable: true,
        position: 'bottom-left',
      });
    }
  };

  useEffect(() => {
    setLoggedUser(JSON.parse(localStorage.getItem('userInfo')));
    fetchChats();
    // eslint-disable-next-line
  }, [fetchAgain]);

  return (
    <>
      <Box
        d={{ base: selectedChat ? 'none' : 'flex', md: 'flex' }}
        flexDir='column'
        alignItems='center'
        p={3}
        backgroundColor='#526D82'
        w={{ base: '100%', md: '31%' }}
        borderRadius='lg'
      >
        <Box
          pb={3}
          px={3}
          fontSize={{ base: '18px', md: '23px' }}
          className='heading'
          d='flex'
          w='100%'
          justifyContent='space-between'
          alignItems='center'
          color='white'
        >
          <FontAwesomeIcon icon={faPenToSquare} /> My Chats
          <GroupChatModal>
            <Button
              marginLeft={170}
              fontSize={{ base: '17px', md: '10px', lg: '13px' }}
              rightIcon={<AddIcon />}
            >
              <Flex>New Group Chat</Flex>
            </Button>
          </GroupChatModal>
        </Box>
        <Box>
          <Flex
            flexDir='column'
            p={3}
            marginTop={4}
            bg='transparent'
            w='100%'
            h='75vh'
            borderRadius='lg'
            overflowY='hidden'
          >
            {chats ? (
              <Stack overflowY='scroll'>
                {chats.map((chat) => (
                  <Box
                    onClick={() => setSelectedChat(chat)}
                    cursor='pointer'
                    bg={selectedChat === chat ? '#38B2AC' : '#E8E8E8'}
                    color={selectedChat === chat ? 'white' : 'black'}
                    px={3}
                    py={2}
                    borderRadius='lg'
                    key={chat._id}
                  >
                    <Text>
                      {!chat.isGroupChat
                        ? getSender(loggedUser, chat.users)
                        : chat.chatName}
                    </Text>
                    {chat.latestMessage && (
                      <Text fontSize='xs'>
                        <b>{chat.latestMessage.sender.name} : </b>
                        {chat.latestMessage.content.length > 50
                          ? chat.latestMessage.content.substring(0, 51) + '...'
                          : chat.latestMessage.content}
                      </Text>
                    )}
                  </Box>
                ))}
              </Stack>
            ) : (
              <ChatLoading />
            )}
          </Flex>
        </Box>
      </Box>
    </>
  );
};

export default MyChat;
