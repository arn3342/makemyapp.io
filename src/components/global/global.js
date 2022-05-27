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
import appTypes from '../../assets/jsons/appTypes.json'

export const Header = ({ spacing }) => {
  useEffect(() => {})

  return (
    <div className={`menu_sticky spacing_${spacing} d-flex`}>
      <div className='container m-auto'>
        <Spacer size='small' />
        <div className='row cols-2 shadow_light menu_container'>
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
  className
}) => {
  return (
    <a href={link}>
      {size === 'small' ? (
        <h6 className={`title ${theme} ${fontType} ${className}`} style={style}>
          {content}
        </h6>
      ) : size === 'large' ? (
        <h4 className={`title ${theme} ${fontType} ${className}`} style={style}>
          {content}
        </h4>
      ) : size === 'large-2' ? (
        <h2 className={`title ${theme} ${fontType} ${className}`} style={style}>
          {content}
        </h2>
      ) : (
        <h5 className={`title ${theme} ${fontType} ${className}`} style={style}>
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
}) => {
  return size === 'large' ? (
    <h5 className={`title ${fontType} ${className}`} style={style}>
      {content}
    </h5>
  ) : (
    <p className={`title ${fontType} ${className}`} style={style}>
      {content}
    </p>
  )
}

export function Card ({ children, theme, size, id }) {
  return (
    <div className={`card card_${theme} shadow_light card_${size}`}>
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
      className={`button_light ${isLoading ||
        (theme === 'dark' && 'button_dark')} m-auto ${hasShadow &&
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
          <FontAwesomeIcon
            className={animateIcon && 'icon_hidden'}
            icon={icon}
            fontSize={16}
            fill='#000'
            style={{
              marginLeft: '10px'
            }}
          />
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

export const DropDown = ({ icon, placeholder, className, onValueChange }) => {
  const [isFocused, setFocused] = useState(false)
  const [selectedValue, setSelectedValue] = useState(placeholder)
  function handleBlur (event) {
    if (!event.currentTarget.contains(event.relatedTarget)) {
      setFocused(false)
    }
  }
  function handleValueChange (value) {
    setSelectedValue(value)
    setFocused(false)
  }
  return (
    <div
      className={`dropdown ${isFocused && 'dropdown_focused'}`}
      tabIndex={1}
      onFocus={() => setFocused(true)}
      onBlur={event => handleBlur(event)}
    >
      <div className={`input d-flex dropdown`}>
        {icon && (
          <div className='col col-sm-1'>
            <FontAwesomeIcon icon={icon} fontSize={15} className='m-auto' />
          </div>
        )}
        <div className='col left-align'>
          <strong>{selectedValue}</strong>
        </div>
        <div className='col col-sm-1'>
          <FontAwesomeIcon
            icon={faAngleDown}
            fontSize={15}
            className='m-auto'
          />
        </div>
      </div>
      <div className='container'>
        <div
          className={`row dropdown_container ${isFocused &&
            'container_visible'}`}
        >
          {appTypes.map((value, index) => {
            return (
              <button
                value={value}
                className='input item'
                onClick={() => handleValueChange(value)}
                key={index}
              >
                {value}
              </button>
            )
          })}
        </div>
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
  return (
    <div>
      <div className='form-check form-switch d-flex'>
        <input
          className='form-check-input'
          type='checkbox'
          role='switch'
          id='flexSwitchCheckDefault'
          onChange={event => handleCheck(event.target.checked)}
        />
        <Spacer size='small' />

        <label
          className='form-check-label'
          htmlFor='flexSwitchCheckDefault'
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
