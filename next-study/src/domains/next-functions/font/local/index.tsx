import { gilroy } from "@/styles/fonts";
import { FC } from "react";

const LocalMain:FC = () => {
    return (
    <main>
        <p className={gilroy.className} style={{fontSize:50}}>Gilroy</p>
        <p>G CLS TEST</p>
    </main>)
}

export { LocalMain }