import classNames from "classnames";

interface Props {
    direction? : 'horizontal' | 'vertical';
}

// 가로 혹은 세로 디바이더 컴포넌트
export default function Divider({ className, direction = 'horizontal'} : Cn<Props>) {
    if(direction === 'horizontal') {
        return <hr className={classNames("border-t-1 border-gray100 w-full", className)} />
    } 
    return <hr className={classNames(" border-l-1 border-gray100 h-full", className)} />
  
}
