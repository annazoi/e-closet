import { Box, ButtonGroup, Heading, useDisclosure } from "@chakra-ui/react";
import { FC, useState } from "react";
import Button from "../../components/ui/Button";
import { IoShirt } from "react-icons/io5";
import { GiClothes } from "react-icons/gi";
import Modal from "../../components/ui/Modal";
import CreateItem from "./CreateItem";
import { useNavigate } from "react-router-dom";

const Closet: FC = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const navigate = useNavigate();
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
          name="Add Item"
          rightIcon={<IoShirt />}
          onClick={onOpen}
        ></Button>
        <Button
          name="Create Outfit"
          rightIcon={<GiClothes />}
          onClick={() => navigate("/closet/create-outfit")}
        ></Button>
      </ButtonGroup>

      <Modal
        isOpen={isOpen}
        onClose={onClose}
        title="Create an item from your closet"
      >
        <CreateItem />
      </Modal>
    </Box>
  );
};
export default Closet;
