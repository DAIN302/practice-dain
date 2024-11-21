import { ReactNode } from "react";
import { QuestionType } from "../../types/app";
import Input from "../common/Input";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircle } from "@fortawesome/free-regular-svg-icons";
import Question from "../../models/question";
import { observer } from "mobx-react-lite";

interface OptionEditorProps {
  question: Question;
}
const OptionEditor = observer(function OptionEditor({
  question: { options = [], type, setOption, setOptions },
}: OptionEditorProps) {
  return (
    <div>
      {options.map((option, index) => (
        <div key={index} className="flex items-center">
          {icons[type]}
          <Input
            value={option}
            onChange={(e) => {
              setOption(index, e.currentTarget.value);
            }}
          />
        </div>
      ))}
      <div className="flex items-center mt-28">
        {icons[type]}
        <button
          className="text-gray500 text-16"
          onClick={() => {
            setOptions([...options, `옵션 ${options.length + 1}`]);
          }}
        >
          옵션추가
        </button>
      </div>
    </div>
  );
});
export default OptionEditor;

const icons: Partial<Record<QuestionType, ReactNode>> = {
  multipleChoice: <FontAwesomeIcon icon={faCircle} className="mr-14" />,
  checkbox: <FontAwesomeIcon icon={faCircle} className="mr-14" />,
  dropdown: <FontAwesomeIcon icon={faCircle} className="mr-14" />,
};
