import React, { useState } from 'react'
import { Title, SubTitle, Spacer } from '../components/global/'
import { DropDown, Input, Button } from '../components/form'
import { faAngleRight } from '@fortawesome/free-solid-svg-icons'
import { SimpleChoiceList } from '../components/form'
import { Player, Controls } from '@lottiefiles/react-lottie-player'
import SplashAnim from '../assets/gifs/step_1.json'
import { useNavigate } from 'react-router-dom'
import appTypes from '../assets/jsons/appTypes.json'
import buildingAnim from '../assets/gifs/building.json'
import phoneAnim from '../assets/gifs/phone.json'

const InitStepScreen = ({}) => {
  const [hasSimilarApps, setHasSimilarApps] = useState(false)
  const navigate = useNavigate()

  function handleSubmit () {
    setTimeout(() => {
      navigate('wizard', {
        replace: true,
        state: { stepIndex: hasSimilarApps ? -1 : 0, allowSearch: true }
      })
    }, 1500)
  }

  return (
    <div
      className='container'
      style={{
        overflow: 'hidden !important'
      }}
    >
      <div className='row cols-3'>
        <div className='col'>
          {/* <SubTitle
            size='large'
            theme='light'
            fontType='light'
            content="Rome wasn't built in a day,"
          /> */}
          <Title
            size='large'
            theme='light'
            fontType='light'
            content="Rome wasn't built in a day,"
            style={{
              paddingLeft: '2px'
            }}
          />
          <Spacer size='medium' />

          <Title
            size='large-3'
            theme='light'
            fontType='bold'
            content='But Your App Can!'
          />
          <Spacer size='large' />
          {/* <Title animate content='Introducing MakeMyApp.io' size='large' theme='light'/> */}
          <Player
            src={buildingAnim}
            autoplay
            loop
            onEvent={ev => ev === 'loop' && console.log(ev)}
            style={{
              position: 'absolute',
              zIndex: -2,
              width: '40%',
              top: '15%'
              // left: '-4%'
              // opacity: 0.2
            }}
          />
        </div>
        <div className='col  col-sm-1' />
        <div className='col col-sm-5'>
          <div className='row modal_container shadow'>
            <Title
              size='large-2'
              fontType='light'
              content='The First Step...'
            />
            <SubTitle
              content="Let's get started with some basic information."
              size='regular'
              fontType='light'
            />
            <Spacer size='small' />

            <div className='row d-flex'>
              <Input placeholder='Name of your project' />
              <Spacer size='small' />
              <DropDown placeholder='Choose product type' options={appTypes} />
              <Spacer size='small' />
              <Input placeholder='A few lines about your idea' isMultiLine />
              <Spacer size='small' />
              <DropDown
                placeholder='My idea is unique and new'
                options={[
                  'My idea is unique and new',
                  'Idea is similar to a popular app'
                ]}
              />
            </div>
            <Spacer size='medium' />
            <div className='row d-flex'>
              <Button
                label='Save & Proceed'
                theme='dark'
                animateScale={true}
                icon={faAngleRight}
                canBeBusy
                onClick={() => handleSubmit()}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default InitStepScreen
