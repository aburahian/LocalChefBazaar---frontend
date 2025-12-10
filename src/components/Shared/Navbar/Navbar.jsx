import Container from '../Container'
import { AiOutlineMenu } from 'react-icons/ai'
import { useState } from 'react'
import { Link, NavLink } from 'react-router'
import useAuth from '../../../hooks/useAuth'
import avatarImg from '../../../assets/images/placeholder.jpg'
import logo from '../../../assets/images/logo-flat.png'

const Navbar = () => {
  const { user, logOut } = useAuth()
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className='fixed w-full bg-white z-10 shadow-sm'>
      <div className='py-4'>
        <Container>
          <div className='flex flex-row items-center justify-between gap-3 md:gap-0'>
            {/* Logo */}
            <Link to="/" className="flex items-center gap-2">
              <img src={logo} alt="logo" className="w-12 h-auto" />
              <h1 className="hidden md:block font-bold text-xl text-gray-800">
                LocalChefBazaar
              </h1>
            </Link>

            {/* Middle Navigation Links (Desktop) */}
            <div className='hidden md:flex gap-6'>
              <NavLink
                to="/"
                className='text-gray-700 font-semibold hover:text-green-600 transition'
              >
                Home
              </NavLink>
              <NavLink
                to="/meals"
                className='text-gray-700 font-semibold hover:text-green-600 transition'
              >
                Meals
              </NavLink>
            </div>

            {/* User Menu / Auth Buttons */}
            <div className='relative'>
              <div className='flex flex-row items-center gap-3'>
                <div
                  onClick={() => setIsOpen(!isOpen)}
                  className='p-4 md:py-1 md:px-2 border border-neutral-200 flex flex-row items-center gap-3 rounded-full cursor-pointer hover:shadow-md transition'
                >
                  <AiOutlineMenu />
                  <div className='hidden md:block'>
                    {/* Avatar */}
                    <img
                      className='rounded-full'
                      referrerPolicy='no-referrer'
                      src={user?.photoURL ? user.photoURL : avatarImg}
                      alt='profile'
                      height='30'
                      width='30'
                    />
                  </div>
                </div>
              </div>

              {isOpen && (
                <div className='absolute rounded-xl shadow-md w-[40vw] md:w-[10vw] bg-white overflow-hidden right-0 top-12 text-sm'>
                  <div className='flex flex-col cursor-pointer'>
                    {/* Mobile-only navigation links */}
                    <Link
                      to='/'
                      className='block md:hidden px-4 py-3 hover:bg-neutral-100 transition font-semibold'
                      onClick={() => setIsOpen(false)}
                    >
                      Home
                    </Link>
                    <Link
                      to='/meals'
                      className='block md:hidden px-4 py-3 hover:bg-neutral-100 transition font-semibold'
                      onClick={() => setIsOpen(false)}
                    >
                      Meals
                    </Link>

                    {user ? (
                      <>
                        <Link
                          to='/dashboard'
                          className='px-4 py-3 hover:bg-neutral-100 transition font-semibold'
                          onClick={() => setIsOpen(false)}
                        >
                          Dashboard
                        </Link>
                        <div
                          onClick={() => {
                            logOut()
                            setIsOpen(false)
                          }}
                          className='px-4 py-3 hover:bg-neutral-100 transition font-semibold cursor-pointer'
                        >
                          Logout
                        </div>
                      </>
                    ) : (
                      <>
                        <Link
                          to='/login'
                          className='px-4 py-3 hover:bg-neutral-100 transition font-semibold'
                          onClick={() => setIsOpen(false)}
                        >
                          Login
                        </Link>
                        <Link
                          to='/signup'
                          className='px-4 py-3 hover:bg-neutral-100 transition font-semibold'
                          onClick={() => setIsOpen(false)}
                        >
                          Sign Up
                        </Link>
                      </>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </Container>
      </div>
    </div>
  )
}

export default Navbar
