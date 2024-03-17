import { Box } from "@chakra-ui/react";
import { FC } from "react";
import Button from "../../components/ui/Button";
import { GiClothes } from "react-icons/gi";
const Home: FC = () => {
  console.log("Home");
  return (
    <Box display={"grid"} placeItems={"center"} gap={5}>
      <img
        src="https://www.andagain.co.nz/cdn/shop/files/minimalist-retail-clothing-display.jpg?v=1663240556&width=1500"
        alt=""
      />
      <Button name="Create an Outfit" rightIcon={<GiClothes />}></Button>
    </Box>
  );
};
export default Home;
