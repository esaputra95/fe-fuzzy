import {  useMutation, useQuery } from "@tanstack/react-query"
import { deleteData, getData, getDataById, postData } from "./../models/userModel"
import { useEffect, useState } from "react"
import { UserInterface } from "./../../interfaces/userInterface"
import { SubmitHandler, useForm } from "react-hook-form"
import url from "./../../services/url"
import { yupResolver } from "@hookform/resolvers/yup"
import { userSchema } from "./../../schema/masters"
import { AxiosError } from "axios"
import { modalFormState } from "../../utils/modalFormState"
import { toast } from 'react-toastify';
import { useTranslation } from "react-i18next"
import { modalConfirmState } from "../../utils/modalConfirmState"
import { userDummy } from './../../utils/dummy/master'
import usePage from "../../utils/pageState"

export const useUser = () => {
    const [ query, setQuery ] = useState<UserInterface>()
    const [ idDetail, setIdDetail ] = useState<number | null>()
    const { user } = url
    const { modalForm, setModalForm } = modalFormState()
    const { t } = useTranslation();
    const modalConfirm = modalConfirmState()
    const page = usePage();
    
    useEffect(()=> {
        setModalForm((state)=>({
            ...state,
            label: 'Form '
        }))
    }, [])

    const {
        reset,
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<UserInterface>({
        resolver: yupResolver(userSchema().schema)
    })
      
    const {data:dataUser, isFetching, refetch} = useQuery({ 
        queryKey: ['class-types'], 
        networkMode: 'always',
        queryFn: async () => await getData(user.get, 
            {
                ...query, page:page.page
            }
        ),
        onSuccess(data) {
            page.setTotal(Math.ceil((data?.info?.total  ?? 1)/(data?.info?.limit ?? page.limit)))
        },
    })


    useEffect(()=> {
        refetch()
    }, [page.page])

    const { mutate:mutateById } = useMutation({
        mutationFn: (id:number | null) => getDataById(user.getById, id),
        onSuccess:(data:UserInterface)=>{
            console.log('ini data : ',data);
            
            reset(data)
            setModalForm((state)=>({
                ...state,
                visible: true
            }))
        },
    })

    const { mutate, isLoading:isLoadingMutate } = useMutation({
        mutationFn: (data:UserInterface)=> postData(user.post, data),
        onSuccess: ()=> {
            setModalForm((state)=>({
                ...state,
                visible: false
            }))
            refetch()
            reset()
            toast.success(t("success-save"), {
                position: toast.POSITION.TOP_CENTER
            });
            
        },
        onError: (errors) => {
            const err = errors as AxiosError
            toast.success(`${err}`, {
                position: toast.POSITION.TOP_CENTER
            });
            
        }
    })

    const {mutate:mutateDelete} = useMutation({
        mutationFn: (id:number | null) => deleteData(user.delete, id),
        onSuccess: () => {
            modalConfirm.setModalConfirm({
                ...modalConfirm.modalConfirm,
                loading: false,
                visible: false
            })
            refetch()
            toast.success(t("success-delete"), {
                position: toast.POSITION.TOP_CENTER
            });
        },
        onError:(error) => {
            const err = error as AxiosError
            toast.success(`${err}`, {
                position: toast.POSITION.TOP_CENTER
            });
        }
    })

    const onSubmit: SubmitHandler<UserInterface> = (data) => {
        mutate(data)
    }

    const onDelete = (id: number | null) => {
        modalConfirm.setModalConfirm((state)=>({
            ...state,
            title: state.title,
            message: state.message,
            confirmLabel: state.confirmLabel,
            cancelLabel: state.cancelLabel,
            visible: true,
            onConfirm:()=>{
                modalConfirm.setModalConfirm((state)=>({
                    ...state,
                    loading: true
                }))
                mutateDelete(id)
            },
            onCancel:()=>{
                modalConfirm.setModalConfirm((state)=>({
                    ...state,
                    visible: false,
                }))
            }
        }))
    }

    const onUpdate = (id:number | null) => {
        mutateById(id)
    }

    const onCancel = () => {
        setModalForm((state)=>({
            ...state,
            visible: false
        }))
        reset({
            ...userDummy
        })
        setIdDetail(null)
    }

    const onDetail = async (id:number | null) => {
        setIdDetail(id)
        mutateById(id)
    }

    return {
        dataUser,
        isFetching,
        setQuery,
        onSubmit,
        isLoadingMutate,
        errors,
        reset,
        register,
        handleSubmit,
        modalForm, 
        setModalForm,
        onDelete,
        modalConfirm,
        onUpdate,
        onCancel,
        onDetail,
        idDetail,
        page: page,
    }
}