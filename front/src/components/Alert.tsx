import * as React from 'react'
import { Box, Text } from "@chakra-ui/react";


export const Alert = ({ count }) => (
  <Box backgroundColor={count ? '#39BB37A1' : '#BB3737A1'} p={4} mb={5}>
    {count ?
      <Text color="white" fontWeight="bold" fontSize="lg">
        {count} villes correspondant au texte saisi
      </Text>
      :
      <Text color="white" fontWeight="bold" fontSize="lg">
        Aucune ville correspondant au texte saisi
      </Text>
    }
  </Box>
)
