import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import FreelancerProfile from "./FreelancerProfile";

const TalentSearchSection = ({ auth }) => {
  const navigate = useNavigate();
  const [selectedFreelancer, setSelectedFreelancer] = useState(null);
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({
    skills: [],
    location: "",
    experienceLevel: "",
    hourlyRateRange: "",
    reputationScore: "",
    availability: "",
  });

  // Filter options
  const filterOptions = {
    skills: [
      "React",
      "Node.js",
      "JavaScript",
      "TypeScript",
      "Python",
      "Java",
      "C++",
      "C#",
      "PHP",
      "Ruby",
      "Go",
      "Rust",
      "Swift",
      "Kotlin",
      "Dart",
      "Flutter",
      "Angular",
      "Vue.js",
      "Svelte",
      "Next.js",
      "Nuxt.js",
      "Express.js",
      "Django",
      "Flask",
      "Laravel",
      "Spring",
      "ASP.NET",
      "FastAPI",
      "MongoDB",
      "PostgreSQL",
      "MySQL",
      "Redis",
      "GraphQL",
      "REST API",
      "AWS",
      "Azure",
      "Google Cloud",
      "Docker",
      "Kubernetes",
      "Terraform",
      "Solidity",
      "Stellar",
      "Soroban",
      "Ethereum",
      "Bitcoin",
      "DeFi",
      "UI/UX",
      "Figma",
      "Adobe XD",
      "Sketch",
      "InVision",
      "Prototyping",
      "Machine Learning",
      "AI",
      "Data Science",
      "Computer Vision",
      "NLP",
      "DevOps",
      "CI/CD",
      "Git",
      "Linux",
      "Shell Scripting",
      "Ansible",
    ],
    experienceLevel: ["Junior", "Mid-level", "Senior", "Expert"],
    hourlyRateRange: ["$0-$25", "$25-$50", "$50-$75", "$75-$100", "$100+"],
    reputationScore: ["4.0+", "4.5+", "4.8+", "5.0"],
    availability: [
      "Disponible ahora",
      "Disponible en 1 semana",
      "Disponible en 2 semanas",
      "Disponible en 1 mes",
    ],
  };

  // All freelancers data (combined from all carousels)
  const allFreelancers = [
    // Featured Talent
    {
      id: "1",
      name: "Carlos Rodríguez",
      photo:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
      reputation: 4.9,
      skills: ["React", "Node.js", "Stellar", "Soroban"],
      hourlyRate: 45,
      location: "México",
      experienceLevel: "Senior",
      availability: "Disponible ahora",
      isSponsored: true,
      completedProjects: 23,
      description:
        "Desarrollador full-stack especializado en blockchain y aplicaciones web modernas.",
      recentWork: [
        {
          title: "Aplicación DeFi en Stellar",
          description:
            "Desarrollo de smart contracts para plataforma de préstamos descentralizados",
          date: "2024-01-15",
        },
        {
          title: "Dashboard de Analytics",
          description:
            "Sistema de monitoreo en tiempo real para métricas de negocio",
          date: "2024-01-10",
        },
      ],
      reviews: [
        {
          rating: 5.0,
          comment:
            "Excelente trabajo, muy profesional y entregó antes del plazo.",
          client: "TechCorp Solutions",
          date: "2024-01-12",
        },
        {
          rating: 4.8,
          comment: "Muy buen desarrollador, código limpio y bien documentado.",
          client: "Blockchain Startup",
          date: "2024-01-05",
        },
      ],
    },
    {
      id: "2",
      name: "Ana Martínez",
      photo:
        "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
      reputation: 4.8,
      skills: ["UI/UX", "Figma", "Adobe XD", "Prototyping"],
      hourlyRate: 35,
      location: "Colombia",
      experienceLevel: "Mid-level",
      availability: "Disponible en 1 semana",
      isSponsored: true,
      completedProjects: 18,
      description:
        "Diseñadora UX/UI con experiencia en aplicaciones móviles y web.",
      recentWork: [
        {
          title: "Redesign App Móvil",
          description:
            "Rediseño completo de aplicación bancaria con enfoque en UX",
          date: "2024-01-14",
        },
      ],
      reviews: [
        {
          rating: 4.9,
          comment:
            "Ana es una excelente diseñadora, muy creativa y profesional.",
          client: "Fintech App",
          date: "2024-01-08",
        },
      ],
    },
    {
      id: "3",
      name: "Luis García",
      photo:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
      reputation: 4.7,
      skills: ["Rust", "Stellar", "Smart Contracts", "DeFi"],
      hourlyRate: 55,
      location: "Argentina",
      experienceLevel: "Expert",
      availability: "Disponible ahora",
      isSponsored: true,
      completedProjects: 31,
      description:
        "Especialista en smart contracts y desarrollo DeFi en Stellar.",
      recentWork: [
        {
          title: "Smart Contract DeFi",
          description: "Desarrollo de protocolo DeFi en Stellar con Rust",
          date: "2024-01-12",
        },
      ],
      reviews: [
        {
          rating: 4.7,
          comment: "Luis es un experto en blockchain, muy recomendado.",
          client: "DeFi Protocol",
          date: "2024-01-06",
        },
      ],
    },
    {
      id: "4",
      name: "María López",
      photo:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
      reputation: 4.9,
      skills: ["Python", "Machine Learning", "Data Science", "TensorFlow"],
      hourlyRate: 60,
      location: "Chile",
      experienceLevel: "Senior",
      availability: "Disponible en 2 semanas",
      isSponsored: true,
      completedProjects: 28,
      description:
        "Científica de datos especializada en machine learning y análisis predictivo.",
      recentWork: [
        {
          title: "Sistema de Recomendaciones",
          description: "Algoritmo de ML para recomendaciones personalizadas",
          date: "2024-01-13",
        },
      ],
      reviews: [
        {
          rating: 4.9,
          comment:
            "María es excelente en ML, resultados superaron expectativas.",
          client: "E-commerce Platform",
          date: "2024-01-09",
        },
      ],
    },
    {
      id: "5",
      name: "Diego Silva",
      photo:
        "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face",
      reputation: 4.6,
      skills: ["DevOps", "AWS", "Docker", "Kubernetes", "Terraform"],
      hourlyRate: 50,
      location: "Perú",
      experienceLevel: "Senior",
      availability: "Disponible ahora",
      isSponsored: true,
      completedProjects: 25,
      description:
        "DevOps engineer con experiencia en infraestructura cloud y automatización.",
      recentWork: [
        {
          title: "Infraestructura Cloud",
          description: "Migración completa a AWS con CI/CD automatizado",
          date: "2024-01-11",
        },
      ],
      reviews: [
        {
          rating: 4.6,
          comment: "Diego es muy profesional y conocedor de DevOps.",
          client: "Tech Startup",
          date: "2024-01-07",
        },
      ],
    },
    {
      id: "6",
      name: "Sofia Ramirez",
      photo:
        "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face",
      reputation: 4.8,
      skills: ["Vue.js", "TypeScript", "GraphQL", "PostgreSQL"],
      hourlyRate: 42,
      location: "Ecuador",
      experienceLevel: "Mid-level",
      availability: "Disponible en 1 semana",
      isSponsored: false,
      completedProjects: 16,
      description:
        "Desarrolladora frontend especializada en Vue.js y TypeScript.",
      recentWork: [
        {
          title: "E-commerce Platform",
          description: "Desarrollo de plataforma completa con Vue.js y GraphQL",
          date: "2024-01-10",
        },
      ],
      reviews: [
        {
          rating: 4.8,
          comment: "Sofia es muy profesional y entregó el proyecto a tiempo.",
          client: "E-commerce Startup",
          date: "2024-01-05",
        },
      ],
    },
    {
      id: "7",
      name: "Roberto Torres",
      photo:
        "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&h=150&fit=crop&crop=face",
      reputation: 4.7,
      skills: ["Angular", "RxJS", "Firebase", "PWA"],
      hourlyRate: 48,
      location: "Uruguay",
      experienceLevel: "Senior",
      availability: "Disponible ahora",
      isSponsored: false,
      completedProjects: 22,
      description:
        "Desarrollador Angular con experiencia en aplicaciones progresivas.",
      recentWork: [
        {
          title: "PWA Banking App",
          description: "Aplicación bancaria progresiva con Angular y Firebase",
          date: "2024-01-12",
        },
      ],
      reviews: [
        {
          rating: 4.7,
          comment: "Roberto es muy técnico y entregó una excelente PWA.",
          client: "Digital Bank",
          date: "2024-01-08",
        },
      ],
    },
    {
      id: "8",
      name: "Carmen Vega",
      photo:
        "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=150&h=150&fit=crop&crop=face",
      reputation: 4.9,
      skills: ["React Native", "Expo", "Redux", "Firebase"],
      hourlyRate: 52,
      location: "Panamá",
      experienceLevel: "Senior",
      availability: "Disponible en 2 semanas",
      isSponsored: false,
      completedProjects: 19,
      description:
        "Desarrolladora móvil especializada en React Native y aplicaciones nativas.",
      recentWork: [
        {
          title: "Delivery App",
          description: "Aplicación de delivery completa con React Native",
          date: "2024-01-14",
        },
      ],
      reviews: [
        {
          rating: 4.9,
          comment: "Carmen es excelente en desarrollo móvil, muy recomendada.",
          client: "Food Delivery",
          date: "2024-01-06",
        },
      ],
    },
  ];

  // Filter freelancers based on current filters
  const filteredFreelancers = allFreelancers.filter((freelancer) => {
    // Skills filter
    if (filters.skills.length > 0) {
      const hasMatchingSkill = filters.skills.some((skill) =>
        freelancer.skills.includes(skill)
      );
      if (!hasMatchingSkill) return false;
    }

    // Location filter
    if (
      filters.location &&
      !freelancer.location
        .toLowerCase()
        .includes(filters.location.toLowerCase())
    ) {
      return false;
    }

    // Experience level filter
    if (
      filters.experienceLevel &&
      freelancer.experienceLevel !== filters.experienceLevel
    ) {
      return false;
    }

    // Hourly rate filter
    if (filters.hourlyRateRange) {
      const [min, max] = filters.hourlyRateRange.replace("$", "").split("-");
      const rate = parseInt(max || min);
      if (filters.hourlyRateRange === "$100+") {
        if (freelancer.hourlyRate < 100) return false;
      } else {
        if (
          freelancer.hourlyRate < parseInt(min) ||
          freelancer.hourlyRate > rate
        ) {
          return false;
        }
      }
    }

    // Reputation score filter
    if (filters.reputationScore) {
      const minScore = parseFloat(filters.reputationScore.replace("+", ""));
      if (freelancer.reputation < minScore) return false;
    }

    // Availability filter
    if (
      filters.availability &&
      freelancer.availability !== filters.availability
    ) {
      return false;
    }

    return true;
  });

  // Handle filter changes
  const handleFilterChange = (filterType, value) => {
    if (filterType === "skills") {
      setFilters((prev) => ({
        ...prev,
        skills: prev.skills.includes(value)
          ? prev.skills.filter((skill) => skill !== value)
          : [...prev.skills, value],
      }));
    } else {
      setFilters((prev) => ({
        ...prev,
        [filterType]: value,
      }));
    }
  };

  // Clear all filters
  const clearFilters = () => {
    setFilters({
      skills: [],
      location: "",
      experienceLevel: "",
      hourlyRateRange: "",
      reputationScore: "",
      availability: "",
    });
  };

  // Render filters sidebar
  const renderFiltersSidebar = () => (
    <div className="bg-white rounded-lg border border-gray-200 p-4 h-fit">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900">🔍 Filtros</h3>
        <button
          onClick={clearFilters}
          className="text-sm text-purple-600 hover:text-purple-700 font-medium"
        >
          Limpiar
        </button>
      </div>

      {/* Skills */}
      <div className="mb-4">
        <h4 className="font-medium text-gray-900 mb-2">Habilidades</h4>
        <div className="max-h-24 overflow-y-auto">
          <div className="grid grid-cols-1 gap-1">
            {filterOptions.skills.slice(0, 15).map((skill) => (
              <label
                key={skill}
                className="flex items-center space-x-2 cursor-pointer"
              >
                <input
                  type="checkbox"
                  checked={filters.skills.includes(skill)}
                  onChange={() => handleFilterChange("skills", skill)}
                  className="rounded border-gray-300 text-purple-600 focus:ring-purple-500"
                />
                <span className="text-xs text-gray-700">{skill}</span>
              </label>
            ))}
          </div>
        </div>
      </div>

      {/* Location */}
      <div className="mb-4">
        <h4 className="font-medium text-gray-900 mb-2">Ubicación</h4>
        <input
          type="text"
          placeholder="Ej: México, Colombia..."
          value={filters.location}
          onChange={(e) => handleFilterChange("location", e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 text-sm"
        />
      </div>

      {/* Experience Level */}
      <div className="mb-4">
        <h4 className="font-medium text-gray-900 mb-2">Nivel de Experiencia</h4>
        <select
          value={filters.experienceLevel}
          onChange={(e) =>
            handleFilterChange("experienceLevel", e.target.value)
          }
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 text-sm"
        >
          <option value="">Todos los niveles</option>
          {filterOptions.experienceLevel.map((level) => (
            <option key={level} value={level}>
              {level}
            </option>
          ))}
        </select>
      </div>

      {/* Hourly Rate */}
      <div className="mb-4">
        <h4 className="font-medium text-gray-900 mb-2">Rango de Tarifa</h4>
        <select
          value={filters.hourlyRateRange}
          onChange={(e) =>
            handleFilterChange("hourlyRateRange", e.target.value)
          }
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 text-sm"
        >
          <option value="">Todos los rangos</option>
          {filterOptions.hourlyRateRange.map((range) => (
            <option key={range} value={range}>
              {range}/h
            </option>
          ))}
        </select>
      </div>

      {/* Reputation Score */}
      <div className="mb-4">
        <h4 className="font-medium text-gray-900 mb-2">Puntuación Mínima</h4>
        <select
          value={filters.reputationScore}
          onChange={(e) =>
            handleFilterChange("reputationScore", e.target.value)
          }
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 text-sm"
        >
          <option value="">Cualquier puntuación</option>
          {filterOptions.reputationScore.map((score) => (
            <option key={score} value={score}>
              {score}
            </option>
          ))}
        </select>
      </div>

      {/* Availability */}
      <div className="mb-4">
        <h4 className="font-medium text-gray-900 mb-2">Disponibilidad</h4>
        <select
          value={filters.availability}
          onChange={(e) => handleFilterChange("availability", e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 text-sm"
        >
          <option value="">Cualquier disponibilidad</option>
          {filterOptions.availability.map((availability) => (
            <option key={availability} value={availability}>
              {availability}
            </option>
          ))}
        </select>
      </div>

      {/* Active Filters Summary */}
      {Object.values(filters).some((value) =>
        Array.isArray(value) ? value.length > 0 : value !== ""
      ) && (
        <div className="mt-3 pt-3 border-t border-gray-200">
          <h4 className="font-medium text-gray-900 mb-2">Filtros Activos</h4>
          <div className="space-y-1">
            {filters.skills.length > 0 && (
              <div className="text-xs text-gray-600">
                Habilidades: {filters.skills.join(", ")}
              </div>
            )}
            {filters.location && (
              <div className="text-xs text-gray-600">
                Ubicación: {filters.location}
              </div>
            )}
            {filters.experienceLevel && (
              <div className="text-xs text-gray-600">
                Experiencia: {filters.experienceLevel}
              </div>
            )}
            {filters.hourlyRateRange && (
              <div className="text-xs text-gray-600">
                Tarifa: {filters.hourlyRateRange}/h
              </div>
            )}
            {filters.reputationScore && (
              <div className="text-xs text-gray-600">
                Puntuación: {filters.reputationScore}
              </div>
            )}
            {filters.availability && (
              <div className="text-xs text-gray-600">
                Disponibilidad: {filters.availability}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );

  const handleViewProfile = (freelancer) => {
    setSelectedFreelancer(freelancer);
  };

  const handleCloseProfile = () => {
    setSelectedFreelancer(null);
  };

  const handleContact = (freelancer) => {
    // TODO: Open contact modal or navigate to chat
    console.log("Contacting:", freelancer.name);
  };

  const renderFreelancerCard = (
    freelancer,
    isTopRated = false,
    isRelevant = false
  ) => {
    return (
      <motion.div
        key={freelancer.id}
        className="bg-white rounded-xl shadow-lg border border-gray-100 p-6 hover:shadow-xl transition-all duration-300 h-full"
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        {/* Header with photo and reputation */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center space-x-3">
            <img
              src={freelancer.photo}
              alt={freelancer.name}
              className="w-12 h-12 rounded-full object-cover"
            />
            <div>
              <h3 className="font-semibold text-gray-900">{freelancer.name}</h3>
              <div className="flex items-center space-x-1">
                <span className="text-yellow-400">⭐</span>
                <span className="text-sm font-medium text-gray-700">
                  {freelancer.reputation}
                </span>
                {isTopRated && (
                  <span className="ml-2 px-2 py-1 bg-yellow-100 text-yellow-800 text-xs rounded-full font-medium">
                    Top Rated
                  </span>
                )}
              </div>
            </div>
          </div>
          {freelancer.isSponsored && (
            <span className="px-2 py-1 bg-purple-100 text-purple-700 text-xs rounded-full font-medium">
              Patrocinado
            </span>
          )}
        </div>

        {/* Description */}
        <p className="text-sm text-gray-600 mb-4 line-clamp-2">
          {freelancer.description}
        </p>

        {/* Skills */}
        <div className="mb-4">
          <div className="flex flex-wrap gap-2">
            {freelancer.skills.map((skill, index) => (
              <span
                key={index}
                className={`px-2 py-1 text-xs rounded-full ${
                  isRelevant && freelancer.matchingSkills?.includes(skill)
                    ? "bg-green-100 text-green-700 font-medium"
                    : "bg-purple-100 text-purple-700"
                }`}
              >
                {skill}
              </span>
            ))}
          </div>
        </div>

        {/* Stats */}
        <div className="flex items-center justify-between mb-4 text-sm text-gray-500">
          <span>📍 {freelancer.location}</span>
          <span>💼 {freelancer.completedProjects} proyectos</span>
          <span>💰 ${freelancer.hourlyRate}/h</span>
        </div>

        {/* Action buttons */}
        <div className="flex space-x-2 mt-auto">
          <motion.button
            onClick={() => handleViewProfile(freelancer)}
            className="flex-1 bg-gray-100 text-gray-700 py-2 px-4 rounded-lg font-medium hover:bg-gray-200 transition-colors"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            Ver Perfil
          </motion.button>
          <motion.button
            onClick={() => handleContact(freelancer)}
            className="flex-1 bg-gradient-to-r from-purple-600 to-blue-600 text-white py-2 px-4 rounded-lg font-medium hover:from-purple-700 hover:to-blue-700 transition-colors"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            Contactar
          </motion.button>
        </div>
      </motion.div>
    );
  };

  const renderCarousel = (
    title,
    freelancers,
    isTopRated = false,
    isRelevant = false
  ) => {
    const carouselRef = React.useRef(null);

    const scrollLeft = () => {
      if (carouselRef.current) {
        carouselRef.current.scrollBy({ left: -320, behavior: "smooth" });
      }
    };

    const scrollRight = () => {
      if (carouselRef.current) {
        carouselRef.current.scrollBy({ left: 320, behavior: "smooth" });
      }
    };

    return (
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-gray-900">{title}</h2>
          {isTopRated && (
            <div className="flex items-center space-x-1">
              <span className="text-yellow-400 text-lg">🏆</span>
              <span className="text-sm text-gray-600">
                Basado en reputación
              </span>
            </div>
          )}
          {isRelevant && (
            <div className="flex items-center space-x-1">
              <span className="text-green-400 text-lg">🎯</span>
              <span className="text-sm text-gray-600">
                Relevante para tus proyectos
              </span>
            </div>
          )}
        </div>

        <div className="relative group">
          {/* Navigation Arrows */}
          <button
            onClick={scrollLeft}
            className="absolute left-2 top-1/2 transform -translate-y-1/2 z-10 bg-white/90 hover:bg-white border border-gray-200 rounded-full p-2 shadow-lg opacity-0 group-hover:opacity-100 transition-opacity"
            aria-label="Scroll left"
          >
            <svg
              className="w-5 h-5 text-gray-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>

          <button
            onClick={scrollRight}
            className="absolute right-2 top-1/2 transform -translate-y-1/2 z-10 bg-white/90 hover:bg-white border border-gray-200 rounded-full p-2 shadow-lg opacity-0 group-hover:opacity-100 transition-opacity"
            aria-label="Scroll right"
          >
            <svg
              className="w-5 h-5 text-gray-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>

          <div
            ref={carouselRef}
            className="flex space-x-4 overflow-x-auto scrollbar-hide custom-scrollbar pb-4 carousel-container scroll-smooth"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            {freelancers.map((freelancer) => (
              <div key={freelancer.id} className="flex-shrink-0 w-80 min-w-0">
                {renderFreelancerCard(freelancer, isTopRated, isRelevant)}
              </div>
            ))}
          </div>

          {/* Enhanced Scroll indicators */}
          <div className="absolute left-0 top-0 bottom-0 bg-gradient-to-r from-white via-white to-transparent w-12 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
            <div className="w-3 h-3 bg-gray-400 rounded-full shadow-sm"></div>
          </div>
          <div className="absolute right-0 top-0 bottom-0 bg-gradient-to-l from-white via-white to-transparent w-12 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
            <div className="w-3 h-3 bg-gray-400 rounded-full shadow-sm"></div>
          </div>

          {/* Scroll dots indicator */}
          <div className="flex justify-center space-x-1 mt-2">
            {Array.from(
              { length: Math.ceil(freelancers.length / 3) },
              (_, i) => (
                <div key={i} className="w-2 h-2 bg-gray-300 rounded-full"></div>
              )
            )}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-8">
      <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">
              Búsqueda de Talento
            </h1>
            <p className="text-gray-600">
              Encuentra los mejores freelancers para tus proyectos
            </p>
          </div>
          <motion.button
            onClick={() => setShowFilters(!showFilters)}
            className="bg-gradient-to-r from-purple-600 to-blue-600 text-white py-3 px-6 rounded-lg font-semibold hover:from-purple-700 hover:to-blue-700 transition-all duration-300"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            {showFilters ? "Ocultar Filtros" : "Búsqueda Avanzada"}
          </motion.button>
        </div>

        {/* Filters and Results Layout */}
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Filters Sidebar */}
          {showFilters && (
            <div className="lg:w-72 flex-shrink-0">
              {renderFiltersSidebar()}
            </div>
          )}

          {/* Results */}
          <div className="flex-1 min-w-0">
            {/* Results Header */}
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-xl font-bold text-gray-900">
                  {showFilters ? "Resultados Filtrados" : "Talento Destacado"}
                </h2>
                <p className="text-sm text-gray-600">
                  {showFilters
                    ? `${filteredFreelancers.length} freelancers encontrados`
                    : "Los mejores perfiles para tus proyectos"}
                </p>
              </div>

              {/* Active Filters Display */}
              {showFilters &&
                Object.values(filters).some((value) =>
                  Array.isArray(value) ? value.length > 0 : value !== ""
                ) && (
                  <div className="flex flex-wrap gap-2">
                    {filters.skills.map((skill) => (
                      <span
                        key={skill}
                        className="px-2 py-1 bg-purple-100 text-purple-700 text-xs rounded-full"
                      >
                        {skill}
                      </span>
                    ))}
                    {filters.location && (
                      <span className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded-full">
                        📍 {filters.location}
                      </span>
                    )}
                    {filters.experienceLevel && (
                      <span className="px-2 py-1 bg-green-100 text-green-700 text-xs rounded-full">
                        {filters.experienceLevel}
                      </span>
                    )}
                    {filters.hourlyRateRange && (
                      <span className="px-2 py-1 bg-yellow-100 text-yellow-700 text-xs rounded-full">
                        {filters.hourlyRateRange}/h
                      </span>
                    )}
                  </div>
                )}
            </div>

            {/* Results Grid */}
            {showFilters ? (
              // Filtered Results - More conservative grid when filters are active
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                {filteredFreelancers.length > 0 ? (
                  filteredFreelancers.map((freelancer) => (
                    <div key={freelancer.id}>
                      {renderFreelancerCard(freelancer)}
                    </div>
                  ))
                ) : (
                  <div className="col-span-full text-center py-12">
                    <div className="text-gray-400 text-6xl mb-4">🔍</div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      No se encontraron resultados
                    </h3>
                    <p className="text-gray-600 mb-4">
                      Intenta ajustar tus filtros de búsqueda
                    </p>
                    <button
                      onClick={clearFilters}
                      className="text-purple-600 hover:text-purple-700 font-medium"
                    >
                      Limpiar filtros
                    </button>
                  </div>
                )}
              </div>
            ) : (
              // Original Carousels
              <div>
                {/* Featured Talent */}
                {renderCarousel(
                  "Talento Destacado",
                  allFreelancers.slice(0, 5)
                )}

                {/* Top Rated Talent */}
                {renderCarousel(
                  "Los Mejores por Reseñas",
                  allFreelancers.filter((f) => f.reputation >= 4.8).slice(0, 5),
                  true
                )}

                {/* Relevant Talent */}
                {renderCarousel(
                  "Usuarios con lo que buscas",
                  allFreelancers
                    .filter((f) =>
                      f.skills.some((skill) =>
                        ["Soroban", "Rust", "Stellar"].includes(skill)
                      )
                    )
                    .slice(0, 5),
                  false,
                  true
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Profile Modal */}
      <AnimatePresence>
        {selectedFreelancer && (
          <FreelancerProfile
            freelancer={selectedFreelancer}
            onClose={handleCloseProfile}
            isModal={true}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default TalentSearchSection;
