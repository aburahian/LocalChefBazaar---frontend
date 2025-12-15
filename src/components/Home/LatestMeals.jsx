import Card from './Card'
import Container from '../Shared/Container'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import LoadingSpinner from '../Shared/LoadingSpinner'
import { useRef } from 'react'
import { gsap } from 'gsap'
import { useGSAP } from '@gsap/react'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const LatestMeals = () => {
  const containerRef = useRef(null)

  const { data: meals = [], isLoading } = useQuery({
    queryKey: ['latestmeals'],
    queryFn: async () => {
      const result = await axios(`${import.meta.env.VITE_API_URL}/meals/latest`)
      return result.data
    },
  })

  useGSAP(() => {
    if (meals.length > 0) {
      gsap.from('.meal-card', {
        y: 50,
        opacity: 0,
        duration: 0.6,
        stagger: 0.1,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 85%',
        }
      })
    }
  }, { scope: containerRef, dependencies: [meals] })

  if (isLoading) return <LoadingSpinner />

  return (
    <Container>
      {meals && meals.length > 0 ? (
        <div ref={containerRef} className='pt-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8'>
          {meals.map(meal => (
            <div key={meal._id} className="meal-card">
              <Card meal={meal} />
            </div>
          ))}
        </div>
      ) : null}
    </Container>
  )
}

export default LatestMeals
