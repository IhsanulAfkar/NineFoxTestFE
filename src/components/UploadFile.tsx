import { FilePond, registerPlugin } from "react-filepond";
import "filepond/dist/filepond.min.css";

import FilePondPluginImageExifOrientation from "filepond-plugin-image-exif-orientation";
import FilePondPluginImagePreview from "filepond-plugin-image-preview";
import "filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css";
import FilePondPluginFileValidateType from 'filepond-plugin-file-validate-type';

registerPlugin(FilePondPluginImageExifOrientation, FilePondPluginImagePreview, FilePondPluginFileValidateType);

const UploadFile = ({ files, setfiles }: {
    files: File[] | undefined,
    setfiles: any
}) => {
    return (
        <>
            <FilePond
                files={files}
                allowReorder={true}
                onupdatefiles={setfiles}
                className=''
                // allowMultiple
                acceptedFileTypes={['image/png', 'image/jpg', 'image/jpeg']}
                credits={false}
                labelIdle='Drag & Drop your files or <span class="filepond--label-action">Browse</span>'
            />
        </>
    )
}

export default UploadFile