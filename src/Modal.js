import React, { useEffect } from "react"

const Modal = ({ modalContent, hideModal }) => {
  useEffect(() => {
    const hide = setTimeout(() => {
      hideModal()
    }, 2000)
    return () => {
      clearTimeout(hide)
    }
  })
  return (
    <div className="modal">
      <p>{modalContent}</p>
    </div>
  )
}

export default Modal
