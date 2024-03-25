export interface MultiFilePickerItemData {
  name: string;
  file: File;
}

export interface ImagePickerFile {
  id: string;
  file: File;
}

export interface ImagePickerItemData {
  name: string;
  files: ImagePickerFile[];
}
export interface FilePicker {
  name: string;
  file: File;
}
