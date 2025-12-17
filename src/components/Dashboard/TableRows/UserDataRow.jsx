import { useState } from 'react'
import UpdateUserRoleModal from '../../Modal/UpdateUserRoleModal'
import useAxiosSecure from '../../../hooks/useAxiosSecure'
import Swal from 'sweetalert2'

const UserDataRow = ({ user, refetch }) => {
  const [isOpen, setIsOpen] = useState(false)
  const axiosSecure = useAxiosSecure()

  const closeModal = () => setIsOpen(false)

  const handleFraud = async () => {
    const result = await Swal.fire({
      title: 'Are you sure?',
      text: 'This user will be marked as Fraud',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, mark fraud',
    })

    if (!result.isConfirmed) return

    try {
      await axiosSecure.patch('/make-fraud', {
        email: user.email,
      })

      await Swal.fire({
        icon: 'success',
        title: 'Success',
        text: 'User marked as Fraud',
        timer: 1500,
        showConfirmButton: false,
      })

      refetch()
    } catch (error) {
      console.error(error)

      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Failed to update user status',
      })
    }
  }

  const hideFraudButton =
    user.role === 'admin' || user.status === 'fraud'

  return (
    <tr>
      {/* Name */}
      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
        <p className="text-gray-900">{user?.name}</p>
      </td>

      {/* Email */}
      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
        <p className="text-gray-900">{user?.email}</p>
      </td>

      {/* Role */}
      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
        <p className="text-gray-900 capitalize">{user?.role}</p>
      </td>

      {/* Actions */}
      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm flex gap-4 items-center">
        {/* Update Role */}
        <button
          onClick={() => setIsOpen(true)}
          className="relative inline-flex items-center px-3 py-1 text-sm font-semibold text-green-900 cursor-pointer"
        >
          <span className="absolute inset-0 bg-green-200 opacity-50 rounded-full"></span>
          <span className="relative">Update Role</span>
        </button>

        {/* Make Fraud */}
        {!hideFraudButton ? (
          <button
            onClick={handleFraud}
            className="px-3 py-1 bg-red-500 text-white rounded-full hover:bg-red-700 text-sm"
          >
            Make Fraud
          </button>
        ) : (
          <span className="text-gray-400 text-xs italic">
            {user.status === 'fraud' ? 'Fraud User' : 'Admin'}
          </span>
        )}

        {/* Modal */}
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
