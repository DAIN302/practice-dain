import "./App.css";
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
            <Panel>
              <PanelHeader>헤더</PanelHeader>
              <PanelBody>바디</PanelBody>
              <PanelFooter>푸터</PanelFooter>
            </Panel>
          </TabPanel>
          <TabPanel index={1}>panel2</TabPanel>
        </TabpPanels>
      </Tabs>
    </MainLayout>
  );
}

export default App;
