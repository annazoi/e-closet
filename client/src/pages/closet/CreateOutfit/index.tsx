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

const CreateOutfit: FC = () => {
  const [topImage, setTopImage] = useState<string>("");
  const [middleImage, setMiddleImage] = useState<string>("");
  const [bottomImage, setBottomImage] = useState<string>("");

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

  return (
    <>
      <Accordion defaultIndex={[0]} allowMultiple>
        <AccordionItem>
          <h2>
            <AccordionButton>
              <Box as="span" flex="1" textAlign="left">
                Winter Outfit
              </Box>
              <AccordionIcon />
            </AccordionButton>
          </h2>
          <AccordionPanel pb={4}>
            <Stack direction="row">
              <Image
                id="1"
                boxSize="100px"
                objectFit="cover"
                src="https://www.hudsonwellesley.com/cdn/shop/products/Black_Tee_Front_1024x1024@2x.png?v=1582411399"
                alt="Dan Abramov"
                onClick={() =>
                  handleTopImage(
                    "https://www.hudsonwellesley.com/cdn/shop/products/Black_Tee_Front_1024x1024@2x.png?v=1582411399"
                  )
                }
              />

              <Image
                id="2"
                boxSize="100px"
                objectFit="cover"
                src="https://www.instyle.com/thmb/UsRvtB37F50xeHWJijFQ0bzx3SI=/fit-in/1500x1000/filters:no_upscale():max_bytes(150000):strip_icc()/Abercrombie--Fitch-Curve-Love-Ultra-High-Rise-Stretch-Flare-Jean-04ed307e5ecf492d86935eb9d544d022.jpg"
                alt="Dan Abramov"
                onClick={() =>
                  handleMiddleImage(
                    "https://www.instyle.com/thmb/UsRvtB37F50xeHWJijFQ0bzx3SI=/fit-in/1500x1000/filters:no_upscale():max_bytes(150000):strip_icc()/Abercrombie--Fitch-Curve-Love-Ultra-High-Rise-Stretch-Flare-Jean-04ed307e5ecf492d86935eb9d544d022.jpg"
                  )
                }
              />

              <Image
                id="3"
                boxSize="100px"
                objectFit="cover"
                src="https://variety.com/wp-content/uploads/2021/04/Avatar.jpg"
                alt="Dan Abramov"
                onClick={() =>
                  handleBottomImage(
                    "https://variety.com/wp-content/uploads/2021/04/Avatar.jpg"
                  )
                }
              />
            </Stack>
          </AccordionPanel>
        </AccordionItem>
      </Accordion>
      {/* <div style={{ maxWidth: "200px", display: "block" }}>
        {topImage && <img src={topImage} alt="" />}
        {middleImage && <img src={middleImage} alt="" />}
        {bottomImage && <img src={bottomImage} alt="" />}
      </div> */}
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
