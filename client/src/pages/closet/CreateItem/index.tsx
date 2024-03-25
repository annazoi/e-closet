import { ModalBody, Select, useDisclosure } from "@chakra-ui/react";
import { FC, useState } from "react";
import ImagePicker from "../../../components/ui/ImagePicker";
import { addPhotos } from "../../../services/closet";
import { useMutation } from "react-query";
import { useParams } from "react-router-dom";
import Modal from "../../../components/ui/Modal";

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

const WomanCategories = [
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
  const [image, setImage] = useState<any[]>([]);

  const { mutate: addPhotoMutate } = useMutation(
    (images: any[]) => addPhotos({ closetId, images }),
    {
      onSuccess: () => {
        onClose();
      },
    }
  );

  const handleImage = () => {
    try {
      addPhotoMutate(
        image.map((img) => {
          return { file: img.file };
        })
      );
      console.log(image);
    } catch (error) {
      console.log(error);
    }
  };

  // console.log(closetId);
  return (
    <>
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        title="Create an item from your closet"
        onClick={handleImage}
      >
        <ModalBody pb={6}>
          <div style={{ display: "grid", gap: "35px" }}>
            <Select placeholder="Select Season">
              {Seasons.map((season: any) => (
                <option key={season.id} value={season.name}>
                  {season.name}
                </option>
              ))}
            </Select>
            <Select placeholder="Select Category">
              {WomanCategories.map((category: any) => (
                <option key={category.id} value={category.name}>
                  {category.name}
                </option>
              ))}
            </Select>
            <ImagePicker images={image} setImage={setImage} />
          </div>
        </ModalBody>
      </Modal>
    </>
  );
};
export default CreateItem;
