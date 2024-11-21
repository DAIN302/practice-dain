import { Controller, useFormContext } from "react-hook-form";
import Question from "../../models/question";
import Input from "../common/Input";
import Dropdown from "../common/Dropdown";
import Textarea, { AutoGrow } from "../common/Textarea";
import Radio from "../common/Radio";
import CheckBox from "../common/CheckBox";

interface Props {
  question: Question;
}

export default function QuestionForm({ question }: Props) {
  // FormProvider 를 통해서 Context 사용할 수 있도록 하는 훅 -> useFormContext
  const { register, control } = useFormContext();

  // quetion type 에 따른 다른 UI 노출
  switch (question.type) {
    case "shortText":
      return (
        <Input
          className="pb-16 pt-0 border-b-2 focus:border-b-main focus:bg-transparent w-full"
          {...register(`${question.id}`, {
            required: {
              value: question.required,
              message: "필수 항목 입니다",
            },
          })}
        />
      );
    case "date":
      return (
        <Input
          type="date"
          {...register(`${question.id}`, {
            required: {
              value: question.required,
              message: "필수 항목 입니다",
            },
          })}
        />
      );
    case "time":
      return (
        <Input
          type="time"
          {...register(`${question.id}`, {
            required: {
              value: question.required,
              message: "필수 항목 입니다",
            },
          })}
        />
      );
    case "dropdown":
      return (
        // input 이나 select 로 만들지 않은 컴포넌트에 대해서 Controller 를 사용해서
        // react-hook-form 기능을 사용할 수 있게 함
        // register 대신에 control 로 전달
        <Controller
          name={`${question.id}`}
          control={control}
          render={({ field }) => (
            <Dropdown
              options={question.options!.map((option) => ({
                label: <span>{option}</span>,
                value: option,
              }))}
              onChange={field.onChange}
            />
          )}
          rules={{
            required: {
              value: question.required,
              message: "필수 항목 입니다.",
            },
          }}
        />
      );
    case "longText":
      return (
        <AutoGrow className="w-full" forTextarea={`${question.id}`}>
          <Textarea
            className="w-full bg-transparent border-b-2 focus:border-b-main focus:bg-transparent"
            {...register(`${question.id}`, {
              required: {
                value: question.required,
                message: "필수 항목 입니다",
              },
            })}
            rows={1}
          />
        </AutoGrow>
      );
    case "multipleChoice":
      return (
        <div className="flex gap-y-20 flex-col">
          {question.options!.map((option) => (
            <Radio
              key={option}
              label={option}
              value={option}
              {...register(`${question.id}`, {
                required: {
                  value: question.required,
                  message: "필수 항목 입니다",
                },
              })}
            />
          ))}
        </div>
      );
    case "checkbox":
      return (
        <div className="flex gap-y-20 flex-col">
          {question.options!.map((option) => (
            <CheckBox
              key={option}
              label={option}
              value={option}
              {...register(`${question.id}`, {
                required: {
                  value: question.required,
                  message: "필수 항목 입니다",
                },
              })}
            />
          ))}
        </div>
      );
    default:
      return null;
  }
}
