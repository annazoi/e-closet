import { FC, useState } from "react";
import { authStore } from "../../store/authStore";
import { useQuery } from "react-query";
import { getClothes } from "../../services/clothe";
import {
  ChakraProvider,
  Container,
  Heading,
  useColorModeValue,
} from "@chakra-ui/react";
import ChakraCarousel from "../ui/ChakraCarousel";
import { Clothe } from "../../interfaces/clothe";
import ClotheCard from "../ui/ClotheCard";
import { CLOTHE_TYPES, CLOTHE_TYPES_ARRAY } from "../../constants/clotheTypes";
import { OptionItem } from "../../interfaces/components";

interface CategorizedClothes {
  [key: string]: any[];
}

const Clothes: FC = () => {
  const { userId } = authStore((state) => state);
  const [clothes, setClothes] = useState<CategorizedClothes>();

  useQuery({
    queryKey: ["clothes", { userId: userId }],
    queryFn: () => getClothes({ userId: userId }),
    onSuccess: (data) => {
      categorizeClothes(data);
    },
  });

  const categorizeClothes = (data: Clothe[]) => {
    let tempClothes: { [key: string]: any[] } = {};

    for (let i = 0; i < CLOTHE_TYPES_ARRAY.length; i++) {
      tempClothes[CLOTHE_TYPES_ARRAY[i]] = [];
      for (let j = 0; j < data?.length; j++) {
        if (CLOTHE_TYPES_ARRAY[i] === data[j]?.type) {
          tempClothes[CLOTHE_TYPES_ARRAY[i]].push(data[j]);
        }
      }
    }
    setClothes(tempClothes);
  };
  return (
    <>
      {CLOTHE_TYPES.map((item: OptionItem, index: number) => (
        <>
          <Heading
            size="l"
            textAlign="start"
            // mt={10}
            color={useColorModeValue("pink.200", "gray.200")}
          >
            My Closet
          </Heading>
          {clothes && clothes[item.value] && clothes[item.value].length > 0 && (
            <div key={index}>
              <Heading
                size="xl"
                textAlign="start"
                // mt={10}
                color={useColorModeValue("pink.200", "gray.200")}
              >
                {item.label}
              </Heading>

              <ChakraProvider>
                <Container
                  //   py={8}
                  px={0}
                  maxW={{
                    base: "20rem",
                    md: "43.75rem",
                  }}
                  minW={{ base: "100%" }}
                >
                  <ChakraCarousel gap={32}>
                    {clothes[item.value].map(
                      (clothe: Clothe, index: number) => (
                        <ClotheCard key={index} clothe={clothe} />
                      )
                    )}
                  </ChakraCarousel>
                </Container>
              </ChakraProvider>
            </div>
          )}
        </>
      ))}
    </>
  );
};

export default Clothes;
