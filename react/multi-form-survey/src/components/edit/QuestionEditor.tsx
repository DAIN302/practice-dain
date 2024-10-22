import Input from "../common/Input";
import Panel, { PanelBody, PanelFooter, PanelHeader } from "../common/Panel";
import QuestionBodyEditor from "./QuestionBodyEditor";
import Question from "../../models/question";
import { observer } from "mobx-react-lite";
import QuestionTypeEditor from "./QuestionTypeEditor";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCopy, faTrashCan } from "@fortawesome/free-regular-svg-icons";
import Divider from "../common/Divider";
import Switch from "../common/Switch";
// import { faToggleOn } from "@fortawesome/free-solid-svg-icons";

interface Props {
  question: Question;
  onCopy: (id: number) => void;
  onDelete: (id: number) => void;
}

const QuestionEditor = observer(function QuestionEditor({
  question,
  onCopy,
  onDelete,
}: Props) {
  return (
    <Panel className="border-l-10 border-l-transparent focus-within:border-l-main">
      <PanelHeader className="flex mb-25">
        <Input
          className="flex-1 mr-30"
          value={question.title}
          onChange={(e) => question.setTitle(e.currentTarget.value)}
        />
        <QuestionTypeEditor type={question.type} onChange={question.setType} />
      </PanelHeader>
      <PanelBody>
        <QuestionBodyEditor type={question.type} />
      </PanelBody>
      <PanelFooter className="flex justify-end gap-x-24 h-24">
        <button onClick={() => onCopy(question.id)}>
          <FontAwesomeIcon icon={faCopy} />
        </button>
        <button onClick={() => onDelete(question.id)}>
          <FontAwesomeIcon icon={faTrashCan} />
        </button>
        <Divider direction="vertical" />
        <div className="flex items-center">
          <span className="mr-13">필수</span>
          <Switch
            id={`${question.id}_switch`}
            checked={question.required}
            onChange={question.setRequired}
          />
        </div>
      </PanelFooter>
    </Panel>
  );
});

export default QuestionEditor;
