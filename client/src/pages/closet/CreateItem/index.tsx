import {
  Button,
  ModalBody,
  ModalFooter,
  useColorModeValue,
  useToast,
} from "@chakra-ui/react";
import { FC, useState } from "react";
import ImagePicker from "../../../components/ui/ImagePicker";
import { addClothes } from "../../../services/closet";
import { useMutation } from "react-query";
import Modal from "../../../components/ui/Modal";
import { Image } from "../../../interfaces/components";
import { Clothe } from "../../../interfaces/closet";
import Select from "../../../components/ui/Select";
import { CLOTHE_TYPES, SEASONS } from "../../../constants/clotheTypes";

interface CreateItemProps {
  closetId: string;
  isOpen: any;
  onClose: any;
}

const CreateItem: FC<CreateItemProps> = ({ closetId, isOpen, onClose }) => {
  const [selectedImages, setSelectedImages] = useState<Image[]>([]);
  const [season, setSeason] = useState<any[]>([]);
  const [category, setCategory] = useState("");

  const toast = useToast();

  const handleImageChange = (image: Image) => {
    setSelectedImages([image]);
  };

  const { mutate: addClothesMutate, isLoading: addPhotoIsLoading } =
    useMutation({
      mutationFn: ({ closetId, images, type, season }: Clothe) =>
        addClothes({ closetId, images, type, season }),
    });

  const handleSave = () => {
    if (!selectedImages.length) {
      console.log("Please select an image");
      toast({ title: "Please select an image", status: "error" });
      return;
    }
    addClothesMutate(
      {
        closetId,
        images: selectedImages,
        type: category,
        season: season,
      },
      {
        onSuccess: () => {
          onClose();
        },
        onError: (error) => {
          console.log(error);
        },
      }
    );
  };

  const handleTypeChange = (e: any) => {
    setCategory(e.target.value);
  };

  const handleSeasonChange = (e: any) => {
    setSeason([e.target.value]);
  };

  return (
    <>
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        title="Create an item from your closet"
        // onClick={handleSave}
        // isLoading={addPhotoIsLoading}
        // alert={alert}
      >
        <ModalBody pb={6}>
          <div style={{ display: "grid", gap: "35px" }}>
            <Select
              onChange={handleTypeChange}
              options={CLOTHE_TYPES}
              placeholder="Select Type"
            />
            <Select
              onChange={handleSeasonChange}
              options={SEASONS}
              placeholder="Select Season"
            />
            <ImagePicker onChange={handleImageChange} />
          </div>
        </ModalBody>
        <ModalFooter>
          <Button
            onClick={handleSave}
            isLoading={addPhotoIsLoading}
            loadingText="Saving"
            bg={useColorModeValue("pink.300", "black")}
            w={"100%"}
            mr={3}
          >
            Save
          </Button>

          <Button onClick={onClose} variant={"outline"} w={"100%"}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
    </>
  );
};

export default CreateItem;
