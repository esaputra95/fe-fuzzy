
import { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import {  useDispatch, useSelector } from 'react-redux'
import { setMenu } from '../../../redux/menuSlice'
import { 
	Card,
	Typography,
	List,
	ListItem,
	ListItemPrefix,
	AccordionBody,
	AccordionHeader,
	Accordion
} from "@material-tailwind/react";
import {
    UserCircleIcon,
    InboxIcon,
	HomeIcon,
	DocumentTextIcon,
	QueueListIcon,
	ArrowPathIcon,
	ChartBarIcon,
	AdjustmentsHorizontalIcon,
	ListBulletIcon,
	Cog6ToothIcon
} from "@heroicons/react/24/solid";
import { ChevronRightIcon, ChevronDownIcon } from "@heroicons/react/24/outline";
import { useTranslation } from 'react-i18next';
import { MasterMenu } from './MenuItems';
import { RootState } from '../../../redux/store';

const SideBarLayout = () => {
    const navigate = useNavigate();
    const location = useLocation()
    const selector = useSelector((state: RootState) => state.menu)
    const dispatch = useDispatch()

    const handleOnClickMenu = (path:string) => {
        dispatch(setMenu(path))
        navigate(path)
    }

    useEffect(()=> {
        const path = location.pathname === "/" ? 'dashboard' : location.pathname.replace('/', '');
        dispatch(setMenu(path));
    },[])

    const [open, setOpen] = useState(0);
 
	const handleOpen = (value:number) => {
		setOpen(open === value ? 0 : value);
	};

	const { t } = useTranslation();

    return (
        <Card 
			className="w-full sticky top-0 overflow-auto h-screen 
			max-w-[20rem] p-4 rounded-none shadow-xl shadow-blue-gray-900/5"
		>
			<div className="mb-2 p-4 bg-white">
				<Typography className='font-bold' variant="h6" color="blue-gray">
					Model BIS-KMP
				</Typography>
			</div>
			<List>
				<ListItem onClick={()=>handleOnClickMenu('dashboard')}>
					<ListItemPrefix>
						<HomeIcon className="h-5 w-5" />
					</ListItemPrefix>
					{t('homes')}
				</ListItem>
				<Accordion
					open={open === 1}
					icon={
						<ChevronDownIcon
						strokeWidth={2.5}
						className={`mx-auto h-4 w-4 transition-transform ${open === 1 ? "rotate-180" : ""}`}
						/>
					}
				>
					<ListItem className="p-0" selected={open === 1}>
						<AccordionHeader onClick={() => handleOpen(1)} className="border-b-0 p-3">
							<ListItemPrefix>
								<InboxIcon className="h-5 w-5" />
							</ListItemPrefix>
							<Typography color="blue-gray" className="mr-auto font-normal">
								{t('data-masters')}
							</Typography>
						</AccordionHeader>
					</ListItem>
					<AccordionBody className="py-1">
						<List className="p-0">
							{
								MasterMenu.map((value)=> (
									<ListItem 
										selected={selector.menu === value.path ? true : false} 
										key={Math.random()} 
										onClick={()=>handleOnClickMenu(value.path)}
									>
										<ListItemPrefix>
											<ChevronRightIcon strokeWidth={3} className="h-3 w-5" />
										</ListItemPrefix>
										{t(value.label)}
									</ListItem>
								))
							}
						</List>
					</AccordionBody>
				</Accordion>
				<hr className="my-2 border-blue-gray-50" />
				<ListItem onClick={()=> handleOnClickMenu('indicator')}>
					<ListItemPrefix>
						<DocumentTextIcon className="h-5 w-5" />
					</ListItemPrefix>
					{t("indicator")}
				</ListItem>
				<ListItem onClick={()=> handleOnClickMenu('expert-questionnaire')}>
					<ListItemPrefix>
						<QueueListIcon className="h-5 w-5" />
					</ListItemPrefix>
					{t("expert-questionnaire")}
				</ListItem>
				<ListItem onClick={()=> handleOnClickMenu('fuzzy')}>
					<ListItemPrefix>
						<ArrowPathIcon className="h-5 w-5" />
					</ListItemPrefix>
					{t("fuzzy")}
				</ListItem>
				<ListItem onClick={()=> handleOnClickMenu('ranking')}>
					<ListItemPrefix>
						<AdjustmentsHorizontalIcon className="h-5 w-5" />
					</ListItemPrefix>
					{t("Bobot Fuzzy AHP")}
				</ListItem>
				<ListItem onClick={()=> handleOnClickMenu('questionnaire-respondent')}>
					<ListItemPrefix>
						<ListBulletIcon className="h-5 w-5" />
					</ListItemPrefix>
					{t("Kuesioner Responden")}
				</ListItem>
				<ListItem onClick={()=> handleOnClickMenu('performance')}>
					<ListItemPrefix>
						<ChartBarIcon className="h-5 w-5" />
					</ListItemPrefix>
					{t("Performance")}
				</ListItem>
				<ListItem 
					selected={selector.menu === 'kmeans' ? true : false} 
					onClick={()=> handleOnClickMenu("kmeans")}
				>
					<ListItemPrefix>
						<UserCircleIcon className="h-5 w-5" />
					</ListItemPrefix>
					{t("K-Means")}
				</ListItem>
				<ListItem 
					selected={selector.menu === 'calculations' ? true : false} 
					onClick={()=> handleOnClickMenu("calculations")}
				>
					<ListItemPrefix>
						<Cog6ToothIcon className="h-5 w-5" />
					</ListItemPrefix>
					{t("Perhitungan")}
				</ListItem>
			</List>
		</Card>
    )
}

export default SideBarLayout