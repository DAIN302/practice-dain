import { FormEvent, ForwardedRef, forwardRef, InputHTMLAttributes, useRef } from 'react'

// 비제어 컴포넌트
// form의 기본적인 값들을 사용하기 위해 ref 라는 속성을 사용해서 직접 HTML 에 접근한 후
// 각 객체 값들을 가져오는 것 
export default function JoinForm2() {
    const nameRef = useRef<HTMLInputElement>(null)
    const emailRef = useRef<HTMLInputElement>(null)
    const phoneRef = useRef<HTMLInputElement>(null)

    const handleSubmit = (e :FormEvent<HTMLFormElement>) => { // form에 해당하는 prop들 접근 가능
        e.preventDefault();
        console.log({
            name: (nameRef.current as HTMLInputElement).value, 
            email: (emailRef.current as HTMLInputElement).value, 
            phone: (phoneRef.current as HTMLInputElement).value 
        });
    }

  return (
    <form onSubmit={handleSubmit}>
        <div>
            <Input id='name' name='name' type='text' required ref={nameRef} />
        </div>
        <div>
            <Input id='email' name='email' type='email' required ref={emailRef}/>
        </div>
        <div>
            <Input id='phone' name='phone' type='tel' required ref={phoneRef}/>
        </div>
        <div>
            <button type='submit'>Join</button>
            <button type='reset'>Reset</button>
        </div>
    </form>
  )
}

// 인풋 컴포넌트
const Input = forwardRef(function Input(
    {id, name, ...props} :InputHTMLAttributes<HTMLInputElement>,  ref:ForwardedRef<HTMLInputElement>) {
    return (
        <>
            <label htmlFor={id}>{name}</label>
            <input id={id} name={name} {...props} ref={ref} />
        </>
    )
})


