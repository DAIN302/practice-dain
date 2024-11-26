import { FormEvent } from "react";

export default function RegisterCity() {
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const data = new FormData(e.currentTarget);
    const city = {
      city: data.get("city") as string,
      name: data.get("name") as string,
      description: data.get("description") as string,
    };

    const response = await fetch("/api/cities", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(city),
    });

    if (response.ok) {
      alert("City registered");
    } else {
      alert("Failed to register city");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        City :
        <input type="text" name="city" />
      </label>
      <label>
        Name :
        <input type="text" name="name" />
      </label>
      <label>
        Description :
        <input type="text" name="description" />
      </label>
      <button type="submit">Register</button>
    </form>
  );
}
