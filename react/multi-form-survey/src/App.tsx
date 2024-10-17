import "./App.css";
import Dropdown from "./components/common/Dropdown";
import MainLayout from "./components/common/MainLayout";
import Panel, {
  PanelBody,
  PanelCap,
  PanelFooter,
  PanelHeader,
} from "./components/common/Panel";
import Tabs, {
  Tab,
  TabList,
  TabPanel,
  TabpPanels,
} from "./components/common/Tabs";
import QuestionEditor from "./components/edit/QuestionEditor";

function App() {
  return (
    <MainLayout>
      <Tabs>
        <TabList>
          <Tab index={0}>tab1</Tab>
          <Tab index={1}>tab2</Tab>
        </TabList>
        <TabpPanels>
          <TabPanel index={0}>
            <PanelCap>cap</PanelCap>
            <QuestionEditor />
          </TabPanel>
          <TabPanel index={1}>panel2</TabPanel>
        </TabpPanels>
      </Tabs>
    </MainLayout>
  );
}

export default App;
