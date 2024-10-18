import { useSurveyStore } from "../../store";
import EditorMenu from "./EditorMenu";
import SectionEditor from "./SectionEditor";

// 섹션을 렌더링하는 컴포넌트
export default function SectionEditorList() {
  const surveyStore = useSurveyStore();

  return (
    <div className="relative">
      {/* 버튼 클릭 시 질문 추가 */}
      <EditorMenu className="fixed bottom-30 left-[calc(100%-72px)] sm:bottom-auto sm:top-[263px] sm:left-[calc(50%+340px)]" />
      <div>
        {surveyStore.sections.map((section) => (
          <SectionEditor key={section.id} section={section} />
        ))}
      </div>
    </div>
  );
}
