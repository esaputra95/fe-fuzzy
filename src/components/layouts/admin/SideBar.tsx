
import { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import {  useDispatch, useSelector } from 'react-redux'
import { setMenu } from '../../../redux/menuSlice'
import { Card, Typography, List, ListItem, ListItemPrefix, AccordionBody, AccordionHeader, Accordion, } from "@material-tailwind/react";
import {
    UserCircleIcon,
    Cog6ToothIcon,
    InboxIcon,
    PowerIcon,
	HomeIcon,
	DocumentTextIcon
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
        <Card className="w-full sticky top-0 overflow-auto h-screen max-w-[20rem] p-4 rounded-none shadow-xl shadow-blue-gray-900/5">
			<div className="mb-2 p-4 bg-white">
				<Typography className='font-bold' variant="h5" color="blue-gray">
					FUZZY AHP
				</Typography>
			</div>
			<List>
				<ListItem onClick={()=>handleOnClickMenu('homes')}>
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
									<ListItem selected={selector.menu === value.path ? true : false} key={Math.random()} onClick={()=>handleOnClickMenu(value.path)}>
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
				<ListItem onClick={()=> handleOnClickMenu('knowledge-management')}>
					<ListItemPrefix>
						<DocumentTextIcon className="h-5 w-5" />
					</ListItemPrefix>
					{t("knowledge-management")}
				</ListItem>
				<ListItem onClick={()=> handleOnClickMenu('expert-questionnaire')}>
					<ListItemPrefix>
						<DocumentTextIcon className="h-5 w-5" />
					</ListItemPrefix>
					{t("expert-questionnaire")}
				</ListItem>
					
				<ListItem selected={selector.menu === 'user' ? true : false} onClick={()=> handleOnClickMenu("user")}>
					<ListItemPrefix>
						<UserCircleIcon className="h-5 w-5" />
					</ListItemPrefix>
					{t("user")}
				</ListItem>
				<hr className="my-2 border-blue-gray-50" />
				<ListItem>
					<ListItemPrefix>
						<Cog6ToothIcon className="h-5 w-5" />
					</ListItemPrefix>
					Settings
				</ListItem>
				<ListItem>
					<ListItemPrefix>
						<PowerIcon className="h-5 w-5" />
					</ListItemPrefix>
					Log Out
				</ListItem>
      		</List>
    	</Card>
    )
}

export default SideBarLayout