// catch all segments
import { GetServerSideProps } from "next";
import { ParsedUrlQuery } from "querystring";
import { FC } from "react";

interface Params extends ParsedUrlQuery {
    dynamic:string[];
}

export const getServerSideProps:GetServerSideProps<Props, Params> = async (context) => {
    console.log(context.params?.dynamic) // 경로들이 배열 형태의 문자열로 나옴
    return {
        props : {
            params: context.params?.dynamic
        }
    }
}

interface Props {
    params: string[] | undefined;
}

// catch all segment
const CatchAllSegments:FC<Props> = (props) => {
    console.log(props)

    return (
        <main>
            <h1>CATCH-ALL-SEGMENTS</h1>
            <ol>
                {props.params?.map((item) => <li key={item}>{item}</li>)}
            </ol>
        </main>
    )
}

export default CatchAllSegments;