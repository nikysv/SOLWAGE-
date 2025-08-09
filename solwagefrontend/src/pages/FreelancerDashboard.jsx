import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import ReferralProgram from "../components/dashboard/ReferralProgram";

const FreelancerDashboard = ({ auth }) => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("ofertas");
  const [searchTerm, setSearchTerm] = useState("");
  const [showFilters, setShowFilters] = useState(false);

  // Estados para filtros
  const [filters, setFilters] = useState({
    technologies: [],
    experienceLevel: "",
    budgetRange: "",
    projectType: "",
    duration: "",
    location: "",
  });

  const handleLogout = () => {
    auth.logout();
  };

  // Opciones de filtros
  const filterOptions = {
    technologies: [
      "React",
      "Node.js",
      "Python",
      "Java",
      "C++",
      "C#",
      "PHP",
      "Ruby",
      "Go",
      "Rust",
      "Vue.js",
      "Angular",
      "Svelte",
      "Next.js",
      "Nuxt.js",
      "Laravel",
      "Django",
      "Flask",
      "Spring Boot",
      "Express.js",
      "FastAPI",
      "ASP.NET",
      "Solidity",
      "Ethereum",
      "Web3",
      "AWS",
      "Azure",
      "Google Cloud",
      "Docker",
      "Kubernetes",
      "MongoDB",
      "PostgreSQL",
      "MySQL",
      "Redis",
      "GraphQL",
      "REST API",
      "Microservices",
      "Machine Learning",
      "AI",
      "Data Science",
      "DevOps",
      "CI/CD",
      "UI/UX",
      "Figma",
      "Adobe XD",
      "Sketch",
      "Mobile Development",
      "React Native",
      "Flutter",
      "iOS",
      "Android",
      "Swift",
      "Kotlin",
    ],
    experienceLevel: ["Junior", "Mid-level", "Senior", "Expert"],
    budgetRange: [
      "$0-$500",
      "$500-$1000",
      "$1000-$2500",
      "$2500-$5000",
      "$5000+",
    ],
    projectType: ["Fixed Price", "Hourly", "Milestone-based"],
    duration: [
      "1-2 semanas",
      "3-4 semanas",
      "1-2 meses",
      "3-6 meses",
      "6+ meses",
    ],
    location: ["Remoto", "Híbrido", "Presencial", "Cualquier ubicación"],
  };

  // Datos simulados
  const jobOffers = [
    {
      id: 1,
      title: "Desarrollador React Full-Stack",
      client: "TechCorp Solutions",
      budget: "$2,500 - $4,000",
      duration: "2-3 meses",
      skills: ["React", "Node.js", "MongoDB"],
      description:
        "Necesitamos un desarrollador experimentado para crear una aplicación web completa...",
      posted: "hace 2 horas",
      proposals: 12,
      type: "Fixed Price",
      experienceLevel: "Senior",
      location: "Remoto",
      isRecommended: true,
      matchScore: 95,
    },
    {
      id: 2,
      title: "Smart Contract Developer",
      client: "Blockchain Ventures",
      budget: "$3,000 - $5,000",
      duration: "1-2 meses",
      skills: ["Solidity", "Ethereum", "Web3"],
      description:
        "Buscamos un desarrollador de smart contracts para nuestro proyecto DeFi...",
      posted: "hace 5 horas",
      proposals: 8,
      type: "Hourly",
      experienceLevel: "Expert",
      location: "Remoto",
      isRecommended: true,
      matchScore: 92,
    },
    {
      id: 3,
      title: "UI/UX Designer",
      client: "Creative Studio",
      budget: "$1,500 - $2,500",
      duration: "3-4 semanas",
      skills: ["Figma", "Adobe XD", "Prototyping"],
      description:
        "Diseñador creativo para rediseñar la interfaz de nuestra aplicación móvil...",
      posted: "hace 1 día",
      proposals: 15,
      type: "Fixed Price",
      experienceLevel: "Mid-level",
      location: "Híbrido",
      isRecommended: false,
      matchScore: 78,
    },
    {
      id: 4,
      title: "Data Scientist",
      client: "Analytics Pro",
      budget: "$4,000 - $6,000",
      duration: "3-4 meses",
      skills: ["Python", "Machine Learning", "Data Science"],
      description:
        "Científico de datos para desarrollar modelos predictivos para análisis financiero...",
      posted: "hace 3 horas",
      proposals: 6,
      type: "Fixed Price",
      experienceLevel: "Senior",
      location: "Remoto",
      isRecommended: true,
      matchScore: 88,
    },
    {
      id: 5,
      title: "DevOps Engineer",
      client: "Cloud Solutions",
      budget: "$3,500 - $5,500",
      duration: "2-3 meses",
      skills: ["AWS", "Docker", "Kubernetes", "CI/CD"],
      description:
        "Ingeniero DevOps para implementar infraestructura como código y pipelines...",
      posted: "hace 6 horas",
      proposals: 9,
      type: "Hourly",
      experienceLevel: "Senior",
      location: "Remoto",
      isRecommended: false,
      matchScore: 65,
    },
    {
      id: 6,
      title: "Mobile App Developer",
      client: "AppStudio",
      budget: "$2,000 - $3,500",
      duration: "1-2 meses",
      skills: ["React Native", "iOS", "Android"],
      description:
        "Desarrollador móvil para crear una aplicación de delivery con React Native...",
      posted: "hace 4 horas",
      proposals: 11,
      type: "Fixed Price",
      experienceLevel: "Mid-level",
      location: "Presencial",
      isRecommended: false,
      matchScore: 72,
    },
    {
      id: 7,
      title: "Backend API Developer",
      client: "API Solutions",
      budget: "$2,800 - $4,200",
      duration: "2-3 meses",
      skills: ["Node.js", "PostgreSQL", "GraphQL", "REST API"],
      description:
        "Desarrollador backend para crear APIs robustas y escalables...",
      posted: "hace 1 día",
      proposals: 14,
      type: "Fixed Price",
      experienceLevel: "Senior",
      location: "Remoto",
      isRecommended: true,
      matchScore: 91,
    },
    {
      id: 8,
      title: "Frontend Developer",
      client: "WebCraft",
      budget: "$1,800 - $2,800",
      duration: "1-2 meses",
      skills: ["Vue.js", "TypeScript", "Tailwind CSS"],
      description:
        "Desarrollador frontend para crear interfaces modernas y responsivas...",
      posted: "hace 2 días",
      proposals: 18,
      type: "Hourly",
      experienceLevel: "Mid-level",
      location: "Remoto",
      isRecommended: false,
      matchScore: 69,
    },
  ];

  // Función para filtrar ofertas
  const filteredOffers = jobOffers.filter((offer) => {
    // Filtro por tecnologías
    if (filters.technologies.length > 0) {
      const hasMatchingTech = filters.technologies.some((tech) =>
        offer.skills.some((skill) =>
          skill.toLowerCase().includes(tech.toLowerCase())
        )
      );
      if (!hasMatchingTech) return false;
    }

    // Filtro por nivel de experiencia
    if (
      filters.experienceLevel &&
      offer.experienceLevel !== filters.experienceLevel
    ) {
      return false;
    }

    // Filtro por tipo de proyecto
    if (filters.projectType && offer.type !== filters.projectType) {
      return false;
    }

    // Filtro por ubicación
    if (filters.location && offer.location !== filters.location) {
      return false;
    }

    // Filtro por búsqueda de texto
    if (searchTerm) {
      const searchLower = searchTerm.toLowerCase();
      const matchesSearch =
        offer.title.toLowerCase().includes(searchLower) ||
        offer.client.toLowerCase().includes(searchLower) ||
        offer.description.toLowerCase().includes(searchLower) ||
        offer.skills.some((skill) => skill.toLowerCase().includes(searchLower));

      if (!matchesSearch) return false;
    }

    return true;
  });

  // Obtener ofertas recomendadas
  const recommendedOffers = filteredOffers.filter(
    (offer) => offer.isRecommended
  );
  const otherOffers = filteredOffers.filter((offer) => !offer.isRecommended);

  // Función para manejar cambios en filtros
  const handleFilterChange = (filterType, value) => {
    if (filterType === "technologies") {
      setFilters((prev) => ({
        ...prev,
        technologies: prev.technologies.includes(value)
          ? prev.technologies.filter((tech) => tech !== value)
          : [...prev.technologies, value],
      }));
    } else {
      setFilters((prev) => ({
        ...prev,
        [filterType]: value,
      }));
    }
  };

  // Función para limpiar filtros
  const clearFilters = () => {
    setFilters({
      technologies: [],
      experienceLevel: "",
      budgetRange: "",
      projectType: "",
      duration: "",
      location: "",
    });
  };

  const invitations = [
    {
      id: 1,
      title: "Proyecto de E-commerce",
      client: "Retail Solutions",
      message:
        "Hemos visto tu perfil y nos gustaría invitarte a postular para este proyecto...",
      budget: "$4,000 - $6,000",
      deadline: "2 días",
    },
    {
      id: 2,
      title: "Aplicación Fintech",
      client: "FinanceTech",
      message:
        "Tu experiencia en blockchain nos parece perfecta para este proyecto...",
      budget: "$5,000 - $8,000",
      deadline: "5 días",
    },
  ];

  const activeJobs = [
    {
      id: 1,
      title: "Desarrollo de API REST",
      client: "DataFlow Inc",
      progress: 75,
      earnings: "$2,400",
      deadline: "15 días restantes",
    },
    {
      id: 2,
      title: "Diseño de Dashboard",
      client: "Analytics Pro",
      progress: 30,
      earnings: "$1,200",
      deadline: "25 días restantes",
    },
  ];

  const stats = {
    thisMonth: "$2,100",
    completedJobs: 12,
    activeJobs: 2,
    rating: 4.8,
    responseRate: "98%",
  };

  // Datos del perfil
  const profileData = {
    fullName: "Carlos Rodríguez",
    title: "Full-Stack Developer & Smart Contract Specialist",
    location: "México",
    hourlyRate: "$45/hr",
    completedJobs: 12,
    rating: 4.8,
    responseRate: "98%",
    skills: [
      "React",
      "Node.js",
      "Solidity",
      "Ethereum",
      "TypeScript",
      "MongoDB",
      "AWS",
    ],
    experience: "5+ años desarrollando aplicaciones web y smart contracts",
    bio: "Desarrollador apasionado por la tecnología blockchain y las aplicaciones descentralizadas. Especializado en crear soluciones innovadoras que combinan desarrollo web tradicional con smart contracts.",
    nftSoulbound: {
      id: "SB-001",
      name: "Solwage Verified Developer",
      description:
        "NFT Soulbound que certifica la identidad y habilidades verificadas",
      image: "🎖️",
      rarity: "Rare",
      issuedDate: "2024-01-15",
      metadata: {
        contractAddress: "0x1234567890abcdef1234567890abcdef12345678",
        tokenId: "1",
        blockchain: "Ethereum",
        standard: "ERC-1155",
        soulbound: true,
        nonTransferable: true,
        verificationData: {
          identityVerified: true,
          skillsVerified: true,
          backgroundChecked: true,
          kycCompleted: true,
          documentsVerified: ["ID", "Resume", "Portfolio", "References"],
          verificationDate: "2024-01-15",
          verifiedBy: "Solwage Verification System",
          verificationScore: 95,
        },
        skills: [
          {
            name: "React",
            level: "Expert",
            verified: true,
            projects: 8,
            years: 4,
          },
          {
            name: "Node.js",
            level: "Advanced",
            verified: true,
            projects: 12,
            years: 3,
          },
          {
            name: "Solidity",
            level: "Intermediate",
            verified: true,
            projects: 5,
            years: 2,
          },
          {
            name: "Ethereum",
            level: "Advanced",
            verified: true,
            projects: 6,
            years: 2,
          },
        ],
        achievements: [
          {
            id: "ACH-001",
            name: "First Project Completed",
            description: "Successfully completed first project on Solwage",
            date: "2023-12-01",
            icon: "🏆",
          },
          {
            id: "ACH-002",
            name: "5-Star Rating",
            description: "Maintained 5-star rating for 3 consecutive projects",
            date: "2024-01-10",
            icon: "⭐",
          },
          {
            id: "ACH-003",
            name: "Blockchain Expert",
            description: "Completed 5+ blockchain projects",
            date: "2024-01-15",
            icon: "🔗",
          },
        ],
        reputation: {
          completedProjects: 12,
          averageRating: 4.8,
          responseRate: "98%",
          onTimeDelivery: "100%",
          clientSatisfaction: "95%",
        },
      },
    },
    workHistory: [
      {
        id: 1,
        title: "Desarrollo de DApp DeFi",
        client: "FinanceTech Solutions",
        duration: "3 meses",
        earnings: "$3,200",
        rating: 5,
        review:
          "Excelente trabajo. Carlos entregó el proyecto antes del deadline y la calidad del código es excepcional. Definitivamente lo recomiendo.",
        completedDate: "2024-01-10",
      },
      {
        id: 2,
        title: "Smart Contract para NFT Marketplace",
        client: "ArtBlock Studio",
        duration: "2 meses",
        earnings: "$2,800",
        rating: 5,
        review:
          "Muy profesional y comunicativo. El smart contract funciona perfectamente y la documentación es clara.",
        completedDate: "2023-12-15",
      },
      {
        id: 3,
        title: "API REST para E-commerce",
        client: "Retail Solutions",
        duration: "1.5 meses",
        earnings: "$2,450",
        rating: 4,
        review:
          "Buen trabajo en general. Algunos retrasos menores pero la calidad final es satisfactoria.",
        completedDate: "2023-11-20",
      },
    ],
    reviews: [
      {
        id: 1,
        client: "FinanceTech Solutions",
        rating: 5,
        comment:
          "Carlos es un desarrollador excepcional. Su conocimiento en blockchain y capacidad de resolver problemas complejos es impresionante. El proyecto se entregó antes del deadline y la calidad del código es de nivel empresarial.",
        date: "2024-01-15",
        project: "Desarrollo de DApp DeFi",
      },
      {
        id: 2,
        client: "ArtBlock Studio",
        rating: 5,
        comment:
          "Muy profesional y comunicativo. Carlos entendió perfectamente los requerimientos y entregó un smart contract robusto y bien documentado. Definitivamente volveremos a trabajar con él.",
        date: "2023-12-20",
        project: "Smart Contract para NFT Marketplace",
      },
      {
        id: 3,
        client: "Retail Solutions",
        rating: 4,
        comment:
          "Buen trabajo en general. Carlos es técnicamente sólido y entregó una API funcional. Hubo algunos retrasos menores en la comunicación, pero el resultado final fue satisfactorio.",
        date: "2023-11-25",
        project: "API REST para E-commerce",
      },
    ],
  };

  const renderJobCard = (job) => (
    <motion.div
      key={job.id}
      className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-lg transition-all duration-300"
      whileHover={{ y: -2 }}
    >
      <div className="flex justify-between items-start mb-4">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            <h3 className="text-lg font-semibold text-gray-900">{job.title}</h3>
            {job.isRecommended && (
              <span className="px-2 py-1 bg-purple-100 text-purple-700 text-xs rounded-full font-medium">
                ⭐ Recomendado
              </span>
            )}
          </div>
          <p className="text-sm text-gray-600">{job.client}</p>
        </div>
        <div className="flex flex-col items-end gap-2">
          <span
            className={`px-3 py-1 rounded-full text-xs font-medium ${
              job.type === "Fixed Price"
                ? "bg-green-100 text-green-800"
                : "bg-blue-100 text-blue-800"
            }`}
          >
            {job.type}
          </span>
          {job.matchScore && (
            <span className="px-2 py-1 bg-green-100 text-green-700 text-xs rounded-full font-medium">
              {job.matchScore}% Match
            </span>
          )}
        </div>
      </div>

      <p className="text-gray-700 mb-4 line-clamp-2">{job.description}</p>

      <div className="flex flex-wrap gap-2 mb-4">
        {job.skills.map((skill, index) => (
          <span
            key={index}
            className="px-2 py-1 bg-purple-100 text-purple-700 text-xs rounded-full"
          >
            {skill}
          </span>
        ))}
      </div>

      <div className="flex justify-between items-center text-sm text-gray-600 mb-4">
        <span>💰 {job.budget}</span>
        <span>⏱️ {job.duration}</span>
        <span>📝 {job.proposals} propuestas</span>
      </div>

      <div className="flex justify-between items-center">
        <span className="text-xs text-gray-500">{job.posted}</span>
        <motion.button
          className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:from-purple-700 hover:to-blue-700 transition-all duration-300"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Postular
        </motion.button>
      </div>
    </motion.div>
  );

  const renderInvitationCard = (invitation) => (
    <motion.div
      key={invitation.id}
      className="bg-white rounded-lg border border-purple-200 p-6 hover:shadow-lg transition-all duration-300"
      whileHover={{ y: -2 }}
    >
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-1">
            {invitation.title}
          </h3>
          <p className="text-sm text-gray-600">{invitation.client}</p>
        </div>
        <span className="px-3 py-1 bg-purple-100 text-purple-800 text-xs font-medium rounded-full">
          Invitación
        </span>
      </div>

      <p className="text-gray-700 mb-4">{invitation.message}</p>

      <div className="flex justify-between items-center text-sm text-gray-600 mb-4">
        <span>💰 {invitation.budget}</span>
        <span>⏰ {invitation.deadline}</span>
      </div>

      <div className="flex gap-2">
        <motion.button
          className="flex-1 bg-gradient-to-r from-purple-600 to-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:from-purple-700 hover:to-blue-700 transition-all duration-300"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Aceptar
        </motion.button>
        <motion.button
          className="flex-1 bg-gray-100 text-gray-700 px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-200 transition-all duration-300"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Rechazar
        </motion.button>
      </div>
    </motion.div>
  );

  const renderActiveJobCard = (job) => (
    <motion.div
      key={job.id}
      className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-lg transition-all duration-300"
      whileHover={{ y: -2 }}
    >
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-1">
            {job.title}
          </h3>
          <p className="text-sm text-gray-600">{job.client}</p>
        </div>
        <span className="px-3 py-1 bg-green-100 text-green-800 text-xs font-medium rounded-full">
          Activo
        </span>
      </div>

      <div className="mb-4">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm text-gray-600">Progreso</span>
          <span className="text-sm font-medium text-gray-900">
            {job.progress}%
          </span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className="bg-gradient-to-r from-purple-600 to-blue-600 h-2 rounded-full transition-all duration-300"
            style={{ width: `${job.progress}%` }}
          ></div>
        </div>
      </div>

      <div className="flex justify-between items-center text-sm text-gray-600 mb-4">
        <span>💰 {job.earnings}</span>
        <span>⏰ {job.deadline}</span>
      </div>

      <motion.button
        onClick={() => navigate(`/freelancer/work/${job.id}`)}
        className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:from-purple-700 hover:to-blue-700 transition-all duration-300"
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        Ver Detalles
      </motion.button>
    </motion.div>
  );

  const renderWorkHistoryCard = (work) => (
    <motion.div
      key={work.id}
      className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-lg transition-all duration-300"
      whileHover={{ y: -2 }}
    >
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-1">
            {work.title}
          </h3>
          <p className="text-sm text-gray-600">{work.client}</p>
        </div>
        <div className="flex items-center space-x-2">
          <div className="flex items-center">
            {[...Array(5)].map((_, i) => (
              <span
                key={i}
                className={`text-sm ${
                  i < work.rating ? "text-yellow-400" : "text-gray-300"
                }`}
              >
                ⭐
              </span>
            ))}
          </div>
          <span className="text-sm text-gray-500">({work.rating})</span>
        </div>
      </div>

      <div className="flex justify-between items-center text-sm text-gray-600 mb-4">
        <span>⏱️ {work.duration}</span>
        <span>📅 {new Date(work.completedDate).toLocaleDateString()}</span>
      </div>

      <p className="text-gray-700 text-sm mb-4 italic">"{work.review}"</p>

      <div className="flex justify-between items-center">
        <span className="text-xs text-gray-500">Completado</span>
        <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">
          ✅ Finalizado
        </span>
      </div>
    </motion.div>
  );

  const renderReviewCard = (review) => (
    <motion.div
      key={review.id}
      className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-lg transition-all duration-300"
      whileHover={{ y: -2 }}
    >
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-1">
            {review.client}
          </h3>
          <p className="text-sm text-gray-600">{review.project}</p>
        </div>
        <div className="flex items-center space-x-2">
          <div className="flex items-center">
            {[...Array(5)].map((_, i) => (
              <span
                key={i}
                className={`text-sm ${
                  i < review.rating ? "text-yellow-400" : "text-gray-300"
                }`}
              >
                ⭐
              </span>
            ))}
          </div>
          <span className="text-sm text-gray-500">({review.rating})</span>
        </div>
      </div>

      <p className="text-gray-700 mb-4">"{review.comment}"</p>

      <div className="flex justify-between items-center text-sm text-gray-500">
        <span>{new Date(review.date).toLocaleDateString()}</span>
        <span>📝 Reseña verificada</span>
      </div>
    </motion.div>
  );

  // Componente del sidebar de filtros
  const renderFiltersSidebar = () => (
    <div className="bg-white rounded-lg border border-gray-200 p-4 lg:p-6 h-fit">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900">🔍 Filtros</h3>
        <button
          onClick={clearFilters}
          className="text-sm text-purple-600 hover:text-purple-700 font-medium"
        >
          Limpiar
        </button>
      </div>

      {/* Tecnologías */}
      <div className="mb-6">
        <h4 className="font-medium text-gray-900 mb-3">Tecnologías</h4>
        <div className="max-h-32 lg:max-h-40 overflow-y-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-2">
            {filterOptions.technologies.slice(0, 16).map((tech) => (
              <label
                key={tech}
                className="flex items-center space-x-2 cursor-pointer"
              >
                <input
                  type="checkbox"
                  checked={filters.technologies.includes(tech)}
                  onChange={() => handleFilterChange("technologies", tech)}
                  className="rounded border-gray-300 text-purple-600 focus:ring-purple-500"
                />
                <span className="text-sm text-gray-700">{tech}</span>
              </label>
            ))}
          </div>
        </div>
      </div>

      {/* Nivel de Experiencia */}
      <div className="mb-6">
        <h4 className="font-medium text-gray-900 mb-3">Nivel de Experiencia</h4>
        <select
          value={filters.experienceLevel}
          onChange={(e) =>
            handleFilterChange("experienceLevel", e.target.value)
          }
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
        >
          <option value="">Todos los niveles</option>
          {filterOptions.experienceLevel.map((level) => (
            <option key={level} value={level}>
              {level}
            </option>
          ))}
        </select>
      </div>

      {/* Tipo de Proyecto */}
      <div className="mb-6">
        <h4 className="font-medium text-gray-900 mb-3">Tipo de Proyecto</h4>
        <select
          value={filters.projectType}
          onChange={(e) => handleFilterChange("projectType", e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
        >
          <option value="">Todos los tipos</option>
          {filterOptions.projectType.map((type) => (
            <option key={type} value={type}>
              {type}
            </option>
          ))}
        </select>
      </div>

      {/* Ubicación */}
      <div className="mb-6">
        <h4 className="font-medium text-gray-900 mb-3">Ubicación</h4>
        <select
          value={filters.location}
          onChange={(e) => handleFilterChange("location", e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
        >
          <option value="">Cualquier ubicación</option>
          {filterOptions.location.map((loc) => (
            <option key={loc} value={loc}>
              {loc}
            </option>
          ))}
        </select>
      </div>

      {/* Duración */}
      <div className="mb-6">
        <h4 className="font-medium text-gray-900 mb-3">Duración</h4>
        <select
          value={filters.duration}
          onChange={(e) => handleFilterChange("duration", e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
        >
          <option value="">Cualquier duración</option>
          {filterOptions.duration.map((dur) => (
            <option key={dur} value={dur}>
              {dur}
            </option>
          ))}
        </select>
      </div>

      {/* Estadísticas de filtros */}
      <div className="pt-4 border-t border-gray-200">
        <div className="text-sm text-gray-600">
          <p>Ofertas encontradas: {filteredOffers.length}</p>
          <p>Recomendadas: {recommendedOffers.length}</p>
        </div>
      </div>
    </div>
  );

  const renderNFTSoulbound = () => (
    <div className="space-y-6">
      {/* NFT Principal */}
      <motion.div
        className="bg-gradient-to-br from-purple-600 to-blue-600 rounded-lg p-6 text-white"
        whileHover={{ scale: 1.02 }}
      >
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <span className="text-3xl">{profileData.nftSoulbound.image}</span>
            <div>
              <h3 className="text-lg font-semibold">
                {profileData.nftSoulbound.name}
              </h3>
              <p className="text-purple-200 text-sm">
                ID: {profileData.nftSoulbound.id}
              </p>
            </div>
          </div>
          <span className="px-3 py-1 bg-white bg-opacity-20 rounded-full text-xs font-medium">
            {profileData.nftSoulbound.rarity}
          </span>
        </div>

        <p className="text-purple-100 mb-4">
          {profileData.nftSoulbound.description}
        </p>

        <div className="flex justify-between items-center text-sm">
          <span>
            Emitido:{" "}
            {new Date(profileData.nftSoulbound.issuedDate).toLocaleDateString()}
          </span>
          <span>🔒 Soulbound (No transferible)</span>
        </div>

        {/* Botones para ver en Blockchain */}
        <div className="mt-4 pt-4 border-t border-purple-300 space-y-2">
          <motion.button
            onClick={() => {
              const etherscanUrl = `https://etherscan.io/token/${profileData.nftSoulbound.metadata.contractAddress}?a=${profileData.nftSoulbound.metadata.tokenId}`;
              window.open(etherscanUrl, "_blank");
            }}
            className="w-full bg-white bg-opacity-20 hover:bg-opacity-30 text-white px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 border border-white border-opacity-30"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            🔗 Ver en Etherscan
          </motion.button>

          <motion.button
            onClick={() => {
              const openseaUrl = `https://opensea.io/assets/ethereum/${profileData.nftSoulbound.metadata.contractAddress}/${profileData.nftSoulbound.metadata.tokenId}`;
              window.open(openseaUrl, "_blank");
            }}
            className="w-full bg-white bg-opacity-10 hover:bg-opacity-20 text-white px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 border border-white border-opacity-20"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            🖼️ Ver en OpenSea
          </motion.button>

          <motion.button
            onClick={() => {
              const metadataUrl = `https://api.opensea.io/api/v1/metadata/${profileData.nftSoulbound.metadata.contractAddress}/${profileData.nftSoulbound.metadata.tokenId}`;
              window.open(metadataUrl, "_blank");
            }}
            className="w-full bg-white bg-opacity-10 hover:bg-opacity-20 text-white px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 border border-white border-opacity-20"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            📄 Ver Metadata JSON
          </motion.button>
        </div>
      </motion.div>

      {/* Metadata Detallada */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h4 className="text-lg font-semibold text-gray-900 mb-4">
          📋 Metadata del NFT
        </h4>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Información Técnica */}
          <div>
            <h5 className="font-medium text-gray-900 mb-3">
              🔗 Información Técnica
            </h5>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Contract Address:</span>
                <span className="font-mono text-gray-900 text-xs">
                  {profileData.nftSoulbound.metadata.contractAddress.slice(
                    0,
                    10
                  )}
                  ...
                  {profileData.nftSoulbound.metadata.contractAddress.slice(-8)}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Token ID:</span>
                <span className="font-medium text-gray-900">
                  {profileData.nftSoulbound.metadata.tokenId}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Blockchain:</span>
                <span className="font-medium text-gray-900">
                  {profileData.nftSoulbound.metadata.blockchain}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Standard:</span>
                <span className="font-medium text-gray-900">
                  {profileData.nftSoulbound.metadata.standard}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Soulbound:</span>
                <span className="font-medium text-green-600">✅ Sí</span>
              </div>
            </div>
          </div>

          {/* Verificación */}
          <div>
            <h5 className="font-medium text-gray-900 mb-3">✅ Verificación</h5>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Score de Verificación:</span>
                <span className="font-medium text-purple-600">
                  {
                    profileData.nftSoulbound.metadata.verificationData
                      .verificationScore
                  }
                  %
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Identidad:</span>
                <span className="font-medium text-green-600">
                  ✅ Verificada
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Habilidades:</span>
                <span className="font-medium text-green-600">
                  ✅ Verificadas
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Background Check:</span>
                <span className="font-medium text-green-600">
                  ✅ Completado
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">KYC:</span>
                <span className="font-medium text-green-600">
                  ✅ Completado
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Habilidades Verificadas */}
        <div className="mt-6">
          <h5 className="font-medium text-gray-900 mb-3">
            🛠️ Habilidades Verificadas
          </h5>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {profileData.nftSoulbound.metadata.skills.map((skill, index) => (
              <div key={index} className="bg-gray-50 rounded-lg p-3">
                <div className="flex justify-between items-center mb-2">
                  <span className="font-medium text-gray-900">
                    {skill.name}
                  </span>
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-medium ${
                      skill.level === "Expert"
                        ? "bg-red-100 text-red-800"
                        : skill.level === "Advanced"
                        ? "bg-orange-100 text-orange-800"
                        : "bg-blue-100 text-blue-800"
                    }`}
                  >
                    {skill.level}
                  </span>
                </div>
                <div className="flex justify-between text-xs text-gray-600">
                  <span>{skill.projects} proyectos</span>
                  <span>{skill.years} años</span>
                  <span className="text-green-600">✅ Verificado</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Logros */}
        <div className="mt-6">
          <h5 className="font-medium text-gray-900 mb-3">🏆 Logros</h5>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {profileData.nftSoulbound.metadata.achievements.map(
              (achievement, index) => (
                <div
                  key={index}
                  className="bg-gradient-to-br from-yellow-50 to-orange-50 rounded-lg p-3 border border-yellow-200"
                >
                  <div className="flex items-center space-x-2 mb-2">
                    <span className="text-lg">{achievement.icon}</span>
                    <span className="font-medium text-gray-900 text-sm">
                      {achievement.name}
                    </span>
                  </div>
                  <p className="text-xs text-gray-600 mb-2">
                    {achievement.description}
                  </p>
                  <span className="text-xs text-gray-500">
                    {new Date(achievement.date).toLocaleDateString()}
                  </span>
                </div>
              )
            )}
          </div>
        </div>

        {/* Reputación */}
        <div className="mt-6">
          <h5 className="font-medium text-gray-900 mb-3">📊 Reputación</h5>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">
                {profileData.nftSoulbound.metadata.reputation.completedProjects}
              </div>
              <div className="text-xs text-gray-600">Proyectos Completados</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-yellow-600">
                {profileData.nftSoulbound.metadata.reputation.averageRating}/5
              </div>
              <div className="text-xs text-gray-600">Rating Promedio</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">
                {profileData.nftSoulbound.metadata.reputation.responseRate}
              </div>
              <div className="text-xs text-gray-600">Tasa de Respuesta</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-indigo-600">
                {profileData.nftSoulbound.metadata.reputation.onTimeDelivery}
              </div>
              <div className="text-xs text-gray-600">Entrega a Tiempo</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-pink-600">
                {
                  profileData.nftSoulbound.metadata.reputation
                    .clientSatisfaction
                }
              </div>
              <div className="text-xs text-gray-600">Satisfacción Cliente</div>
            </div>
          </div>
        </div>

        {/* Información de Blockchain */}
        <div className="mt-6">
          <h5 className="font-medium text-gray-900 mb-3">
            🔗 Información de Blockchain
          </h5>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <div className="bg-gray-50 rounded-lg p-4 space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Contract Address:</span>
                <span className="font-mono text-gray-900 text-xs">
                  {profileData.nftSoulbound.metadata.contractAddress}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Token ID:</span>
                <span className="font-medium text-gray-900">
                  {profileData.nftSoulbound.metadata.tokenId}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Network:</span>
                <span className="font-medium text-gray-900">
                  {profileData.nftSoulbound.metadata.blockchain} Mainnet
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Token Standard:</span>
                <span className="font-medium text-gray-900">
                  {profileData.nftSoulbound.metadata.standard}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Soulbound:</span>
                <span className="font-medium text-green-600">
                  ✅ No Transferible
                </span>
              </div>
            </div>

            {/* QR Code del NFT */}
            <div className="bg-gray-50 rounded-lg p-4 text-center">
              <h6 className="font-medium text-gray-900 mb-3">
                📱 QR Code del NFT
              </h6>
              <div className="bg-white rounded-lg p-4 inline-block">
                <div className="w-32 h-32 bg-gray-200 rounded-lg flex items-center justify-center">
                  <span className="text-4xl">🎖️</span>
                </div>
              </div>
              <p className="text-xs text-gray-600 mt-2">
                Escanea para ver el NFT en tu wallet
              </p>
              <motion.button
                onClick={() => {
                  const nftUrl = `ethereum:${profileData.nftSoulbound.metadata.contractAddress}/${profileData.nftSoulbound.metadata.tokenId}`;
                  navigator.clipboard.writeText(nftUrl);
                  alert("URL del NFT copiada al portapapeles");
                }}
                className="mt-2 px-3 py-1 bg-purple-100 text-purple-700 text-xs rounded-full hover:bg-purple-200 transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                📋 Copiar URL
              </motion.button>
            </div>
          </div>
        </div>

        {/* Documentos Verificados */}
        <div className="mt-6">
          <h5 className="font-medium text-gray-900 mb-3">
            📄 Documentos Verificados
          </h5>
          <div className="flex flex-wrap gap-2">
            {profileData.nftSoulbound.metadata.verificationData.documentsVerified.map(
              (doc, index) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-green-100 text-green-800 text-sm rounded-full font-medium"
                >
                  ✅ {doc}
                </span>
              )
            )}
          </div>
          <p className="text-xs text-gray-500 mt-2">
            Verificado por:{" "}
            {profileData.nftSoulbound.metadata.verificationData.verifiedBy} el{" "}
            {new Date(
              profileData.nftSoulbound.metadata.verificationData.verificationDate
            ).toLocaleDateString()}
          </p>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
      {/* Header - Mobile First - Fixed */}
      <div className="bg-white shadow-sm border-b border-gray-200 fixed top-0 left-0 right-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Mobile Header */}
          <div className="lg:hidden">
            <div className="flex items-center justify-between h-16">
              <h1 className="text-xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                Solwage
              </h1>

              <div className="flex items-center space-x-3">
                {/* Mobile Search Button */}
                <button
                  onClick={() => setShowFilters(!showFilters)}
                  className="p-2 text-gray-600 hover:text-purple-600 transition-colors"
                >
                  🔍
                </button>

                {/* Mobile Menu Button */}
                <button
                  onClick={() => setShowFilters(!showFilters)}
                  className="p-2 text-gray-600 hover:text-purple-600 transition-colors"
                >
                  ☰
                </button>
              </div>
            </div>

            {/* Mobile Search Bar */}
            <div className={`pb-4 ${showFilters ? "block" : "hidden"}`}>
              <div className="relative">
                <input
                  type="text"
                  placeholder="Buscar trabajos..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-300"
                />
                <span className="absolute right-3 top-2.5 text-gray-400">
                  🔍
                </span>
              </div>
            </div>

            {/* Mobile Navigation */}
            <div className={`pb-4 ${showFilters ? "block" : "hidden"}`}>
              <nav className="flex flex-col space-y-2">
                {[
                  { id: "ofertas", label: "Ofertas", icon: "💼" },
                  { id: "invitaciones", label: "Invitaciones", icon: "📨" },
                  { id: "activos", label: "Trabajos Activos", icon: "⚡" },
                  { id: "referidos", label: "Referidos", icon: "🚀" },
                  { id: "perfil", label: "Perfil", icon: "👤" },
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => {
                      if (tab.id === "referidos") {
                        navigate("/freelancer/referidos");
                      } else if (tab.id === "perfil") {
                        navigate("/freelancer/perfil");
                      } else {
                        setActiveTab(tab.id);
                      }
                      setShowFilters(false);
                    }}
                    className={`flex items-center space-x-3 px-4 py-3 rounded-lg text-sm font-medium transition-all duration-300 ${
                      activeTab === tab.id
                        ? "bg-purple-100 text-purple-700"
                        : "text-gray-600 hover:text-purple-600 hover:bg-purple-50"
                    }`}
                  >
                    <span className="text-lg">{tab.icon}</span>
                    <span>{tab.label}</span>
                  </button>
                ))}

                {/* Sección Wallet en móvil */}
                <div className="pt-2">
                  <div className="px-4 pb-2 text-xs font-semibold text-gray-500">
                    Wallet
                  </div>
                  <button
                    onClick={() => {
                      navigate("/freelancer/wallet");
                      setShowFilters(false);
                    }}
                    className="flex items-center space-x-3 px-4 py-3 rounded-lg text-sm font-medium text-gray-600 hover:text-purple-600 hover:bg-purple-50"
                  >
                    <span className="text-lg">👛</span>
                    <span>Mi Wallet</span>
                  </button>
                  <button
                    onClick={() => {
                      navigate("/freelancer/defi");
                      setShowFilters(false);
                    }}
                    className="flex items-center space-x-3 px-4 py-3 rounded-lg text-sm font-medium text-gray-600 hover:text-purple-600 hover:bg-purple-50"
                  >
                    <span className="text-lg">📈</span>
                    <span>DeFi</span>
                  </button>
                </div>

                {/* Mobile Logout Button */}
                <motion.button
                  onClick={handleLogout}
                  className="flex items-center space-x-3 px-4 py-3 bg-red-500 text-white rounded-lg text-sm font-medium hover:bg-red-600 transition-all duration-300 mt-4"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <span>🚪</span>
                  <span>Cerrar Sesión</span>
                </motion.button>
              </nav>
            </div>
          </div>

          {/* Desktop Header */}
          <div className="hidden lg:flex justify-between items-center h-16">
            <div className="flex items-center space-x-8">
              <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                Solwage
              </h1>

              {/* Navigation Tabs */}
              <nav className="flex space-x-8">
                {[
                  { id: "ofertas", label: "Ofertas", icon: "💼" },
                  { id: "invitaciones", label: "Invitaciones", icon: "📨" },
                  { id: "activos", label: "Trabajos Activos", icon: "⚡" },
                  { id: "referidos", label: "Referidos", icon: "🚀" },
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center space-x-2 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                      activeTab === tab.id
                        ? "bg-purple-100 text-purple-700"
                        : "text-gray-600 hover:text-purple-600 hover:bg-purple-50"
                    }`}
                  >
                    <span>{tab.icon}</span>
                    <span>{tab.label}</span>
                  </button>
                ))}

                {/* Dropdown Wallet (desktop) - antes de Perfil */}
                <div className="relative group hidden lg:block">
                  <button
                    className="inline-flex items-center space-x-2 px-3 py-2 rounded-lg text-sm font-medium text-gray-600 hover:text-purple-600 hover:bg-purple-50 transition-all"
                    type="button"
                  >
                    <span>👛</span>
                    <span>Wallet</span>
                  </button>
                  <div className="absolute mt-2 w-44 bg-white border border-gray-200 rounded-md shadow-lg hidden group-hover:block">
                    <button
                      onClick={() => navigate("/freelancer/wallet")}
                      className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-purple-50"
                    >
                      Mi Wallet
                    </button>
                    <button
                      onClick={() => navigate("/freelancer/defi")}
                      className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-purple-50"
                    >
                      DeFi
                    </button>
                  </div>
                </div>

                {/* Botón Perfil al final */}
                <button
                  onClick={() => setActiveTab("perfil")}
                  className={`flex items-center space-x-2 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                    activeTab === "perfil"
                      ? "bg-purple-100 text-purple-700"
                      : "text-gray-600 hover:text-purple-600 hover:bg-purple-50"
                  }`}
                >
                  <span>👤</span>
                  <span>Perfil</span>
                </button>
              </nav>
            </div>

            <div className="flex items-center space-x-4">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Buscar trabajos..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-64 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-300"
                />
                <span className="absolute right-3 top-2.5 text-gray-400">
                  🔍
                </span>
              </div>

              <motion.button
                onClick={handleLogout}
                className="bg-red-500 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-red-600 transition-all duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Cerrar Sesión
              </motion.button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 pt-24">
        {/* Resumen Financiero Privado */}
        <div className="bg-gradient-to-br from-purple-600 to-blue-600 rounded-lg p-6 mb-8 text-white">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-bold">💰 Resumen Financiero</h3>
            <span className="px-3 py-1 bg-white bg-opacity-20 rounded-full text-sm">
              Privado
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="text-3xl font-bold text-green-300">$8,450</div>
              <div className="text-sm text-purple-200">Ganancias Totales</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-300">
                {stats.thisMonth}
              </div>
              <div className="text-sm text-purple-200">Este Mes</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-yellow-300">$1,200</div>
              <div className="text-sm text-purple-200">Pendiente</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-pink-300">12</div>
              <div className="text-sm text-purple-200">
                Proyectos Completados
              </div>
            </div>
          </div>

          <div className="mt-4 pt-4 border-t border-purple-300">
            <div className="flex justify-between items-center text-sm">
              <span>Promedio por proyecto: $704</span>
              <span>Último pago: hace 3 días</span>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <motion.div
            className="bg-white rounded-lg border border-gray-200 p-6"
            whileHover={{ y: -2 }}
          >
            <div className="flex items-center">
              <div className="p-2 bg-blue-100 rounded-lg">
                <span className="text-2xl">📊</span>
              </div>
              <div className="ml-4">
                <p className="text-sm text-gray-600">Este Mes</p>
                <p className="text-2xl font-bold text-gray-900">
                  {stats.thisMonth}
                </p>
              </div>
            </div>
          </motion.div>

          <motion.div
            className="bg-white rounded-lg border border-gray-200 p-6"
            whileHover={{ y: -2 }}
          >
            <div className="flex items-center">
              <div className="p-2 bg-purple-100 rounded-lg">
                <span className="text-2xl">⭐</span>
              </div>
              <div className="ml-4">
                <p className="text-sm text-gray-600">Calificación</p>
                <p className="text-2xl font-bold text-gray-900">
                  {stats.rating}/5
                </p>
              </div>
            </div>
          </motion.div>

          <motion.div
            className="bg-white rounded-lg border border-gray-200 p-6"
            whileHover={{ y: -2 }}
          >
            <div className="flex items-center">
              <div className="p-2 bg-orange-100 rounded-lg">
                <span className="text-2xl">⚡</span>
              </div>
              <div className="ml-4">
                <p className="text-sm text-gray-600">Trabajos Activos</p>
                <p className="text-2xl font-bold text-gray-900">
                  {stats.activeJobs}
                </p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Content based on active tab */}
        <div className="space-y-6">
          {activeTab === "ofertas" && (
            <div className="flex flex-col lg:flex-row gap-6">
              {/* Sidebar de Filtros */}
              <div className="hidden lg:block w-full lg:w-80 lg:flex-shrink-0">
                {renderFiltersSidebar()}
              </div>

              {/* Contenido Principal */}
              <div className="flex-1">
                {/* Botón de filtros para móviles */}
                <div className="lg:hidden mb-4">
                  <button
                    onClick={() => setShowFilters(!showFilters)}
                    className="flex items-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
                  >
                    <span>🔍</span>
                    <span>Filtros</span>
                    <span
                      className={`transform transition-transform ${
                        showFilters ? "rotate-180" : ""
                      }`}
                    >
                      ▼
                    </span>
                  </button>
                </div>

                {/* Filtros móviles */}
                <div
                  className={`lg:hidden mb-6 ${
                    showFilters ? "block" : "hidden"
                  }`}
                >
                  {renderFiltersSidebar()}
                </div>

                {/* Sección de Recomendaciones */}
                {recommendedOffers.length > 0 && (
                  <div className="mb-8">
                    <div className="flex items-center gap-3 mb-4">
                      <h2 className="text-2xl font-bold text-gray-900">
                        ⭐ Recomendaciones para ti
                      </h2>
                      <span className="px-3 py-1 bg-purple-100 text-purple-700 text-sm rounded-full font-medium">
                        {recommendedOffers.length} ofertas
                      </span>
                    </div>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                      {recommendedOffers.map(renderJobCard)}
                    </div>
                  </div>
                )}

                {/* Todas las Ofertas */}
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-xl font-bold text-gray-900">
                      Todas las Ofertas
                    </h2>
                    <span className="text-sm text-gray-600">
                      {filteredOffers.length} ofertas encontradas
                    </span>
                  </div>
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {otherOffers.map(renderJobCard)}
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === "invitaciones" && (
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                Invitaciones
              </h2>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {invitations.map(renderInvitationCard)}
              </div>
            </div>
          )}

          {activeTab === "activos" && (
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                Trabajos Activos
              </h2>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {activeJobs.map(renderActiveJobCard)}
              </div>
            </div>
          )}

          {activeTab === "referidos" && (
            <div>
              <ReferralProgram userType="freelancer" />
            </div>
          )}

          {activeTab === "perfil" && (
            <div className="space-y-8">
              {/* Historial de Pagos Privado */}
              <div className="bg-white rounded-lg border border-gray-200 p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-900">
                    💳 Historial de Pagos
                  </h3>
                  <span className="px-3 py-1 bg-purple-100 text-purple-800 text-xs rounded-full">
                    Privado
                  </span>
                </div>

                <div className="space-y-3">
                  <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg">
                    <div>
                      <p className="font-medium text-gray-900">
                        Desarrollo de DApp DeFi
                      </p>
                      <p className="text-sm text-gray-600">
                        FinanceTech Solutions
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-green-600">$3,200</p>
                      <p className="text-xs text-gray-500">Completado</p>
                    </div>
                  </div>

                  <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg">
                    <div>
                      <p className="font-medium text-gray-900">
                        Smart Contract NFT
                      </p>
                      <p className="text-sm text-gray-600">ArtBlock Studio</p>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-blue-600">$2,800</p>
                      <p className="text-xs text-gray-500">Completado</p>
                    </div>
                  </div>

                  <div className="flex justify-between items-center p-3 bg-yellow-50 rounded-lg">
                    <div>
                      <p className="font-medium text-gray-900">
                        API REST E-commerce
                      </p>
                      <p className="text-sm text-gray-600">Retail Solutions</p>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-yellow-600">$2,450</p>
                      <p className="text-xs text-gray-500">Pendiente</p>
                    </div>
                  </div>
                </div>

                <div className="mt-4 pt-4 border-t border-gray-200">
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-gray-600">
                      Total recibido: $6,000
                    </span>
                    <span className="text-gray-600">Pendiente: $2,450</span>
                  </div>
                </div>
              </div>
              {/* Header del Perfil */}
              <div className="bg-white rounded-lg border border-gray-200 p-8">
                <div className="flex items-start justify-between mb-6">
                  <div className="flex items-center space-x-4">
                    <div className="w-20 h-20 bg-gradient-to-br from-purple-600 to-blue-600 rounded-full flex items-center justify-center">
                      <span className="text-2xl text-white">👤</span>
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold text-gray-900 mb-1">
                        {profileData.fullName}
                      </h2>
                      <p className="text-lg text-gray-600 mb-2">
                        {profileData.title}
                      </p>
                      <p className="text-sm text-gray-500">
                        📍 {profileData.location} • 💰 {profileData.hourlyRate}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center space-x-2 mb-2">
                      <div className="flex items-center">
                        {[...Array(5)].map((_, i) => (
                          <span
                            key={i}
                            className={`text-lg ${
                              i < Math.floor(profileData.rating)
                                ? "text-yellow-400"
                                : "text-gray-300"
                            }`}
                          >
                            ⭐
                          </span>
                        ))}
                      </div>
                      <span className="text-lg font-semibold text-gray-900">
                        {profileData.rating}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600">
                      {profileData.completedJobs} trabajos completados
                    </p>
                  </div>
                </div>

                <p className="text-gray-700 mb-6">{profileData.bio}</p>

                {/* Métricas Públicas */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                  <div className="text-center p-3 bg-blue-50 rounded-lg">
                    <div className="text-2xl font-bold text-blue-600">
                      {profileData.completedJobs}
                    </div>
                    <div className="text-xs text-gray-600">
                      Proyectos Completados
                    </div>
                  </div>
                  <div className="text-center p-3 bg-purple-50 rounded-lg">
                    <div className="text-2xl font-bold text-purple-600">
                      {profileData.rating}/5
                    </div>
                    <div className="text-xs text-gray-600">Rating Promedio</div>
                  </div>
                  <div className="text-center p-3 bg-orange-50 rounded-lg">
                    <div className="text-2xl font-bold text-orange-600">
                      {profileData.responseRate}
                    </div>
                    <div className="text-xs text-gray-600">
                      Tasa de Respuesta
                    </div>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2">
                  {profileData.skills.map((skill, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-purple-100 text-purple-700 text-sm rounded-full font-medium"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              {/* Métricas de Rendimiento Privadas */}
              <div className="bg-white rounded-lg border border-gray-200 p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-900">
                    📈 Métricas de Rendimiento
                  </h3>
                  <span className="px-3 py-1 bg-purple-100 text-purple-800 text-xs rounded-full">
                    Privado
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="text-center p-4 bg-gradient-to-br from-green-50 to-green-100 rounded-lg">
                    <div className="text-2xl font-bold text-green-600">
                      $704
                    </div>
                    <div className="text-sm text-gray-600">
                      Promedio por Proyecto
                    </div>
                  </div>
                  <div className="text-center p-4 bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg">
                    <div className="text-2xl font-bold text-blue-600">2.3</div>
                    <div className="text-sm text-gray-600">
                      Proyectos por Mes
                    </div>
                  </div>
                  <div className="text-center p-4 bg-gradient-to-br from-purple-50 to-purple-100 rounded-lg">
                    <div className="text-2xl font-bold text-purple-600">
                      $45/hr
                    </div>
                    <div className="text-sm text-gray-600">Tarifa Promedio</div>
                  </div>
                </div>

                <div className="mt-4 pt-4 border-t border-gray-200">
                  <div className="flex justify-between items-center text-sm text-gray-600">
                    <span>Mejor mes: $3,200 (Enero 2024)</span>
                    <span>Proyecto más grande: $3,200</span>
                  </div>
                </div>
              </div>

              {/* NFT Soulbound */}
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">
                  NFT Soulbound
                </h3>
                {renderNFTSoulbound()}
              </div>

              {/* Historial de Trabajo */}
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">
                  Historial de Trabajo
                </h3>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {profileData.workHistory.map(renderWorkHistoryCard)}
                </div>
              </div>

              {/* Reseñas de Empleadores */}
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">
                  Reseñas de Empleadores
                </h3>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {profileData.reviews.map(renderReviewCard)}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FreelancerDashboard;
