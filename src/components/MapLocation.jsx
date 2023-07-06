import React from 'react'
import "../scss/mapLocation.scss"
import { useTranslation } from 'react-i18next';

const MapLocation = () => {
    const { t, i18n } = useTranslation();

    return (
      <div id='map-box' style={{direction:i18n.language=='en'?'ltr':"rtl"}}>
        <h2>{t("details.map")}</h2>
        <iframe src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d7209.37182561346!2d49.638536!3d25.381841!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e3795929cc05f0b%3A0x63deaa725c5fc7!2z2LTYp9mE2YrZh9in2Kog2LPYr9ix2Kkg2YHYp9i32YXYqQ!5e0!3m2!1sar!2ssa!4v1683792346189!5m2!1sar!2ssa" id="map-location" width="600" height="450" style={{border:"0"}} allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
      </div>
  )
}

export default MapLocation