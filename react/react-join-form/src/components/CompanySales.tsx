import { useState, lazy, Suspense } from "react"

interface SalesInfo {
    month: string;
    sales: number;
}

const LineChart = lazy(() => import('./LineChart'))

export default function CompanySales() {
    const [shown, setShown] = useState(false)

  return (
    <>
        <button onClick={()=>setShown(prev => !prev)}>show company sales</button>
        {/* {shown && <LineChart data={data} xKey={"month"} yKeys={["sales"]} />} */}
        {shown && 
            // 로딩중일 때 fallback 안에 있는거가 보여짐
            // Suspense 안에 로딩 후 띄울 컴포넌트를 넣어줌 
            <Suspense fallback={<div>loading....</div>}> 
                <LineChart data={data} xKey={"month"} yKeys={["sales"]} />
            </Suspense>}
    </>
  )
}

const data: SalesInfo[] = [
    {month : 'Jan', sales: 100},
    {month : 'Feb', sales: 200},
    {month : 'Mar', sales: 300},
    {month : 'Apr', sales: 400},
    {month : 'May', sales: 500},
    {month : 'Jun', sales: 600},
    {month : 'Jul', sales: 700},
    {month : 'Aug', sales: 800},
    {month : 'Sep', sales: 900},
    {month : 'Oct', sales: 1000},
    {month : 'Nov', sales: 1100},
    {month : 'Dec', sales: 1200},
]
