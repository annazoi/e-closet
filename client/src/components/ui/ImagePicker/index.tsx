import { useImperativeFilePicker } from "use-file-picker";
import {
  FileAmountLimitValidator,
  FileTypeValidator,
  FileSizeValidator,
  // ImageDimensionsValidator,
} from "use-file-picker/validators";
import { FC, useEffect, useState } from "react";
import { Button, SimpleGrid, Box } from "@chakra-ui/react";
import { MdOutlineAddPhotoAlternate } from "react-icons/md";
import { IoIosCloseCircleOutline } from "react-icons/io";
import "./style.css";
import {
  ImagePickerItemData,
  Image,
  ImagePickerFile,
} from "../../../interfaces/components";
// import Spinner from "../Spinner";

interface ImagePickerProps {
  label: string;
  maxFiles?: number;
  multiple?: boolean;
  accept?: string;
  name: string;
  images?: ImagePickerFile[];
  onChange: (data: ImagePickerItemData) => void;
  onImageDelete?: (data: string) => void;
}

const ImagePicker: FC<ImagePickerProps> = ({
  images,
  label,
  name,
  onChange,
  onImageDelete,
  multiple = true,
  accept = "image/*",
  maxFiles = 5,
}) => {
  const [filteredImages, setFilteredImages] = useState<ImagePickerFile[]>([]);
  const [selectedImages, setSelectedImages] = useState<Image[]>([]);

  useEffect(() => {
    if (images && images.length > 0 && filteredImages.length == 0) {
      setFilteredImages(images);
    }
  }, [images]);

  const FilePickerButton = ({ label }: { label: string }) => {
    return (
      <Button
        onClick={() => openFilePicker()}
        leftIcon={<MdOutlineAddPhotoAlternate />}
        bg={"pink.100"}
        _hover={{
          bg: "primary.600",
        }}
      >
        {label}
      </Button>
    );
  };

  const { openFilePicker, filesContent, errors, removeFileByIndex } =
    useImperativeFilePicker({
      readAs: "DataURL",
      accept: accept,
      multiple: multiple,
      validators: [
        new FileAmountLimitValidator({ max: maxFiles }),
        new FileTypeValidator(["jpg", "png", "jpeg"]),
        new FileSizeValidator({ maxFileSize: 50 * 1024 * 1024 /* 50 MB */ }),
        //   new ImageDimensionsValidator({
        //     maxHeight: 900,
        //     maxWidth: 1600,
        //     minHeight: 600,
        //     minWidth: 768,
        //   }),
      ],
      onFilesSuccessfullySelected: ({ plainFiles }) => {
        const filesWithIds = plainFiles.map((file, index) => ({
          id: index.toString(),
          file: file,
        }));
        setSelectedImages((prev) => [...prev, ...filesWithIds]);

        onChange({
          name,
          files: filesWithIds,
        });
      },
    });

  if (errors.length) {
    return (
      <div>
        <FilePickerButton label="Something went wrong,retry" />

        {errors.map((err: any) => (
          <div>
            {err.name}: {err.reason}{" "}
            {err?.reasons?.map((reason: string) => (
              <p>{reason}</p>
            ))}
          </div>
        ))}
      </div>
    );
  }

  // if (loading) {
  //   return <Spinner loading={true} />;
  // }

  const removeImage = (index: number, imageId?: string) => {
    if (imageId) {
      setFilteredImages((prev) =>
        prev.filter((image: ImagePickerFile) => image.id != imageId)
      );
      onImageDelete?.(imageId);
    } else {
      removeFileByIndex(index);
      const newImages = selectedImages.filter((_, i) => i != index);
      setSelectedImages(newImages);

      onChange({
        name,
        files: newImages,
      });
    }
  };

  const ImageContainer = ({
    image,
    index,
    imageId,
  }: {
    image: string;
    index: number;
    imageId?: string;
  }) => {
    return (
      <div className="image-container">
        <IoIosCloseCircleOutline
          className="image-remove-button"
          onClick={() => removeImage(index, imageId)}
        />
        <img className="image-picker-image" alt={"image"} src={image}></img>
      </div>
    );
  };

  return (
    <div>
      <FilePickerButton label={label} />
      <Box rounded={"sm"}>
        {filesContent.length > 0 && (
          <SimpleGrid mt={2} columns={{ sm: 2, md: 3 }} spacing={2}>
            {filesContent.map((file, index) => (
              <ImageContainer key={index} image={file.content} index={index} />
            ))}
          </SimpleGrid>
        )}
        {!!filteredImages?.length && (
          <SimpleGrid mt={2} columns={{ sm: 2, md: 3 }} spacing={2}>
            {filteredImages?.map((image, index) => (
              <ImageContainer
                key={index}
                imageId={image.id}
                image={image.file}
                index={index}
              />
            ))}
          </SimpleGrid>
        )}
      </Box>
    </div>
  );
};

export default ImagePicker;
