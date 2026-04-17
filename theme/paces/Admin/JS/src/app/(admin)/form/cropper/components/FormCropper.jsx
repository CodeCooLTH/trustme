'use client'

import small1 from '@/assets/images/stock/small-1.jpg'
import 'cropperjs/dist/cropper.css'
import Image from 'next/image'
import { useRef, useState } from 'react'
import { Cropper } from 'react-cropper'
const FormCropper = () => {
  const cropperRef = useRef(null)
  const fileInputRef = useRef(null)
  const [imageSrc, setImageSrc] = useState(small1.src)
  const [croppedImage, setCroppedImage] = useState(null)
  const [aspectRatio, setAspectRatio] = useState(NaN)
  const onSelectFile = (e) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = () => setImageSrc(reader.result)
      reader.readAsDataURL(file)
    }
  }
  const handleCrop = () => {
    const cropper = cropperRef.current?.cropper
    if (cropper) {
      const canvas = cropper.getCroppedCanvas()
      const croppedDataUrl = canvas.toDataURL()
      setCroppedImage(croppedDataUrl)
    }
  }
  const handleDownload = () => {
    if (!croppedImage) return
    const link = document.createElement('a')
    link.href = croppedImage
    link.download = 'cropped.png'
    link.click()
  }
  const handleClear = () => {
    if (fileInputRef.current) fileInputRef.current.value = ''
    setImageSrc(small1.src)
    setCroppedImage(null)
  }
  return (
    <div className="container-fluid">
      <div className="card">
        <div className="card-header flex items-center justify-center">
          <h5>Upload &amp; Crop Image</h5>
          <span className="ms-auto text-2xs text-default-400">Default demo image is used until user uploads.</span>
        </div>

        <div className="card-body">
          <div className="grid xl:grid-cols-3 grid-cols-1 gap-5 items-end">
            <div className="xl:col-span-2">
              <label htmlFor="fileInput" className="form-label">
                Choose an image
              </label>
              <input
                ref={fileInputRef}
                type="file"
                id="fileInput"
                accept="image/*"
                className="block w-full border border-default-300 rounded disabled:opacity-50 disabled:pointer-events-none file:bg-default-100 file:border-0 file:me-4 file:py-2 file:px-3"
                onChange={onSelectFile}
              />
            </div>

            <div className="flex flex-col gap-3">
              <button id="useDemoBtn" className="btn border-secondary border text-secondary" onClick={() => setImageSrc(small1.src)}>
                Use Demo Image
              </button>
              <button id="clearInputBtn" className="btn border-default-300 border text-default-800" onClick={handleClear}>
                Clear File Input
              </button>
            </div>
          </div>

          <div className="grid xl:grid-cols-3 grid-cols-1 gap-5 mt-7.5">
            <div className="xl:col-span-2">
              <div className="relative w-full bg-white border border-default-300 rounded">
                <Cropper src={imageSrc} initialAspectRatio={16 / 9} aspectRatio={aspectRatio} guides={true} ref={cropperRef} preview=".cropper-img-preview" viewMode={1} background={false} responsive={true} autoCropArea={1} checkOrientation={false} />
              </div>
            </div>

            <div>
              <div className="flex flex-wrap gap-3">
                <button className="btn border border-primary text-primary hover:text-white hover:bg-primary" id="zoomInBtn" onClick={() => cropperRef.current?.cropper.zoom(0.1)}>
                  Zoom In
                </button>
                <button className="btn border border-primary text-primary hover:text-white hover:bg-primary" id="zoomOutBtn" onClick={() => cropperRef.current?.cropper.zoom(-0.1)}>
                  Zoom Out
                </button>
                <button className="btn border border-primary text-primary hover:text-white hover:bg-primary" id="rotateLeftBtn" onClick={() => cropperRef.current?.cropper.rotate(-45)}>
                  Rotate -45°
                </button>
                <button className="btn border border-primary text-primary hover:text-white hover:bg-primary" id="rotateRightBtn" onClick={() => cropperRef.current?.cropper.rotate(45)}>
                  Rotate +45°
                </button>
                <button className="btn border-secondary border text-secondary hover:text-white hover:bg-secondary" id="resetBtn" onClick={() => cropperRef.current?.cropper.reset()}>
                  Reset
                </button>

                <div className="ms-auto flex items-center gap-3">
                  <label htmlFor="aspect" className="form-label">
                    Aspect:
                  </label>
                  <select
                    id="aspect"
                    className="form-select"
                    style={{
                      width: 'auto',
                    }}
                    onChange={(e) => setAspectRatio(e.target.value === 'NaN' ? undefined : eval(e.target.value))}
                  >
                    <option>Free</option>
                    <option value={1}>1:1</option>
                    <option value="16/9">16:9</option>
                    <option value="4/3">4:3</option>
                    <option value="3/4">3:4</option>
                  </select>
                </div>
              </div>

              <p className="font-semibold mb-4 mt-7.5">Live Preview</p>
              <div className="cropper-img-preview"></div>

              <div className="mt-7.5">
                <p className="font-semibold mb-3">Cropped Output</p>
                {croppedImage ? (
                  <Image id="croppedResult" className="img-thumbnail bg-default-100 inline-block p-1" src={croppedImage} alt="Cropped result" width={389} height={200} />
                ) : (
                  <Image id="croppedResult" className="img-thumbnail bg-default-100 inline-block p-1" src={small1} alt="Default demo image" width={389} height={200} />
                )}
              </div>

              <div className="mt-4 grid grid-cols-1 gap-3">
                <button id="cropBtn" className="btn bg-primary text-white hover:bg-primary-hover" onClick={handleCrop}>
                  Crop & Preview
                </button>
                <a id="downloadBtn" download="cropped.png" onClick={handleDownload} className={`btn border-secondary text-secondary ${croppedImage ? '' : 'disabled'}`}>
                  Download Cropped
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
export default FormCropper
