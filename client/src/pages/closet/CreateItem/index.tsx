import {
  ModalBody,
  ModalFooter,
  Select,
  useColorModeValue,
  useToast,
} from "@chakra-ui/react";
import { FC, useState } from "react";
import ImagePicker from "../../../components/ui/ImagePicker";
import { addClothes } from "../../../services/closet";
import { useMutation } from "react-query";
import Modal from "../../../components/ui/Modal";
import { Image } from "../../../interfaces/components";
import Button from "../../../components/ui/Button";

const Seasons = [
  {
    id: 1,
    name: "Winter",
  },
  {
    id: 2,
    name: "Spring",
  },
  {
    id: 3,
    name: "Summer",
  },
  {
    id: 4,
    name: "Fall",
  },
  {
    id: 5,
    name: "All",
  },
];

const type = [
  {
    id: 1,
    name: "Tops & T-shirts",
  },
  {
    id: 2,
    name: "Sweaters & Hoodies",
  },
  {
    id: 3,
    name: "Bottoms & Leggings",
  },
  { id: 4, name: "Jumpsuits & Dresses" },
  {
    id: 5,
    name: "Jackets & Coats",
  },
  {
    id: 6,
    name: "Shorts & Skirts",
  },
  {
    id: 7,
    name: "Shoes & Socks",
  },
  { id: 8, name: "Suit" },
  {
    id: 9,
    name: "Accessories",
  },
  {
    id: 10,
    name: "Other",
  },
];

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

  const { mutate: addPhotoMutate, isLoading: addPhotoIsLoading } = useMutation({
    mutationFn: async () => {
      try {
        await addClothes({
          closetId,
          images: selectedImages,
          type: category,
          season: season,
        });
      } catch (error) {
        console.log(error);
      }
    },
    onSuccess: () => {
      onClose();
    },
    onError: (error) => {
      console.log(error);
    },
  });

  const handleSave = () => {
    if (!selectedImages.length) {
      console.log("Please select an image");
      toast({ title: "Please select an image", status: "error" });
      return;
    }
    addPhotoMutate();
  };

  const handleTypeChange = (e: any) => {
    setCategory(e.target.value);
    console.log(e.target.value);
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
            <Select placeholder="Select Type" onChange={handleTypeChange}>
              {type.map((category: any) => (
                <option
                  key={category.id}
                  value={category.name}
                  // id={category.id}
                >
                  {category.name}
                </option>
              ))}
            </Select>
            <Select placeholder="Select Season" onChange={handleSeasonChange}>
              {Seasons.map((season: any) => (
                <option key={season.id} value={season.name}>
                  {season.name}
                </option>
              ))}
            </Select>
            <ImagePicker onChange={handleImageChange} />
          </div>
        </ModalBody>
        <ModalFooter>
          <Button
            mr={3}
            name="Save"
            isLoading={addPhotoIsLoading}
            loadingText="Saving"
            onClick={handleSave}
          />

          <Button
            onClick={onClose}
            name="Cancel"
            color={useColorModeValue("gray.300", "gray.700")}
          />
        </ModalFooter>
      </Modal>
    </>
  );
};

export default CreateItem;
