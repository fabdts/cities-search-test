import * as React from 'react'
import { Box, Flex, Spacer } from "@chakra-ui/react";


export const City = ({ city }) => (
  <Box backgroundColor="#161C29A1" p={4}>
    <Flex fontSize="lg" fontWeight="medium">
      <Box color="white">
        {city.name}
      </Box>
      <Spacer />
      <Box color="#8C8F9A">
        {city.zip}
      </Box>
    </Flex>
  </Box>
)
