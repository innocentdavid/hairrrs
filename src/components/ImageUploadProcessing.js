import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import ReactImageProcess from 'react-image-process';

function ImageUploadProcessing({ imageToBeWaterMarked }) {
  const [imageToBeWaterMarkedUrl, setImageToBeWaterMarkedUrl] = useState(undefined);
  const [actualImgWidth, setActualImgWidth] = useState(0)
  const [actualimgHeight, setActualImgHeight] = useState(0)
  const [imgWidth, setImgWidth] = useState(0)
  const [imgHeight, setImgHeight] = useState(undefined)

  function readURL(imageToBeWaterMarked) {
    if (imageToBeWaterMarked) {
      var reader = new FileReader();
      reader.onload = function (e) {
        var img = new Image();
        img.onload = function () {
          setActualImgWidth(img.width)
          setActualImgHeight(img.height)
          setImgWidth((40 / 100) * img.width)
          setImgHeight((78 / 100) * img.height)
        };
        img.src = reader.result;
      };
      reader.readAsDataURL(imageToBeWaterMarked);
    }
  }

  useEffect(() => {
    if (!imageToBeWaterMarked) {
      setImageToBeWaterMarkedUrl(undefined)
      return
    }

    const objectUrl = URL.createObjectURL(imageToBeWaterMarked)
    readURL(imageToBeWaterMarked)
    setImageToBeWaterMarkedUrl(objectUrl)

    // free memory when ever this component is unmounted
    return () => URL.revokeObjectURL(objectUrl)
  }, [imageToBeWaterMarked])



  console.log(imageToBeWaterMarkedUrl)
  const onComplete = data => {
    console.log('data:', data);
  };


  const WATERMARK_IMAGE = '/watermark.png';

  console.log([imgWidth, imgHeight])

  return (<>
    {/* waterMark */}

    {imgHeight ? <ReactImageProcess
      mode="waterMark"
      waterMarkType="image"
      waterMark={WATERMARK_IMAGE}
      width={120}
      height={25}
      coordinate={[imgWidth, imgHeight]}
      opacity={1}
      onComplete={ onComplete }
    >
      <img src={imageToBeWaterMarkedUrl} width={actualImgWidth} height={actualimgHeight} alt='hairrrs' />

    </ReactImageProcess> : <>Loading . . .</>}


  </>)
}

export default ImageUploadProcessing

  // // waterMark with text
//   < ReactImageProcess
//     mode = "waterMark"
//     waterMarkType = "text"
//     waterMark = { 'posted on hairrrs.com'}
//     fontBold = { false}
//     fontSize = { 12}
//     fontColor = "#396"
//     coordinate = { [100, 110]}
//   >
//   <img src="YOUR_IMG_URL" />
// </ReactImageProcess >



// // <ReactImageProcess mode="primaryColor" onComplete={color => console.log(color)}>
// <ReactImageProcess
// mode="clip"
// scale={1.0}
// coordinate={[[200, 200], [300, 300]]}
// >
// <img src="/images/9555bcdb781e5cf8ab9ef3504a952220.png" alt="" />
// {/* <img src="/images/21-long-black-and-white-braids-B04kshXAuWR.jpg" alt="" /> */}
// </ReactImageProcess>






// base64
//<ReactImageProcess mode="base64" onComplete={onComplete}>
  //  {/* <img src="YOUR_IMG_URL" /> */}
  //</ReactImageProcess>



// Support multiple Images

// <ReactImageProcess mode="compress" quality={0.2} onComplete={onComplete}>
//   <img src="YOUR_IMG_URL" />
//   <img src="YOUR_IMG_URL" />
// </ReactImageProcess>





// rotate

// <ReactImageProcess mode="rotate" rotate={30}>
//   <img src="YOUR_IMG_URL" />
// </ReactImageProcess>






// get primary color

// <ReactImageProcess mode="primaryColor" onComplete={color => console.log(color)}>
//   <img src="YOUR_IMG_URL" />
// </ReactImageProcess>





// imageFilter

// <ReactImageProcess mode="filter" filterType="vintage">
//   <img src="YOUR_IMG_URL" />
// </ReactImageProcess>