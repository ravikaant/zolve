import { useCallback, useRef, useState } from "react";
import './styles.css'
import getCroppedImg from "./utils";
import Camera from "../components/camera";
import Crop from "../components/crop";

export default function Media() {
  const [showWebCam, setShowWebCam] = useState(false);
  const [imageSrc, setImageSrc] = useState(null);
  const [crop, setCrop] = useState({ x: 0, y: 0 })
  const [zoom, setZoom] = useState(1)
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null)
  const [croppedImage, setCroppedImage] = useState(null)

  const onCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels)
    console.log(croppedArea, croppedAreaPixels)
  }, [])

  const webcamRef = useRef(null);
  const capture = useCallback(() => {
    const imageSrc = webcamRef.current.getScreenshot({ width: 500, height: 500 });
    console.log(imageSrc);
    setImageSrc(imageSrc);
    setCrop({ x: 0, y: 0 });
    setZoom(1);
    setShowWebCam(false);
    setCroppedImage(null);
  }, [webcamRef]);

  const showCroppedImage = useCallback(async () => {
    try {
      setImageSrc(null);
      const croppedImage = await getCroppedImg(
        imageSrc,
        croppedAreaPixels,
      )
      setCroppedImage(croppedImage)
    } catch (e) {
      console.error(e)
    }
  }, [croppedAreaPixels])

  const startCamera = () => {
    setShowWebCam(true);
    setCroppedImage(null);
  }

  return (
    <main>
      <h2>Media</h2>
      {showWebCam && <Camera capture={capture} webcamRef={webcamRef} />}
      {!showWebCam && imageSrc && !croppedImage &&
        <Crop imageSrc={imageSrc} crop={crop} zoom={zoom} setZoom={setZoom} setCrop={setCrop} retake={startCamera} onCropComplete={onCropComplete} showCroppedImage={showCroppedImage} />}

      {croppedImage !== null && !showWebCam && !imageSrc && <img className="croppedImage" src={croppedImage} alt="cropped" />}
      {!showWebCam && !imageSrc && !croppedImage && <button className="actionButton" onClick={startCamera}>
        Start Camera
      </button>}
    </main>
  );
}