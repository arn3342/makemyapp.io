import React, { useEffect, useState } from 'react'
import { ChoiceList } from '../components/form/choice'
import masterData from '../assets/jsons/masterStep.json'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import appListing from '../assets/jsons/appListing.json'
import { Button } from '../components/global/global'
import { faAngleRight } from '@fortawesome/free-solid-svg-icons'

const StepScreen = ({ stepIndex, allowSearch }) => {
  const { state } = useLocation()
  // const [currentData, setCurrentData] = useState([])

  const navigate = useNavigate()
  const [currentStepIndex, setCurrentIndex] = useState(
    stepIndex || state.stepIndex
  )

  useEffect(() => {
    // setCurrentData(
    //   currentStepIndex <= -1 ? appListing : masterData[currentStepIndex]
    // )
  }, [])

  function handleSubmit () {
    // navigate('/wizard', {
    //   replace: true,
    //   state: { stepIndex: state.stepIndex + 1, allowSearch: true }
    // })
    // setCurrentData(
    //   currentStepIndex <= -1 ? appListing : masterData[currentStepIndex]
    // )
    // console.log('called')
    // console.log(masterData[currentStepIndex + 1])
    setCurrentIndex(currentStepIndex + 1)

  }

  return (
    <div>
      <ChoiceList
        {...(currentStepIndex <= -1
          ? appListing
          : masterData[currentStepIndex])}
        allowSearch={allowSearch || state.allowSearch}
      />
      <div className='container'>
        <div className='row'>
          <div className='col col-sm-1 d-flex'>
            <Button
              label='Save & Proceed'
              isExtraSmall
              theme='dark'
              animateScale={true}
              icon={faAngleRight}
              // canBeBusy
              onClick={() => handleSubmit()}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
export default StepScreen
