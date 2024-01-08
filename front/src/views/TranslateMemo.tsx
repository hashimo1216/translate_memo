import { useDispatch, useSelector } from "react-redux";
import Main from "../components/Main";
import Sidebar from "../components/Sidebar";
import { RootState } from "../redux/store/store";
import { useEffect} from "react";
import axios from "../config/axios";
import { useNavigate } from "react-router-dom";
import { login, logout } from "../redux/features/Auth";
import { setFolders } from "../redux/features/Folder";

export default function TranslateMemo() {
  const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn)
  const folder = useSelector((state: RootState) => state.folder.selectedFolder)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  
  useEffect(() => {
    axios.get('/api/fetch_folders')
    .then((res) => {
      if (res.status === 200) {
        const folders = res.data.map(({ CreatedAt, UpdatedAt, DeletedAt, ...rest }: { CreatedAt: string; UpdatedAt: string; DeletedAt: string | null }) => rest)
        dispatch(setFolders(folders))
        dispatch(login())
      }
    },)
    .catch((err) => {
      if(err.status === 401) {
        dispatch(logout())
        navigate("/login")
      }
    })
  },[])


  return isLoggedIn && (
    <div className="h-screen flex">
      <Sidebar/>
      { folder && <Main/> }
    </div>
  )
}