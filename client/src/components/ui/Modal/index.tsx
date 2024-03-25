import {
  Modal as ChakraModal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useColorModeValue,
} from "@chakra-ui/react";
import Button from "../Button";
// import Input from "../Input";
import { FC } from "react";

type ModalProps = {
  children?: React.ReactNode;
  isOpen: boolean;
  title?: string;
  onClose?: () => void;
  onAction?: () => void;
  actionTitle?: string;
  onClick?: () => void;
  closeTitle?: string;
  actionTitleLoading?: boolean;
} & React.ComponentProps<typeof ChakraModal>;

const Modal: FC<ModalProps> = ({
  isOpen,
  onClose,
  onClick,
  title,
  ...rest
}) => {
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
        {/* <ModalBody pb={6}>{rest.children}</ModalBody> */}
        {rest.children}

        <ModalFooter>
          <Button mr={3} name="Save" onClick={onClick}></Button>
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
