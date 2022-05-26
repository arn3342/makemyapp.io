import React from 'react'
import { ChoiceList } from '../components/form/choice'
import masterData from '../assets/jsons/masterStep.json'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import appListing from '../assets/jsons/appListing.json'
import { Button } from '../components/global/global'
import { faAngleRight } from '@fortawesome/free-solid-svg-icons'

const StepScreen = ({ stepIndex, allowSearch }) => {
  const { state } = useLocation()
  const navigate = useNavigate()

  function handleSubmit () {
    navigate('wizard', {
      state: { stepIndex: state.stepIndex + 1, allowSearch: true }
    })
  }

  const currentData =
    state.stepIndex && state.stepIndex == -1
      ? appListing
      : masterData[stepIndex || state.stepIndex]

  return (
    <div>
      <ChoiceList
        {...currentData}
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
              canBeBusy
              onClick={() => handleSubmit()}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
export default StepScreen
