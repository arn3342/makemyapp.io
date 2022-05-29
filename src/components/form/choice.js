import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useEffect, useState } from 'react'
import { Button, Card, Input, Spacer, SubTitle, Title } from '../global/global'
import '../global/global.css'
import {
  faAngleRight,
  faDesktop,
  faGlobe,
  faSearch
} from '@fortawesome/free-solid-svg-icons'
import { filterData } from '../../misc/logics'
import IconParser from '../../misc/iconParser'

export const Choice = ({
  title,
  description,
  id,
  itemSize,
  options,
  onSelect,
  isSelected,
  theme
}) => {
  const [selected, setSelected] = useState(isSelected)

  function performSelection () {
    // console.log('Called selected')
    onSelect(!selected)
    setSelected(!selected)
  }

  const Choice_Regular = () => {
    return (
      <div className='col col-lg-3' onClick={() => performSelection()}>
        <Card theme={`${selected && 'dark'} theme_${theme}`}>
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
        </Card>
        <Spacer size='medium' />
      </div>
    )
  }

  const Choice_Compact = () => {
    return (
      <div className='col col-lg-3' onClick={() => performSelection()}>
        <Card theme={`${selected && 'dark'} theme_${theme}`} size='compact'>
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
            <div className='col'>
              <SubTitle
                fontType='bold'
                className='card_option_bg'
                size='small'
                content={
                  options
                    ? `${options.length - 1}+ Features Available`
                    : 'No extra options'
                }
              />
            </div>
          </div>
        </Card>
        <Spacer size='medium' />
      </div>
    )
  }

  return <>{itemSize === 'compact' ? <Choice_Compact /> : <Choice_Regular />}</>
}

export const SimpleChoice = ({ title, id }) => {
  const [isSelected, setSelected] = useState(false)
  return (
    <div className={`choice_extra-small ${isSelected && 'choice_selected'}`} onClick={() => setSelected(!isSelected)}>
      <SubTitle
        fontType='bold'
        content={title}
        style={{
          marginBottom: 0
        }}
      />
    </div>
  )
}

export const ChoiceList = ({
  options,
  title,
  description,
  allowSearch,
  itemSize,
  handleSubmit,
  theme,
  onItemClick
}) => {
  const [filteredDataSource, setFilteredData] = useState([])
  const [selectedData, setSelectedData] = useState([])

  function performSelection (selected, id) {
    // let selections = [...selectedData]
    // if (selected) {
    //   selections.push(id)
    // } else {
    //   selections = selections.filter(x => x != id)
    // }
    // setSelectedData(selections)
  }
  return (
    <div className='container' id='choise-list-container'>
      <div className='row cols-2'>
        {title && description && (
          <div className='row'>
            <div className='col col-xl-10'>
              <Title
                size='large-2'
                fontType='light'
                theme='light'
                content={title}
              />
              <SubTitle
                content={description}
                size='large'
                theme='light'
                fontType='light'
              />
              <Spacer size='medium' />
            </div>

            <div className='row cols-2'>
              {allowSearch && (
                <div className='col col-sm-4'>
                  <Input
                    icon={faSearch}
                    placeholder='Search features...'
                    onValueChange={value =>
                      setFilteredData(filterData(options, value))
                    }
                  />
                </div>
              )}
              <div className='col col-sm-1 d-flex'>
                <Button
                  label='Save & Proceed'
                  theme='dark'
                  animateScale={true}
                  icon={faAngleRight}
                  // canBeBusy
                  onClick={() => handleSubmit(selectedData)}
                />
              </div>
            </div>
            <Spacer size='small' />
          </div>
        )}
        {/* <div className='col col-sm-4'> */}
        <Spacer size='small' />
        <div className='row'>
          {filteredDataSource?.length <= 0
            ? options.map((item, index) => {
                return (
                  <Choice
                    {...item}
                    key={item.id}
                    onSelect={selected =>
                      item.options &&
                      item.options?.length > 0 &&
                      onItemClick(selected, item.id)
                    }
                    isSelected={selectedData.includes(item.id)}
                    itemSize={itemSize}
                    theme={theme}
                  />
                )
              })
            : filteredDataSource.map((item, index) => {
                return (
                  <Choice
                    {...item}
                    key={item.id}
                    onSelect={selected =>
                      item.options &&
                      item.options?.length > 0 &&
                      onItemClick(selected, item.id)
                    }
                    isSelected={selectedData.includes(item.id)}
                    itemSize={itemSize}
                    theme={theme}
                  />
                )
              })}
        </div>
      </div>
      {/* </div> */}
    </div>
  )
}
