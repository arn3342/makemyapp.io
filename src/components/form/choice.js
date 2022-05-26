import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useState } from 'react'
import { Card, Input, Spacer, SubTitle, Title } from '../global/global'
import '../global/global.css'
import { faDesktop, faGlobe, faSearch } from '@fortawesome/free-solid-svg-icons'
import { filterData } from '../../misc/logics'
import IconParser from '../../misc/iconParser'

export const Choice = ({ title, description, id, itemSize }) => {
  const [selected, setSelected] = useState(false)

  function performSelection () {
    setSelected(!selected)
  }
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
          </Card>
          <Spacer size='medium' />
        </div>
      )}
    </>
  )
}

export const ChoiceList = ({
  options = [],
  title,
  description,
  allowSearch,
  itemSize
}) => {
  const [dataSource, setDataSource] = useState(options)
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
            {allowSearch && (
              <div className='col col-sm-4'>
                <Input
                  icon={faSearch}
                  placeholder='Search features...'
                  onValueChange={value =>
                    setDataSource(filterData(options, value))
                  }
                />
              </div>
            )}
            <Spacer size='small' />
          </div>
        )}
        <div className='row'>
          {dataSource.map(item => {
            return <Choice {...item} itemSize={itemSize} />
          })}
        </div>
      </div>
    </div>
  )
}
