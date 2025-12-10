import { useState } from 'react'
import UpdateUserRoleModal from '../../Modal/UpdateUserRoleModal'
import useAxiosSecure from '../../../hooks/useAxiosSecure'
import Swal from 'sweetalert2'

const UserDataRow = ({ user, refetch }) => {
  const [isOpen, setIsOpen] = useState(false)
  const axiosSecure = useAxiosSecure()


  const closeModal = () => setIsOpen(false)

    const handleFraud = async () => {
    try {
      await axiosSecure.patch("/make-fraud", {
        email: user.email,
      })

      Swal.success("User marked as Fraud")
      refetch()
    } catch (err) {
      console.log(err)
      Swal.error("Failed to update user status")
    }
  }

  // Button visibility logic
  const hideFraudButton =
    user.role === 'admin' || user.status === 'fraud'

  return (
    <tr>
      {/* name */}
      <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
        <p className='text-gray-900'>{user?.name}</p>
      </td>
      <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
        <p className='text-gray-900'>{user?.email}</p>
      </td>

      {/* Role */}
      <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
        <p className='text-gray-900 capitalize'>{user?.role}</p>
      </td>

      {/* Actions */}
      <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm flex gap-4'>
        {/* Update Role Button */}
        <span
          onClick={() => setIsOpen(true)}
          className='relative cursor-pointer inline-block px-3 py-1 font-semibold text-green-900 leading-tight'
        >
          <span
            aria-hidden='true'
            className='absolute inset-0 bg-green-200 opacity-50 rounded-full'
          ></span>
          <span className='relative'>Update Role</span>
        </span>

        {/* Make Fraud Button */}
        {!hideFraudButton ? (
          <button
            onClick={handleFraud}
            className='px-3 py-1 bg-red-500 text-white rounded-full hover:bg-red-700 text-sm'
          >
            Make Fraud
          </button>
        ) : (
          <span className='text-gray-400 text-xs italic'>
            {user.status === 'fraud' ? 'Fraud User' : 'Admin'}
          </span>
        )}

        {/* Role Update Modal */}
        <UpdateUserRoleModal
          user={user}
          refetch={refetch}
          isOpen={isOpen}
          closeModal={closeModal}
        />
      </td>
    </tr>
  )
}

export default UserDataRow
