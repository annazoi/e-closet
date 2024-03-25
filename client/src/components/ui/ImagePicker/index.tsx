import "./style.css";
import { Camera, CameraResultType, CameraSource } from "@capacitor/camera";
import Button from "../Button";
import { GrGallery } from "react-icons/gr";
import { FaCamera } from "react-icons/fa";
import { MdCancel } from "react-icons/md";
import { useColorModeValue } from "@chakra-ui/react";
import { FC, useEffect, useState } from "react";
import {
  ImagePickerFile,
  ImagePickerItemData,
} from "../../../interfaces/components";

interface ImagePickerProps {
  setImage?: (image: any[]) => void;
  images?: Image[];
  image?: any;
  cancelImage?: () => void;
  label?: string;
  multiple?: boolean;
  onChange?: (data: ImagePickerItemData) => void;
  onImageDelete?: (data: string) => void;
}

interface Image {
  id: string;
  file: string;
}

const ImagePicker: FC<ImagePickerProps> = ({
  setImage,
  images,
  cancelImage,
}) => {
  const [filteredImages, setFilteredImages] = useState<Image[]>([]);
  const [selectedImages, setSelectedImages] = useState<ImagePickerFile[]>([]);

  useEffect(() => {
    setFilteredImages(images || []);
  }, [images]);

  const handleGallery = async () => {
    const image = await Camera.getPhoto({
      quality: 90,
      allowEditing: false,
      resultType: CameraResultType.DataUrl,
      source: CameraSource.Photos,
    });

    let imageUrl = image.dataUrl;

    setFilteredImages([...filteredImages, { id: "", file: imageUrl || "" }]);

    // console.log(imageUrl);

    return imageUrl;
  };

  const handleCamera = async () => {
    const image = await Camera.getPhoto({
      quality: 90,
      allowEditing: false,
      resultType: CameraResultType.DataUrl,
      source: CameraSource.Camera,
    });

    let imageUrl = image.dataUrl;

    setFilteredImages([...filteredImages, { id: "", file: imageUrl || "" }]);

    return imageUrl;
  };
  return (
    <>
      <div>
        <Button
          onClick={handleGallery}
          w={"40%"}
          name="Add Photo"
          rightIcon={<GrGallery />}
          mr={2}
        ></Button>
        <Button
          onClick={handleCamera}
          w={"40%"}
          name="Take Photo"
          rightIcon={<FaCamera />}
        ></Button>
      </div>
      {filteredImages.length > 0 && (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "10px",
            marginTop: "10px",
            marginLeft: "10px",
          }}
        >
          {filteredImages.map((image, index) => (
            <div
              key={index}
              style={{
                display: "flex",
                position: "relative",
                gap: "10px",
              }}
            >
              <img
                src={image.file}
                style={{
                  width: "100px",
                  height: "100px",
                  borderRadius: "10px",
                }}
              ></img>
            </div>
          ))}
          {cancelImage && (
            <MdCancel
              style={{
                width: "25px",
                height: "25px",
                position: "absolute",
                marginLeft: "30px",
                color: useColorModeValue("pink", "white"),
              }}
            ></MdCancel>
          )}
        </div>
      )}
    </>
  );
};

export default ImagePicker;
