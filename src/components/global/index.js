import React, { useEffect, useState } from 'react'
import './global.css'
import Logo from '../../logo-trans.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faAngleDown,
  faAngleRight,
  faL,
  faLaptopHouse
} from '@fortawesome/free-solid-svg-icons'
import { Button, SimpleChoice, SimpleChoiceList } from '../form'
import { getRandomInteger } from '../../misc/logics'
import { extractFeature } from '../../misc/featureExtractor'

export const Header = ({ spacing }) => {
  useEffect(() => {})

  return (
    <div className={`menu_sticky spacing_${spacing} d-flex`}>
      <div className='container m-auto'>
        <Spacer size='small' />
        <div className='row cols-2 menu_container'>
          <div className='col' style={{ textAlign: 'left' }}>
            <img src={Logo} className='site_logo' />
          </div>
        </div>
      </div>
    </div>
  )
}

export const Title = ({
  content,
  style,
  theme,
  size,
  link,
  fontType,
  className,
  animate
}) => {
  return (
    <a href={link}>
      {size === 'small' ? (
        <h6
          className={`title theme_${theme} size_${fontType} ${className} ${animate &&
            'focus-in-expand'}`}
          style={style}
        >
          {content}
        </h6>
      ) : size === 'large' ? (
        <h4
          className={`title theme_${theme} size_${fontType} ${className} ${animate &&
            'focus-in-expand'}`}
          style={style}
        >
          {content}
        </h4>
      ) : size === 'large-2' ? (
        <h2
          className={`title theme_${theme} size_${fontType} ${className} ${animate &&
            'focus-in-expand'}`}
          style={style}
        >
          {content}
        </h2>
      ) : size === 'large-3' ? (
        <h1
          className={`title theme_${theme} size_${fontType} ${className}  ${animate &&
            'focus-in-expand'} large_3`}
          style={style}
        >
          {content}
        </h1>
      ) : (
        <h5
          className={`title theme_${theme} size_${fontType} ${className}  ${animate &&
            'focus-in-expand'}`}
          style={style}
        >
          {content}
        </h5>
      )}
    </a>
  )
}

export const SubTitle = ({
  content,
  style,
  theme,
  size,
  link,
  fontType,
  className,
  animate
}) => {
  return size === 'large' ? (
    <h5
      className={`title size_${fontType} theme_${theme} ${className} ${animate &&
        'focus-in-expand'}`}
      style={style}
    >
      {content}
    </h5>
  ) : size === 'medium' || size === 'regular' ? (
    <h6
      className={`title size_${fontType} theme_${theme} ${className} ${animate &&
        'focus-in-expand'}`}
      style={style}
    >
      {content}
    </h6>
  ) : (
    <p
      className={`title size_${fontType} theme_${theme} ${className} ${animate &&
        'focus-in-expand'}`}
      style={style}
    >
      {content}
    </p>
  )
}

export function Card ({
  children,
  theme,
  size,
  id,
  className,
  onClick,
  style
}) {
  return (
    <div
      className={`card card_${theme} shadow_light card_${size} ${className}`}
      onClick={onClick && onClick}
      style={style}
    >
      {children}
    </div>
  )
}

export const Spacer = ({ size }) => {
  return <div className={`spacer_${size ? size : 'small'}`} />
}

export const SliderModal = ({
  isOpen,
  title = '',
  description = '',
  options = [],
  onClose
}) => {
  // const [show, setShow] = useState(isOpen)
  useEffect(() => {
    const choiceContainer = document.getElementById('choise-list-container')
    if (isOpen) {
      choiceContainer?.classList.add('dim_opacity')
    } else {
      choiceContainer?.classList.remove('dim_opacity')
    }
  })
  function handleSubmit (shouldWait) {
    if (shouldWait) {
      setTimeout(() => {
        onClose()
      }, 1500)
    } else {
      onClose()
    }
  }
  return (
    <div className={`modal_slider ${!isOpen && 'modal_hidden'}`}>
      <div className='row cols-3' style={{ height: '100%' }}>
        <div className='col' />
        <div className='col' />
        <div className='col col-sm-5 modal_slider_container shadow_dark '>
          <Spacer />
          <Title
            size='large'
            content={`${title} ${
              !title.toLowerCase().includes('features') ? 'Features' : ''
            }`}
          />
          <SubTitle
            content={`Enrich your app with industry-standard ${title} ${
              !title.toLowerCase().includes('features') ? 'features' : ''
            }. 
            More than ${options.length -
              1} customizable features are available.`}
            size='regular'
            fontType='light'
          />
          <Spacer />
          <div className='choice_extra-small_container d-flex'>
            {options?.map(item => {
              return (
                <SimpleChoice
                  title={item.title}
                  key={item.id || getRandomInteger(988, 12388)}
                />
              )
            })}
          </div>
          <Spacer />
          <Button
            label='Add Features'
            theme='dark'
            animateScale={true}
            canBeBusy
            onClick={() => handleSubmit(true)}
            key={getRandomInteger(99, 88738)}
          />
          <Spacer />
          <Button
            label='Close'
            onClick={() => handleSubmit(false)}
            key={getRandomInteger(99, 88738)}
          />
        </div>
      </div>
    </div>
  )
}

export function Slider ({ children, onClose, isOpen }) {
  useEffect(() => {
    const parentContainer = document.body
    const stepContainer = document.getElementById('step_main_container')
    if (isOpen) {
      stepContainer.style.opacity = 0.4
      parentContainer.style.overflow = 'hidden'
    } else {
      if(stepContainer) stepContainer.style.opacity = 1
      parentContainer.style.overflow = 'scroll'
    }
  }, [isOpen])
  return (
    <div className={`modal_slider ${!isOpen && 'modal_hidden'}`}>
      <div className='row cols-3 bg_dim modal_main' style={{ height: '100%' }}>
        <div className='col' />
        <div className='col' />
        <div className='col col-sm-5 slider_container'>
          <div
            className={`modal_container shadow_light ${isOpen &&
              'modal_container_visible'}`}
          >
            {children}
          </div>
        </div>
      </div>
    </div>
  )
}

export const FeatureSelector = ({ onSubmit, options, btnSubmitLabel }) => {
  const [selectedChoices, setSelectedChoices] = useState([])
  function handleSubmit () {
    const features = selectedChoices.map(id => {
      return extractFeature(id)
    })
    onSubmit && onSubmit(features)
  }
  return (
    options && (
      <>
        <SimpleChoiceList
          data={options}
          onChoiceChange={choiceIds => setSelectedChoices(choiceIds)}
          itemProps={{
            className: 'font_xs'
          }}
          // comparingData={comparingOptions}
        />
        <Spacer />
        <Button
          label={btnSubmitLabel || 'Add Features'}
          theme='dark'
          onClick={() => handleSubmit()}
        />
        <Spacer />
        <Button label='Close' onClick={onSubmit && onSubmit} />
      </>
    )
  )
}
