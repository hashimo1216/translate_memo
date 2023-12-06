import { useEffect, useRef, useState } from "react"
import { useDispatch } from "react-redux"
import { openFolder, renameFolder, setNameEditable } from "../redux/features/Folder";
import axios from "../config/axios";
import { useNavigate } from "react-router-dom";

export default function RenameForm({name, ID}:{name: string; ID: number}) {
  const navigate = useNavigate()
  const [newfolderName, setNewfolderName] = useState(name)
  const inputRef = useRef<HTMLInputElement | null>(null);
  const dispatch = useDispatch()


  const handleKeyDown = async (e: React.KeyboardEvent<HTMLInputElement>, ID: number, name: string) => {
    if (e.key === 'Enter' && name !== '') {
      try {
        const res = await axios.put(`/api/edit_folder/${ID}`, { name });
  
        if (res.status === 200) {
          dispatch(renameFolder({ID, name}));
          dispatch(setNameEditable(ID));
          dispatch(openFolder(ID));
        }
      } catch (err) {
        console.log(err);
        navigate('/')
      }
    }
  };

  const handleClickOutside = (e: MouseEvent) => {
    if (inputRef.current && !inputRef.current.contains(e.target as Node)) {
      dispatch(setNameEditable(ID));
    }
  }

  useEffect(() => {
    if(inputRef.current) {
      inputRef.current.focus();
    }

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);

      if(inputRef.current) {
        inputRef.current.blur();
      }
    }
  }, []);
  

  return (
    <div>
      <input
        ref={inputRef}
        type="text"
        value={newfolderName} 
        onChange={(e) => setNewfolderName(e.target.value)}
        onKeyDown={(e) => handleKeyDown(e, ID , newfolderName)}
        className="w-28 px-2 bg-gray-100 rounded-md z-10"
      />
    </div>
  )
}