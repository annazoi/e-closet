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

import CreateOutfit from "./CreateOutfit";
import { authStore } from "../../store/authStore";
import { getOutfit, getOutfits } from "../../services/outfit";
import { useQuery } from "react-query";
import Carousel from "../../components/ui/Carousel";

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

  const { userId } = authStore((state) => state);
  const [outfits, setOutfits] = useState<string[][]>([]);

  useQuery("outfits", () => getOutfits({ userId: userId }), {
    onSuccess: (data) => {
      const imagesOutfit = data?.map((outfit: any) => {
        return outfit.clothes.map((clothe: any) => {
          return clothe.clothe.images[0].file;
        });
      });
      setOutfits(imagesOutfit);
    },
  });

  return (
    <>
      <Box display="grid" gap={4}>
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

        <CreateItem isOpen={isOpenitem} onClose={onCloseItem} />
        <CreateOutfit isOpen={isOpenOutfit} onClose={onCloseOutfit} />
        {outfits.map((outfit, index) => (
          <Carousel key={index} images={outfit}></Carousel>
        ))}
      </Box>
    </>
  );
};
export default Closet;
