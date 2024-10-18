import { observer } from "mobx-react-lite";
import { useSurveyStore } from "../../store";
import EditorMenu from "./EditorMenu";
import SectionEditor from "./SectionEditor";

// 섹션을 렌더링하는 컴포넌트
const SectionEditorList = observer(function SectionEditorList() {
  const surveyStore = useSurveyStore();

  return (
    <div className="relative">
      {/* 버튼 클릭 시 질문 추가 */}
      <EditorMenu className="fixed bottom-30 left-[calc(100%-72px)] sm:bottom-auto sm:top-[263px] sm:left-[calc(50%+340px)]" />
      <div>
        {surveyStore.sections.map((section, index) => (
          <SectionEditor key={section.id} section={section} onChangeFocus={surveyStore.setFocusSection} capTitle={`${surveyStore.sections.length}개 중 ${index+1} 섹션`}/>
        ))}
      </div>
    </div>
  );
})

export default SectionEditorList