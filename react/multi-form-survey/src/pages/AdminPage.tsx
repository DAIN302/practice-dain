import { NavLink, Outlet, useParams } from "react-router-dom";
import cn from "classnames";
import { PropsWithChildren } from "react";

export default function AdminPage() {
    const params = useParams();
  return (
    <div className="flex flex-col">
      {/* 탭 버튼 영역 */}
      <div className="flex justify-center gap-x-20">
        <Tab path={`/surveys/${params.surveyId}/edit`}>질문</Tab>
        <Tab path={`/surveys/${params.surveyId}/responses`}>응답</Tab>
      </div>
      {/* 탭 컨텐츠 영역 */}
      <div className="flex-1">
        <Outlet />
      </div>
    </div>
  );
}

function Tab({children, path} :PropsWithChildren<{path:string}>) {
  return (
    <NavLink
      className={({ isActive }) =>
        cn("border-b-3 p-14", {
          "text-main border-main": isActive,
          "border-transparent text-gray-500": !isActive,
        })
      }
      to={{pathname:path}}
    >
      {children}
    </NavLink>
  );
}
