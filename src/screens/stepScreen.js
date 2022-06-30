import React, { useEffect, useState } from 'react'
import masterData from '../assets/jsons/masterStep.json'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import appListing from '../assets/jsons/appListing.json'
import {
  FeatureSelector,
  Slider,
  SliderModal,
  Spacer,
  SubTitle,
  Title
} from '../components/global'
import { filterData } from '../misc/logics'
import { Button, SimpleChoiceList } from '../components/form'
import { extractFeatures, extractSubFeatures } from '../misc/featureExtractor'

const StepScreen = ({ stepIndex, allowSearch }) => {
  const { state } = useLocation()
  const [currentData, setCurrentData] = useState()
  const [modalProps, setModalProps] = useState({
    isOpen: false,
    options: null
  })

  const navigate = useNavigate()
  const [currentStepIndex, setCurrentIndex] = useState(
    stepIndex || state.stepIndex
  )

  useEffect(() => {
    const currentStepData =
      currentStepIndex <= -1 ? appListing : masterData[currentStepIndex]
    setCurrentData(currentStepData)
  }, [])

  function handleSubmit (selectedData) {
    // Use selectedData to perform any other logic task
    let index = currentStepIndex + 1
    let currentStepData = index <= -1 ? appListing : masterData[index]
    setCurrentIndex(currentStepIndex + 1)
    setCurrentData(currentStepData)
  }

  function getFeatureById (id) {
    const options = masterData[currentStepIndex].options.find(
      item => item.id == id
    )
    return options
  }

  function performShowModal (id) {
    const data = extractSubFeatures(id)
    data && console.log('Data:', data)
    data &&
      setModalProps({
        isOpen: true,
        options: data
      })
  }
  function performClose () {
    setModalProps({
      isOpen: false
    })
  }
  return (
    <div>
      <Slider isOpen={modalProps.isOpen} onClose={() => performClose()}>
        <FeatureSelector
          options={modalProps.options}
          onSubmit={() => performClose()}
        />
      </Slider>
      {currentData && (
        <div className='theme_light' id='step_main_container'>
          <Title content={currentData.title} size='large-2' />
          <Spacer />
          <SubTitle content={currentData.description} size='large' />
          <Spacer />
          <SimpleChoiceList
            data={currentData.options}
            allowSearch={currentStepIndex > 2}
            itemProps={{
              itemSize: currentStepIndex < 3 ? 'regular' : 'small',
              disableDeselect: currentStepIndex >= 3
            }}
            disableDeselect
            // handleSubmit={selectedData => handleSubmit(selectedData)}
            theme='light'
            onChoiceChange={ids => performShowModal(ids[ids.length - 1])}
          />
          <div
            className='row d-flex'
            style={{
              justifyContent: 'flex-start'
            }}
          >
            <Spacer size='large' />
            <div className='col col-sm-2'>
              <Button
                label='Continue'
                theme='dark'
                animateScale={true}
                onClick={handleSubmit}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
export default StepScreen
