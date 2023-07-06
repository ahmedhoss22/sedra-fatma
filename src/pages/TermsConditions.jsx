import React from 'react';
import "../scss/termsAndCondition.scss"
import Footer from '../components/Footer';
import { useTranslation } from 'react-i18next';

const TermsAndConditions = () => {
  const { t, i18n } = useTranslation();
  return (
  <>
    <div className='termsAndCondtions' style={{direction:i18n.language=='en'?"ltr":'rtl'}}>
      <h2>{t("terms.title")}</h2>
      <ul>
        <li>{t("terms.t1")}</li>
        <li>{t("terms.t2")}</li>
        <li>{t("terms.t3")}</li>
        <li>{t("terms.t4")}</li>
        <li>{t("terms.t5")}</li>
        <li>{t("terms.t6")}</li>
      </ul>
    </div>
    <Footer/>
  </>
  );
}

export default TermsAndConditions;
