import { useSurveyStore } from "../../store";
import SectionEditor from "./SectionEditor";

// 섹션을 렌더링하는 컴포넌트
export default function SectionEditorList() {
  const surveyStore = useSurveyStore();

  return (
    <div className="relative">
      {/* 버튼 클릭 시 질문 추가 */}
      <div className="absolute top-0 -right-50">
        <button onClick={() => surveyStore.addQuestion()}>+</button>
      </div>
      <div>
      {surveyStore.sections.map(section => (
        <SectionEditor key={section.id} section={section} />
      ))}
      </div>
    </div>
  );
}
