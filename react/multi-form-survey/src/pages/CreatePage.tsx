import { toJS } from "mobx";
import SectionEditorList from "../components/edit/SectionListEditor";
import { useSurveyStore } from "../store";
import callApi from "../utilis/api";
import Button from "../components/common/Button";
import { useNavigate } from "react-router";

export default function CreatePage() {
  const surveyStore = useSurveyStore();
  const navigate = useNavigate();

  const handleSubmit = () => {
    callApi<{ id: number }>("/surveys", {
      method: "POST",
      body: toJS({ sections: surveyStore.sections }),
    }).then(({ id }) => {
      navigate(`/surveys/${id}/edit#send`);
    });
  };
  return (
    <>
      <Button className="absolute -top-30 right-0" onClick={handleSubmit}>
        보내기
      </Button>
      <SectionEditorList />
    </>
  );
}
