import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

// msw 초기화
async function enableMocking() {
  // 개발 모드일때만 msw 실행
  if (import.meta.env.MODE !== "development") return;

  const { worker } = await import("./__mock__/browser.ts");
  return worker.start();
}

enableMocking().then(() => {
  ReactDOM.createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
});
