import { Box } from "@chakra-ui/react";
import { FC } from "react";
import Button from "../../components/ui/Button";
import { BiCloset } from "react-icons/bi";

import { useNavigate } from "react-router-dom";
const Home: FC = () => {
  const native = useNavigate();

  return (
    <Box display={"grid"} placeItems={"center"} gap={5}>
      <img
        src="https://www.andagain.co.nz/cdn/shop/files/minimalist-retail-clothing-display.jpg?v=1663240556&width=1500"
        alt=""
      />
      <Button
        name="Create your Closet"
        rightIcon={<BiCloset />}
        // onClick={handleCreateCloset}
      ></Button>
    </Box>
  );
};
export default Home;
