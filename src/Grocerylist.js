import React, { useState, useReducer, useEffect, useRef } from "react"
import { reducer } from "./reducer"
import { RiDeleteBin6Line } from "react-icons/ri"
import { FiEdit } from "react-icons/fi"
import Modal from "./Modal"

const Grocerylist = () => {
  const defaultState = {
    list: JSON.parse(localStorage.getItem("list")) || [],
    isModalOpen: false,
    modalContent: "",
  }
  const inputContainer = useRef(null)
  const [item, setItem] = useState("")
  const [isEdit, setIsEdit] = useState(false)
  const [state, dispatch] = useReducer(reducer, defaultState)
  const handleSubmit = (e) => {
    e.preventDefault()
    if (item && !isEdit) {
      const newItem = { item, id: new Date().getTime().toString() }
      dispatch({ type: "ADD_ITEM", payload: newItem })
      setItem("")
    } else if (item && isEdit) {
      dispatch({ type: "EDIT", payload: item })
      setIsEdit(false)
      setItem("")
    } else {
      dispatch({ type: "INPUT_BLANK" })
    }
  }
  const handleEdit = (editItem, id) => {
    localStorage.setItem("item", id)
    setItem(editItem)
    setIsEdit(true)
    inputContainer.current.focus()
  }
  const hideModal = () => {
    dispatch({ type: "HIDE_MODAL" })
  }
  useEffect(() => {
    localStorage.setItem("list", JSON.stringify(state.list))
  }, [state])
  return (
    <div className="content">
      <h2 className="title">Grocery Bud</h2>
      <Modal modalContent={state.modalContent} hideModal={hideModal}></Modal>
      <form onSubmit={handleSubmit}>
        <input
          ref={inputContainer}
          type="text"
          value={item}
          onChange={(e) => setItem(e.target.value)}
          placeholder="e.g. eggs"
        />
        <button type="submit">{isEdit ? "Edit" : "Add"}</button>
      </form>
      {state.list &&
        state.list.map((item) => {
          return (
            <div key={item.id} className="item">
              <p>{item.item}</p>
              <div>
                <FiEdit onClick={() => handleEdit(item.item, item.id)} className="edititem" />
                <RiDeleteBin6Line
                  onClick={() => dispatch({ type: "DELETE", payload: item.id })}
                  className="edititem"
                />
              </div>
            </div>
          )
        })}
      <button className="reset" onClick={() => dispatch({ type: "CLEAR_LIST" })}>
        Clear Items
      </button>
    </div>
  )
}

export default Grocerylist
