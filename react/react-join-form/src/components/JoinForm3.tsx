import { ForwardedRef, forwardRef, InputHTMLAttributes, useEffect } from 'react'
import { useForm } from 'react-hook-form';

// 비제어 컴포넌트
// form의 기본적인 값들을 사용하기 위해 ref 라는 속성을 사용해서 직접 HTML 에 접근한 후
// 각 객체 값들을 가져오는 것 

// react-hook-form 을 이용한 밸리데이션
// react-hook-form 은 ref 을 기반으로 동작함

interface JoinInfo {
    name: string;
    email: string;
    phone: string;
}
export default function JoinForm3() {
    const { register, handleSubmit, formState: {errors} } = useForm<JoinInfo>()

    const submit = ({name, email, phone} : JoinInfo) => { // form에 해당하는 prop들 접근 가능
        console.log({name, email, phone});
    }

    useEffect(() => {
        console.log(errors, Object.values(errors).map(error=>error.message))
    }, [errors])

    
    // register 에 기본적으로 name 속성이 들어있기 때문에 생략 가능
  return (
    <form onSubmit={handleSubmit(submit)}>
        <div>
            <Input id='name' type='text' required
            {...register('name')} />
        </div>
        <div>
            <Input id='email' type='email' required
            {...register('email')}
             />
        </div>
        <div>
            <Input id='phone' type='tel' required
            {...register('phone', {
                pattern : {
                    value : /\d{10,11}/,
                    message : 'Invalid phone number'
                }
            })}
             />
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


