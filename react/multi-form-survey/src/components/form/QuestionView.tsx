import Question from "../../models/question";
import Panel, { PanelBody, PanelHeader } from "../common/Panel";
import QuestionForm from "./QuestionForm";

interface Props {
  question: Question;
}

export default function QuestionView({ question }: Props) {
  return (
    <Panel className="border-l-10 border-l-transparent focus-within:border-l-main">
      <PanelHeader className="flex mb-25">
        <h6 className="text-16 text-gray900 font-medium">{question.title}</h6>
      </PanelHeader>
      <PanelBody>
        <QuestionForm question={question} />
      </PanelBody>
    </Panel>
  );
}
