import Cropper from 'react-easy-crop'
import './index.css'

const Crop = ({ imageSrc, crop, zoom, setCrop, onCropComplete, setZoom, showCroppedImage, retake }) => {
  return (
    <div className="cropContainer"><Cropper
      image={imageSrc}
      crop={crop}
      zoom={zoom}
      aspect={1}
      onCropChange={setCrop}
      onCropComplete={onCropComplete}
      onZoomChange={setZoom}
      cropShape="round"
      showGrid={false}
    />
      <button className="retakeButton" onClick={retake}>Retake</button>
      <button className="doneButton" onClick={showCroppedImage}>Done</button>

    </div>
  )
}

export default Crop;
