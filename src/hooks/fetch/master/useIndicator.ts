import {  useMutation, useQuery } from "@tanstack/react-query"
import { deleteData, getData, getDataById, getDataSelect, postData } from "../../models/master/indicatorModel"
import { ChangeEvent, useEffect, useState } from "react"
import { IndicatorInterface } from "../../../interfaces/master/IndicatorInterface"
import { SubmitHandler, useForm } from "react-hook-form"
import url from "../../../services/url"
import { yupResolver } from "@hookform/resolvers/yup"
import { IndicatorSchema } from "../../../schema/masters"
import { AxiosError } from "axios"
import { modalFormState } from "../../../utils/modalFormState"
import { toast } from 'react-toastify';
import { useTranslation } from "react-i18next"
import { modalConfirmState } from "../../../utils/modalConfirmState"
import { factorDummy } from '../../../utils/dummy/master'
import usePage from "../../../utils/pageState"
import { useSubVariable } from "./useSubVariable"
import { DataSelectOptionInterface } from "../../../interfaces/globalInterface"

export const useIndicator = () => {
    const [ query, setQuery ] = useState<IndicatorInterface>()
    const [ idDetail, setIdDetail ] = useState<number | null>()
    const { indicator } = url
    const [ querySelect, setQuerySelect ] = useState<IndicatorInterface>({...factorDummy})
    const [ optionIndicator, setOptionIndicator] = useState<DataSelectOptionInterface[]>([{label:'', value:''}])
    const [ selectSubVariable, setSelectSubVariable ] = useState({label:'', value:''})
    const { modalForm, setModalForm } = modalFormState()
    const { t } = useTranslation();
    const modalConfirm = modalConfirmState()
    const page = usePage();
    const { optionSubVariable, onSearchSubVariable } = useSubVariable()
    
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
        formState: { errors },
    } = useForm<IndicatorInterface>({
        resolver: yupResolver(IndicatorSchema().schema)
    })
      
    const {data:dataIndicator, isFetching, refetch} = useQuery({ 
        queryKey: ['indicators'], 
        networkMode: 'always',
        queryFn: async () => await getData(indicator.get, 
            {
                ...query, page:page.page, limit: page.limit
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
        mutationFn: (id:number) => getDataById(indicator.getById, id),
        onSuccess:(data:IndicatorInterface)=>{
            reset(data)
            const select = optionSubVariable.filter(value=> value.value==data.subVariableId+"");
            setSelectSubVariable(select[0])
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
        queryKey: ['get-indicator'],
        queryFn: async () => await getDataSelect(indicator.getSelect, {...querySelect}),
        onSuccess:(data)=>{
            setOptionIndicator(data??[])
        },
    })

    const { mutate, isLoading:isLoadingMutate } = useMutation({
        mutationFn: (data:IndicatorInterface)=> postData(indicator.post, data),
        onSuccess: ()=> {
            setModalForm((state)=>({
                ...state,
                visible: false
            }))
            setSelectSubVariable({value:'', label:''})
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
        mutationFn: (id:number) => deleteData(indicator.delete, id),
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

    const onSubmit: SubmitHandler<IndicatorInterface> = (data) => {
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

    const handleChangeSelect = (event:any) => {
        setValue('subVariableId', event.value)
        setSelectSubVariable(event)
    };

    const onSearchIndicator = (event:ChangeEvent<HTMLInputElement>)=> {
        setQuerySelect(state => ({...state, name: event.target.value}))
    }
    
    return {
        dataIndicator,
        isFetching,
        setQuery,
        onSubmit,
        isLoadingMutate,
        errors,
        reset,
        register,
        setValue,
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
        selectSubVariable,
        handleChangeSelect,
        optionIndicator,
        onSearchIndicator
    }
}