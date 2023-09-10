import { Layout, Switch, Typography, ConfigProvider, theme as antTheme } from 'antd';
import TaskPage from './pages/TaskPage';
import { useThemeContext } from './customHooks/useTheme';
const { Header, Content } = Layout;
const { Title } = Typography;


function App() {
  const {theme, setTheme} = useThemeContext()

  function toggleTheme(){
    if(theme === "light"){
      setTheme("dark")
      return
    }
      setTheme("light")
      return;
    
  }

  return <ConfigProvider theme={{
    // 1. Use dark algorithm
    algorithm: theme === "light"? antTheme.defaultAlgorithm :  antTheme.darkAlgorithm,

    // 2. Combine dark algorithm and compact algorithm
    // algorithm: [theme.darkAlgorithm, theme.compactAlgorithm],
  }}>
     <div className="App">
      <Layout style={{height: "100vh", display: 'flex'}}>
      <Header style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
        <Title style={{width: "auto", color: "white", margin: "0"}}>DevManager</Title>
        <Switch defaultChecked={theme === 'light' ? false : true} onChange={toggleTheme} />
      </Header>
        <Layout style={{padding: '20px', display: 'flex', gap: '10px', justifyContent: 'center', alignItems: 'center'}}>
          <Content style={{display: 'flex',
            flexDirection: 'column',
            gap: '10px',
            alignItems: 'center', minWidth: '300px'}}><TaskPage /></Content>
        </Layout>
        
    </Layout>
    </div>
  </ConfigProvider>
}

export default App;
