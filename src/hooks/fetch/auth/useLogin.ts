import { SubmitHandler, useForm } from "react-hook-form";
import { LoginInterface } from "../../../interfaces/loginInterface";
import { useMutation } from "@tanstack/react-query";
import { login } from "../../models/auth/loginModel";
import url from "../../../services/url";
import { yupResolver } from "@hookform/resolvers/yup";
import LoginSchema from "../../../schema/auth/loginSchema";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export const useLogin = () => {
    const navigate = useNavigate()
    const { auth } = url
    const { 
        register, 
        handleSubmit,
        formState: { errors },
    } = useForm<LoginInterface>({
        resolver: yupResolver(LoginSchema().schema)
    })

    const { mutate, isError } = useMutation({
        mutationKey: ['login'],
        mutationFn: async (data:LoginInterface) => await login(auth.login, data),
        onSuccess: (response)=> {
            console.log({response});
            
            if(!response.status) throw response;
            window.localStorage.setItem('token', response.data.token)
            navigate('/dashboard')
        },
        onError:() => {
            toast.error(`Username atau Password salah`, {
                position: toast.POSITION.TOP_CENTER
            });
        }
    })

    const onSubmit: SubmitHandler<LoginInterface> = (data)=> {
        mutate(data)
    }
    return {
        register,
        handleSubmit,
        onSubmit,
        errors,
        isError
    }
}