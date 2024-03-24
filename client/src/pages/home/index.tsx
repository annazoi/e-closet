import { Box } from "@chakra-ui/react";
import { FC, useState } from "react";
import Button from "../../components/ui/Button";
import { BiCloset } from "react-icons/bi";
import { createCloset } from "../../services/closet";
import { useMutation } from "react-query";
import { authStore } from "../../store/authStore";
import { useNavigate } from "react-router-dom";
const Home: FC = () => {
  const { userId } = authStore((state) => state);

  const native = useNavigate();

  const { mutate: createClosetMutation } = useMutation(createCloset);

  const handleCreateCloset = () => {
    createClosetMutation(
      {
        images: [],
        userId: userId,
      },
      {
        onSuccess: (data) => {
          const closetId = data._id;
          native(`/closet/${closetId}`);
        },
      }
    );
  };
  return (
    <Box display={"grid"} placeItems={"center"} gap={5}>
      <img
        src="https://www.andagain.co.nz/cdn/shop/files/minimalist-retail-clothing-display.jpg?v=1663240556&width=1500"
        alt=""
      />
      <Button
        name="Create your Closet"
        rightIcon={<BiCloset />}
        onClick={handleCreateCloset}
      ></Button>
    </Box>
  );
};
export default Home;
