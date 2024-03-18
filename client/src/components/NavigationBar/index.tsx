import {
  Box,
  Heading,
  useColorModeValue,
  IconButton,
  useDisclosure,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerHeader,
  DrawerBody,
} from "@chakra-ui/react";

import { CiMenuBurger } from "react-icons/ci";
import MenuContent from "./MenuContent";

const NavigationBar = (props: any) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      <Box
        bg={useColorModeValue("pink.300", "gray.800")}
        position={"fixed"}
        top={0}
        left={0}
        w={"100%"}
        h={"50px"}
      >
        <IconButton
          bg={useColorModeValue("pink.200", "gray.800")}
          display={{ base: "flex", md: "none" }}
          onClick={onOpen}
          variant="outline"
          aria-label="open menu"
          icon={<CiMenuBurger size={20} />}
          mt={1}
          ml={1}
        ></IconButton>
      </Box>
      <Drawer placement="left" onClose={onClose} isOpen={isOpen}>
        <DrawerOverlay />
        <DrawerContent bg={useColorModeValue("pink.100", "gray.800")}>
          <DrawerHeader borderBottomWidth="1px">Menu</DrawerHeader>
          <DrawerBody>
            <MenuContent />
          </DrawerBody>
        </DrawerContent>
      </Drawer>
      <Box
        boxShadow={"0 2px 5px 2px rgba(0,0,0,0.2)"}
        pos={"fixed"}
        top={0}
        left={0}
        h={"full"}
        w={{ base: "full", md: 60 }}
        bg={useColorModeValue("pink.100", "gray.800")}
        display={{
          base: "none",
          md: "block",
        }}
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
      {/*   <Box as="main" ml={{ base: 0, md: isLoggedIn ? 60 : 0 }} p="4"> */}
      <Box as="main" ml={{ base: 0, md: 60 }} mt={8}>
        {props.children}
      </Box>
    </>
  );
};

export default NavigationBar;
