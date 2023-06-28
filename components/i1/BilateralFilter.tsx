/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
import { ChangeEventHandler, FC, memo, useCallback, useEffect, useRef, useState } from 'react'
import { smoothBilateral, subtract, enhanceDetail } from './utils'
import Button from '../Button'
import { Leva, useControls } from 'leva'

interface Props {}

const BilateralFilter: FC<Props> = () => {
  const originalImgRef = useRef<HTMLImageElement>(null)
  const smoothedImgRef = useRef<HTMLImageElement>(null)
  const detailImgRef = useRef<HTMLImageElement>(null)
  const enhancedImgRef = useRef<HTMLImageElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [imageURL, setImageURL] = useState(
    'https://cdn.glitch.com/1214143e-0c44-41fb-b1ad-e9aa3347cdaa%2Frock.png?v=1562148154890',
  )
  const [width, setWidth] = useState(0)
  const [height, setHeight] = useState(0)

  const {
    Sigma_Space: sigmaSpace,
    Sigma_Range: sigmaRange,
    Detail_Scaling: detailScaling,
  } = useControls({
    Sigma_Space: { value: 5, step: 1, min: 3, max: 10 },
    Sigma_Range: { value: 20, step: 1, min: 15, max: 25 },
    Detail_Scaling: { value: 2, step: 1, min: 1, max: 5 },
  })

  const applyFilter = useCallback(() => {
    const img = originalImgRef.current
    const canvas = canvasRef.current
    if (!img || !canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    ctx.drawImage(img, 0, 0)
    const original = ctx.getImageData(0, 0, width, height)
    const smoothed = ctx.getImageData(0, 0, width, height)
    smoothBilateral(width, height, original.data, smoothed.data, sigmaSpace, sigmaRange)
    ctx.putImageData(smoothed, 0, 0)
    smoothedImgRef.current!.src = canvas.toDataURL()
    const detail = ctx.createImageData(width, height)
    subtract(width, height, original.data, smoothed.data, detail.data)
    ctx.putImageData(detail, 0, 0)
    detailImgRef.current!.src = canvas.toDataURL()
    const enhanced = ctx.createImageData(width, height)
    enhanceDetail(width, height, smoothed.data, detail.data, detailScaling, enhanced.data)
    ctx.putImageData(enhanced, 0, 0)
    enhancedImgRef.current!.src = canvas.toDataURL()
  }, [detailScaling, height, sigmaRange, sigmaSpace, width])

  const onOriginalImageLoad = useCallback(() => {
    if (!originalImgRef.current) return
    const img = originalImgRef.current
    setWidth(img.width)
    setHeight(img.height)
  }, [])

  const onFileChange: ChangeEventHandler<HTMLInputElement> = useCallback((event) => {
    const file = event.target.files?.[0]
    if (!file) return

    const imageUrl = URL.createObjectURL(file)
    setImageURL(imageUrl)
  }, [])

  useEffect(() => {
    if (originalImgRef.current?.complete) {
      onOriginalImageLoad()
    }
  }, [onOriginalImageLoad])

  return (
    <div className="flex w-full flex-col items-center px-5">
      <div className="mb-2 flex w-full justify-center gap-x-4">
        <div className="flex flex-col items-center">
          <img
            src={imageURL}
            ref={originalImgRef}
            onLoad={onOriginalImageLoad}
            crossOrigin="anonymous"
            alt="original image"
          />
          <span className="text-base text-gray-600">original</span>
        </div>
        <div className="flex flex-col items-center">
          <img ref={smoothedImgRef} width={width} height={height} />
          <span className="text-base text-gray-600">smoothed</span>
        </div>
        <div className="flex flex-col items-center">
          <img ref={detailImgRef} width={width} height={height} />
          <span className="text-base text-gray-600">detail</span>
        </div>
        <div className="flex flex-col items-center">
          <img ref={enhancedImgRef} width={width} height={height} />
          <span className="text-base text-gray-600">enhanced</span>
        </div>
      </div>
      <div className="my-4">
        <Leva fill />
      </div>
      <Button onClick={applyFilter}>Apply filter</Button>
      <div className="my-2">
        <span className="text-base text-gray-600">You can upload other pictures </span>
        <label htmlFor="file_upload" className="cursor-pointer text-base text-blue-500 underline">
          here
        </label>
        <span className="text-base text-gray-600"> . </span>
      </div>
      <input
        id="file_upload"
        name="file_upload"
        className="hidden"
        type="file"
        accept="image/*"
        onChange={onFileChange}
      />
      <canvas className="hidden" ref={canvasRef} width={width} height={height} />
    </div>
  )
}

export default memo(BilateralFilter)
