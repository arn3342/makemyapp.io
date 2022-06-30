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
import { SimpleChoice, SimpleChoiceList } from '../form'
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

export function Card ({ children, theme, size, id, className, onClick, style }) {
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

export const Button = ({
  label,
  onClick,
  icon,
  hasShadow,
  canBeBusy,
  size,
  isExtraSmall,
  theme,
  animateIcon,
  animateScale
}) => {
  const [isLoading, setLoading] = useState(false)
  function performClick () {
    canBeBusy && setLoading(!isLoading)
    onClick()
  }
  return (
    <div
      className={`button_light ${(isLoading || theme === 'dark') &&
        'button_dark'} m-auto ${hasShadow &&
        'shadow'} button_size_${size} d-flex button_light_${isExtraSmall &&
        'extended'} ${animateIcon && 'icon_animated'} ${animateScale &&
        'scale_animated'}`}
      onClick={() => performClick()}
      style={{
        pointerEvents: isLoading ? 'none' : 'all'
      }}
    >
      {!isLoading ? (
        <div className='d-flex'>
          <span>{label}</span>
          {icon && (
            <FontAwesomeIcon
              className={animateIcon && 'icon_hidden'}
              icon={icon}
              fontSize={16}
              fill='#000'
              style={{
                marginLeft: '10px'
              }}
            />
          )}
        </div>
      ) : (
        <div
          className='spinner-border text-light spinner_small'
          role='status'
        />
      )}
    </div>
  )
}

export const Input = ({
  icon,
  placeholder,
  className,
  onValueChange,
  isMultiLine
}) => {
  const [isFocused, setFocused] = useState(false)
  return (
    <div
      className={`input ${className} d-flex ${isFocused && 'input_focused'}`}
    >
      {icon && (
        <div className='col col-sm-1'>
          <FontAwesomeIcon icon={icon} fontSize={15} className='m-auto' />
        </div>
      )}
      <div className='col'>
        {isMultiLine ? (
          <textarea
            type='text'
            className='input_regular multi-line'
            placeholder={placeholder}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
            onChange={e => onValueChange(e.target.value)}
          />
        ) : (
          <input
            type='text'
            className='input_regular'
            placeholder={placeholder}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
            onChange={e => onValueChange(e.target.value)}
          />
        )}
      </div>
    </div>
  )
}

export const SwitchButton = ({ onCheckChanged, label, onCheckRender }) => {
  const [checked, setChecked] = useState(false)
  function handleCheck (value) {
    setChecked(!checked)
    onCheckChanged(value)
  }
  const randomId = getRandomInteger(50, 9889)
  return (
    <div
      style={{
        padding: '0'
      }}
    >
      <div className='form-check form-switch d-flex'>
        <input
          className='form-check-input'
          type='checkbox'
          role='switch'
          id={randomId}
          onChange={event => handleCheck(event.target.checked)}
        />
        <Spacer size='small' />

        <label
          className='form-check-label'
          htmlFor={randomId}
          style={{ userSelect: 'none' }}
        >
          {label}
        </label>
        <Spacer size='small' />
      </div>
      {checked && <div className='row'>{onCheckRender}</div>}
    </div>
  )
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
    <>
      {options.map(opt => {
        return opt.options ? (
          <div key={opt.id}>
            <SubTitle
              className='margin_xs'
              fontType='bold'
              content={opt.title}
            />
            <SimpleChoiceList
              data={opt.options}
              onChoiceChange={choiceIds => setSelectedChoices(choiceIds)}
              itemProps={{
                className: 'font_xs'
              }}
              // comparingData={comparingOptions}
            />
          </div>
        ) : (
          <SimpleChoice title={opt.title} key={opt.id} />
        )
      })}
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
}
