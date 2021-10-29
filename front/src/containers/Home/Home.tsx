import * as React from "react"
import { Container, Flex, Grid, Input, Box, Heading } from "@chakra-ui/react"
import { Alert } from "../../components/Alert"
import { City } from "../../components/City"
import useDebounce from "../../hooks/useDebounce"

export const Home = () => {
  const [inputValue, setInputValue] = React.useState('');
  const [cities, setCities] = React.useState({ metro: [], domtom: [] });
  const [isLoading, setIsLoading] = React.useState(false);
  const debouncedInputValue = useDebounce(inputValue, 500);

  React.useEffect(() => {
    if (debouncedInputValue) {
      setIsLoading(true);
      // Call API
      (async function () {
        try {
          setIsLoading(true)
          const response = await fetch(`http://localhost:3300/cities?q=${debouncedInputValue}`, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
            },
            mode: 'cors'
          });
          if (response.ok && response.status === 200) {
            const responseData = await response.json();
            const formattedData = { metro: [], domtom: [] };
            responseData.forEach((c: { id: number, zip: string, name: string }) => {
              if (parseInt(c.zip) >= 97000) {
                formattedData.domtom.push(c);
              } else {
                formattedData.metro.push(c);
              }
            })
            setCities(formattedData);
            console.log(formattedData);
            setIsLoading(false);
          } else {
            setCities({ metro: [], domtom: [] });
          }
        } catch (e) {
          console.log(e);
          setCities({ metro: [], domtom: [] });
        }
      })();
    } else {
      setCities({ metro: [], domtom: [] });
    }
  }, [debouncedInputValue])

  return (<Container maxW="container.xl">
    <Box p={4}>
      <Flex backgroundColor="#D2E5E9" borderRadius={5} p={2}>
        <Heading size="xl" as="p" display="inline-block" minW="250">Je recherche...</Heading>
        <Input
          display="inline-block"
          minW="150"
          backgroundColor="white"
          placeholder="...une ville un code postal"
          size="lg"
          variant="outlined"
          onChange={(e) => setInputValue(e.target.value)}
        />
      </Flex>
      <Grid templateColumns="repeat(2, 1fr)" gap={6} mt={5}>
        <Box backgroundColor="#D2E5E9" borderRadius={5} p={10}>
          <Heading as="p" mb="5">Villes métropole</Heading>
          <Alert count={cities.metro.length} />
          <Grid templateColumns="repeat(2, 1fr)" gap={6}>
            {cities.metro.map((c) => (
              <City key={c.id} city={c} />
            ))}
          </Grid>
        </Box>
        <Box backgroundColor="#D2E5E9" borderRadius={5} p={10}>
          <Heading as="p" mb="5">Villes d'outre-mer</Heading>
          <Alert count={cities.domtom.length} />
          <Grid templateColumns="repeat(2, 1fr)" gap={6}>
            {cities.domtom.map((c) => (
              <City key={c.id} city={c} />
            ))}
          </Grid>
        </Box>
      </Grid>
    </Box >
  </Container>)
}