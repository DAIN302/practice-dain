import { observer } from "mobx-react-lite";
import QuestionEditor from "./QuestionEditor";
import Section from "../../models/section";
import SectionTitleEditor from "./SectionTitleEditor";

interface Props {
  section: Section;
  capTitle: string;
  onChangeFocus : (id:number) => void;
}

// question editor 컨테이너 컴포넌트
// mobX 의 observer -> 상태가 변경되었을 때 리렌더링 되도록 함
const SectionEditor = observer(function SectionEditor({ section, capTitle, onChangeFocus }: Props) {
  // section 에 focus 가 이동되도록 하는 함수
  const handleClickContainer = () => {
    onChangeFocus(section.id)
  }

  return (
    <div className="[&>*]:mb-20" onClick={handleClickContainer}>
      <SectionTitleEditor section={section} capTitle={capTitle} />
      {section.questions.map((question) => (
        <QuestionEditor key={question.id} question={question} onCopy={section.copyQuestion} onDelete={section.removeQuestion}/>
      ))}
    </div>
  );
});

export default SectionEditor;
