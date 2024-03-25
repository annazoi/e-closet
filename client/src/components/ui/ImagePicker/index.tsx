import "./style.css";
import { Camera, CameraResultType, CameraSource } from "@capacitor/camera";
import Button from "../Button";
import { GrGallery } from "react-icons/gr";
import { FaCamera } from "react-icons/fa";
import { MdCancel } from "react-icons/md";
import { useColorModeValue } from "@chakra-ui/react";

interface ImagePickerProps {
  setImage: (image: string) => void;
  image: string;
  cancelImage?: () => void;
}

const ImagePicker = ({ setImage, image, cancelImage }: ImagePickerProps) => {
  const handleGallery = async () => {
    const image = await Camera.getPhoto({
      quality: 90,
      allowEditing: false,
      resultType: CameraResultType.DataUrl,
      source: CameraSource.Photos,
    });

    let imageUrl = image.dataUrl;

    setImage(imageUrl || "");

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

    setImage(imageUrl || "");

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
      {image && (
        <div style={{ display: "flex" }}>
          <img
            src={image}
            alt=""
            style={{
              border: "1px solid pink",
              borderRadius: "50%",
              width: "50px",
              height: "50px",
              marginLeft: "10px",
              // backgroundColor: "pink",
              position: "relative",
            }}
          />
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
