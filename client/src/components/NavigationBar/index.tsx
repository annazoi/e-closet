import { useNavigate } from "react-router-dom";
import {
  Box,
  Heading,
  useColorModeValue,
  IconButton,
  useDisclosure,
} from "@chakra-ui/react";
import { CiMenuBurger } from "react-icons/ci";
import MenuToolBar from "../MenuToolBar";
import MenuContent from "../MenuToolBar/MenuContent";

const NavigationBar = (props: any) => {
  const navigate = useNavigate();
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      <Box
        style={{
          //   border: "1px solid red",
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          height: "50px",
        }}
        bg={useColorModeValue("pink.300", "gray.800")}
      >
        <IconButton
          bg={useColorModeValue("white", "gray.800")}
          display={{ base: "flex", md: "none" }}
          onClick={onOpen}
          variant="outline"
          aria-label="open menu"
          icon={<CiMenuBurger size={20} />}
          mt={1}
          ml={1}
        ></IconButton>
      </Box>
      <MenuToolBar isOpen={isOpen} onClose={onClose} />
      <Box
        boxShadow={"0 2px 5px 2px rgba(0,0,0,0.2)"}
        position="fixed"
        display={{
          base: "none",
          md: "block",
        }}
        style={{
          top: 0,
          left: 0,
          height: "100%",
          width: "250px",
        }}
        bg={useColorModeValue("pink.100", "gray.800")}
      >
        <Heading
          style={{
            textAlign: "center",
            padding: "10px",
            fontSize: "30px",
          }}
          color={useColorModeValue("pink.300", "white")}
          fontStyle={"Helvetica"}
        >
          e-Closet
        </Heading>
        <div style={{ padding: "10px" }}>
          <MenuContent />
        </div>
      </Box>
    </>
  );
};

export default NavigationBar;
