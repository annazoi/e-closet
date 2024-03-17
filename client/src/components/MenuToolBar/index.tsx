import {
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerHeader,
  DrawerBody,
  useColorModeValue,
  Icon,
  IconButton,
} from "@chakra-ui/react";
import { FaHome } from "react-icons/fa";
import MenuContent from "./MenuContent";

interface MenuProps {
  onClose: () => void;
  isOpen: boolean;
}

const MenuToolBar = ({ onClose, isOpen }: MenuProps) => {
  return (
    <Drawer placement="left" onClose={onClose} isOpen={isOpen}>
      <DrawerOverlay />
      <DrawerContent bg={useColorModeValue("pink.100", "gray.800")}>
        <DrawerHeader borderBottomWidth="1px">Menu</DrawerHeader>
        <DrawerBody>
          <MenuContent />
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  );
};

export default MenuToolBar;
