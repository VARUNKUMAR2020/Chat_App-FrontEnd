{
  /* <Box className='App'>
<Center>
  <Stack spacing='4'>
    <VStack as='header' spacing='6' mt='8'>
      <img
        className='image'
        src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRR_e9nHB9cxvciyHsbsyia5IiafFiA5xRA4jEfuD7QHxtW2MAD1ojMfxX2m3XUKglXtEg&usqp=CAU'
        alt='logo'
      />
      <Heading
        as='h1'
        fontWeight='500'
        fontFamily="'Lato', sans-serif"
        fontSize='24px'
        color='white'
        letterSpacing='-0.5px'
      >
        Sign in to ChatCat
      </Heading>
    </VStack>
    <Card bg='#181818' variant='outline' borderColor='#d8dee4' w='308px'>
      <CardBody>
        <form>
          <Stack spacing='4'>
            <FormControl>
              <FormLabel size='sm' color='white'>
                Email address
              </FormLabel>
              <Input
                type='text'
                bg='white'
                borderColor='#d8dee4'
                size='sm'
                borderRadius='6px'
                onChange={(e) => setEmail(e.target.value)}
              />
            </FormControl>
            <FormControl>
              <HStack justify='space-between'>
                <FormLabel size='sm' color='white'>
                  Password
                </FormLabel>
                <Button
                  as='a'
                  href='#'
                  variant='link'
                  size='xs'
                  color='#0969da'
                  fontWeight='500'
                >
                  Forgot password?
                </Button>
              </HStack>
              <Input
                type='password'
                bg='white'
                borderColor='#d8dee4'
                size='sm'
                borderRadius='6px'
                onChange={(e) => setPassword(e.target.value)}
              />
            </FormControl>

            <Button
              bg='#2da44e'
              color='white'
              fontWeight='550'
              size='sm'
              _hover={{ bg: '#2c974b' }}
              _active={{ bg: '#298e46' }}
              onClick={loginUser}
              isLoading={loading}
            >
              Sign in
            </Button>
          </Stack>
        </form>
      </CardBody>
    </Card>

    <Card variant='outline' bg='#181818' borderColor='#d0d7de'>
      <CardBody>
        <Center>
          <HStack fontSize='sm' spacing='1'>
            <Text color='white'>New to ChatCat?</Text>
            <Link id='link-text' to='/signup'>
              <span id='span-text'>Create an account.</span>
            </Link>
          </HStack>
        </Center>
      </CardBody>
    </Card>
  </Stack>
</Center>
<Center as='footer' mt='16'>
  <HStack spacing='4' pt='2'>
    <Link className='link-text' color='white' href='#' fontSize='xs'>
      Terms
    </Link>
    <Link className='link-text' color='#0969da' href='#' fontSize='xs'>
      Privacy
    </Link>
    <Link className='link-text' color='#0969da' href='#' fontSize='xs'>
      Security
    </Link>
    <Link className='link-text' href='#' fontSize='xs'>
      Contact GitHub
    </Link>
  </HStack>
</Center>
</Box> */
}
