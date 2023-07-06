import React from 'react'
import { FaFacebook, FaInstagram, FaGooglePlus,FaYoutube } from 'react-icons/fa';
import { useTranslation } from 'react-i18next';
import "../scss/footer.scss"
const Footer = () => {
  const { t, i18n } = useTranslation();
  return (
  <div className="footer">
    <div className="container">
        <h4>{t("navbar.badge")}</h4>
        <p>{t("navbar.subtitle")}</p>
        <ul className="social-links">
            <li><a href="https://www.facebook.com/profile.php?id=100064918885658&mibextid=ZbWKwL" target='_blank'><FaFacebook /></a></li>
            <li><a href="https://instagram.com/sidrat_fatimah?igshid=YmMyMTA2M2Y=" target='_blank'><FaInstagram /></a></li>
            <li><a href="https://g.co/kgs/ENqXpc" target='_blank'><FaGooglePlus /></a></li>
            <li><a href="https://youtube.com/@user-jc8lk9hy2l" target='_blank'><FaYoutube /></a></li>
        </ul>
    </div>
</div>
  )
}

export default Footer