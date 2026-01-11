import Card from "./Card";
import Container from "../Shared/Container";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import CardSkeleton from "../Shared/CardSkeleton";
import { useRef } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const LatestMeals = () => {
  const containerRef = useRef(null);

  const { data: meals = [], isLoading } = useQuery({
    queryKey: ["latestmeals"],
    queryFn: async () => {
      const result = await axios.get(
        `${import.meta.env.VITE_API_URL}/meals/latest`
      );
      return result.data;
    },
  });

  useGSAP(
    () => {
      if (meals.length > 0) {
        gsap.from(".meal-card", {
          y: 50,
          opacity: 0,
          duration: 0.6,
          stagger: 0.1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 85%",
          },
        });
      }
    },
    { scope: containerRef, dependencies: [meals] }
  );

  return (
    <Container>
      {isLoading ? (
        <div className="pt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {[...Array(6)].map((_, index) => (
            <CardSkeleton key={index} />
          ))}
        </div>
      ) : meals && meals.length > 0 ? (
        <div
          ref={containerRef}
          className="pt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {meals.map((meal) => (
            <div key={meal._id} className="meal-card">
              <Card meal={meal} />
            </div>
          ))}
        </div>
      ) : (
        <div className="pt-12 text-center py-20">
          <p className="text-xl font-semibold text-gray-600 dark:text-gray-400">
            No meals available at the moment
          </p>
        </div>
      )}
    </Container>
  );
};

export default LatestMeals;
