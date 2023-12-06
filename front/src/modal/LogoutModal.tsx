import axios from "../config/axios";
import ReactDOM from "react-dom";
import { useDispatch } from "react-redux";
import { logout } from "../redux/features/Auth";
import { useNavigate } from "react-router-dom";
//import { resetState } from "../redux/features/Folder";

interface LogoutModalProps {
  setConfirmModal: React.Dispatch<React.SetStateAction<boolean>>
}

export default function LogoutModal({setConfirmModal}: LogoutModalProps) {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const onCancel = () => {
    setConfirmModal(false);
  }

  const handleLogout = async () => {
    await axios.post("/api/logout")
    .then(() => {
      dispatch(logout())
      navigate("/")
    })
  }

  return ReactDOM.createPortal (
    <div onClick={onCancel} className="fixed top-0  w-screen h-screen flex justify-center items-center bg-black bg-opacity-10">
      <div className="h-36 w-[400px] bg-white rounded-lg">
        <p className="px-4 py-5 text-xl border-b">ログアウトしますか？</p>
        <div className="mt-4 mr-4 flex justify-end gap-3">
          <button onClick={onCancel} className="p-2 rounded-lg border hover:cursor-pointer hover:bg-gray-50">キャンセル</button>
          <button onClick={handleLogout} className="p-2 bg-red-500 text-white rounded-lg hover:cursor-pointer hover:bg-red-600">ログアウト</button>
        </div>
      </div>
    </div>,
    document.body
  )
}