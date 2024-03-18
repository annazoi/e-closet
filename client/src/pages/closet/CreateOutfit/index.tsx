import { Camera, CameraResultType, CameraSource } from "@capacitor/camera";
import { FC, useState } from "react";
import { MdCancel } from "react-icons/md";

const CreateOutfit: FC = () => {
  const [image, setImage] = useState<string>("");
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
  return (
    <>
      <div style={{ display: "flex" }}>
        <div
          style={{
            border: "1px solid pink",
            borderRadius: "50%",
            width: "50px",
            height: "50px",
            backgroundColor: "pink",
            position: "relative",
          }}
        ></div>
        <MdCancel
          style={{
            width: "25px",
            height: "25px",
            position: "absolute",
            marginLeft: "30px",
          }}
        ></MdCancel>
      </div>
      <div>
        <img
          src={image}
          alt=""
          style={{
            width: "100px",
            height: "100px",
            borderRadius: "50%",
          }}
        />
        <button onClick={handleGallery}>Add Image</button>
      </div>
    </>
  );
};
export default CreateOutfit;
