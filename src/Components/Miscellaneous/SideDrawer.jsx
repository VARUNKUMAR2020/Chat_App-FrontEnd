import { BellIcon, ChevronDownIcon } from '@chakra-ui/icons';
import {
  Box,
  Button,
  Tooltip,
  Text,
  Menu,
  MenuButton,
  Avatar,
  MenuList,
  Flex,
  MenuItem,
  MenuDivider,
  useDisclosure,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerHeader,
  DrawerBody,
  Input,
  Spinner,
  useToast,
} from '@chakra-ui/react';
import { useState } from 'react';
import { ChatState } from '../../ContextProvider/Context';
import ProfileModal from './ProfileModel';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import ChatLoading from '../ChatLoading';
import UserListItem from '../userAvatar/UserListItem';
import { getSender } from '../../Config/ChatLogic';
import NotificationBadge from 'react-notification-badge/lib/components/NotificationBadge';
import { Effect } from 'react-notification-badge';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGolang, faSearchengin } from '@fortawesome/free-brands-svg-icons';
import { faCat, faRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import { faAddressCard, faUser } from '@fortawesome/free-regular-svg-icons';

const SideDrawer = () => {
  const [search, setSearch] = useState('');
  const [searchResult, setSearchResult] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingChat, setLoadingChat] = useState(false);

  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();
  const {
    user,
    setSelectedChat,
    chats,
    setChats,
    notification,
    setNotification,
  } = ChatState();
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('userInfo');
    navigate('/');
  };

  const handleSearch = async () => {
    if (!search) {
      toast({
        title: 'Please Enter something in search',
        status: 'warning',
        duration: 5000,
        isClosable: true,
        position: 'top-left',
      });
      return;
    }

    try {
      setLoading(true);

      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };
      const { data } = await axios.get(`/api/user?search=${search}`, config);
      setLoading(false);
      setSearchResult(data);
    } catch (error) {
      toast({
        title: 'Error Occured!',
        description: 'Failed to Load the Search Results',
        status: 'error',
        duration: 5000,
        isClosable: true,
        position: 'bottom-left',
      });
    }
  };

  const accessChat = async (userId) => {
    try {
      setLoadingChat(true);
      const config = {
        headers: {
          'Content-type': 'application/json',
          Authorization: `Bearer ${user.token}`,
        },
      };
      const { data } = await axios.post(`/api/chat`, { userId }, config);
      if (!chats.find((c) => c._id === data._id)) setChats([data, ...chats]);
      console.log(data);
      setSelectedChat(data);
      setLoadingChat(false);
      onClose();
    } catch (error) {
      toast({
        title: 'Error fetching the chat',
        description: error.message,
        status: 'error',
        duration: 5000,
        isClosable: true,
        position: 'bottom-left',
      });
    }
  };

  return (
    <>
      <Box>
        <Flex
          justifyContent='space-between'
          alignItems='center'
          backgroundColor='#121212'
          w='100%'
          p='5px 10px 5px 10px'
        >
          <Tooltip label='Search Users to chat' hasArrow placement='bottom-end'>
            <Button variant='ghost' _hover='black' onClick={onOpen}>
              <Text
                d={{ base: 'none', md: 'flex' }}
                color='white'
                className='heading'
                px={4}
              >
                <FontAwesomeIcon icon={faSearchengin} /> Search User
              </Text>
            </Button>
          </Tooltip>
          <Text fontSize='2xl' color='white' className='heading'>
            <FontAwesomeIcon icon={faCat} /> ChatCat
          </Text>
          <div>
            <Menu>
              <MenuButton p={1}>
                <NotificationBadge
                  count={notification.length}
                  effect={Effect.SCALE}
                />
                <BellIcon
                  color='white'
                  fontSize='2xl'
                  className='heading'
                  m={1}
                />
              </MenuButton>
              <MenuList pl={2} className='heading'>
                {!notification.length && 'No new Messages'}
                {notification.map((noti) => (
                  <MenuItem
                    className='heading'
                    key={noti._id}
                    onClick={() => {
                      setSelectedChat(noti.chat);
                      setNotification(notification.filter((n) => n !== noti));
                    }}
                  >
                    {noti.chat.isGroupChat
                      ? `New Message in ${noti.chat.chatName}`
                      : `New Message from ${getSender(user, noti.chat.users)}`}
                  </MenuItem>
                ))}
              </MenuList>
            </Menu>
            <Menu>
              <MenuButton
                as={Button}
                backgroundColor='#526D82'
                rightIcon={<ChevronDownIcon />}
              >
                <Avatar
                  size='sm'
                  cursor='pointer'
                  name={user.name}
                  src={user.pic}
                />
              </MenuButton>
              <MenuList>
                <ProfileModal user={user}>
                  <MenuItem color='#526D82' className='heading'>
                    <FontAwesomeIcon icon={faAddressCard} className='icon' /> My
                    Profile
                  </MenuItem>
                </ProfileModal>
                <MenuDivider />
                <MenuItem
                  color='#526D82'
                  className='heading'
                  onClick={handleLogout}
                >
                  <FontAwesomeIcon icon={faRightFromBracket} className='icon' />
                  Logout
                </MenuItem>
              </MenuList>
            </Menu>
          </div>
        </Flex>
      </Box>

      <Drawer placement='left' onClose={onClose} isOpen={isOpen}>
        <DrawerOverlay />
        <DrawerContent backgroundColor='#27374D' className='heading'>
          <DrawerHeader borderBottomWidth='1px' color='white'>
            <FontAwesomeIcon icon={faUser} className='icon' />
            Search Users
          </DrawerHeader>
          <DrawerBody marginTop={2}>
            <Box>
              <Flex pb={2}>
                <Input
                  color='white'
                  placeholder='Search by name or email'
                  mr={2}
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
                <Button onClick={handleSearch}>
                  <FontAwesomeIcon icon={faGolang} />
                </Button>
              </Flex>
            </Box>
            {loading ? (
              <ChatLoading />
            ) : (
              searchResult?.map((user) => (
                <UserListItem
                  key={user._id}
                  user={user}
                  handleFunction={() => accessChat(user._id)}
                />
              ))
            )}
            {loadingChat && <Spinner ml='auto' d='flex' />}
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default SideDrawer;
