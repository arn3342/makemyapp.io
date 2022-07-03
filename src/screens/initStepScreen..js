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
import { StorageHelper } from '../data/storage'
import { Formik } from 'formik'

const InitStepScreen = ({}) => {
  const [hasSimilarApps, setHasSimilarApps] = useState(false)
  const navigate = useNavigate()

  function performStepSave (values) {
    StorageHelper.SaveItem(values, 'appData')
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
          <Player
            src={buildingAnim}
            autoplay
            loop
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
          <div
            className='row modal_container shadow'
            style={{
              transform: 'translate(0, 0)'
            }}
          >
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
            <Formik
              initialValues={{
                appName: '',
                businessType: '',
                appDesc: '',
                isUnique: false
              }}
              // validate={values => {
              //   const errors = {}
              //   if (!values.email) {
              //     errors.email = 'Required'
              //   } else if (
              //     !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
              //   ) {
              //     errors.email = 'Invalid email address'
              //   }
              //   return errors
              // }}
              onSubmit={(values, { setSubmitting }) => {
                setSubmitting(true)
                performStepSave(values)
              }}
            >
              {({
                values,
                handleChange,
                handleBlur,
                handleSubmit,
                isSubmitting
              }) => (
                <form onSubmit={handleSubmit}>
                  <div className='row d-flex'>
                    <Input
                      placeholder='Name of your project'
                      onValueChange={handleChange('appName')}
                    />
                    <Spacer size='small' />
                    <DropDown
                      placeholder='Choose product type'
                      options={appTypes}
                      onValueChange={handleChange('businessType')}
                    />
                    <Spacer size='small' />
                    <Input
                      placeholder='A few lines about your idea'
                      isMultiLine
                      onValueChange={handleChange('appDesc')}
                    />
                    <Spacer size='small' />
                    <DropDown
                      placeholder='My idea is unique and new'
                      options={[
                        'My idea is unique and new',
                        'Idea is similar to a popular app'
                      ]}
                      onValueChange={handleChange('isUnique')}
                    />
                  </div>
                  <Spacer size='medium' />
                  <div className='row d-flex'>
                    <Button
                      label='Get Started'
                      theme='dark'
                      animateScale={true}
                      icon={faAngleRight}
                      isBusy={isSubmitting}
                      onClick={handleSubmit}
                    />
                  </div>
                </form>
              )}
            </Formik>
          </div>
        </div>
      </div>
    </div>
  )
}

export default InitStepScreen
