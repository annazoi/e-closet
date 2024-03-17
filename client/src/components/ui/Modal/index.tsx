import {
  Modal as ChakraModal,
  FormControl,
  FormLabel,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useColorModeValue,
} from "@chakra-ui/react";
import Button from "../Button";
import Input from "../Input";
import { FC } from "react";

type ModalProps = {
  children?: React.ReactNode;
  isOpen: boolean;
  title?: string;
  onClose?: () => void;
  onAction?: () => void;
  actionTitle?: string;
  closeTitle?: string;
  actionTitleLoading?: boolean;
} & React.ComponentProps<typeof ChakraModal>;

const Modal: FC<ModalProps> = ({ isOpen, onClose, title, ...rest }) => {
  return (
    <ChakraModal
      closeOnOverlayClick={false}
      isOpen={isOpen}
      onClose={onClose}
      {...rest}
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{title}</ModalHeader>
        <ModalCloseButton />
        <ModalBody pb={6}>{rest.children}</ModalBody>

        <ModalFooter>
          <Button mr={3} name="Save"></Button>
          <Button
            onClick={onClose}
            name="Cancel"
            color={useColorModeValue("gray.300", "gray.700")}
          ></Button>
        </ModalFooter>
      </ModalContent>
    </ChakraModal>
  );
};
export default Modal;
