import Webcam from "react-webcam";
import './index.css'

const Camera = ({ webcamRef, capture }) => {

  return (
    <div className="cameraContainer">
      <Webcam mirrored={true} ref={webcamRef} />
      <button className="captureButton" onClick={capture} >
        <div className="innerCapture" />
      </button>
    </div>)
}

export default Camera;
