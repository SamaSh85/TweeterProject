import React from 'react';
import {useTranslation} from "react-i18next";

const  Page404= () => {
  const {t}= useTranslation();
    return (
        <div>
      <p>{t("404_desc")}</p>
        </div>
    );
};

export default Page404;