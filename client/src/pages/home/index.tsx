import { Box } from "@chakra-ui/react";
import { FC } from "react";

const Home: FC = () => {
  return (
    <Box display={"grid"} placeItems={"center"} gap={5}>
      <img
        src="https://www.andagain.co.nz/cdn/shop/files/minimalist-retail-clothing-display.jpg?v=1663240556&width=1500"
        alt=""
      />
    </Box>
  );
};
export default Home;
