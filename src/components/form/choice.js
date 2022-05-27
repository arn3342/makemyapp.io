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
  isSelected
}) => {
  const [selected, setSelected] = useState(isSelected)

  function performSelection () {
    // console.log('Called selected')
    onSelect(!selected)
    setSelected(!selected)
  }
  useEffect(() => {
    isSelected && console.log('selected state is:', isSelected, ' and id is:', id)
  })
  return (
    <>
      {itemSize !== 'compact' ? (
        <div className='col col-lg-3' onClick={() => performSelection()}>
          <Card theme={selected && 'dark'}>
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
            {options?.length > 0 && (
              <div className='row'>
                <SubTitle
                  className='link'
                  fontType='bold'
                  content={`${options.length - 1}+ Features Available`}
                />
              </div>
            )}
          </Card>
          <Spacer size='medium' />
        </div>
      ) : (
        <div className='col col-lg-3' onClick={() => performSelection()}>
          <Card theme={selected && 'dark'} size='compact'>
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
                <SubTitle content={`${options.length}+ choices`} />
              </div>
            </div>
          </Card>
          <Spacer size='medium' />
        </div>
      )}
    </>
  )
}

export const ChoiceList = ({
  options,
  title,
  description,
  allowSearch,
  itemSize,
  handleSubmit
}) => {
  const [filteredDataSource, setFilteredData] = useState([])
  const [selectedData, setSelectedData] = useState([])

  function performSelection (selected, id) {
    let selections = [...selectedData]
    if (selected) {
      selections.push(id)
    } else {
      selections = selections.filter(x => x != id)
    }
    setSelectedData(selections)
  }
  return (
    <div className='container'>
      <div className='row cols-2'>
        {title && description && (
          <div className='row'>
            <div className='col col-xl-10'>
              <Title size='large-2' fontType='light' content={title} />
              <SubTitle content={description} size='large' fontType='light' />
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
                  isExtraSmall
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
        <div className='row'>
          {filteredDataSource?.length <= 0
            ? options.map((item, index) => {
                return (
                  <Choice
                    {...item}
                    key={item.id}
                    onSelect={selected => performSelection(selected, item.id)}
                    isSelected={selectedData.includes(item.id)}
                  />
                )
              })
            : filteredDataSource.map((item, index) => {
                return (
                  <Choice
                    {...item}
                    key={item.id}
                    onSelect={selected => performSelection(selected, item.id)}
                    isSelected={selectedData.includes(item.id)}
                  />
                )
              })}
        </div>
      </div>
    </div>
  )
}
