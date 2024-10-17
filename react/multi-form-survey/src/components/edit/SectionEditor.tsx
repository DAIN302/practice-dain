import { observer } from "mobx-react-lite";
import { useSurveyStore } from "../../store";
import QuestionEditor from "./QuestionEditor";
import Section from "../../models/section";

interface Props {
  section: Section;
}

// question editor 컨테이너 컴포넌트
const SectionEditor = observer(function SectionEditor({ section }: Props) {
  // mobX 의 observer -> 상태가 변경되었을 때 리렌더링 되도록 함
  const surveyStore = useSurveyStore();
  return (
    <div>
      {section.questions.map((question) => (
        <QuestionEditor key={question.id} question={question} />
      ))}
    </div>
  );
});

export default SectionEditor;
