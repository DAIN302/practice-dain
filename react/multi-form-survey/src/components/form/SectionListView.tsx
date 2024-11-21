import { useState } from "react";
import { useSurveyStore } from "../../store";
import SectionView from "./SectionView";
import { observer } from "mobx-react-lite";

const SectionListView = observer(function SectionListView() {
  const surveyStore = useSurveyStore();
  const [currentSection, setCurrentSection] = useState(0);

  return <SectionView section={surveyStore.sections[currentSection]} />;
});

export default SectionListView;
