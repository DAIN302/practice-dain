// import { FormEvent } from "react";

// export default function RegisterCity() {
//   const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
//     e.preventDefault();

//     const data = new FormData(e.currentTarget);
//     const city = {
//       city: data.get("city") as string,
//       name: data.get("name") as string,
//       description: data.get("description") as string,
//     };

//     const response = await fetch("/api/cities", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify(city),
//     });

//     if (response.ok) {
//       alert("City registered");
//     } else {
//       alert("Failed to register city");
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit}>
//       <label>
//         City :
//         <input type="text" name="city" />
//       </label>
//       <label>
//         Name :
//         <input type="text" name="name" />
//       </label>
//       <label>
//         Description :
//         <input type="text" name="description" />
//       </label>
//       <button type="submit">Register</button>
//     </form>
//   );
// }

import { useRef } from 'react';

export default function RegisterCountry() {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const registerCity = async () => {
    const city = textareaRef.current?.value;

    if (!city) {
      return;
    }

    const response = await fetch('/api/cities', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: city,
    });

    if (response.ok) {
      textareaRef.current!.value = '';
      alert('City registered');
    } else {
      alert('Failed to register city');
    }
  };

  return (
    <div>
      <div>
        <textarea ref={textareaRef} />
      </div>
      <button onClick={registerCity}>등록</button>
    </div>
  );
}
