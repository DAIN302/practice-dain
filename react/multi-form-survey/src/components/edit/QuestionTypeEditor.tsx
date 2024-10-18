import { QuestionType } from "../../types/app";
import Dropdown from "../common/Dropdown";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMinus,
  faBars,
  faListCheck,
  faCaretDown,
} from "@fortawesome/free-solid-svg-icons";
import {
  faCalendar,
  faClock,
  faCircleCheck,
} from "@fortawesome/free-regular-svg-icons";
import { observer } from "mobx-react-lite";

interface Props {
    type : QuestionType;
    onChange : (type:QuestionType) => void;
}

// 드롭다운 메뉴 컴포넌트
const QuestionTypeEditor = observer(function QuestionTypeEditor({type, onChange} : Props) {
  return (
    <Dropdown<QuestionType>
          defaultValue={type}
          onChange={(value) => onChange(value)}
          options={[
            {
              label: (
                <div>
                  <FontAwesomeIcon icon={faMinus} className="mr-10" />
                  <span>단답형</span>
                </div>
              ),
              value: "shortText",
            },
            {
              label: (
                <div>
                  <FontAwesomeIcon icon={faBars} className="mr-10" />
                  <span>장문형</span>
                </div>
              ),
              value: "longText",
            },
            {
              label: (
                <div>
                  <FontAwesomeIcon icon={faListCheck} className="mr-10" />
                  <span>객관식</span>
                </div>
              ),
              value: "multipleChoice",
            },
            {
              label: (
                <div>
                  <FontAwesomeIcon icon={faCircleCheck} className="mr-10" />
                  <span>체크박스</span>
                </div>
              ),
              value: "checkbox",
            },
            {
              label: (
                <div>
                  <FontAwesomeIcon icon={faCaretDown} className="mr-10" />
                  <span>드롭다운</span>
                </div>
              ),
              value: "dropdown",
            },
            {
              label: (
                <div>
                  <FontAwesomeIcon icon={faCalendar} className="mr-10" />
                  <span>날짜</span>
                </div>
              ),
              value: "data",
            },
            {
              label: (
                <div>
                  <FontAwesomeIcon icon={faClock} className="mr-10" />
                  <span>시간</span>
                </div>
              ),
              value: "time",
            },
          ]}
        />
  )
})

export default QuestionTypeEditor;
