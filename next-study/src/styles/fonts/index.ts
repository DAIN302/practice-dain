import nextLocalFont from 'next/font/local';

const gilroy = nextLocalFont({
    src:[
        {
            path:'./Gilroy/Gilroy-Regular.otf',
            weight: "400",
            style: 'normal'
        },
        {
            path:'./Gilroy/Gilroy-SemiBold.otf',
            weight: "500",
            style: 'normal'
        },
    ],
    adjustFontFallback: "Times New Roman",
    preload: true, 
    fallback: ["system-ui"]
})

export { gilroy };

// export 로 한 이유
// 폰트를 하나의 인스턴스로 생성했기 때문에 호출할 때마다 폰트 인스턴스가 생성됨 (불필요한 메모리)
// 따라서 export 해서 인스턴스가 하나만 생성되도록 함