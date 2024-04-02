import { FC, useState } from "react";
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
} from "@chakra-ui/react";
import React from "react";
import "./style.css";
import { useQuery } from "react-query";
import { getCloset } from "../../../services/closet";
import { authStore } from "../../../store/authStore";
import { Clothe } from "../../../interfaces/closet";
import { ClotheCategories } from "../../../enums/clothes";

// {
//  shirts:[{images:[],type:'',season:[]},{images:[],type:'',season:[]}],
//   pants:[{},{}],
//   shoes:[{},{}]
// }

interface CreateOutfitProps {
  closetId?: string;
}

interface CategorizedClothes {
  shirts: any[];
  pants: any[];
  shoes: any[];
}

const CreateOutfit: FC<CreateOutfitProps> = () => {
  const { userId, closetId } = authStore((state) => state);
  const [clothes, setClothes] = useState<any>();
  const [outfit, setOutfit] = useState<any[]>([]);

  useQuery({
    queryKey: ["closet", closetId],
    queryFn: () => {
      return getCloset(closetId);
    },
    onSuccess: (data: any) => {
      categorizeClothes(data);
    },
  });

  // console.log("data", data);

  const handleImage = (image: string) => {};

  const [boxWidth, setBoxWidth] = React.useState(400);
  const [boxHeight, setBoxHeight] = React.useState(400);

  const [topBoxWidth, setTopBoxWidth] = React.useState(400);
  const [topBoxHeight, setTopBoxHeight] = React.useState(400);

  const onResize = (
    event: React.SyntheticEvent,
    { size }: { size: { width: number; height: number } }
  ) => {
    // console.log("Resized:", size);
    setBoxWidth(size.width);
    setBoxHeight(size.height);
  };

  const onMiddleResize = (
    event: React.SyntheticEvent,
    { size }: { size: { width: number; height: number } }
  ) => {
    // console.log("Resized:", size);
    setTopBoxWidth(size.width);
    setTopBoxHeight(size.height);
  };

  const categorizeClothes = (data: any) => {
    const shirts = [] as Clothe[];
    const pants = [] as Clothe[];
    const shoes = [] as Clothe[];
    for (let i = 0; i < (data?.clothes.length ?? 0); i++) {
      if (
        data?.clothes[i].type === ClotheCategories.TOP_AND_T_SHIRTS ||
        data?.clothes[i].type === ClotheCategories.SWEATER_AND_HOODIES
      ) {
        shirts.push(data?.clothes[i]);
      }
      if (data?.clothes[i].type === ClotheCategories.BOTTOMS_AND_LEGGINGS) {
        pants.push(data?.clothes[i]);
      }
      if (data?.clothes[i].type === ClotheCategories.SHOES_AND_SOCKS) {
        shoes.push(data?.clothes[i]);
      }
    }
    setClothes({
      shirts: shirts,
      pants: pants,
      shoes: shoes,
    });
    console.log("clothes", {
      shirts: shirts,
      pants: pants,
      shoes: shoes,
    });
  };

  const handleOutfit = (clothe: any, image: any) => {
    const existingImage = outfit.find((item) => item.file === image.file);
    if (existingImage) return;
    console.log("image", image);
    setOutfit([...outfit, image]);

    console.log("clothe", clothe);
  };

  return (
    <>
      <Accordion defaultIndex={[0]} allowMultiple>
        {clothes &&
          Object.keys(clothes).map((item: string, index: number) => (
            <AccordionItem key={index}>
              <AccordionButton>
                <Box as="span" flex="1" textAlign="left">
                  {item}
                </Box>
                <AccordionIcon />
              </AccordionButton>
              <AccordionPanel pb={4}>
                <HStack spacing={"20px"}>
                  {clothes[item].map((clothe: any, index: number) => (
                    <div key={index}>
                      {clothe.images.map((image: any, index: number) => (
                        <Image
                          key={index}
                          boxSize="100px"
                          objectFit="cover"
                          src={image.file}
                          alt=""
                          onClick={() => handleOutfit(clothe, image)}
                        />
                      ))}
                    </div>
                  ))}
                </HStack>
              </AccordionPanel>
            </AccordionItem>
          ))}
      </Accordion>

      {outfit && (
        <HStack>
          {outfit.map((image: any, index: number) => (
            <Image
              key={index}
              boxSize="100px"
              objectFit="cover"
              src={image.file}
              alt=""
            />
          ))}
        </HStack>
      )}

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
    </>
  );
};
export default CreateOutfit;
