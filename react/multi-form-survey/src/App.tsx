import './App.css'
import MainLayout from './components/common/MainLayout'
import Tabs, { Tab, TabList, TabPanel, TabpPanels } from './components/common/Tabs'

function App() {
  return (
    <MainLayout>
      <Tabs>
        <TabList>
          <Tab index={0}>tab1</Tab>
          <Tab index={1}>tab2</Tab>
        </TabList>
        <TabpPanels>
          <TabPanel index={0}>panel1</TabPanel>
          <TabPanel index={1}>panel2</TabPanel>
        </TabpPanels>
      </Tabs>
    </MainLayout>
  )
}

export default App
