import React, { useEffect, useState } from 'react'
import { ChoiceList } from '../components/form/choice'
import masterData from '../assets/jsons/masterStep.json'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import appListing from '../assets/jsons/appListing.json'
import { SliderModal } from '../components/global/global'

const StepScreen = ({ stepIndex, allowSearch }) => {
  const { state } = useLocation()
  const [currentData, setCurrentData] = useState()

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

  return (
    <div>
      {currentData && (
        <ChoiceList
          {...currentData}
          allowSearch={currentStepIndex > 2}
          itemSize={currentStepIndex > 2 && 'compact'}
          handleSubmit={selectedData => handleSubmit(selectedData)}
          theme='light'
        />
      )}
    </div>
  )
}
export default StepScreen
