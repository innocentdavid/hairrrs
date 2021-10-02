import { useEffect } from "react";
import "filepond/dist/filepond.min.css";
import * as FilePond from "filepond";
// import "filepond-plugin-image-preview/dist/filepond-plugin-image-preview.min.css";
// import FilePondPluginImagePreview from "filepond-plugin-image-preview";
import FilePondPluginImageTransform from "filepond-plugin-image-transform";
import FilePondPluginFileMetadata from "filepond-plugin-file-metadata";
import FilePondPluginImageResize from 'filepond-plugin-image-resize';
import { uploadToFirebase } from "../lib/api";
import { triggerAuthUser } from "../myFunctions";
// import UserProfile from "./UserProfile/UserProfile";
import { auth } from '../firebase';

function FilePondWaterMark({ setProgress, closeInsertImageModal }) {

  const WATERMARK = '/image2vector.svg';

  FilePond.registerPlugin(
    FilePondPluginImageTransform, FilePondPluginFileMetadata, FilePondPluginImageResize
    // FilePondPluginImagePreview,
  );

  const imageResizeTargetWidth = 250
  const imageResizeTargetHeight = 150

  useEffect(() => {
    const filePondInput = document.querySelector('#filePond');
    const currentUser = auth.currentUser;
    if (currentUser) {
      FilePond.create(filePondInput, {
        // This is where we describe our watermark, it's a
        // basic black transparent bar at the bottom with
        // the your logo positioned inside of it
        fileMetadataObject: {
          markup: [
            ["rect", {
              left: 0,
              right: 0,
              bottom: 0,
              height: "60px"
              // backgroundColor: "rgba(0,0,0,.5)"
            }],
            ["image", {
              right: "10px",
              bottom: "10px",
              // width: "128px",
              // height: "34px",
              width: "100px",
              height: "20px",
              src: WATERMARK,
              fit: "contain"
            }]
          ]
        },
        labelIdle: 'Drag & Drop your image or <span class="filepond--label-action">Browse</span>',
        allowMultiple: true,
        // maxFiles: 5,
        name: "files",
        credits: { label: 'Powered by PQINA', url: 'https://pqina.nl/filepond/docs/api/instance/properties/#disabling-credits' },
        onerror: (error) => { error && console.log('onerror', error) },
        onaddfile: (error, file) => { error && console.log('onaddfileError', error) },
        allowImageResize: true,
        imageResizeTargetWidth,
        imageResizeTargetHeight,
        imageResizeUpscale: false,
        imageResizeMode: "contain",
        onpreparefile: (file, output) => { // console.log(output);
          // const result = new Image(); result.src = URL.createObjectURL(output); result.alt = "hairrrs";
          uploadToFirebase(output, file.file.name, setProgress)
        },
      })
    } else {
      alert('You have to login to continue');
      closeInsertImageModal()
      triggerAuthUser(true)
    }

    return () => {
      FilePond.destroy()
    }
  }, [closeInsertImageModal, setProgress])


  return (
    <input type="file" name="filePond" id="filePond" />
  )
}

export default FilePondWaterMark