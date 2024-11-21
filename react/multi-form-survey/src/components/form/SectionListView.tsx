import { useRef, useState } from "react";
import { useSurveyStore } from "../../store";
import SectionView from "./SectionView";
import { observer } from "mobx-react-lite";

const SectionListView = observer(function SectionListView() {
  const surveyStore = useSurveyStore();
  const [currentSection, setCurrentSection] = useState(0);
  const data = useRef<object[]>([]);
  const last = currentSection === surveyStore.sections.length - 1;

  // 다음으로 가기
  const handleNext = () => {
    if (last) {
      // submit
      return;
    }
    setCurrentSection(currentSection + 1);
  };

  // 결과 저장
  const saveData = (sectionData: object) => {
    data.current[currentSection] = sectionData;
  };

  return (
    <SectionView
      section={surveyStore.sections[currentSection]}
      onSave={saveData}
      onNext={handleNext}
      last={last}
    />
  );
});

export default SectionListView;
