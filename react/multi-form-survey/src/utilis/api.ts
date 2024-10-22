// api 호출 함수
type ApiParams = {
  method: "GET" | "POST" | "PUT" | "DELETE";
  body?: object;
  baseUrl?: string;
};

export default function callApi<Response>(
  path: string,
  { method = "GET", baseUrl = "/api", body }: ApiParams
) : Promise<Response> {
  return fetch(`${baseUrl}${path}`, {
    method,
    headers: {
      "Content-Type": "application/json",
    },
    body: body ? JSON.stringify(body) : undefined,
  }).then((res) => res.json());
}
