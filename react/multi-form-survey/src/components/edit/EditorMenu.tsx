import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCirclePlus, faTableCellsLarge } from "@fortawesome/free-solid-svg-icons";
import { useSurveyStore } from "../../store";
import classNames from "classnames";

// container component
export default function EditorMenu({className} : Cn) {
    // 내부의 액션을 store에서 직접 꺼내기, context 사용 
    const surveyStore = useSurveyStore();
  return (
    <div className={classNames("bg-white rounded-10 px-13 py-26 flex flex-col gap-y-26 shadow-sm", className)}>
        <button onClick={surveyStore.addSection}>
            <FontAwesomeIcon icon={faCirclePlus} />
        </button>
        <button onClick={surveyStore.addQuestion}>
            <FontAwesomeIcon icon={faTableCellsLarge} />
        </button>
    </div>
  )
}
