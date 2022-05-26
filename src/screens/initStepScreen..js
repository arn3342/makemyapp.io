import React, { useState } from 'react'
import {
  Title,
  SubTitle,
  Input,
  Spacer,
  DropDown,
  SwitchButton,
  Button
} from '../components/global/global'
import { faAngleRight } from '@fortawesome/free-solid-svg-icons'
import { ChoiceList } from '../components/form/choice'
import { Player, Controls } from '@lottiefiles/react-lottie-player'
import SplashAnim from '../assets/gifs/step_1.json'
import { useNavigate } from 'react-router-dom'
const InitStepScreen = ({}) => {
  const [hasSimilarApps, setHasSimilarApps] = useState(false)
  const navigate = useNavigate()

  function handleSubmit () {
    navigate('wizard', {
      replace: true,
      state: { stepIndex: hasSimilarApps ? - 1 : 0, allowSearch: true }
    })
  }

  return (
    <div className='container'>
      {/* <div className='row cols-2' style={{
          position: 'absolute'
      }}>
        <div className='col' />
        <div className='col'>
          <Player src={SplashAnim} autoplay loop style={{
              transform: 'scale(1.2)',
              opacity: 0.3
          }}/>
        </div>
      </div> */}
      <div className='row cols-2'>
        <div className='row'>
          <Title size='large-2' fontType='light' content='The First Step...' />
          <SubTitle
            content="Let's get started with some basic information, starting with the name: "
            size='large'
            fontType='light'
          />
          <Spacer size='medium' />
          <div className='row cols-2'>
            <div className='col col-sm-4'>
              <Input placeholder='Name of your project' />
              <Spacer size='small' />
              <DropDown placeholder='Choose product type' />
              <Spacer size='small' />
              <Input placeholder='A few lines about your idea' isMultiLine />
              <Spacer size='medium' />
              <SwitchButton
                label='My similar idea exists'
                onCheckChanged={val => setHasSimilarApps(val)}
                onCheckRender={
                  <SubTitle content='In the next page, you can select which popular app shares the same idea as yours. We will auto-fill other feature-selections for you!' />
                }
              />
            </div>
          </div>
          <Spacer size='medium' />
        </div>
      </div>
      <div className='row'>
        <div className='col col-sm-1 d-flex'>
          <Button
            label='Save & Proceed'
            isExtraSmall
            theme='dark'
            animateScale={true}
            icon={faAngleRight}
            canBeBusy
            onClick={() => handleSubmit()}
          />
        </div>
      </div>
    </div>
  )
}

export default InitStepScreen
