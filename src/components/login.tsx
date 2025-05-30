import { LoginForm } from "@/components/login-form"
import logo from "@/assets/uar-logo.png?url"

const LoginPage = () =>{
    return (
        <div className="flex justify-center gap-5 w-full items-center h-screen">
            <LoginForm className="w-full max-w-md"></LoginForm>
            <img src={logo} alt="logo" className="w-1/3 h-1/2 rounded-xl" />
        </div>
    )
}

export default LoginPage;