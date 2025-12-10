import { BsFillHouseAddFill } from 'react-icons/bs'
import { MdHomeWork, MdOutlineManageHistory } from 'react-icons/md'
import MenuItem from './MenuItem'

const menuItems = [
  { icon: BsFillHouseAddFill, label: 'Create Meal', address: 'add-meal' },
  { icon: MdHomeWork, label: 'My Meals', address: 'my-meals' },
  { icon: MdOutlineManageHistory, label: 'Manage Orders', address: 'manage-orders' },
]

const ChefMenu = () => (
  <>
    {menuItems.map(item => (
      <MenuItem
        key={item.address}
        icon={item.icon}
        label={item.label}
        address={item.address}
      />
    ))}
  </>
)

export default ChefMenu
