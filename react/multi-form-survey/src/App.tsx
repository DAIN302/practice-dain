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
              <PanelHeader>
                헤더{" "}
                <Dropdown
                  options={[
                    { label: <div>1</div>, value: "1" },
                    { label: <div>2</div>, value: "2" },
                    { label: <div>3</div>, value: "3" },
                    { label: <div>4</div>, value: "4" },
                  ]}
                  onChange={(value) => console.log(value)}
                />
              </PanelHeader>
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
