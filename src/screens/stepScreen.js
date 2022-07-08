import React, { useEffect, useState } from 'react'
import masterData from '../assets/jsons/masterStep.json'
import { useLocation } from 'react-router-dom'
import appListing from '../assets/jsons/appListing.json'
import {
  FeatureSelector,
  Slider,
  Spacer,
  SubTitle,
  Title
} from '../components/global'
import { Button, SimpleChoiceList } from '../components/form'
import { extractSubFeatures } from '../misc/featureExtractor'
import './index.css'
import { faAngleRight } from '@fortawesome/free-solid-svg-icons'
import { StorageHelper } from '../data/storage'
import { Formik } from 'formik'
import { initializeApp } from 'firebase/app'
import { getDatabase, ref, set, push } from 'firebase/database'

let finalData = {}

const StepScreen = ({ stepIndex }) => {
  const { state } = useLocation()
  const [currentData, setCurrentData] = useState()
  const [submitting, setSubmitting] = useState(false)
  const [modalProps, setModalProps] = useState({
    isOpen: false,
    parent: null,
    options: null
  })

  const [currentStepIndex, setCurrentIndex] = useState(
    stepIndex || state.stepIndex
  )

  useEffect(() => {
    const currentStepData =
      currentStepIndex <= -1 ? appListing : masterData[currentStepIndex]
    setCurrentData(currentStepData)
  }, [])

  function performSubmit (values) {
    constructStepData(values)
    if (currentStepIndex < 2) {
      let index = currentStepIndex + 1
      let currentStepData = index <= -1 ? appListing : masterData[index]
      setCurrentIndex(currentStepIndex + 1)
      setCurrentData(currentStepData)
    } else {
      setSubmitting(true)
      setTimeout(() => {
        finalise(finalData)
      }, 1000)
    }
  }

  function finalise (data) {
    StorageHelper.SaveItem(data, 'appData', true)

    const firebaseConfig = {
      apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
      authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
      databaseURL: process.env.REACT_APP_FIREBASE_DB_URL,
      projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
      storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
      appId: process.env.REACT_APP_FIREBASE_APP_ID
    }

    // Initialize Firebase
    const firebaseApp = initializeApp(firebaseConfig)

    const database = getDatabase(firebaseApp)
    const projectRef = ref(database, 'projectMeta/')
    const siteUrl = () => {
      if(!process.env.NODE_ENV || process.env.NODE_ENV === 'development'){
        return process.env.REACT_APP_ENGINE_URL_DEV
      } else {
        return process.env.REACT_APP_ENGINE_URL
      }
    }
    push(projectRef, StorageHelper.GetItem('appData')).then(
      result =>
        (window.location = `${siteUrl()}welcomeProject/${result.key}`)
    )
  }

  function constructStepData (ids) {
    // performShowModal(ids[ids.length - 1])
    const buildPhases = {
      features: [],
      roadmaps: []
    }
    let data = {
      buildPhases: {
        mvp: { ...buildPhases },
        v1: { ...buildPhases }
      }
    }
    switch (currentStepIndex) {
      case 0:
        data.platformTypes = ids
        break
      case 1:
        data.interfaceTypes = ids
        break
      case 2:
        data.buildPhases.mvp.features = ids
        break
    }
    finalData = { ...finalData, ...data }
  }

  function performShowModal (id) {
    const data = extractSubFeatures(id)
    data.subFeatures &&
      setModalProps({
        isOpen: true,
        parent: data.parent,
        options: data.subFeatures
      })
  }
  function performClose () {
    setModalProps(prevState => ({
      ...prevState,
      isOpen: false
    }))
  }
  return (
    <div>
      <Formik
        initialValues={{
          featureIds: []
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
        onSubmit={(values, { resetForm }) => {
          performSubmit(values.featureIds)
          resetForm()
        }}
      >
        {({
          handleChange,
          handleSubmit,
          isSubmitting,
          setFieldValue,
          values
        }) => (
          <>
            <Slider isOpen={modalProps.isOpen} onClose={() => performClose()}>
              {modalProps.parent !== null && (
                <>
                  <Title
                    fontType='bold'
                    content={`${modalProps.parent.title} Features.`}
                  />
                  <SubTitle
                    size='medium'
                    content={`Enrich your application with industry standard ${modalProps.parent.title} features`}
                  />
                  <Spacer />
                  <FeatureSelector
                    options={modalProps.options}
                    onSubmit={ids => {
                      // console.log('IDS are:', ids)
                      setFieldValue('featureIds', [
                        ...values.featureIds,
                        ...ids
                      ])
                      performClose()
                    }}
                  />
                </>
              )}
            </Slider>
            {currentData && (
              <div className='theme_light' id='step_main_container'>
                <Title content={currentData.title} size='large-2' />
                <Spacer />
                <SubTitle content={currentData.description} size='large' />
                <Spacer />

                <SimpleChoiceList
                  name='featureIds'
                  data={currentData.options}
                  allowSearch={currentStepIndex > 1}
                  itemProps={{
                    itemSize: currentStepIndex < 2 ? 'regular' : 'small',
                    disableDeselect: currentStepIndex >= 2
                  }}
                  theme='light'
                  onChoiceChange={ids => {
                    if (currentStepIndex >= 2)
                      performShowModal(ids[ids.length - 1])
                    else setFieldValue('featureIds', ids)
                  }}
                />
                <div
                  className={`row d-flex ${currentStepIndex >= 2 &&
                    'button_final'}`}
                  style={{
                    justifyContent: 'flex-start'
                  }}
                >
                  <Spacer size='large' />
                  <div className='col col-sm-2'>
                    <Button
                      label={`Continue ${
                        currentStepIndex >= 2 ? 'To Builder' : ''
                      }`}
                      theme='dark'
                      animateScale={true}
                      onClick={() => {
                        handleSubmit()
                      }}
                      icon={faAngleRight}
                      animateIcon
                      isBusy={submitting}
                    />
                  </div>
                </div>
                <Spacer />
              </div>
            )}
          </>
        )}
      </Formik>
    </div>
  )
}
export default StepScreen
