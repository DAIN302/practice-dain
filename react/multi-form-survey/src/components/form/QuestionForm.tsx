import { useFormContext } from "react-hook-form";
import Question from "../../models/question";
import Input from "../common/Input";

interface Props {
  question: Question;
}

export default function QuestionForm({ question }: Props) {
  // FormProvider 를 통해서 Context 사용할 수 있도록 하는 훅 -> useFormContext
  const { register } = useFormContext();

  // quetion type 에 따른 다른 UI 노출
  switch (question.type) {
    case "shortText":
      return <Input className="pb-16" {...register(`${question.id}`)} />;
    case "longText" :
      return   

    default:
      return null;
  }
}
