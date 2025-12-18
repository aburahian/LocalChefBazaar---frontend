import React from 'react';

import Container from '../../components/Shared/Container';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';
import { useRef } from 'react';
import { FaUsers, FaHeart, FaShieldAlt, FaUtensils } from 'react-icons/fa';

const About = () => {
;
    const containerRef = useRef(null);

    useGSAP(() => {
        gsap.from(".about-section", {
            opacity: 0,
            y: 50,
            duration: 1,
            stagger: 0.3,
            ease: "power3.out"
        });
    }, { scope: containerRef });

    return (
        <div ref={containerRef} className="pt-28 pb-20 overflow-hidden">
            <Container>
                {/* Hero Section */}
                <div className="text-center mb-20 about-section">
                    <h1 className="text-4xl md:text-6xl font-extrabold text-gray-900 mb-6">
                        Bringing the <span className="text-primary">Community</span> Together Through Food
                    </h1>
                    <p className="text-gray-500 text-xl max-w-3xl mx-auto leading-relaxed">
                        LocalChefBazaar is more than just a meal-sharing platform. It's a place where neighbors share their passion for cooking, and everyone can enjoy healthy, homemade food.
                    </p>
                </div>

                {/* Mission Section */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center mb-24 about-section">
                    <div className="relative">
                        <div className="absolute -top-4 -left-4 w-24 h-24 bg-primary/10 rounded-full blur-2xl"></div>
                        <div className="absolute -bottom-8 -right-8 w-32 h-32 bg-primary/20 rounded-full blur-3xl"></div>
                        <div className="relative bg-white p-2 rounded-4xl shadow-2xl overflow-hidden">
                            <img
                                src="https://images.unsplash.com/photo-1556910103-1c02745aae4d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
                                alt="Our Story"
                                className="w-full h-auto rounded-3xl"
                            />
                        </div>
                    </div>
                    <div className="space-y-6">
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-800">Our Story</h2>
                        <p className="text-gray-600 text-lg leading-relaxed">
                            Founded in Satkhira, LocalChefBazaar started with a simple idea: why should great homemade food be limited to one family? We noticed that many talented home cooks wanted to share their creations, and many busy professionals were tired of processed restaurant food.
                        </p>
                        <p className="text-gray-600 text-lg leading-relaxed">
                            We built this platform to bridge that gap, creating a marketplace where quality, safety, and community come first.
                        </p>
                        <div className="grid grid-cols-2 gap-6 pt-4">
                            <div>
                                <h3 className="text-3xl font-bold text-primary">500+</h3>
                                <p className="text-gray-500 font-medium">Home Chefs</p>
                            </div>
                            <div>
                                <h3 className="text-3xl font-bold text-primary">10k+</h3>
                                <p className="text-gray-500 font-medium">Happy Customers</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Values Section */}
                <div className="text-center mb-16 about-section">
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">Our Core Values</h2>
                    <p className="text-gray-500 text-lg max-w-2xl mx-auto">
                        These principles guide every decision we make and every meal we serve.
                    </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 about-section">
                    {[
                        { icon: <FaHeart />, title: "Passion", desc: "Every meal is prepared with love and care by our dedicated home chefs." },
                        { icon: <FaShieldAlt />, title: "Quality", desc: "We maintain strict standards for hygiene and ingredient freshness." },
                        { icon: <FaUsers />, title: "Community", desc: "We believe in supporting local talent and building neighborhood bonds." },
                        { icon: <FaUtensils />, title: "Diversity", desc: "Our platform offers a wide range of authentic, traditional cuisines." }
                    ].map((item, index) => (
                        <div key={index} className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-300">
                            <div className="w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center text-primary text-2xl mb-6">
                                {item.icon}
                            </div>
                            <h3 className="text-xl font-bold text-gray-800 mb-3">{item.title}</h3>
                            <p className="text-gray-500 leading-relaxed">{item.desc}</p>
                        </div>
                    ))}
                </div>
            </Container>
        </div>
    );
};

export default About;
