import {  useMutation, useQuery } from "@tanstack/react-query"
import { deleteData, getData, getDataById, getDataSelect, postData } from "../../models/master/subVariableModel"
import { ChangeEvent, useEffect, useState } from "react"
import { SubVariableInterface } from "../../../interfaces/master/subVariableInterface"
import { SubmitHandler, useForm } from "react-hook-form"
import url from "../../../services/url"
import { yupResolver } from "@hookform/resolvers/yup"
import { SubVariableSchema } from "../../../schema/masters"
import { AxiosError } from "axios"
import { modalFormState } from "../../../utils/modalFormState"
import { toast } from 'react-toastify';
import { useTranslation } from "react-i18next"
import { modalConfirmState } from "../../../utils/modalConfirmState"
import { subVariableDummy } from '../../../utils/dummy/master'
import usePage from "../../../utils/pageState"
import { DataSelectOptionInterface } from "../../../interfaces/globalInterface"
import { useVariable } from "./useVariable"

export const useSubVariable = () => {
    const [ query, setQuery ] = useState<SubVariableInterface>()
    const [ querySelect, setQuerySelect ] = useState<SubVariableInterface>({...subVariableDummy})
    const [ optionSubVariable, setOptionSubVariable] = useState<DataSelectOptionInterface[]>([{label:'', value:''}])
    const [ selectSubVariable, setSelectSubVariable ] = useState({label:'', value:''})
    const [ idDetail, setIdDetail ] = useState<number | null>()
    const { subVariable } = url
    const { modalForm, setModalForm } = modalFormState()
    const { t } = useTranslation();
    const modalConfirm = modalConfirmState()
    const page = usePage();
    const {
        optionVariable,
        onSearchVariable
    } = useVariable()
    
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
        setValue,
        getValues,
        formState: { errors },
    } = useForm<SubVariableInterface>({
        resolver: yupResolver(SubVariableSchema().schema)
    })
      
    const {data:dataSubVariable, isFetching, refetch} = useQuery({ 
        queryKey: ['sub-variables'], 
        networkMode: 'always',
        queryFn: async () => await getData(subVariable.get, 
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

    useEffect(()=> {
        refetchSelect()
    }, [querySelect.name])

    const {refetch:refetchSelect} = useQuery<DataSelectOptionInterface[]>({
        queryKey: ['get-sub-variable'],
        queryFn: async () => await getDataSelect(subVariable.getSelect, {...querySelect}),
        onSuccess:(data)=>{
            setOptionSubVariable(data??[])
        },
    })

    const { mutate:mutateById } = useMutation({
        mutationFn: (id:number) => getDataById(subVariable.getById, id),
        onSuccess:(data:SubVariableInterface)=>{
            reset(data)
            const select = optionVariable.filter(value=> value.value==data.variableId+"");
            setSelectSubVariable(select[0])
            setModalForm((state)=>({
                ...state,
                visible: true
            }))
        },
    })

    const { mutate, isLoading:isLoadingMutate } = useMutation({
        mutationFn: (data:SubVariableInterface)=> postData(subVariable.post, data),
        onSuccess: ()=> {
            setModalForm((state)=>({
                ...state,
                visible: false
            }))
            refetch()
            reset()
            setSelectSubVariable({label:'', value:''})
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
        mutationFn: (id:number) => deleteData(subVariable.delete, id),
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

    const onSubmit: SubmitHandler<SubVariableInterface> = (data) => {
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
            ...subVariableDummy
        })
        setIdDetail(null)
    }

    const onDetail = async (id:number) => {
        setIdDetail(id)
        mutateById(id)
    }

    const onSearchSubVariable = (event:ChangeEvent<HTMLInputElement>)=> {
        setQuerySelect(state => ({...state, name: event.target.value}))
    }

    const handleChangeSelect = (event:{value: string; label: string}) => {
        setValue('variableId', parseInt(event.value))
        setSelectSubVariable(event)
    };

    return {
        dataSubVariable,
        isFetching,
        setQuery,
        onSubmit,
        isLoadingMutate,
        errors,
        setValue,
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
        optionSubVariable, 
        onSearchSubVariable,
        querySelect,
        handleChangeSelect,
        selectSubVariable,
        setSelectSubVariable,
        getValues,
        optionVariable,
        onSearchVariable
    }
}