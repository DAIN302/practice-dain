import { useFormContext } from "react-hook-form";
import Question from "../../models/question";
import Panel, { PanelBody, PanelHeader } from "../common/Panel";
import QuestionForm from "./QuestionForm";
import cn from "classnames";

interface Props {
  question: Question;
}

export default function QuestionView({ question }: Props) {
  const {
    formState: { errors },
  } = useFormContext();

  return (
    <Panel className={cn({ "border-red-500 border": errors[question.id] })}>
      <PanelHeader className="flex mb-32">
        <h6 className="text-16 text-gray900 font-medium">{question.title}</h6>
      </PanelHeader>
      <PanelBody>
        <QuestionForm question={question} />
        {errors[question.id] && (
          <p className="text-red-500 text-14 mt-10">
            {errors[question.id]?.message?.toString() || "필수 항목 입니다."}
          </p>
        )}
      </PanelBody>
    </Panel>
  );
}
