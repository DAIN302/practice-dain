import { toJS } from "mobx";
import SectionEditorList from "../components/edit/SectionEditorList";
import { useSurveyStore } from "../store";
import callApi from "../utilis/api";
import { useEffect } from "react";
import { useParams } from "react-router";
import Button from "../components/common/Button";

export default function EditPage() {
  const surveyStore = useSurveyStore();
  const { surveyId } = useParams<{ surveyId: string }>();

  useEffect(() => {
    const id = parseInt(surveyId ?? "", 10);
    if (id) {
      surveyStore.fetchSurvey(id);
    }
  }, [surveyId]);

  const handleSubmit = () => {
    callApi(`/surveys/${surveyId}`, {
      method: "PUT",
      body: toJS({ sections: surveyStore.sections }),
    });
  };
  return (
    <>
      <Button className="absolute top-0 right-0" onClick={handleSubmit}>보내기</Button>
      <SectionEditorList />
    </>
  );
}
