import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faPen, faTrash } from "@fortawesome/free-solid-svg-icons" 
import { useEffect, useState } from "react"
import ReactDOM from "react-dom";
import DeleteModal from "./DeleteModal"
import { useDispatch } from "react-redux"
import { displayFolderMenu, setNameEditable } from "../redux/features/Folder"

interface FolderMenuProps {
  menuPosition: {top: number, left: number}
  ID: number 
}

export default function folderMenu({menuPosition, ID}: FolderMenuProps ) {
  let top = menuPosition.top
  const left = menuPosition.left
  if (menuPosition.top < 650) {
    top += 20;
  } else {
    top -= 100;
  }

  const dispatch = useDispatch()
  const [confirmModal, setConfirmModal] = useState(false)

  const handleCloseMenu = () => {
    dispatch(displayFolderMenu(ID))
  }

  const handleRename = () => {
    dispatch(setNameEditable(ID))
    dispatch(displayFolderMenu(ID))
  }

  const  displayConfirmModal = () => {
    setConfirmModal(true);
  }

  useEffect(() => {
    document.body.style.overflow = 'hidden'

    return () => {
      document.body.style.overflow = 'auto';
    };
  },[])

  return ReactDOM.createPortal (
    <div className="">
      { !confirmModal ? (
      <div>
        <div onClick={handleCloseMenu} className="fixed w-screen h-screen top-0 left-0"/>
        <ul className="absolute w-40 p-2 bg-gray-200 rounded-lg drop-shadow-lg hover:cursor-pointer"
            style={{top: top, left: left}}>
          <li onClick={handleRename} className="p-2 rounded-md hover:bg-gray-100">
            <FontAwesomeIcon icon={faPen} className="mr-2" />
            編集
          </li>
          <li onClick={displayConfirmModal} className="p-2 rounded-md hover:bg-gray-100">
          <FontAwesomeIcon icon={faTrash} className="mr-2" />
            削除
          </li>
        </ul> 
      </div>
      )
      :
      <div onClick={handleCloseMenu} 
        className="absolute top-0 left-0 w-screen h-screen">
        { confirmModal &&
          <DeleteModal ID={ID} setConfirmModal={setConfirmModal} />
        }
      </div>
      } 
    </div>,
    document.body
  )
}