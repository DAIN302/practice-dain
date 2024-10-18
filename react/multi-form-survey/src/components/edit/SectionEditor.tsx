import { observer } from "mobx-react-lite";
import QuestionEditor from "./QuestionEditor";
import Section from "../../models/section";
import SectionTitleEditor from "./SectionTitleEditor";

interface Props {
  section: Section;
}

// question editor 컨테이너 컴포넌트
const SectionEditor = observer(function SectionEditor({ section }: Props) {
  // mobX 의 observer -> 상태가 변경되었을 때 리렌더링 되도록 함
  return (
    <div>
      <SectionTitleEditor section={section} capTitle="2개 중 1섹션" />
      {section.questions.map((question) => (
        <QuestionEditor key={question.id} question={question} />
      ))}
    </div>
  );
});

export default SectionEditor;
