import { FC, useEffect, useState } from "react";
import { ResizableBox, Resizable } from "react-resizable";
import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Box,
  Image,
  Stack,
  HStack,
  ModalBody,
  ModalFooter,
  Button,
  useColorModeValue,
  VStack,
  useToast,
} from "@chakra-ui/react";
import React from "react";
import "./style.css";
import { useMutation, useQuery } from "react-query";
import { authStore } from "../../../store/authStore";
import { Clothe } from "../../../interfaces/clothe";
import { ClotheCategories } from "../../../enums/clothes";
import Canvas from "../../../components/ui/Canvas";
import { CLOTHE_TYPES_ARRAY } from "../../../constants/clotheTypes";
import Modal from "../../../components/ui/Modal";
import { getClothes } from "../../../services/clothe";
import { NewOutfit } from "../../../interfaces/outfit";
import { createOutfit } from "../../../services/outfit";

// {
//  shirts:[{images:[],type:'',season:[]},{images:[],type:'',season:[]}],
//   pants:[],
//   shoes:[{},{}]
// }

interface CreateOutfitProps {
  isOpen: any;
  onClose: any;
}

interface CategorizedClothes {
  [key: string]: any[];
}

const CreateOutfit: FC<CreateOutfitProps> = ({ isOpen, onClose }) => {
  const { userId } = authStore((state) => state);
  const [clothes, setClothes] = useState<CategorizedClothes>();
  const [selectedClothes, setSelectedClothes] = useState<Clothe[]>([]);

  const [boxWidth, setBoxWidth] = React.useState(400);
  const [boxHeight, setBoxHeight] = React.useState(400);
  const [topBoxWidth, setTopBoxWidth] = React.useState(400);
  const [topBoxHeight, setTopBoxHeight] = React.useState(400);

  const toast = useToast();

  useQuery(
    "clothes",
    () => getClothes({ userId: userId }),

    {
      onSuccess: (data) => {
        categorizeClothes(data);
      },
    }
  );

  const { mutate: CreateOutfitMutate, isLoading: CreateOutfitIsLoading } =
    useMutation({
      mutationFn: ({ shirt, pant, shoes }: NewOutfit) =>
        createOutfit({ shirt, pant, shoes }),
    });

  useEffect(() => {
    // console.log("clothes", clothes);
  }, [clothes]);

  const handleSelectedClothes = (clothe: Clothe) => {
    const existingClothe = selectedClothes.find(
      (item) => item.id === clothe.id
    );
    const existingType = selectedClothes.find(
      (item) => item.type === clothe.type
    );
    if (existingClothe) {
      setSelectedClothes(
        selectedClothes.filter((item) => item.id !== clothe.id)
      );
      return;
    }
    if (existingType) {
      return;
    }
    setSelectedClothes([...selectedClothes, clothe]);
  };

  const categorizeClothes = (data: Clothe) => {
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

  const handleNewOutfit = () => {
    CreateOutfitMutate(
      {
        shirt: selectedClothes.find(
          (item: any) => item.type === ClotheCategories.TOP_AND_T_SHIRTS
        )?.id as string,
        pant: selectedClothes.find(
          (item: any) => item.type === ClotheCategories.BOTTOMS_AND_LEGGINGS
        )?.id as string,
        shoes: selectedClothes.find(
          (item: any) => item.type === ClotheCategories.SHOES_AND_SOCKS
        )?.id as string,
      },
      {
        onSuccess: () => {
          toast({
            title: "Outfit created successfully",
            status: "success",
          });
          onClose();
        },
        onError: (error) => {
          console.log(error);
        },
      }
    );
  };
  console.log("selectedClothes", selectedClothes);

  // const onResize = (
  //   event: React.SyntheticEvent,
  //   { size }: { size: { width: number; height: number } }
  // ) => {
  //   // console.log("Resized:", size);
  //   setBoxWidth(size.width);
  //   setBoxHeight(size.height);
  // };

  // const onMiddleResize = (
  //   event: React.SyntheticEvent,
  //   { size }: { size: { width: number; height: number } }
  // ) => {
  //   // console.log("Resized:", size);
  //   setTopBoxWidth(size.width);
  //   setTopBoxHeight(size.height);
  // };

  return (
    <>
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        title="Create an item from your closet"
        maxW="100%"
      >
        <ModalBody pb={6}>
          <HStack>
            <Accordion defaultIndex={[0]} allowMultiple w={"100%"}>
              {CLOTHE_TYPES_ARRAY.map((type: string, index: number) => (
                <AccordionItem key={index}>
                  <AccordionButton>
                    <Box as="span" flex="1" textAlign="left">
                      {type}
                    </Box>
                    <AccordionIcon />
                  </AccordionButton>
                  <AccordionPanel pb={4}>
                    <HStack spacing={"20px"}>
                      {clothes &&
                        clothes[type] &&
                        clothes[type].map((clothe: Clothe, index: number) => (
                          <div key={index}>
                            {clothe.images.map((image: any, index: number) => (
                              <Image
                                key={index}
                                boxSize="100%"
                                objectFit="cover"
                                src={image.file}
                                alt=""
                                onClick={() => handleSelectedClothes(clothe)}
                                border={
                                  selectedClothes.find(
                                    (item: any) => item.id === clothe.id
                                  )
                                    ? "2px solid red"
                                    : ""
                                }
                              />
                            ))}
                          </div>
                        ))}
                    </HStack>
                  </AccordionPanel>
                </AccordionItem>
              ))}
            </Accordion>
            <div
              style={{
                width: "100%",
                height: "100%",
              }}
            >
              {selectedClothes && (
                <VStack>
                  {selectedClothes.map((clothe: any, index: number) => (
                    <Image
                      key={index}
                      boxSize="100px"
                      objectFit="cover"
                      src={clothe.images[0].file}
                      alt=""
                    />
                  ))}
                </VStack>
              )}

              {/* <Canvas image={} /> */}
              {/* <div>
        <div>
        <Resizable
        width={boxWidth}
        height={boxHeight}
        minConstraints={[100, 100]}
        // maxConstraints={[400, 400]}
        onResize={onResize}
          >
          <div
          style={{
            width: boxWidth,
            height: boxHeight,
            marginLeft: "85px",
          }}
          className="resizable-box"
          >
          {topImage && (
            <Image
            // boxSize="100px"
            // objectFit="cover"
            src={topImage}
            alt=""
            />
            )}
            </div>
            </Resizable>
            </div>
            </div>
            
            <Resizable
            width={topBoxWidth}
            height={topBoxHeight}
            minConstraints={[100, 100]}
            // maxConstraints={[400, 400]}
            onResize={onMiddleResize}
            >
            <div
            // style={{ width: boxWidth, height: boxHeight }}
            style={{
              width: topBoxWidth,
              height: topBoxHeight,
        }}
        className="resizable-box"
        >
        {middleImage && (
          <Image
          // boxSize="100px"
          // objectFit="cover"
          src={middleImage}
          alt=""
          />
          )}
          </div>
        </Resizable> */}
            </div>
          </HStack>
        </ModalBody>
        <ModalFooter>
          <Button
            onClick={handleNewOutfit}
            isLoading={CreateOutfitIsLoading}
            loadingText="Saving"
            bg={useColorModeValue("pink.300", "black")}
            // w={"100%"}
            mr={3}
          >
            Save
          </Button>

          <Button onClick={onClose} variant={"outline"}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
    </>
  );
};
export default CreateOutfit;
