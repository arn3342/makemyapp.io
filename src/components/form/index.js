import { faAngleDown, faClose } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useEffect, useState } from 'react'
import { getRandomInteger } from '../../misc/logics'
import { Card, Spacer, SubTitle, Title } from '../global'
import IconParser from '../../misc/iconParser'
import './index.css'
import { uuid } from 'uuidv4'

export const Button = ({
  label,
  onClick,
  icon,
  hasShadow,
  size,
  isExtraSmall,
  theme,
  animateIcon,
  animateScale,
  isRounded,
  isBusy,
  className,
  disabled,
  style
}) => {
  return (
    <div
      className={`button_light ${(isBusy || theme === 'dark') &&
        'button_dark'} m-auto ${hasShadow &&
        'shadow'} button_size_${size} d-flex button_light_${isExtraSmall &&
        'extended'} ${animateIcon && 'icon_animated'} ${animateScale &&
        'scale_animated'} ${isRounded && 'button_rounded'} ${className}
        ${disabled && 'disabled'}`}
      style={{
        pointerEvents: isBusy || disabled ? 'none' : 'all'
      }}
      onClick={() => onClick && onClick()}
    >
      {!isBusy ? (
        <div className='d-flex'>
          <span className={animateIcon && 'button_text text_icon_animated'}>
            {label}
          </span>
          {icon && (
            <FontAwesomeIcon
              className={animateIcon && 'icon_hidden'}
              icon={icon}
              fontSize={isExtraSmall ? 14 : 16}
              fill='#000'
              style={{
                marginLeft: '10px',
                alignSelf: 'center'
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
  name,
  fontAwesomeIcon,
  placeholder,
  className,
  onValueChange,
  isMultiLine,
  value,
  isPassword,
  isError
}) => {
  const [isFocused, setFocused] = useState(false)
  return (
    <div
      className={`input ${className} d-flex ${isFocused &&
        'input_focused'} ${isError && 'input_error'}`}
    >
      {fontAwesomeIcon && (
        <div className='col col-sm-1'>
          <FontAwesomeIcon
            icon={fontAwesomeIcon}
            fontSize={15}
            className='m-auto'
          />
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
            type={isPassword ? 'password' : 'text'}
            className='input_regular'
            placeholder={placeholder}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
            value={value}
            onChange={e => onValueChange && onValueChange(e.target.value)}
          />
        )}
      </div>
    </div>
  )
}

export const DropDown = ({
  name,
  icon,
  placeholder,
  className,
  onValueChange,
  options,
  enableClear,
  defaultValue,
  isExtraSmall,
  theme
}) => {
  const [isFocused, setFocused] = useState(false)
  const [currentValue, setCurrentValue] = useState(
    defaultValue || options[0] || placeholder
  )
  function handleBlur (event) {
    if (!event.currentTarget.contains(event.relatedTarget)) {
      setFocused(false)
    }
  }
  function handleValueChange (value) {
    setCurrentValue(value)
    setFocused(false)
    onValueChange &&
      onValueChange(value.title || value.label || value.description || value)
  }
  return (
    <div
      className={`dropdown ${isFocused && 'dropdown_focused'} ${className}`}
      tabIndex={1}
      onClick={() => setFocused(!isFocused)}
      onBlur={event => handleBlur(event)}
      style={{
        padding: '0px'
      }}
    >
      <div
        className={`input d-flex dropdown ${isExtraSmall &&
          'dropdown_compact'} dropdown_theme_${theme}`}
      >
        {icon && (
          <div className='col col-sm-1'>
            <FontAwesomeIcon icon={icon} fontSize={15} className='m-auto' />
          </div>
        )}
        <div className='col left-align'>
          <SubTitle
            className={'no_margin'}
            fontType='bold'
            content={
              currentValue.title ||
              currentValue.label ||
              currentValue.description ||
              currentValue
            }
          ></SubTitle>
        </div>
        {enableClear && (
          <div className='col col-sm-1' onClick={() => handleValueChange('')}>
            <FontAwesomeIcon icon={faClose} fontSize={15} className='m-auto' />
          </div>
        )}
        <div className='col col-sm-1'>
          <FontAwesomeIcon
            icon={faAngleDown}
            fontSize={15}
            className='m-auto'
          />
        </div>
      </div>
      <div className='container'>
        {options?.length > 0 && (
          <div
            className={`row dropdown_container ${isFocused &&
              'container_visible'}`}
          >
            {options?.map((value, index) => {
              return (
                <button
                  value={
                    value.title || value.label || value.description || value
                  }
                  className={`input item ${isExtraSmall && 'item_small'}`}
                  onClick={() => handleValueChange(value)}
                  // key={index}
                  type='button'
                  id={getRandomInteger(9991, 878890)}
                  key={value.id || index}
                >
                  <SubTitle
                    className={`no_margin`}
                    content={
                      value.title || value.label || value.description || value
                    }
                  />
                </button>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}

export const SuggestionInput = ({
  icon,
  placeholder,
  className,
  onValueChange,
  options,
  enableClear
}) => {
  const [isFocused, setFocused] = useState(false)
  const [selectedValue, setSelectedValue] = useState(placeholder || options[0])
  function handleBlur (event) {
    if (!event.currentTarget.contains(event.relatedTarget)) {
      setFocused(false)
    }
  }
  function handleValueChange (value) {
    setSelectedValue(value.title || value.label || value.description || value)
    setFocused(false)
    onValueChange(value.title || value.label || value.description || value)
  }
  return (
    <div
      className={`dropdown ${isFocused && 'dropdown_focused'} ${className}`}
      tabIndex={1}
      onFocus={() => setFocused(true)}
      onBlur={event => handleBlur(event)}
      style={{
        padding: '0px'
      }}
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
        {enableClear && (
          <div className='col col-sm-1' onClick={() => handleValueChange('')}>
            <FontAwesomeIcon icon={faClose} fontSize={15} className='m-auto' />
          </div>
        )}
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
          {options?.map((value, index) => {
            return (
              <button
                value={value.title || value.label || value.description || value}
                className='input item'
                onClick={() => handleValueChange(value)}
                // key={index}
                type='button'
                id={getRandomInteger(9991, 878890)}
              >
                {value.title || value.label || value.description || value}
              </button>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export const SimpleChoice = ({
  id,
  onSelect,
  className,
  disableSelect,
  disableDeselect,
  selected,
  data,
  itemSize = 'xs'
}) => {
  const [isSelected, setSelected] = useState(selected)
  function performSelection () {
    if (!disableSelect) {
      if (isSelected) {
        if (disableDeselect) {
          onSelect(isSelected)
          return
        }
      }
      setSelected(!isSelected)
      onSelect(!isSelected)
    }
  }
  const ItemXS = () => {
    return (
      <div
        className={`choice_extra-small ${isSelected && 'choice_selected'}`}
        onClick={() => performSelection()}
      >
        <SubTitle
          className={'font_xs'}
          fontType='bold'
          content={data.title || data.value || data.description || data}
          style={{
            marginBottom: 0
          }}
        />
      </div>
    )
  }

  const ItemSmall = () => {
    return (
      <Card
        theme={`${isSelected && 'dark'}`}
        onClick={() => performSelection()}
        className='col col-sm-3'
        style={{
          margin: '10px 15px 10px 0px',
          maxHeight: 'max-content',
          padding: 0,
          maxWidth: '300px'
        }}
      >
        <div
          className={`theme_light`}
          style={{
            textAlign: 'left'
          }}
        >
          <div
            className='col d-flex feature_title padding_m'
            style={{
              alignItems: 'center'
            }}
          >
            <IconParser itemId={data.id} />
            <Spacer />
            <Title
              size='small'
              className='no_margin'
              fontType='bold'
              content={data.title}
            />
          </div>
          <div className='padding_m'>
            <SubTitle content={data.description} fontType='bold' />
            <div className='card_option_bg shadow_dark'>
              {data.options && (
                <SubTitle
                  fontType='bold'
                  className='no_margin font_xs'
                  content={`${data.options?.length - 1}+ Features Available`}
                />
              )}
            </div>
          </div>
        </div>
      </Card>
    )
  }

  const Item = () => {
    return (
      <Card
        theme={`${isSelected && 'dark'}`}
        onClick={() => performSelection()}
        className='col col-sm-3 margin_right'
      >
        <div
          className={`choice theme_light`}
          style={{
            textAlign: 'left'
          }}
        >
          <div
            className='icon_regular d-flex'
            style={{
              maxWidth: 'max-content'
            }}
          >
            <IconParser itemId={data.id} />
          </div>
          <Spacer size={'medium'} />
          <Title
            size='regular'
            className='margin_xs'
            content={data.title}
            fontType='bold'
          />
          <SubTitle
            className={'font_xs'}
            content={data.description}
            size='regular'
          />
        </div>
      </Card>
    )
  }
  return itemSize === 'xs' ? (
    <ItemXS />
  ) : itemSize === 'small' ? (
    <ItemSmall />
  ) : (
    <Item />
  )
}

export const SimpleChoiceList = ({
  data,
  title,
  onChoiceChange,
  disableSelect,
  itemProps,
  comparingData
}) => {
  const [choiceIDs, setChoiceIDs] = useState([])

  useEffect(() => {
    setChoiceIDs([])
  }, [data])

  function performOnChoiceChange (selected, choiceId) {
    let ids = [...choiceIDs]
    if (selected) {
      ids.push(choiceId)
    } else {
      ids = ids.filter(id => id != choiceId)
    }
    setChoiceIDs(ids)
    onChoiceChange && onChoiceChange(ids)
  }

  function isDataSame (parentData) {
    if (comparingData) {
      return comparingData?.some(
        x => x.id == parentData.id || x.id === parentData.id
      )
    }
    return false
  }

  return (
    <div
      className={itemProps.itemSize === 'small' ? 'row cols-4' : 'd-flex'}
      style={{
        flexWrap: itemProps.itemSize !== 'small' && 'wrap'
      }}
    >
      {title && (
        <>
          <SubTitle
            content={title}
            className='no_margin'
            fontType='bold'
            style={{
              maxWidth: 'max-content'
            }}
          />
          <Spacer />
        </>
      )}
      {data.map(choice => {
        const isSelected = isDataSame(choice)
        return (
          <SimpleChoice
            data={choice}
            {...itemProps}
            onSelect={selected => performOnChoiceChange(selected, choice.id)}
            key={choice.id || uuid()}
            disableSelect={disableSelect}
            selected={isSelected}
          />
        )
      })}
    </div>
  )
}

export const SwitchButton = React.forwardRef(
  ({ onCheckChanged, label, onCheckRender }, ref) => {
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
)

export const ExtendedButton = ({
  title,
  description,
  id,
  itemSize,
  options,
  onSelect,
  isSelected,
  theme,
  cardProps,
  extraLabel,
  onClick,
  className
}) => {
  // const [selected, setSelected] = useState(isSelected)

  function performSelection () {
    // console.log('Called selected')
    // setSelected(!selected)
  }

  const Button_Regular = () => {
    return (
      <div className={className} onClick={() => onClick()}>
        <Card {...cardProps} theme={`${isSelected && 'dark'} theme_${theme}`}>
          <div className='row cols-3'>
            <div className='col col-sm-2 d-flex'>
              <div className='icon_regular d-flex'>
                <IconParser itemId={id} />
              </div>
            </div>
          </div>
          <Spacer size='medium' />
          <div className='row'>
            <Title
              size='small'
              content={title}
              fontType='bold'
              style={{ fontSize: '1rem' }}
            />
          </div>
          <div className='row'>
            <SubTitle content={description} />
          </div>
          {extraLabel && (
            <div className='col'>
              <SubTitle
                className='card_option_bg shadow_light no_margin'
                fontType='bold'
                content={extraLabel}
              />
            </div>
          )}
          {options && (
            <div className='row'>
              <SubTitle
                className='link'
                fontType='bold'
                content={
                  options
                    ? `${options.length - 1}+ Features Available`
                    : 'No extra options'
                }
              />
            </div>
          )}
        </Card>
        {/* <Spacer size='medium' /> */}
      </div>
    )
  }

  const Button_Compact = () => {
    return (
      <div className={className} onClick={() => onClick()}>
        <Card
          {...cardProps}
          theme={`${isSelected ? 'dark' : theme} `}
          size='compact'
        >
          <div className='row cols-3'>
            <div className='col col-sm-2 d-flex'>
              <div className='icon_regular d-flex icon_small'>
                <IconParser itemId={id} />
              </div>
            </div>
            <div className='col m-auto'>
              <Title
                size='small'
                content={title}
                fontType='bold'
                style={{ fontSize: '1rem' }}
                className='m-auto'
              />
            </div>
          </div>
          <div className='row cols-2'>
            <div className='col col-sm-2' />
            <div className='col'>
              <SubTitle content={description} />
            </div>
          </div>
          <div className='row cols-2'>
            <div className='col col-sm-2' />
            {extraLabel && (
              <div className='col'>
                <SubTitle
                  className='card_option_bg shadow_light'
                  fontType='bold'
                  content={extraLabel}
                />
              </div>
            )}
            {options && (
              <div className='col'>
                <SubTitle
                  fontType='bold'
                  className='card_option_bg shadow_light'
                  size='small'
                  content={
                    options
                      ? `View ${options.length - 1}+ Features`
                      : 'No extra options'
                  }
                />
              </div>
            )}
          </div>
        </Card>
        <Spacer size='medium' />
      </div>
    )
  }

  return <>{itemSize === 'compact' ? <Button_Compact /> : <Button_Regular />}</>
}
