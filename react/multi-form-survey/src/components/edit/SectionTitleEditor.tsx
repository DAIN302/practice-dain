import Section from "../../models/section";
import Input from "../common/Input";
import Panel, { PanelBody, PanelCap } from "../common/Panel";

interface Props {
  capTitle: string;
  section: Section;
}

export default function SectionTitleEditor({ capTitle, section }: Props) {
  return (
    <div>
      <PanelCap>{capTitle}</PanelCap>
      <Panel>
        <PanelBody className="flex flex-col">
          <Input
            className="mb-17 text-24 text-gray900 font-semibold py-8"
            value={section.title}
            onChange={(e) => section.setTitle(e.currentTarget.value)}
          />
          <Input
            className="text-gray700 text-16 py-3"
            value={section.description}
            onChange={(e) => section.setDescription(e.currentTarget.value)}
          />
        </PanelBody>
      </Panel>
    </div>
  );
}
