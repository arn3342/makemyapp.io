import './App.css'
import { Header, Spacer } from './components/global/global'
import 'bootstrap/dist/css/bootstrap.css'
import { Route, Routes, useLocation } from 'react-router-dom'
import StepScreen from './screens/stepScreen'
import InitStepScreen from './screens/initStepScreen.'

function App () {
  const location = useLocation()
  return (
    <div className='App'>
      <Header spacing='small' />
      <div className='container'>
        <div className='row'>
          <Spacer size='large' />
          <Routes location={location}>
            <Route path='/' element={<InitStepScreen />} />
            <Route path='/wizard' element={<StepScreen />} />
          </Routes>
          {/* <ChoiceList
            data={dummy_options}
            title='What should your application offer?'
            description='Great that youre planning to build an app. It all starts with making the right choices.'
          /> */}
        </div>
      </div>
    </div>
  )
}

export default App