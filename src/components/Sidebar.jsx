import * as React from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import "../scss/sidebar.scss"
import logo from "../assets/Logo 1.png"
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Link, useNavigate } from 'react-router-dom';
import DomainAddIcon from '@mui/icons-material/DomainAdd';
import SettingsIcon from '@mui/icons-material/Settings';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import LibraryBooksIcon from '@mui/icons-material/LibraryBooks';
import PointOfSaleIcon from '@mui/icons-material/PointOfSale';
import PaidIcon from '@mui/icons-material/Paid';
import ArticleIcon from '@mui/icons-material/Article';
import RequestQuoteIcon from '@mui/icons-material/RequestQuote';
import MoneyIcon from '@mui/icons-material/Money';
import Person2Icon from '@mui/icons-material/Person2';
import LogoutIcon from '@mui/icons-material/Logout';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { setLogout } from '../redux/reducers/employee';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';

const drawerWidth = 190;
const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});


const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    boxSizing: 'border-box',
    backgroundColor:"red",
    ...(open && {
      ...openedMixin(theme),
      '& .MuiDrawer-paper': openedMixin(theme),
    }),
    ...(!open && {
      ...closedMixin(theme),
      '& .MuiDrawer-paper': closedMixin(theme),
    }),
  }),
);

export default function Sidebar({isOpen,toggle}) {
  const dispatch=useDispatch()
  const { t, i18n } = useTranslation();
  const theme = useTheme();
  const notification=useSelector((state)=>state.reservation.value.notification)
  let notificationData = notification.map((ele)=>ele.type)
  console.log( notificationData.includes("unconfirmed"));
 
  console.log(notificationData);
  const navigate=useNavigate()
  const [open, setOpen] = React.useState(false);
  const data=[
    {title:"لوحة التحكم" ,enTitle:"Control Panel",icon :<InboxIcon /> ,path:"/",type:1},
    {title:"الحجوزات",enTitle:"Reservations",icon :<LibraryBooksIcon/>,type:2, notification: notificationData.includes("unconfirmed") ||  notificationData.includes("confirmed"),
    subtitle:[
      {title:"حجوزات غير مؤكدة" , enTitle:"Unconfirmed Reservations",path:"/unConfirmedReservations",notification:notificationData.includes("unconfirmed")},
        {title:"حجوزات مؤكدة" , enTitle:"Confirmed Reservations",path:"/confirmedReservations",notification:notificationData.includes("confirmed"),},
        {title:"حجوزات مؤجلة" ,enTitle:"Deferred Reservations", path:"/deferredReservations"},
        {title:"حجوزات ملغية" , enTitle:"Canceled Reservations",path:"/canceledReservations"},
        {title:"طلبات الغاء الحجز" ,enTitle:"Cancel Requests", path:"/cancelRequest"},
      ]
    },
    {title:"التأمينات",enTitle:"Insurance",icon :<PointOfSaleIcon/>,type:2,
    subtitle:[
      {title:"تأمينات القاعات" ,enTitle:"Hall Insurance", path:"/insurances/hall"},
      {title:"تأمينات الشاليهالت" ,enTitle:"Chalet Insurance", path:"/insurances/chalet"},
      {title:"تأمينات المنتجعات" ,enTitle:"Resort Insurance", path:"/insurances/resort"},
    ]
  },
  {title:"االخدمات" ,enTitle:"Services",icon :<ManageAccountsIcon /> ,path:"/services",type:1},
  {title:"الحسابات النقدية",enTitle:"Finance",icon :<PaidIcon/>,type:2,
    subtitle:[
      {title:"المصروفات" ,enTitle:"Expenses", path:"/expenses"},
      {title:"السحوبات" ,enTitle:"Draws", path:"/draws"},
      {title:"باي بال" , enTitle:"Paypal",path:"/paypal"},
      {title:"الدفع اونلاين" ,enTitle:"Online payments", path:"/onlinePayment"},
      {title:"التحويلات البنكية" ,enTitle:"Bank Transactions", path:"/bankTransactions"},
    ]
  },
  {title:"العملاء" ,enTitle:"Clients",icon :<Person2Icon /> ,path:"/cutomers",type:1},
    {title:"اضافة موظفين" ,enTitle:"Add Employee",icon :<PersonAddIcon /> ,path:"/addEmployee",type:1},
    {title:"التقارير" ,enTitle:"Reports",icon :<ArticleIcon /> ,path:"/reports",type:1},
    {title:"اضافة جهة",enTitle:"Add Entity",icon :<DomainAddIcon/>,type:2 ,
    subtitle:[
      {title:"اضافة قاعة" ,enTitle:"Add Hall",path:"/addHall"},
      {title:"اضافة منتجع" ,enTitle:"Add Resort",path:"/addRessort"},
      {title:"اضافة شاليه" ,enTitle:"Add Chalet",path:"/addChalet"},
    ]},
  {title:"خروج" ,enTitle:"Exit",icon :<LogoutIcon /> ,path:"/signin",type:1},
]

  function handleClick(ele){
    if(ele.enTitle=="Exit") {
       localStorage.removeItem("adminToken")
      dispatch(setLogout())
      navigate("/sigin")
      }
  }
  return (
    <Box sx={{ display: 'flex' ,direction:"ltr"}} id="sidebar-print">
      <Drawer variant="permanent" open={isOpen} className="drawer" anchor='right'> 
          {isOpen?<IconButton onClick={toggle}  className="arrow-btn" sx={{ marginLeft: 20}} >
            {theme.direction !== 'rtl' ? <ChevronRightIcon style={{marginRight:"285px"}}/> : <ChevronLeftIcon />}
            </IconButton>
            :<IconButton color="inherit" className="menu-btn" aria-label="open drawer" onClick={toggle} edge="end" >
              <MenuIcon />
            </IconButton> }
        <List className='list'>
          <ListItem disablePadding>
            <ListItemButton className='listHeader'>
              <img src={logo} alt="logo" height="40px" width="40px"/>
              {i18n.language=='ar'&& <p>سدرة فاطمة</p>}
              {i18n.language=='en'&& <p>Sedraa Fatima</p>}
            </ListItemButton>
          </ListItem>
          {data.map((ele, index) => (
            ele.type==1?
          <ListItem key={ele.title} disablePadding sx={{ display: 'block' }}>
            <Link to={ele.path} style={{ textDecoration: 'none', color: 'inherit' }}>
              <ListItemButton sx={{ minHeight: 48, justifyContent: isOpen ? 'initial' : 'center', px: 2.5 }} style={{paddingTop:0}} onClick={()=>handleClick(ele)}>
                <ListItemIcon style={{ color: "#fff" }} sx={{ minWidth: 0, mr: isOpen ? 3 : 'auto', justifyContent: 'center' }}>
                  {ele.icon}
                </ListItemIcon>
                <ListItemText style={{ color: "#fff" }} primary={i18n.language=='en'?ele.enTitle: ele.title} sx={{ opacity: isOpen ? 1 : 0 }} />
              </ListItemButton>
            </Link>
          </ListItem>:
                <ListItem key={ele.title} disablePadding sx={{display:"block"}}>
                <ListItemButton  sx={{ minHeight: 48, justifyContent: isOpen ? 'initial' : 'center', px: 2.5,}}>
                  <ListItemIcon style={{color:"#fff",paddingTop:0,paddingBottom:0,position:"relative"}} sx={{ minWidth: 0, mr: isOpen ? 3 : 'auto', justifyContent: 'center'}} >
                        {ele.icon} <span style={{display:ele.notification?'inline':"none"}} className='notification'></span>
                  </ListItemIcon>
                  <ListItemText style={{color:"#fff"}} sx={{ opacity: isOpen ? 1 : 0 }} >
                    <Accordion>
                      <AccordionSummary expandIcon={<ExpandMoreIcon style={{color:"#fff",padding:"0"}}/>} aria-controls="panel1a-content" id="panel1a-header">
                        <Typography color="#fff" >{i18n.language=='en'?ele.enTitle: ele.title}</Typography>
                      </AccordionSummary>
                      <AccordionDetails>
                        {ele.subtitle.map((ele)=>(
                          <ListItem  disablePadding sx={{ display: 'block' }}>
                            <Link to={ele.path} style={{ textDecoration: 'none', color: 'inherit' }}>
                              <ListItemButton sx={{ minHeight: 48, justifyContent: isOpen ? 'initial' : 'center', px: 2.5,}}>
                              <span style={{display:ele.notification?'inline':"none"}} className='notification sub-notification'></span>
                                <ListItemText style={{color:"#fff"}} primary={i18n.language=='en'?ele.enTitle: ele.title} sx={{ opacity: isOpen ? 1 : 0 }} />
                              </ListItemButton>
                            </Link>
                          </ListItem>
                        ))
                        }
                      </AccordionDetails>
                  </Accordion>
                  </ListItemText>
                </ListItemButton>
              </ListItem>
          ))}-
        </List>
      </Drawer>
    </Box>
  );
}