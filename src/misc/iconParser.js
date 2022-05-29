import React from 'react'
import { BsQuestion } from 'react-icons/bs'
import { AiOutlineDesktop } from 'react-icons/ai'
import { SiAppstore, SiZapier } from 'react-icons/si'
import { CgWebsite, CgFacebook, CgInstagram } from 'react-icons/cg'
import { TiGroupOutline } from 'react-icons/ti'

const IconParser = ({ itemId }) => {
  let icon = <BsQuestion fontSize={20} />
  // console.log(itemId)
  switch (itemId) {
    case 112:
      icon = <CgFacebook fontSize={20} />
      break
    case 113:
      icon = <CgInstagram fontSize={20} />
      break
    case 114:
      icon = <SiZapier fontSize={20} />
      break
    case 1210:
      icon = <CgWebsite fontSize={20} />
      break
    case 1211:
      icon = <SiAppstore fontSize={20} />
      break
    case 1212:
      icon = <AiOutlineDesktop fontSize={20} />
      break
    case 1511:
      icon = <TiGroupOutline fontSize={20} />
      break
    default:
      break
  }
  return icon
}
export default IconParser