import Section from "../../models/section";
import { Statistics } from "../../types/app";
import SectionStatistics from "./SectionStatistics";

interface Props {
  count: number;
  sections: Section[];
  statistics: Statistics;
}

export default function SectionListStatistics({ sections, statistics, count }: Props) {
  return sections.map((section, index) => (
    <SectionStatistics
      key={section.id}
      section={section}
      capTitle={`${sections.length}개 중 ${index + 1} 섹션`}
      statistics={statistics[section.id]}
    />
  ));
}
