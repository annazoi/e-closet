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
} from "@chakra-ui/react";
import React from "react";
import "./style.css";
import { useQuery } from "react-query";
import { getCloset } from "../../../services/closet";
import { authStore } from "../../../store/authStore";

// {
//  shirts:[{images:[],type:'',season:[]},{images:[],type:'',season:[]}],
//   pants:[{},{}],
//   shoes:[{},{}]
// }

interface CreateOutfitProps {
  closetId?: string;
}

const CreateOutfit: FC<CreateOutfitProps> = () => {
  const [clothes, setClothes] = useState();
  const [topImage, setTopImage] = useState<string>("");
  const [middleImage, setMiddleImage] = useState<string>("");
  const [bottomImage, setBottomImage] = useState<string>("");
  const { userId, closetId } = authStore((state) => state);
  const [item, setItem] = useState<any>([]);

  const { data } = useQuery({
    queryKey: ["closet", closetId],
    queryFn: () => {
      return getCloset(closetId);
    },
  });

  // console.log(data);

  const handleTopImage = (image: string) => {
    setTopImage(image);
  };

  const handleMiddleImage = (image: string) => {
    setMiddleImage(image);
  };

  const handleBottomImage = (image: string) => {
    setBottomImage(image);
  };

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

  //   const handleItems = () => {
  //     const shirts = [];
  //     const pants = [];
  //     const shoes = [];
  //     for (let i = 0; i < data?.clothes.length; i++) {
  //       if (
  //         data?.clothes[i].type === "Tops & T-shirts" ||
  //         data?.clothes[i].type === "Sweaters & Hoodies"
  //       ) {
  //         shirts.push(data?.clothes[i]);
  //       }
  //       // if (data?.clothes[i].type === "pants") {
  //       //   pants.push(data?.clothes[i]);
  //       // }
  //       // if (data?.clothes[i].type === "shoes") {
  //       //   shoes.push(data?.clothes[i]);
  //       // }
  //     }
  // setClothes({
  //   shirts:shirts,
  //   pants:pants,
  //   shoes:shoes
  // })
  //   };

  return (
    <>
      <Accordion defaultIndex={[0]} allowMultiple>
        {/* {handleItems().map((item: any) => (
          <AccordionItem>
            <h2>
              <AccordionButton>
                <Box as="span" flex="1" textAlign="left">
                  {item.type}
                </Box>
                <AccordionIcon />
              </AccordionButton>
            </h2>

            <AccordionPanel pb={4}>
              <Stack direction="row">
                {item.images.map((image: any) => (
                  <Image
                    id="3"
                    boxSize="100px"
                    objectFit="cover"
                    src={image.file}
                    alt="Dan Abramov"
                    onClick={() => handleTopImage(image.file)}
                  />
                ))}
              </Stack>
            </AccordionPanel>
          </AccordionItem>
        ))} */}
      </Accordion>

      <div>
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
      </Resizable>
    </>
  );
};
export default CreateOutfit;
