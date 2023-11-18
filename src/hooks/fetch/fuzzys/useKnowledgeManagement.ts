import {  useMutation, useQuery } from "@tanstack/react-query"
import { deleteData, getData, getDataById, postData } from "../../models/fuzzy/knowledgeManagement"
import { ChangeEvent, useEffect, useState } from "react"
import { DataKnowledgeManagementInterface, KnowledgeManagementArrayFormInterface, KnowledgeManagementInterface } from "../../../interfaces/knowledgeManagementInterface"
import { SubmitHandler, useFieldArray, useForm } from "react-hook-form"
import url from "../../../services/url"
import { yupResolver } from "@hookform/resolvers/yup"
import KnowledgeManagementSchema from "../../../schema/knowledgeManagementSchema"
import { AxiosError } from "axios"
import { modalFormState } from "../../../utils/modalFormState"
import { toast } from 'react-toastify';
import { useTranslation } from "react-i18next"
import { modalConfirmState } from "../../../utils/modalConfirmState"
import { knowledgeManagementDummy } from '../../../utils/dummy/knowledgeManagement'
import usePage from "../../../utils/pageState"
import { DataSelectOptionInterface } from "../../../interfaces/globalInterface"
import { useSubVariable } from "../master/useSubVariable"
import { useFactor } from "../master/useFactor"
import { getDataSelect } from "../../models/master/subVariableModel"
import { useIndicator } from "../master/useIndicator"

export const useKnowledgeManagement = () => {
    const [ query, setQuery ] = useState<KnowledgeManagementInterface>()
    const [ querySelect, setQuerySelect ] = useState<KnowledgeManagementInterface>({...knowledgeManagementDummy})
    const [ optionKnowledgeManagement, setOptionKnowledgeManagement] = useState<DataSelectOptionInterface[]>([{label:'', value:''}])
    const [ selectOption, setSelectOption ] = useState({subVariable: {label:'', value:''}, factor: {label:'', value:''}})
    const [ selectIndicator, setSelectIndicator ] = useState<DataSelectOptionInterface[]>([{label:'', value:''}])
    const [ idDetail, setIdDetail ] = useState<number | null>()
    const { knowledgeManagement, subVariable } = url
    const { modalForm, setModalForm } = modalFormState()
    const { t } = useTranslation();
    const modalConfirm = modalConfirmState()
    const page = usePage();
    const { optionSubVariable, onSearchSubVariable } = useSubVariable()
    const { optionFactor, onSearchFactor } = useFactor()
    const { optionIndicator, onSearchIndicator } = useIndicator()
    
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
        control,
        formState: { errors },
    } = useForm<KnowledgeManagementInterface>({
        resolver: yupResolver(KnowledgeManagementSchema().schema)
    })

    const { fields:listFormIndicator, append:appendListFormIndicator } = useFieldArray({
        control,
        name: "indicators"
    });
      
    const {data:dataKnowledgeManagement, isFetching, refetch} = useQuery<DataKnowledgeManagementInterface>({ 
        queryKey: ['knowledge-management'], 
        networkMode: 'always',
        queryFn: async () => await getData(knowledgeManagement.get, 
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
    }, [page.page, page.limit])

    useEffect(()=> {
        refetchSelect()
    }, [querySelect.factorId])

    const {refetch:refetchSelect} = useQuery<DataSelectOptionInterface[]>({
        queryKey: ['get-sub-variable'],
        queryFn: async () => await getDataSelect(subVariable.getSelect, {}),
        onSuccess:(data)=>{
            setOptionKnowledgeManagement(data??[])
        },
    })

    const { mutate:mutateById } = useMutation({
        mutationFn: (id:number) => getDataById(knowledgeManagement.getById, id),
        onSuccess:(data:KnowledgeManagementInterface)=>{
            reset(data)
            setModalForm((state)=>({
                ...state,
                visible: true
            }))
        },
    })

    const { mutate, isLoading:isLoadingMutate } = useMutation({
        mutationFn: (data:KnowledgeManagementInterface)=> postData(knowledgeManagement.post, data),
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
        mutationFn: (id:number) => deleteData(knowledgeManagement.delete, id),
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

    const onSubmit: SubmitHandler<KnowledgeManagementInterface> = (data) => {
        console.log({data});
        
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

    const onCancel = () => {
        setModalForm((state)=>({
            ...state,
            visible: false
        }))
        reset({
            ...knowledgeManagementDummy
        })
        setIdDetail(null)
    }

    const onDetail = async (id:number) => {
        setIdDetail(id)
        mutateById(id)
    }

    const onSearchKnowledgeManagement = (event:ChangeEvent<HTMLInputElement>)=> {
        setQuerySelect(state => ({...state, name: event.target.value}))
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const handleChangeSelect = (name:keyof KnowledgeManagementInterface, event:any) => {
        setValue(name, event.value)
        if(name==="subVariableId") setSelectOption( state=>({ ...state, 'subVariable':event }) )
        if(name==="factorId") setSelectOption( state=>({ ...state, 'factor':event }) )
    };

    const handleChangeSelectArray = (
        name:keyof KnowledgeManagementArrayFormInterface, 
        index:number, 
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        event:any 
    ) => {
        setValue(`indicators.${index}.${name}`, event.value);
        const select = selectIndicator;
        select[index]= event
        setSelectIndicator([...select])
    }

    return {
        dataKnowledgeManagement,
        isFetching,
        setQuery,
        onSubmit,
        isLoadingMutate,
        errors,
        setValue,
        reset,
        register,
        listFormIndicator,
        appendListFormIndicator,
        handleSubmit,
        modalForm, 
        setModalForm,
        onDelete,
        modalConfirm,
        onCancel,
        onDetail,
        idDetail,
        page: page,
        optionKnowledgeManagement, 
        onSearchKnowledgeManagement,
        querySelect,
        handleChangeSelect,
        selectOption,
        getValues,
        optionSubVariable,
        onSearchSubVariable,
        optionFactor,
        onSearchFactor,
        selectIndicator,
        handleChangeSelectArray,
        optionIndicator,
        onSearchIndicator
    }
}