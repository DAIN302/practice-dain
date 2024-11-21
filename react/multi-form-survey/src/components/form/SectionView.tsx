import { FormProvider, useForm } from "react-hook-form";
import Section from "../../models/section";
import SectionTitleView from "./SectionTitleView";
import QuestionView from "./QuestionView";

interface Props {
  section: Section;
}

export default function SectionView({ section }: Props) {
  const methods = useForm();

  return (
    <FormProvider {...methods}>
      <form className="text-gray900">
        <SectionTitleView section={section} />
        {section.questions.map((q) => (
          <QuestionView key={q.id} question={q} />
        ))}
      </form>
    </FormProvider>
  );
}
