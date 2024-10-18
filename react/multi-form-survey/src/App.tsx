import "./App.css";
import MainLayout from "./components/common/MainLayout";
import Tabs, {
  Tab,
  TabList,
  TabPanel,
  TabpPanels,
} from "./components/common/Tabs";
import SectionEditorList from "./components/edit/SectionEditorList";
import { SurveyStoreProvider } from "./store";

function App() {
  return (
    <MainLayout>
      <SurveyStoreProvider>
        <Tabs>
          <TabList>
            <Tab index={0}>tab1</Tab>
            <Tab index={1}>tab2</Tab>
          </TabList>
          <TabpPanels>
            <TabPanel index={0}>
              <SectionEditorList />
            </TabPanel>
            <TabPanel index={1}>panel2</TabPanel>
          </TabpPanels>
        </Tabs>
      </SurveyStoreProvider>
    </MainLayout>
  );
}

export default App;
