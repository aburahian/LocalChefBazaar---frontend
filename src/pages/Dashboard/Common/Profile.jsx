import { useState } from 'react'
import useAuth from '../../../hooks/useAuth'
import useRole from '../../../hooks/useRole'
import coverImg from '../../../assets/images/cover.jpg'
import axios from 'axios'
import LoadingSpinner from '../../../components/Shared/LoadingSpinner'

const Profile = () => {
  const { user } = useAuth()
  const [role, isRoleLoading] = useRole()
  const [status, setStatus] = useState('active')
  const [chefId, setChefId] = useState(null) 
  const [loading, setLoading] = useState(false)

  if (isRoleLoading || !role) return <LoadingSpinner />

  const handleRequest = async (type) => {
    setLoading(true)
    try {
      const payload = {
        email: user.email,
        displayName: user.displayName,
        uid: user.uid,
        requestedRole: type, 
      }

      const res = await axios.post(
        'http://localhost:3000/request-role', 
        payload,
        { withCredentials: true }
      )

      console.log(res.data)
      alert(`Your request to become a ${type} has been sent.`)
    } catch (err) {
      console.error(err)
      alert('Failed to send request')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className='flex justify-center items-center min-h-screen bg-gray-100'>
      <div className='bg-white shadow-lg rounded-2xl md:w-4/5 lg:w-3/5'>
        <img
          alt='cover photo'
          src={coverImg}
          className='w-full mb-4 rounded-t-lg h-56 object-cover'
        />

        <div className='flex flex-col items-center p-4 -mt-16'>
          <img
            alt='profile'
            src={user?.photoURL}
            className='mx-auto object-cover rounded-full h-24 w-24 border-2 border-white'
          />

          <p className='p-2 px-4 mt-2 text-xs text-white bg-lime-500 rounded-full'>
            Role: {role}
          </p>

          <p className='mt-2 text-gray-700'>
            Status: <span className='font-bold'>{status}</span>
          </p>

          {role === 'chef' && chefId && (
            <p className='mt-1 text-gray-700'>
              Chef Id: <span className='font-bold'>{chefId}</span>
            </p>
          )}

          <div className='w-full p-4 mt-4 rounded-lg bg-gray-50'>
            <div className='flex flex-wrap justify-between text-gray-600'>
              <p className='flex flex-col mb-2'>
                Name
                <span className='font-bold text-gray-800'>{user?.displayName}</span>
              </p>

              <p className='flex flex-col mb-2'>
                Email
                <span className='font-bold text-gray-800'>{user?.email}</span>
              </p>

              <p className='flex flex-col mb-2'>
                Address
                <span className='font-bold text-gray-800'>
                  {user?.address || 'Not Provided'}
                </span>
              </p>
            </div>

            <div className='flex gap-4 mt-4'>
              {/* Conditional Buttons */}
              {role !== 'chef' && role !== 'admin' && (
                <button
                  disabled={loading}
                  onClick={() => handleRequest('chef')}
                  className='bg-lime-500 px-6 py-2 rounded-lg text-white hover:bg-lime-700'
                >
                  Be a Chef
                </button>
              )}

              {role !== 'admin' && (
                <button
                  disabled={loading}
                  onClick={() => handleRequest('admin')}
                  className='bg-lime-500 px-6 py-2 rounded-lg text-white hover:bg-lime-700'
                >
                  Be an Admin
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Profile
