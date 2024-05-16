import {  useMutation, useQuery } from "@tanstack/react-query"
import { deleteData, getData, getDataById, getDataSelect, postData } from "../../models/master/factorModel"
import { ChangeEvent, useEffect, useState } from "react"
import { FactorInterface } from "../../../interfaces/master/factorInterface"
import { SubmitHandler, useForm } from "react-hook-form"
import url from "../../../services/url"
import { yupResolver } from "@hookform/resolvers/yup"
import { FactorSchema } from "../../../schema/masters"
import { AxiosError } from "axios"
import { modalFormState } from "../../../utils/modalFormState"
import { toast } from 'react-toastify';
import { useTranslation } from "react-i18next"
import { modalConfirmState } from "../../../utils/modalConfirmState"
import { factorDummy } from '../../../utils/dummy/master'
import usePage from "../../../utils/pageState"
import { DataSelectOptionInterface } from "../../../interfaces/globalInterface"

export const useFactor = () => {
    const [ query, setQuery ] = useState<FactorInterface>()
    const [ idDetail, setIdDetail ] = useState<number | null>()
    const [ querySelect, setQuerySelect ] = useState<FactorInterface>({...factorDummy})
    const [ optionFactor, setOptionFactor] = useState<DataSelectOptionInterface[]>([{label:'', value:''}])
    const { factor } = url
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
    } = useForm<FactorInterface>({
        resolver: yupResolver(FactorSchema().schema)
    })
    
    const {data:dataFactor, isFetching, refetch} = useQuery({ 
        queryKey: ['variables'], 
        networkMode: 'always',
        queryFn: async () => await getData(factor.get, 
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
        mutationFn: (id:number) => getDataById(factor.getById, id),
        onSuccess:(data:FactorInterface)=>{
            reset(data)
            setModalForm((state)=>({
                ...state,
                visible: true
            }))
        },
    })

    useEffect(()=> {
        refetchSelect()
    }, [querySelect.name])

    const {refetch:refetchSelect} = useQuery<DataSelectOptionInterface[]>({
        queryKey: ['get-factor'],
        queryFn: async () => await getDataSelect(factor.getSelect, {...querySelect}),
        onSuccess:(data)=>{
            setOptionFactor(data??[])
        },
    })

    const { mutate, isLoading:isLoadingMutate } = useMutation({
        mutationFn: (data:FactorInterface)=> postData(factor.post, data),
        onSuccess: ()=> {
            setModalForm((state)=>({
                ...state,
                visible: false
            }))
            refetch()
            reset({
                ...factorDummy
            })
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
        mutationFn: (id:number) => deleteData(factor.delete, id),
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

    const onSubmit: SubmitHandler<FactorInterface> = (data) => {
        mutate(data)
    }

    const onDelete = (id: number) => {
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

    const onUpdate = (id:number) => {
        mutateById(id)
    }

    const onCancel = () => {
        setModalForm((state)=>({
            ...state,
            visible: false
        }))
        reset({
            ...factorDummy
        })
        setIdDetail(null)
    }

    const onDetail = async (id:number) => {
        setIdDetail(id)
        mutateById(id)
    }

    const onSearchFactor = (event:ChangeEvent<HTMLInputElement>)=> {
        setQuerySelect(state => ({...state, name: event.target.value}))
    }

    return {
        dataFactor,
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
        onSearchFactor,
        optionFactor
    }
}