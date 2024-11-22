import { SectionData, Statistics, SurveyResponse } from "../types/app";

// 통계 연산 함수
export function getStatistics(
  responses: SurveyResponse[],
  sections: SectionData[]
) {
  return responses.reduce((acc, response) => {
    sections.forEach((section) => {
      const sectionResponse = response[section.id];
      section.questions.forEach((q) => {
        // acc 초기화 -> seciotn.id 없으면 빈 객체 할당
        if (!acc[section.id]) {
          acc[section.id] = {};
        }

        if (q.type === "longText") {
          const value = sectionResponse[q.id] as string;
          const questionData = (acc[section.id][q.id] ?? []) as string[];
          questionData.push(value);
          acc[section.id][q.id] = questionData;
        } else {
          const values = sectionResponse[q.id] || [];
          const questionData = (acc[section.id][q.id] ?? {}) as Record<
            string,
            number
          >;

          Array.isArray(values)
            ? values
            : [values].forEach((value) => {
                questionData[value] = (questionData[value] ?? 0) + 1;
              });

          acc[section.id][q.id] = questionData;
        }
      });
    });

    return acc;
  }, {} as Statistics);
}
