import { useState } from "react"
import { useForm, SubmitHandler } from "react-hook-form"
import { useNavigate, NavLink } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import axios from "../config/axios";
import { useDispatch } from "react-redux";
import { login } from "../redux/features/Auth";

type Inputs = {
  email: string,
  password: string,
}

export default function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [errorMsg, setErrorMsg] = useState("")
  const [visible, setVisible] = useState(false)

  const {
    handleSubmit,
    reset,
    register,
  } = useForm<Inputs>({
    mode: 'onChange',
  });

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    if (data.email && data.password) {
      await axios.post('/api/login', data)
      .then((res) => {
        if (res.status === 200) {
        dispatch(login())
        navigate("/translate_memo")
        }
        reset();
      })
      .catch(() => {
        loginErrorMsg();
      })
    }
  }

  const loginErrorMsg = () => {
    setErrorMsg("ユーザーIDもしくはパスワードが間違っています。");
  }

  return (
    <div className="h-screen flex items-center justify-center">
      <form onSubmit={handleSubmit(onSubmit)} className="w-96 p-6">
        <h1 className="text-[30px] font-bold text-gray-700">ログイン</h1>
        <p className="text-red-500">{ errorMsg }</p>
        <div className="mt-8 w-full">
          <div className="flex flex-col items-center">
            <div className="relative">
              <input type="text" id="email" required {...register("email")} className="px-4 h-[50px] w-[350px] border-[1px] border-gray-400 rounded-md focus:ring-0 focus:border-2 focus:border-yellow-400 valid:border-yellow-400 valid:border-2 autofill:shadow-[inset_0_0_0px_1000px_white]"/>
              <label htmlFor="email" className="absolute left-4 top-3 px-1  bg-white text-gray-400 input-focus input-valid transition-transform">メールアドレス</label>
            </div>
            <div className="mt-6 relative">
              <input type={visible ? "text" : "password"} id="password" role='password' required {...register("password")} className="px-4 h-[50px] w-[350px] border-[1px] border-gray-400 rounded-md focus:ring-0 focus:border-2 focus:border-yellow-400 valid:border-2 valid:border-yellow-400"/>
              <label htmlFor="password" className="absolute px-1 bg-white text-gray-400 left-4 top-3 input-focus input-valid transition-transform">パスワード</label>
              <a onClick={() => setVisible(!visible)}>
                {!visible ? <FontAwesomeIcon icon={faEye} className="w-6 h-6 absolute right-4 top-3" /> : <FontAwesomeIcon icon={faEyeSlash} className="w-6 h-6 absolute right-4 top-3" />}
              </a>
            </div>
          </div>
          <div className="mt-8 flex justify-between">
            <button type="submit" className="w-[150px] py-2 bg-yellow-400 rounded-md text-white font-bold hover:bg-yellow-500">ログイン</button>
            <NavLink to="/signup">
              <button className="w-[150px] py-2 bg-gray-200 rounded-md text-gray-600 font-bold hover:bg-gray-300">新規登録</button>
            </NavLink>
          </div>
        </div>
      </form>
    </div>
  );
}


