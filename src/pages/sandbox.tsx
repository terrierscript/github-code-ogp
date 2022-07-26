import { Box, Center } from '@chakra-ui/react'
import Head from 'next/head'
import React from 'react'
// import { CodeSample } from '../compoents/Code'
import dynamic from "next/dynamic"


const codeString = `
function formatName(user) {
  return user.firstName + ' ' + user.lastName;
}

const user = {
  firstName: 'Harper',
  lastName: 'Perez'
};

const element = (
  <h1>
    Hello, {formatName(user)}!
  </h1>
);
`
const DynamicCode = dynamic(import('../compoents/Code'), {
  ssr: false
})

export default function Sandbox() {
  return (
    <Box>
      <Head>
        <title></title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Center flex={1} h="100vh">
        <Box>
          <DynamicCode codeString={codeString} />
        </Box>
      </Center>
    </Box>
  )
}
