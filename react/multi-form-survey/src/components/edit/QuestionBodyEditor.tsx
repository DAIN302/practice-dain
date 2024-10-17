import { QuestionType } from "../../types/app";
import Input from "../common/Input";
import OptionEditor from "./OptionEditor";

interface QuestionBodyEditorProps {
  type: QuestionType;
}

export default function QuestionBodyEditor({ type }: QuestionBodyEditorProps) {
  switch (type) {
    case "shortText":
    case "longText":
    case "data":
    case "time":
        return <Input disabled />
    case "multipleChoice":
    case "checkbox":
    case "dropdown":
        return <OptionEditor type={type}/>
    default:
      return null;
  }
}
