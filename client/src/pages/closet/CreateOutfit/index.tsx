import { FC, useState } from "react";
import { Resizable } from "react-resizable";
import { ResizableBox } from "react-resizable";
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

const CreateOutfit: FC = () => {
  const [image, setImage] = useState<string>("");

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
                  boxSize="100px"
                  objectFit="cover"
                  src="https://variety.com/wp-content/uploads/2021/04/Avatar.jpg"
                  alt="Dan Abramov"
                />
              </ResizableBox>
              <ResizableBox
                width={100}
                height={100}
                minConstraints={[100, 100]}
              >
                <Image
                  boxSize="100px"
                  objectFit="cover"
                  src="https://variety.com/wp-content/uploads/2021/04/Avatar.jpg"
                  alt="Dan Abramov"
                />
              </ResizableBox>
              <ResizableBox
                width={100}
                height={100}
                minConstraints={[100, 100]}
              >
                <Image
                  boxSize="100px"
                  objectFit="cover"
                  src="https://variety.com/wp-content/uploads/2021/04/Avatar.jpg"
                  alt="Dan Abramov"
                />
              </ResizableBox>
            </Stack>
          </AccordionPanel>
        </AccordionItem>
      </Accordion>
    </>
  );
};
export default CreateOutfit;
