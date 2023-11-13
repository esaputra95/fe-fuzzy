import {  useMutation, useQuery } from "@tanstack/react-query"
import { deleteData, getData, getDataById, getForm, postData } from "../../models/fuzzy/expertQuestionnaireModel"
import { useEffect, useState } from "react"
import { DataForm, ExpertQuestionnaireInterface } from "../../../interfaces/expertQuestionnaireInterface"
import { SubmitHandler, useForm } from "react-hook-form"
import url from "../../../services/url"
import { yupResolver } from "@hookform/resolvers/yup"
import ExpertQuestionnaireSchema from "../../../schema/expertQuestionnaireSchema"
import { AxiosError } from "axios"
import { modalFormState } from "../../../utils/modalFormState"
import { toast } from 'react-toastify';
import { useTranslation } from "react-i18next"
import { modalConfirmState } from "../../../utils/modalConfirmState"
import { questionnairesDummy } from '../../../utils/dummy/master'
import usePage from "../../../utils/pageState"

export const useExpertQuestionnaire = () => {
    const [ query, setQuery ] = useState<ExpertQuestionnaireInterface>()
    const [ idDetail, setIdDetail ] = useState<number | null>()
    const { expertQuestionnaire } = url
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
    } = useForm<ExpertQuestionnaireInterface>({
        resolver: yupResolver(ExpertQuestionnaireSchema().schema)
    })
      
    const {data:dataExpertQuestionnaire, isFetching, refetch} = useQuery({ 
        queryKey: ['variables'], 
        networkMode: 'always',
        queryFn: async () => await getData(expertQuestionnaire.get, 
            {
                ...query, page:page.page
            }
        ),
        onSuccess(data) {
            page.setTotal(Math.ceil((data?.info?.total  ?? 1)/(data?.info?.limit ?? page.limit)))
        },
    })

    const { data: dataForm } = useQuery<DataForm[] | undefined, AxiosError>({
        queryKey: ['get-form'],
        queryFn: async () => getForm(expertQuestionnaire.form),
        onSuccess: (data) => {
            console.log({data});
            
        }
    })


    useEffect(()=> {
        refetch()
    }, [page.page])

    const { mutate:mutateById } = useMutation({
        mutationFn: (id:number) => getDataById(expertQuestionnaire.getById, id),
        onSuccess:(data:ExpertQuestionnaireInterface)=>{
            reset(data)
            setModalForm((state)=>({
                ...state,
                visible: true
            }))
        },
    })

    const { mutate, isLoading:isLoadingMutate } = useMutation({
        mutationFn: (data:ExpertQuestionnaireInterface)=> postData(expertQuestionnaire.post, data),
        onSuccess: ()=> {
            setModalForm((state)=>({
                ...state,
                visible: false
            }))
            refetch()
            reset({
                ...questionnairesDummy
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
        mutationFn: (id:number) => deleteData(expertQuestionnaire.delete, id),
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

    const onSubmit: SubmitHandler<ExpertQuestionnaireInterface> = (data) => {
        console.log('oke');
        
        mutate(data)
        console.log({data});
        
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
            ...questionnairesDummy
        })
        setIdDetail(null)
    }

    const onDetail = async (id:number) => {
        setIdDetail(id)
        mutateById(id)
    }

    return {
        dataExpertQuestionnaire,
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
        dataForm,
    }
}