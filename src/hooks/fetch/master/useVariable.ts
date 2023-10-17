import {  useMutation, useQuery } from "@tanstack/react-query"
import { deleteData, getData, getDataById, getDataSelect, postData } from "../../models/master/variableModel"
import { ChangeEvent, useEffect, useState } from "react"
import { VariableInterface } from "../../../interfaces/master/variableInterface"
import { SubmitHandler, useForm } from "react-hook-form"
import url from "../../../services/url"
import { yupResolver } from "@hookform/resolvers/yup"
import { VariableSchema } from "../../../schema/masters"
import { AxiosError } from "axios"
import { modalFormState } from "../../../utils/modalFormState"
import { toast } from 'react-toastify';
import { useTranslation } from "react-i18next"
import { modalConfirmState } from "../../../utils/modalConfirmState"
import { variableDummy } from '../../../utils/dummy/master'
import usePage from "../../../utils/pageState"
import { DataSelectOptionInterface } from "../../../interfaces/globalInterface"

export const useVariable = () => {
    const [ query, setQuery ] = useState<VariableInterface>()
    const [ idDetail, setIdDetail ] = useState<string | null>()
    const [ querySelect, setQuerySelect ] = useState<VariableInterface>({...variableDummy})
    const [ optionVariable, setOptionVariable] = useState<DataSelectOptionInterface[]>([{label:'', value:''}])
    const { variable } = url
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
    } = useForm<VariableInterface>({
        resolver: yupResolver(VariableSchema().schema)
    })
      
    const {data:dataVariable, isFetching, refetch} = useQuery({ 
        queryKey: ['variables'], 
        networkMode: 'always',
        queryFn: async () => await getData(variable.get, 
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
        mutationFn: (id:string) => getDataById(variable.getById, id),
        onSuccess:(data:VariableInterface)=>{
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
        queryKey: ['get-variable-select'],
        queryFn: async () => await getDataSelect(variable.getSelect, {...querySelect}),
        onSuccess:(data)=>{
            setOptionVariable(data??[])
        },
    })

    const { mutate, isLoading:isLoadingMutate } = useMutation({
        mutationFn: (data:VariableInterface)=> postData(variable.post, data),
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
        mutationFn: (id:string) => deleteData(variable.delete, id),
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

    const onSubmit: SubmitHandler<VariableInterface> = (data) => {
        mutate(data)
    }

    const onDelete = (id: string) => {
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

    const onUpdate = (id:string) => {
        mutateById(id)
    }

    const onCancel = () => {
        setModalForm((state)=>({
            ...state,
            visible: false
        }))
        reset({
            ...variableDummy
        })
        setIdDetail(null)
    }

    const onDetail = async (id:string) => {
        setIdDetail(id)
        mutateById(id)
    }

    const onSearchVariable = (event:ChangeEvent<HTMLInputElement>)=> {
        setQuerySelect(state => ({...state, name: event.target.value}))
    }

    return {
        dataVariable,
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
        onSearchVariable,
        optionVariable,
        querySelect
    }
}