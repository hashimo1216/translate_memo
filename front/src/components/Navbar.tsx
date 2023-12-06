import { NavLink, useLocation } from "react-router-dom"
import { useState } from "react";
import LogoutModal from "../modal/LogoutModal";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store/store";

export default function Navbar() {
  const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn)
  const currentPathname = useLocation().pathname;

  const [confirmModal, setConfirmModal] = useState(false)

  const handleDisplayModal = () => {
    setConfirmModal(true);
  }

  return (
    <nav className="fixed w-full lg:h-20 lg:px-20 bg-yellow-400 flex justify-between items-center z-10">
      {currentPathname !== (`/translate_memo`) && <NavLink to="/">
        <h1 className="text-3xl font-bold font-serif">Translate Mate</h1>
      </NavLink>}
      {currentPathname === (`/translate_memo`) && <h1 className="text-3xl font-bold font-serif">Translate Mate</h1>}
      {currentPathname === (`/`) && 
        <ul className="flex justify-between">
          <NavLink to='/login' className="font-semibold lg:mx-6 hover:text-gray-600">ログイン</NavLink>
          <NavLink to='/signup' className="font-semibold lg:mx-6 hover:text-gray-600">新規登録</NavLink>
        </ul>
      }
      {(currentPathname === (`/translate_memo`) && isLoggedIn) &&
        <a onClick={() => handleDisplayModal()} className="font-semibold lg:mx-6 hover:text-gray-600 hover:cursor-pointer">ログアウト</a>
      }
      { confirmModal && 
        <LogoutModal setConfirmModal={setConfirmModal}/>
      }
    </nav>
  )
}