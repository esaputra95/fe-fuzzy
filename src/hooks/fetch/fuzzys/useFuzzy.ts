import {  useMutation, useQuery } from "@tanstack/react-query"
import { deleteData, getData, getDataById } from "../../models/fuzzy/fuzzyModel"
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
import { getMaster } from "../../models/dashboard/dashboardModel"
import { DataSelectOptionInterface } from "../../../interfaces/globalInterface"

export const useFuzzy = () => {
    const [ query, setQuery ] = useState<FuzzyInterface>()
    const [ idDetail, setIdDetail ] = useState<number | null>()
    const [ selectSubVariable, setSelectSubVariable ] = useState({label:'', value:''})
    const [ selectFactor, setSelectFactor ] = useState({label:'', value:''})
    const [ selectUniversity, setSelectUniversity ] = useState({label:'', value:''})
    const [ university, setUniversity ] = useState<DataSelectOptionInterface[]>([{value:'', label:''}]);
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
        }));
        getDataMaster();
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
        queryKey: ['fuzzy', query], 
        networkMode: 'always',
        queryFn: async () => await getData(Fuzzy.get, query),
        onSuccess(data) {
            page.setTotal(Math.ceil((data?.info?.total  ?? 1)/(data?.info?.limit ?? page.limit)))
        },
    })

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

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const handleChangeSelect = (event:any, key:keyof FuzzyInterface) => {
        setValue(key, event.value)
        if(key==="subVariableId") setSelectSubVariable(event)
        if(key==="factorId") setSelectFactor(event)
        if(key==="university") setSelectUniversity(event)
    };

    const getDataMaster = async () => {
        const data = await getMaster();
        if(data.status){
            setUniversity(data.data.university)
        }
    }

    return {
        dataFuzzy,
        isFetching,
        setQuery,
        onSubmit,
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
        selectFactor,
        university,
        selectUniversity
    }
}