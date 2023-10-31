import {  useMutation, useQuery } from "@tanstack/react-query"
import { deleteData, getData, getDataById, postData } from "../../models/fuzzy/fuzzyModel"
import { useEffect, useState } from "react"
import { FuzzyDataTypeInterface, FuzzyInterface } from "../../../interfaces/fuzzyInterface"
import { SubmitHandler, useForm } from "react-hook-form"
import url from "../../../services/url"
import { yupResolver } from "@hookform/resolvers/yup"
import { AxiosError } from "axios"
import { modalFormState } from "../../../utils/modalFormState"
import { toast } from 'react-toastify';
import { useTranslation } from "react-i18next"
import { modalConfirmState } from "../../../utils/modalConfirmState"
import usePage from "../../../utils/pageState"
import { useSubVariable } from "../master/useSubVariable"
import { useFactor } from "../master/useFactor"
import FuzzySchema from "../../../schema/fuzzySchema"

export const useFuzzy = () => {
    const [ query, setQuery ] = useState<FuzzyInterface>()
    const [ idDetail, setIdDetail ] = useState<number | null>()
    const [ selectSubVariable, setSelectSubVariable ] = useState({label:'', value:''})
    const [ selectFactor, setSelectFactor ] = useState({label:'', value:''})
    const { Fuzzy } = url
    const { modalForm, setModalForm } = modalFormState()
    const { t } = useTranslation();
    const modalConfirm = modalConfirmState()
    const page = usePage();

    const {
        optionSubVariable,
        onSearchSubVariable
    } = useSubVariable();

    const {
        optionFactor,
        onSearchFactor
    } = useFactor()
    
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
    } = useForm<FuzzyInterface>({
        resolver: yupResolver(FuzzySchema().schema)
    })
      
    const {data:dataFuzzy, isFetching, refetch} = useQuery<FuzzyDataTypeInterface>({ 
        queryKey: ['fuzzy'], 
        networkMode: 'always',
        queryFn: async () => await getData(Fuzzy.get, query),
        onSuccess(data) {
            page.setTotal(Math.ceil((data?.info?.total  ?? 1)/(data?.info?.limit ?? page.limit)))
        },
    })

    useEffect(()=> {
        refetch()
    }, [query])

    const { mutate:mutateById } = useMutation({
        mutationFn: (id:number) => getDataById(Fuzzy.getById, id),
        onSuccess:(data:FuzzyInterface)=>{
            reset(data)
            setModalForm((state)=>({
                ...state,
                visible: true
            }))
        },
    })

    const { mutate, isLoading:isLoadingMutate } = useMutation({
        mutationFn: (data:FuzzyInterface)=> postData(Fuzzy.post, data),
        onSuccess: ()=> {
            setModalForm((state)=>({
                ...state,
                visible: false
            }))
            refetch()
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
        mutationFn: (id:number) => deleteData(Fuzzy.delete, id),
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

    const onSubmit: SubmitHandler<FuzzyInterface> = (data) => {
        setQuery(data)
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
        setIdDetail(null)
    }

    const onDetail = async (id:number) => {
        setIdDetail(id)
        mutateById(id)
    }

    const handleChangeSelect = (event:any, key:keyof FuzzyInterface) => {
        setValue(key, event.value)
        if(key==="subVariableId") setSelectSubVariable(event)
        if(key==="factorId") setSelectFactor(event)
    };

    return {
        dataFuzzy,
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
        optionSubVariable,
        onSearchSubVariable,
        selectSubVariable,
        handleChangeSelect,
        optionFactor,
        onSearchFactor,
        selectFactor
    }
}