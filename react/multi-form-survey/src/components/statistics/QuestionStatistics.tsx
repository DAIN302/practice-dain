import { Cell, Legend, Pie, PieChart, PieLabel } from "recharts";
import Question from "../../models/question";
import { QuestionData, SectionData, Statistics } from "../../types/app";
import Panel, { PanelBody, PanelHeader } from "../common/Panel";

interface Props {
  question: Question;
  statistics: Statistics[SectionData["id"]][QuestionData["id"]];
}

export default function QuestionStatistics({ question, statistics }: Props) {
  if (question.type === "longText") {
    const typeStatistics = statistics as string[];
    return (
      <Panel className="text-gray900">
        <PanelHeader>
          <h6 className="text-17 font-medium mb-18">{question.title}</h6>
          <p className="text-gray800 text-16 mb-21">
            응답 {typeStatistics.length}개
          </p>
        </PanelHeader>
        <PanelBody className="flex flex-col gap-y-9">
          {typeStatistics.map((response, index) =>
            response ? (
              <p
                key={index}
                className="text-15 text-black font-medium py-17 bg-bg rounded-10"
              >
                {response}
              </p>
            ) : null
          )}
        </PanelBody>
      </Panel>
    );
  } else {
    const typeStatistics = statistics as Record<string, number>;
    const entries = Object.entries(typeStatistics);
    const total = entries.reduce((acc, [, count]) => acc + count, 0);

    return (
      <Panel className="text-gray900">
        <PanelHeader>
          <h6 className="text-17 font-medium mb-18">{question.title}</h6>
          <p className="text-gray800 text-16 mb-21">응답 {total}개</p>
        </PanelHeader>
        <PanelBody className="flex flex-col gap-y-9 items-center">
          <PieChart width={410} height={250}>
            <Pie
              cx="35%"
              data={entries}
              nameKey={0}
              dataKey={1}
              label={renderCustomizedLabel}
              labelLine={false}
            >
              {entries.map(([key], index) => (
                <Cell key={key} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Legend
              align="right"
              verticalAlign="middle"
              layout="vertical"
              iconType="circle"
              iconSize={16}
            />
          </PieChart>
        </PanelBody>
      </Panel>
    );
  }
}

const COLORS = ["#0D00A4", "#0D00A4CC", "#0D00A499", "#0D00A466", "#0D00A433"];
const RADIAN = Math.PI / 180;
const renderCustomizedLabel: PieLabel = ({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  percent,
  index,
}) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text
      x={x}
      y={y}
      fill="white"
      textAnchor={x > cx ? "start" : "end"}
      dominantBaseline="central"
    >
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};
