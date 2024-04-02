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

const Closet: FC = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const navigate = useNavigate();
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
          onClick={onOpen}
          rightIcon={<IoShirt />}
          bg={useColorModeValue("pink.300", "black")}
          w={"100%"}
        >
          Add Item
        </Button>
        <Button
          onClick={() => navigate(`/closet/create-outfit`)}
          rightIcon={<GiClothes />}
          bg={useColorModeValue("pink.300", "black")}
          w={"100%"}
        >
          Create Outfit
        </Button>
      </ButtonGroup>

      <CreateItem closetId={closetId} isOpen={isOpen} onClose={onClose} />
    </Box>
  );
};
export default Closet;
