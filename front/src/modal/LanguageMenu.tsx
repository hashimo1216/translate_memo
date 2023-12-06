import ReactDOM from "react-dom";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store/store";

export default function LanguageMenu() {
  const languages = useSelector((state: RootState) => state.translation.languages)

  return ReactDOM.createPortal(
    <div className="h-36 w-24 p-2 bg-white rounded-lg shadow-lg overflow-auto">
      { languages.map((language) => (
        <div>
          <a className="border-gray-400 hover:border-b-2">{}</a>
        </div>
      ))}
    </div>,
    document.body
  )
}