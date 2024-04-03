import {
  Modal as ChakraModal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Wrap,
  WrapItem,
  useToast,
  useColorModeValue,
} from "@chakra-ui/react";
import { FC } from "react";

type ModalProps = {
  children?: React.ReactNode;
  isOpen: boolean;
  title?: string;
  onClose?: () => void;
  onAction?: () => void;
  actionTitle?: string;
  onClick?: any;
  closeTitle?: string;
  actionTitleLoading?: boolean;
  isLoading?: boolean;
  alert?: boolean;
} & React.ComponentProps<typeof ChakraModal>;

const Modal: FC<ModalProps> = ({
  isOpen,
  onClose,
  onClick,
  title,
  isLoading,
  alert,
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
      <ModalContent maxW="100%">
        <ModalHeader>{title}</ModalHeader>
        <ModalCloseButton />
        {/* <ModalBody pb={6}>{rest.children}</ModalBody> */}
        {rest.children}
      </ModalContent>
    </ChakraModal>
  );
};
export default Modal;
