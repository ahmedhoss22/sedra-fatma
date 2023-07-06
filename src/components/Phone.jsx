import * as React from 'react';
import Box from '@mui/material/Box';
import SpeedDial from '@mui/material/SpeedDial';
import SpeedDialIcon from '@mui/material/SpeedDialIcon';
import SpeedDialAction from '@mui/material/SpeedDialAction';
import FileCopyIcon from '@mui/icons-material/FileCopyOutlined';
import SaveIcon from '@mui/icons-material/Save';
import PrintIcon from '@mui/icons-material/Print';
import ShareIcon from '@mui/icons-material/Share';
import PhoneIcon from '@mui/icons-material/Phone';
import PhoneInTalkIcon from '@mui/icons-material/PhoneInTalk';
import { useTranslation } from 'react-i18next';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import "../scss/phone.scss"
const actions = [
  { icon: <PhoneInTalkIcon />, name: 'Phone' },
  { icon: <WhatsAppIcon />, name: 'WhatsApp' },
];

export default function Phone() {
    const { t, i18n } = useTranslation();
    return (
    <Box id="phone-box">
      <SpeedDial ariaLabel="SpeedDial basic example" id="phone-box-button" sx={{ position: 'fixed', bottom: 25, right:i18n.language=='ar' && 16, left:i18n.language=='en'&&16}} icon={<PhoneIcon/>}>
          <SpeedDialAction onClick={()=>window.location.href = 'tel:+201157122009'} sx={{backgroundColor:"var(--primary)",color:"#fff"}} key={actions[0].name} icon={actions[0].icon} tooltipTitle={actions[0].name}/>
          <SpeedDialAction onClick={()=>window.location.href = 'https://wa.me/201157122009'} sx={{backgroundColor:"var(--primary)",color:"#fff"}} key={actions[1].name} icon={actions[1].icon} tooltipTitle={actions[1].name}/>
      </SpeedDial>
    </Box>
  );
}