import { useRef } from "react";

export default function RegisterCountry() {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const registerCountry = async () => {
    const country = textareaRef.current?.value;

    if (!country) return;

    const response = await fetch("/api/countries", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: country,
    });

    if (response.ok) {
      textareaRef.current!.value = "";
      alert("Country registered");
    } else {
      alert("Failed to register Country");
    }
  };

  return (
    <div>
      <div>
        <textarea ref={textareaRef} />
        <button onClick={registerCountry}>등록</button>
      </div>
    </div>
  );
}
