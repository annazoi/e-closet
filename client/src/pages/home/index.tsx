import {
  Box,
  ChakraProvider,
  Container,
  Heading,
  useColorModeValue,
} from "@chakra-ui/react";
import { FC, useState } from "react";
import { getOutfits } from "../../services/outfit";
import { useQuery } from "react-query";
import ChakraCarousel from "../../components/ui/ChakraCarousel";
import OutfitCard from "../../components/ui/OutfitCard";

const Home: FC = () => {
  const [outfits, setOutfits] = useState<any[]>([]);
  useQuery({
    queryKey: ["outfits"],
    queryFn: () => getOutfits(),
    onSuccess: (data) => {
      setOutfits(data);
    },
  });

  return (
    <Box display={"grid"} placeItems={"center"} gap={5}>
      <img
        src="https://www.andagain.co.nz/cdn/shop/files/minimalist-retail-clothing-display.jpg?v=1663240556&width=1500"
        alt=""
      />

      <Heading
        fontSize={"18px"}
        textAlign="center"
        color={useColorModeValue("pink.200", "gray.200")}
      >
        Join the Fashion Revolution
      </Heading>
      <Heading
        size="xl"
        textAlign="center"
        color={useColorModeValue("pink.200", "gray.200")}
      >
        Outfits
      </Heading>
      <ChakraProvider>
        <Container
          // py={8}
          px={0}
          maxW={{
            base: "20rem",
            // sm: "35rem",
            md: "43.75rem",
            // lg: "57.5rem",
            // xl: "75rem",
            // xxl: "87.5rem",
          }}
          minW={{ base: "100%" }}
        >
          <ChakraCarousel gap={32}>
            {outfits.map((outfit, index) => (
              <OutfitCard key={index} outfit={outfit} />
            ))}
          </ChakraCarousel>
        </Container>
      </ChakraProvider>
    </Box>
  );
};
export default Home;
