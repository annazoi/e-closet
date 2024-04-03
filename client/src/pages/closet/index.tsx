import {
  Box,
  Button,
  ButtonGroup,
  useColorModeValue,
  useDisclosure,
} from "@chakra-ui/react";
import { FC, useState } from "react";
import { IoShirt } from "react-icons/io5";
import { GiClothes } from "react-icons/gi";
import CreateItem from "./CreateItem";
import { useNavigate } from "react-router-dom";

import { authStore } from "../../store/authStore";
import CreateOutfit from "./CreateOutfit";

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
  const { closetId } = authStore((state) => state);

  return (
    <Box
      // border={"1px solid red"}
      display="grid"
      gap={4}
    >
      {/* if !categories */}
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

      <CreateItem
        closetId={closetId}
        isOpen={isOpenitem}
        onClose={onCloseItem}
      />
      <CreateOutfit isOpen={isOpenOutfit} onClose={onCloseOutfit} />
    </Box>
  );
};
export default Closet;
