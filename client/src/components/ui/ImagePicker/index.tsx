import { useRef, useState, useEffect } from "react";
import "./style.css";
import { MdCancel } from "react-icons/md";

import { Image } from "../../../interfaces/components";

interface ImagePickerProps {
  name?: string;
  onChange: (image: Image) => void;
  value?: Image;
  text?: any;
  register?: any;
  removeImage?: boolean;
}

const ImagePicker = ({
  name,
  onChange,
  value,
  removeImage,
}: ImagePickerProps) => {
  const imageRef: any = useRef(null);
  const [image, setImage] = useState<Image | null>(null);

  useEffect(() => {
    setImage(value || null);
  }, [value]);

  const handleImageClick = () => {
    imageRef.current.click();
  };

  const handleImage = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      console.log(file);
      const newImage: Image = {
        id: value?.id || "",
        file: file,
      };
      setImage(newImage);
      onChange(newImage);
    }
  };

  return (
    <div>
      <input
        type="file"
        className="image-input"
        name={name}
        onChange={handleImage}
        accept="image/x-png,image/gif,image/jpeg, image/jpg, image/png"
        ref={imageRef}
      />
      {image && (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "10px",
            marginTop: "30px",
          }}
        >
          <div
            style={{
              display: "flex",
              position: "relative",
              gap: "10px",
            }}
          >
            <img
              onClick={handleImageClick}
              style={{
                width: "100px",
                height: "100px",
                borderRadius: "10px",
              }}
              src={URL.createObjectURL(image.file)}
              alt={name}
            />
          </div>
          {removeImage && (
            <MdCancel
              style={{
                position: "absolute",
                width: "25px",
                height: "25px",
                marginLeft: "85px",
                marginTop: "-8px",
                cursor: "pointer",
                color: "red",
              }}
            ></MdCancel>
          )}
        </div>
      )}
    </div>
  );
};

export default ImagePicker;
