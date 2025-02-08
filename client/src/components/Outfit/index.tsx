import { FC } from "react";
import Modal from "../ui/Modal";
import { Box, Button, Grid, Image, ModalBody } from "@chakra-ui/react";
import { Outfit as OutfitInterface } from "../../interfaces/outfit";
import { capsFirstLowerThen } from "../../utils";
// import Rating from "../ui/Rating";
import { authStore } from "../../store/authStore";

interface OutfitProps {
  isOpen?: any;
  onClose?: any;
  outfit?: OutfitInterface;
}

const Outfit: FC<OutfitProps> = ({ isOpen, onClose, outfit }) => {
  const { userId } = authStore((store: any) => store);
  //   console.log(outfit);
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={`${capsFirstLowerThen(outfit?.type)} outfit`}
      maxW="100%"
    >
      <ModalBody>
        <Box>
          <Grid
            gap={1}
            justifyContent={"center"}
            boxShadow={"0px 0px 10px 0px rgba(0,0,0,0.1)"}
          >
            {outfit?.clothes.map((clothe: any, index: number) => (
              <Image
                key={index}
                src={clothe.clothe.images[0].file}
                w={"100px"}
                h={"100px"}
              />
            ))}
          </Grid>
          {/* <ButtonGroup> */}
          {/* <Rating value={outfit?.rating}></Rating> */}
          {outfit?.userId.id === userId && <Button>Edit</Button>}
          {/* </ButtonGroup> */}
        </Box>
      </ModalBody>
    </Modal>
  );
};
export default Outfit;
