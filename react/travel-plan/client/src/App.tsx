import "./App.css";
import { lazy, Suspense } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Loading from "./components/common/Loading";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import ModalProvider from "./components/common/ModalProvider";
// import RegisterCity from "./pages/admin/RegisterCity";

// lazy loading
// 동적으로 로딩해두면 애플리케이션 초기 로딩 시에 필요 코드만 로드하고 나머지는
// 사용자가 해당 경로로 이동할 때 로드 -> 초기 로딩 시간이 감소
// 네트워크에서 필요한 자원만 다운받아서 페이지를 렌더링하기 때문애
// 네트워크 트래픽과 리소스 사용을 최적화할 수 있음
const Home = lazy(() => import("./pages/home/Home"));
const RegisterCity = lazy(() => import("./pages/admin/RegisterCity"));
const RegisterCountry = lazy(() => import("./pages/admin/RegisterCountry"));

const queryClient = new QueryClient();

function App() {
  return (
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <Suspense fallback={<Loading />}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/admin">
              <Route path="register-city" element={<RegisterCity />} />
              <Route path="register-country" element={<RegisterCountry />} />
            </Route>
          </Routes>
        </Suspense>
        <ModalProvider />
      </QueryClientProvider>
    </BrowserRouter>
  );
}

export default App;
