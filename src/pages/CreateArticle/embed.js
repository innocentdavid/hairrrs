import React, { useState, useEffect } from "react";
import { Steps, Step } from "react-step-builder";
// import { MDBContainer, MDBBtn, MDBModal, MDBModalBody, MDBModalHeader, MDBModalFooter } from 'mdbreact';
import { MDBBtn,
  MDBModal,
  MDBModalDialog,
  MDBModalContent,
  MDBModalHeader,
  MDBModalTitle,
  MDBModalBody,
  // MDBModalFooter,
} from 'mdb-react-ui-kit';

function Step1(props) {
  return (<>
    <div>
      <p>Name: <input name="name" value={props.getState('name', '')} onChange={props.handleChange} /></p>
      <p>Surname: <input name="surname" value={props.getState('surname', '')} onChange={props.handleChange} /></p>
      {/* <input type="radio" name="" /> */}
    </div>
  </>);
}


function Step2(props) {
  return (<>
    <div>
      <p>Email: <input name="email" value={props.getState('email', '')} onChange={props.handleChange} /></p>
      <p>Phone: <input name="phone" value={props.getState('phone', '')} onChange={props.handleChange} /></p>
    </div>
  </>);
}

function FinalStep(props) {
  return (<>
    <div>
      <p>Name: {props?.state?.name}</p>
      <p>Surname: {props?.state?.surname}</p>
      <p>Email: {props?.state?.email}</p>
      <p>Phone: {props?.state?.phone}</p>
    </div>
  </>);
}

const Navigation = (props) => {
  const [disablePrev, setDisablePrev] = useState('')
  const [disableNext, setDisableNext] = useState('')

  useEffect(() => {
    props.current === 1 ? setDisablePrev('disabledBtn') : setDisablePrev('');
    props.current === props.size ? setDisableNext('disabledBtn') : setDisableNext('');
  }, [props])

  return (
    <div>
      <button className={disablePrev} disabled={props.current === 1} onClick={props?.prev}>Previous</button>
      <button className={disableNext} disabled={props.current === props.size} onClick={props?.next}>Next</button>
    </div>
  );
};


export default function Embed() {
  const config = {
    navigation: {
      component: Navigation, // a React component with special props provided automatically
      location: "after" // or before
    }
  };

  const [basicModal, setBasicModal] = useState(false);

  const toggleShow = () => setBasicModal(!basicModal);

  return (<>
    {/* <MDBBtn onClick={toggleShow}>LAUNCH DEMO MODAL</MDBBtn> */}
    <img onClick={toggleShow} src="/images/Icon feather-plus.svg" alt="icon" />
    <MDBModal show={basicModal} getOpenState={(e) => setBasicModal(e)} tabIndex='-1'>
      <MDBModalDialog>
        <MDBModalContent>
          <MDBModalHeader>
            <MDBModalTitle className="ml-3">Embed</MDBModalTitle>
            <MDBBtn className='fas fa-times' color='none' onClick={toggleShow}></MDBBtn>
          </MDBModalHeader>
          
          <MDBModalBody>
          <Steps config={config}>
            <Step component={Step1} />
            <Step component={Step2} />
            <Step component={FinalStep} />
          </Steps>
          </MDBModalBody>

          {/* <MDBModalFooter>
            <MDBBtn color='secondary' onClick={toggleShow}>
              Close
            </MDBBtn>
            <MDBBtn>Save changes</MDBBtn>
          </MDBModalFooter> */}
        </MDBModalContent>
      </MDBModalDialog>
    </MDBModal>
  </>);
}

export { Step1, Step2, FinalStep };