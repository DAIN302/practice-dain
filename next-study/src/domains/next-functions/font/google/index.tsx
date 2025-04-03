import { noto_sans } from "@/styles/fonts";
import { FC } from "react";
import styles from './index.module.css';
import Head from "next/head";

const GoogleMain:FC = () => {
    return (
      <main>
        <p style={{fontSize:50}}>Font : Default</p>
        <p>CLS TEST</p>
        <hr />
        <p className={noto_sans.className} style={{fontSize:50}}>Font : Noto Sans</p>
        <p>CLS TEST</p>
        <hr />
        {/* <Head>
            <link rel="preconnect" href="https://fonts.googleapis.com">
            <link rel="preconnect" href="https://fonts.gstatic.com">
            <link href="https://fonts.googleapis.com/css2?family=Baskervville:ital@0;1&display=swap" rel="stylesheet">
        </Head> */}
        
        {/* <p className={styles.baskervville} style={{fontSize:50}}>Font : Remote</p> */}
        {/* <p>CLS TEST</p> */}

      </main>
)
}

export { GoogleMain }