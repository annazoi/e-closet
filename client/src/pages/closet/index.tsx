import { Box, ButtonGroup, useDisclosure } from "@chakra-ui/react";
import { FC, useState } from "react";
import Button from "../../components/ui/Button";
import { IoShirt } from "react-icons/io5";
import { GiClothes } from "react-icons/gi";
import CreateItem from "./CreateItem";
import { useNavigate } from "react-router-dom";
import { useQuery } from "react-query";
import { getCloset } from "../../services/closet";
import { authStore } from "../../store/authStore";

const Closet: FC = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const navigate = useNavigate();
  const { userId } = authStore((state) => state);
  const [yourCloset, setYourCloset] = useState<any>([]);

  const { closetId } = authStore((state) => state);

  // const { data } = useQuery("closet", () => getCloset(closetId));
  // console.log(data);

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
          onClick={() => navigate(`/closet/create-outfit`)}
        ></Button>
      </ButtonGroup>

      <CreateItem closetId={closetId} isOpen={isOpen} onClose={onClose} />
    </Box>
  );
};
export default Closet;
