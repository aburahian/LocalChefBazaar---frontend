import { FaUserCog, FaUserTag, FaChartBar } from 'react-icons/fa'
import MenuItem from './MenuItem'
const menuItems = [
  { icon: FaUserCog, label: 'Manage Users', address: 'manage-users' },
  { icon: FaUserTag, label: 'Mange Request', address: 'manage-request' },
  { icon: FaChartBar, label: 'Platform Statistics', address: 'platform-statistics' },
]
const AdminMenu = () => {
  
  return (
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
}

export default AdminMenu
