import { useDispatch } from "react-redux"
import { deleteFolder } from "../redux/features/Folder"
import axios from "../config/axios"

interface DeleteProps {
  ID: number
  setConfirmModal: React.Dispatch<React.SetStateAction<boolean>>
}

export default function DeleteConfrim({ID, setConfirmModal} : DeleteProps) {
  const dispatch = useDispatch()

  const onCancel = () => {
    setConfirmModal(false)
  }

  const onDelete = async (ID: number) => {
    try {
      const res = await axios.delete(`/api/delete_folder/${ID}`);
      if (res.status === 200) {
        dispatch(deleteFolder(ID));
      }
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <div className="fixed w-screen h-screen flex justify-center items-center bg-black bg-opacity-10">
      <div className="h-36 w-[400px] bg-white rounded-lg">
        <p className="px-4 py-5 text-xl border-b">フォルダを削除しますか？</p>
        <div className="mt-4 mr-4 flex justify-end gap-3">
          <button onClick={onCancel} className="p-2 rounded-lg border hover:cursor-pointer hover:bg-gray-50">キャンセル</button>
          <button onClick={() => onDelete(ID)} className="p-2 bg-red-500 text-white rounded-lg hover:cursor-pointer hover:bg-red-600">削除</button>
        </div>
      </div>
    </div>
  )
}