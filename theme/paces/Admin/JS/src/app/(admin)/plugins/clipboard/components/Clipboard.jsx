'use client'

import Icon from '@/components/wrappers/Icon'
import { useRef } from 'react'
import { useCopyToClipboard } from 'usehooks-ts'
const Clipnoard = () => {
  const [copiedText, copy] = useCopyToClipboard()
  const inputRef = useRef(null)
  const textareaRef = useRef(null)
  const cutToClipboard = async (inputRef) => {
    const el = inputRef.current
    if (el) {
      const success = await copy(el.value)
      if (success) {
        el.value = ''
      }
    }
  }
  return (
    <div className="card">
      <div className="card-header">
        <h4 className="card-title">Examples</h4>
      </div>
      <div className="card-body">
        <div className="grid xl:grid-cols-2 gap-base">
          <div className="border-light h-full rounded border p-6">
            <h5 className="mb-1.5">Copy from Element</h5>
            <p className="text-primary mb-4 font-bold" id="copytext">
              Click the button to copy this promotional text.
            </p>
            <button className="btn btn-sm bg-primary hover:bg-primary-hover text-white" onClick={() => copy('Click the button to copy this promotional text.')}>
              <Icon icon="copy" className="me-1" />
              {copiedText ? 'Copied' : ' Copy Text'}
            </button>
          </div>
          <div className="border-light h-full rounded border p-6">
            <h5 className="mb-1.5">Cut from Textarea</h5>

            <textarea ref={textareaRef} className="form-textarea" id="cuttext" defaultValue={'This content will be cut and removed from this textarea.'} />
            <button className="btn btn-sm bg-primary hover:bg-primary-hover mt-3 text-white" onClick={() => cutToClipboard(textareaRef)}>
              <Icon icon="cut" className="me-1" />
              Cut Content
            </button>
          </div>

          <div className="border-light h-full rounded border p-6">
            <h5 className="mb-1.5">Cut Input Value</h5>
            <p className="text-default-400 mb-3">This cuts the value from a single-line input field.</p>
            <input type="text" ref={inputRef} className="form-input" defaultValue="Temporary token: 8GDF-393K-L99Z" />
            <button className="btn btn-sm bg-danger hover:bg-danger-hover mt-2 text-white" onClick={() => cutToClipboard(inputRef)}>
              <Icon icon="cut" className="me-1" />
              Cut Token
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
export default Clipnoard
