import {
  Box,
  Button,
  ButtonGroup,
  ChakraProvider,
  Container,
  Flex,
  Heading,
  VStack,
  useColorModeValue,
  useDisclosure,
  Text,
  HStack,
  Tag,
  Grid,
} from "@chakra-ui/react";
import { FC, useEffect, useState } from "react";
import { IoShirt } from "react-icons/io5";
import { GiClothes } from "react-icons/gi";
import CreateItem from "./CreateItem";

import CreateOutfit from "./CreateOutfit";
import { authStore } from "../../store/authStore";
import { deleteOutfit, getOutfit, getOutfits } from "../../services/outfit";
import { useMutation, useQuery } from "react-query";
import Carousel from "../../components/ui/Carousel";
import ChakraCarousel from "../../components/ui/ChakraCarousel";
import { capsFirst } from "../../services/utils";
import { FcLikePlaceholder } from "react-icons/fc";
import { MdOutlineStarRate } from "react-icons/md";
import { RiDeleteBin2Line } from "react-icons/ri";
import { IoIosInformationCircleOutline } from "react-icons/io";

const Closet: FC = () => {
  const {
    isOpen: isOpenitem,
    onOpen: onOpenItem,
    onClose: onCloseItem,
  } = useDisclosure();
  const {
    isOpen: isOpenOutfit,
    onOpen: onOpenOutfit,
    onClose: onCloseOutfit,
  } = useDisclosure();

  const { userId } = authStore((state) => state);
  const [outfitsImages, setOutfitsImages] = useState<string[][]>([]);
  const [outfits, setOutfits] = useState<any[]>([]);

  useQuery({
    queryKey: ["outfits", { userId: userId }],
    queryFn: () => getOutfits({ userId: userId }),
    onSuccess: (data) => {
      const imagesOutfit = data?.map((outfit: any) => {
        return outfit.clothes.map((clothe: any) => {
          return clothe.clothe.images[0].file;
        });
      });
      setOutfitsImages(imagesOutfit);

      const dataClothes = data?.map((clothe: any) => {
        return clothe;
      });
      setOutfits(dataClothes);
    },
  });

  console.log(outfits);

  const { mutate: deleteOutfitMutate } = useMutation((id: string) =>
    deleteOutfit(id)
  );

  const [data, setData] = useState<any[]>([]);

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/posts/")
      .then((res) => res.json())
      .then((res) => setData(res));
  }, []);

  const handleDeleteOutfit = (outfitId: string) => {
    deleteOutfitMutate(outfitId);
  };

  const handleOutfitColorScheme = () => {
    const colorScheme = outfits.map((outfit: any) => {
      return outfit.colorScheme;
    });
    return colorScheme;
  };

  const handleOutfitNotes = () => {
    const notes = outfits.map((outfit: any) => {
      return outfit.notes;
    });
    return notes;
  };

  return (
    <>
      <Box display="grid" gap={4}>
        <img
          src="https://www.thecreativecurator.com/wp-content/uploads/2021/07/types-of-clothes-guide-to-clothing-types.jpg.webp"
          alt=""
        />
        <ButtonGroup>
          <Button
            onClick={onOpenItem}
            rightIcon={<IoShirt />}
            bg={useColorModeValue("pink.300", "black")}
            w={"100%"}
          >
            Add Item
          </Button>
          <Button
            onClick={onOpenOutfit}
            rightIcon={<GiClothes />}
            bg={useColorModeValue("pink.300", "black")}
            w={"100%"}
          >
            Create Outfit
          </Button>
        </ButtonGroup>

        <CreateItem isOpen={isOpenitem} onClose={onCloseItem} />
        <CreateOutfit isOpen={isOpenOutfit} onClose={onCloseOutfit} />
        {/* {outfits.map((outfit, index) => (
          <Carousel key={index} images={outfit}></Carousel>
        ))} */}

        <ChakraProvider>
          <Container
            py={8}
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
              {outfitsImages.map((images: any, index: number) => (
                <Flex
                  key={index}
                  boxShadow="rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px"
                  justifyContent="space-between"
                  gap={10}
                  flexDirection={{ base: "column", md: "row" }}
                  overflow="hidden"
                  color="gray.300"
                  bg="base.d100"
                  rounded={5}
                  flex={1}
                  p={5}
                >
                  <Grid>
                    {/* <Flex> */}
                    <Heading
                      // fontSize={{ base: "xl", md: "2xl" }}
                      fontSize={"xl"}
                      textAlign="left"
                      mb={2}
                    >
                      {capsFirst(handleOutfitColorScheme()[index])}
                    </Heading>{" "}
                    {/* </Flex> */}
                    <div
                      style={{
                        alignContent: "center",
                        display: "grid",
                        gridTemplateColumns: "repeat(3, 1fr)",
                      }}
                    >
                      {images.map((image: any, index: number) => (
                        <img
                          key={index}
                          src={image}
                          alt=""
                          style={{ width: "100px", height: "100px" }}
                        />
                      ))}
                    </div>
                  </Grid>

                  <Flex
                    justifyContent="space-between"
                    gap={8}
                    // flexDirection={{
                    //   base: "row",
                    //   md: "column",
                    // }}
                    flexDirection={"column"}
                    // border={"1px solid "}
                    w={"100%"}
                  >
                    <Box
                      bg={useColorModeValue("pink.100", "gray.100")}
                      p={2}
                      borderRadius={5}
                    >
                      <Text
                        color={useColorModeValue("black", "white")}
                        fontSize={12}
                        textAlign={"left"}
                      >
                        Notes:
                      </Text>
                      <Text
                        fontSize={12}
                        color={useColorModeValue("black", "white")}
                        textAlign={"left"}
                      >
                        {handleOutfitNotes()[index]}
                      </Text>
                    </Box>

                    <Flex
                      gap={2}
                      flexDirection={{
                        base: "row",
                        md: "column",
                      }}
                      // border={"1px solid "}
                      alignItems={"end"}
                    >
                      <Button
                        // onClick={() => alert(`Post ${post.id - 5} clicked`)}
                        bg={useColorModeValue("pink.200", "black")}
                        fontWeight="bold"
                        color="gray.900"
                        size="sm"
                      >
                        <IoIosInformationCircleOutline
                          style={{ marginRight: "5px" }}
                          size={16}
                        />
                        More
                      </Button>
                      <Tag
                        size="sm"
                        variant="outline"
                        colorScheme="blackAlpha"
                        height={"32px"}
                      >
                        <Text>Rating: {3}</Text>
                        <MdOutlineStarRate
                          style={{ marginBottom: "3px", marginLeft: "2px" }}
                          color="pink"
                          size={16}
                        />
                      </Tag>
                    </Flex>
                  </Flex>
                </Flex>
              ))}
            </ChakraCarousel>
          </Container>
        </ChakraProvider>
      </Box>
    </>
  );
};
export default Closet;
