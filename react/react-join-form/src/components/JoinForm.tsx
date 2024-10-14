import { FormEvent, InputHTMLAttributes, useState } from 'react'

// 제어 컴포넌트
// form의 값이 리액트의 state 에 의해서 제어되는 컴포넌트,
// form의 상태를 쉽게 추적하고 동적으로 변경 가능
export default function JoinForm() {
    // const [name, setName] = useState('')
    // const [email, setEmail] = useState('')
    // const [phone, setPhone] = useState('')

    const handleSubmit = (e :FormEvent<HTMLFormElement>) => { // form에 해당하는 prop들 접근 가능
        e.preventDefault();
        console.log({
            name: (e.currentTarget.elements.namedItem("name") as HTMLInputElement).value, 
            email: (e.currentTarget.elements.namedItem("email") as HTMLInputElement).value, 
            phone: (e.currentTarget.elements.namedItem("phone") as HTMLInputElement).value
        });
    }

  return (
    <form onSubmit={handleSubmit}>
        <div>
            <Input id='name' name='name' type='text' required />
            {/* <Input id='name' name='name' type='text' required value={name} onChange={e => setName(e.currentTarget.value)} /> */}
        </div>
        <div>
            <Input id='email' name='email' type='email' required />
            {/* <Input id='email' name='email' type='email' required value={email} onChange={e => setEmail(e.currentTarget.value)}/> */}
        </div>
        <div>
            <Input id='phone' name='phone' type='tel' required />
            {/* <Input id='phone' name='phone' type='tel' required value={phone} onChange={e => setPhone(e.currentTarget.value)}/> */}
        </div>
        <div>
            <button type='submit'>Join</button>
            <button type='reset'>Reset</button>
        </div>
    </form>
  )
}

// 인풋 컴포넌트
function Input({id, name, ...props} :Omit<InputHTMLAttributes<HTMLInputElement>, "value" | "onChange">) {
    // Omit -> 타입스크립트에서 제공하는 제거하는 함수 
    // value 와 onChange 를 제거하겠다는 것

    // onChange 이벤트가 발생하는 컴포넌트에 대해서만 리렌더링 해주기 위해 하위 컴포넌트에서 state 지정
    const [value, setValue] = useState('');
    return (
        <>
            <label htmlFor={id}>{name}</label>
            <input id={id} name={name} {...props} value={value} onChange={e => setValue(e.currentTarget.value)}/>
        </>

    )
}
