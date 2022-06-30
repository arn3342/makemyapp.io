import React from 'react'
import {
  BsCart4,
  BsChatRightDots,
  BsCodeSlash,
  BsCreditCard,
  BsQuestion,
  BsShareFill
} from 'react-icons/bs'
import {
  AiFillAndroid,
  AiOutlineDesktop,
  AiOutlineCloudServer
} from 'react-icons/ai'
import { SiAppstore, SiGoogleanalytics, SiIos, SiZapier } from 'react-icons/si'
import { CgWebsite, CgFacebook, CgInstagram } from 'react-icons/cg'
import { TiGroupOutline } from 'react-icons/ti'
import {
  MdSpaceDashboard,
  MdOutlineFeaturedPlayList,
  MdFeaturedPlayList,
  MdOutlineAddLocation
} from 'react-icons/md'
import { GoSettings } from 'react-icons/go'
import { TbForms, TbListDetails } from 'react-icons/tb'
import {
  FcBusinessman,
  FcConferenceCall,
  FcMoneyTransfer,
  FcNews,
  FcReading,
  FcTimeline,
  FcTodoList
} from 'react-icons/fc'
import { RiAdvertisementLine, RiGroupLine, RiTeamLine } from 'react-icons/ri'
import { BiGitRepoForked, BiCodeAlt, BiServer } from 'react-icons/bi'
import {
  FaApplePay,
  FaCode,
  FaReact,
  FaUserEdit,
  FaWalking
} from 'react-icons/fa'
import { VscDebugAlt, VscSymbolMisc } from 'react-icons/vsc'
import { FiGitBranch, FiShoppingCart } from 'react-icons/fi'
import {
  IoMdBrush,
  IoMdColorPalette,
  IoMdColorWand,
  IoMdNotifications
} from 'react-icons/io'

const IconParser = ({ itemId, size }) => {
  const defSize = 18
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
    default:
      break
  }
  return icon
}
export default IconParser
