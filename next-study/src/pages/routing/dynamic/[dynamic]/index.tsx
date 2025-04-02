// 동적 라우팅

import { GetServerSideProps } from 'next';
import { ParsedUrlQuery } from 'querystring'
import React, { FC } from 'react'

interface Params extends ParsedUrlQuery {
    dynamic: string;
}

export const getServerSideProps: GetServerSideProps<Props, Params> = async (context) => {
    console.log(context.params?.dynamic); // 서버 콘솔에 경로명 찍힘
    
    return {props:{
        route:context.params?.dynamic
    }}
}

interface Props {
    route:string | undefined;
}

const Dynamic:FC<Props> = (props) => {
    console.log(props.route); // 클라이언트 콘솔에 경로명 찍힘
    
  return (
    <main>
        <h1>Dynamic-routing</h1>
        <p>{props.route}</p>
    </main>
    
  )
}


export default Dynamic
