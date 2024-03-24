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

  const [boxWidth, setBoxWidth] = useState<number>(300);
  const [isResizing, setIsResizing] = useState(false);
  const [resizeStartX, setResizeStartX] = useState(0);

  const handleTopImage = (image: string) => {
    setTopImage(image);
  };

  const handleMiddleImage = (image: string) => {
    setMiddleImage(image);
  };

  const handleBottomImage = (image: string) => {
    setBottomImage(image);
  };

  const [size, setSize] = useState({ width: 200, height: 200 });

  const handleMouseDown = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    setIsResizing(true);
    setResizeStartX(event.clientX);
  };

  const handleMouseMove = (event: MouseEvent) => {
    if (!isResizing) return;

    const newWidth = boxWidth + event.clientX - resizeStartX;
    if (newWidth >= 100 && newWidth <= 500) {
      setBoxWidth(newWidth);
      setResizeStartX(event.clientX);
    }
  };

  const handleMouseUp = () => {
    setIsResizing(false);
  };

  // Attach event listeners when resizing
  React.useEffect(() => {
    if (isResizing) {
      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);
    } else {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    }

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isResizing]);

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
              <ResizableBox
                width={100}
                height={100}
                minConstraints={[100, 100]}
              >
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
              </ResizableBox>
              <ResizableBox
                width={100}
                height={100}
                minConstraints={[100, 100]}
              >
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
              </ResizableBox>
              <ResizableBox
                width={100}
                height={100}
                minConstraints={[100, 100]}
              >
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
              </ResizableBox>
            </Stack>
          </AccordionPanel>
        </AccordionItem>
      </Accordion>
      <div style={{ maxWidth: "200px", display: "block" }}>
        {topImage && <img src={topImage} alt="" />}
        {middleImage && <img src={middleImage} alt="" />}
        {bottomImage && <img src={bottomImage} alt="" />}
      </div>
      <div className="resizable-box" style={{ width: boxWidth }}>
        <div className="resizable-content">Resizable Content</div>
        <div className="resize-handle" onMouseDown={handleMouseDown}></div>
      </div>
    </>
  );
};
export default CreateOutfit;
