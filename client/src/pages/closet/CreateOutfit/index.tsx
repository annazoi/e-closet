import { FC, useState } from "react";
import { MdCancel } from "react-icons/md";
import ImagePicker from "../../../components/ui/ImagePicker";
import { Resizable } from "react-resizable";
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

class Example extends React.Component {
  state = {
    width: 200,
    height: 200,
  };
  onResize = (event: any, { node, size, handle }: any) => {
    this.setState({ width: size.width, height: size.height });
  };
}

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
              <Image
                boxSize="100px"
                objectFit="cover"
                src="https://variety.com/wp-content/uploads/2021/04/Avatar.jpg"
                alt="Dan Abramov"
              />
              <Image
                boxSize="100px"
                objectFit="cover"
                src="https://variety.com/wp-content/uploads/2021/04/Avatar.jpg"
                alt="Dan Abramov"
              />
              <Image
                boxSize="100px"
                src="https://variety.com/wp-content/uploads/2021/04/Avatar.jpg"
                alt="Dan Abramov"
              />
            </Stack>
          </AccordionPanel>
        </AccordionItem>
      </Accordion>
    </>
  );
};
export default CreateOutfit;
