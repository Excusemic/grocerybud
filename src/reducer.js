export const reducer = (prevState, action) => {
  switch (action.type) {
    case "ADD_ITEM":
      return {
        ...prevState,
        list: [...prevState.list, action.payload],
        isModalOpen: true,
        modalContent: "Item added",
      }
    case "INPUT_BLANK":
      return { ...prevState, isModalOpen: true, modalContent: "type something" }
    case "DELETE":
      const newList = prevState.list.filter((item) => item.id !== action.payload)
      return {
        ...prevState,
        list: newList,
        isModalOpen: true,
        modalContent: "deleted",
      }
    case "EDIT":
      const editedItem = localStorage.getItem("item")
      const foundItem = prevState.list.findIndex((elem) => elem.id === editedItem)
      prevState.list[foundItem].item = action.payload
      return {
        ...prevState,
        isModalOpen: true,
        modalContent: "Item edited",
      }
    case "HIDE_MODAL":
      return {
        ...prevState,
        isModalOpen: false,
        modalContent: "",
      }
    case "CLEAR_LIST":
      return {
        ...prevState,
        list: [],
        isModalOpen: true,
        modalContent: "Cleared",
      }

    default:
      throw new Error("uknown action type")
  }
}
