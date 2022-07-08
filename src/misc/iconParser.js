import React from 'react'
import {
  BsAppIndicator,
  BsCart4,
  BsChatRightDots,
  BsCreditCard,
  BsGlobe,
  BsQuestion,
  BsShareFill
} from 'react-icons/bs'
import { SiGoogleanalytics } from 'react-icons/si'
import { MdOutlineAddLocation, MdOutlineAdminPanelSettings } from 'react-icons/md'
import { GoSettings } from 'react-icons/go'
import { TbDeviceDesktopAnalytics, TbForms } from 'react-icons/tb'
import { RiAdvertisementLine, RiGroupLine, RiUserSettingsLine } from 'react-icons/ri'
import { FaApplePay, FaUserEdit, FaWalking } from 'react-icons/fa'
import { VscSymbolMisc } from 'react-icons/vsc'
import { IoMdColorWand, IoMdNotifications } from 'react-icons/io'
import { GrUserAdmin, GrUserSettings } from 'react-icons/gr'

const IconParser = ({ itemId, size }) => {
  const defSize = size || 18
  let icon = <BsQuestion fontSize={size || 20} />
  // console.log(itemId)
  switch (itemId) {
    //#region Feature Icons
    case 10030:
      icon = <RiGroupLine size={defSize} />
      break
    case 10031:
      icon = <GoSettings size={defSize} />
      break
    case 10032:
      icon = <IoMdColorWand size={defSize} />
      break
    case 10033:
      icon = <FaWalking size={defSize} />
      break
    case 10034:
      icon = <FaUserEdit size={defSize} />
      break
    case 10035:
      icon = <BsCreditCard size={defSize} />
      break
    case 10036:
      icon = <IoMdNotifications size={defSize} />
      break
    case 10037:
      icon = <BsChatRightDots size={defSize} />
      break
    case 10038:
      icon = <TbForms size={defSize} />
      break
    case 10039:
      icon = <FaApplePay size={defSize} />
      break
    case 10040:
      icon = <RiAdvertisementLine size={defSize} />
      break
    case 10041:
      icon = <MdOutlineAddLocation size={defSize} />
      break
    case 10042:
      icon = <BsCart4 size={defSize} />
      break
    case 10043:
      icon = <SiGoogleanalytics size={defSize} />
      break
    case 10044:
      icon = <BsShareFill size={defSize} />
      break
    case 10045:
      icon = <VscSymbolMisc size={defSize} />
      break
    //#endregion

    //#region Step Icons
    case 12101:
      icon = <BsGlobe size={defSize} />
      break
    case 12102:
      icon = <BsAppIndicator size={defSize} />
      break
    case 12103:
      icon = <TbDeviceDesktopAnalytics size={defSize} />
      break
    case 12111:
      icon = <RiUserSettingsLine size={defSize} />
      break
    case 12112:
      icon = <MdOutlineAdminPanelSettings size={defSize} />
      break
    //#endregion
    default:
      break
  }
  return icon
}
export default IconParser
