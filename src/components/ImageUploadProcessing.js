import React from 'react';
import ReactImageProcess from 'react-image-process';

function ImageUploadProcessing() {
    const onComplete = data => {
        console.log('data:', data);
    };

    return (
        // <ReactImageProcess mode="primaryColor" onComplete={color => console.log(color)}>
        <ReactImageProcess
        mode="clip"
          scale={1.0}
          coordinate={[[200, 200], [300, 300]]}
>
            <img src="/images/9555bcdb781e5cf8ab9ef3504a952220.png" alt="" />
            {/* <img src="/images/21-long-black-and-white-braids-B04kshXAuWR.jpg" alt="" /> */}
          </ReactImageProcess>
        // <h1>Hello</h1>
    )
}

export default ImageUploadProcessing



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
// waterMark

// <ReactImageProcess
//   mode="waterMark"
//   waterMarkType="image"
//   waterMark={YOUR_WATER_URL}
//   width={60}
//   height={60}
//   opacity={0.7}
//   coordinate={[430, 200]}
// >
//   <img src="YOUR_IMG_URL" />
// </ReactImageProcess>
// <ReactImageProcess
//   mode="waterMark"
//   waterMarkType="text"
//   waterMark={'WATER'}
//   fontBold={false}
//   fontSize={20}
//   fontColor="#396"
//   coordinate={[10, 20]}
// >
//   <img src="YOUR_IMG_URL" />
// </ReactImageProcess>
// imageFilter

// <ReactImageProcess mode="filter" filterType="vintage">
//   <img src="YOUR_IMG_URL" />
// </ReactImageProcess>