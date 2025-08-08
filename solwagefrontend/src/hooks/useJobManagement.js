import { useState, useEffect } from "react";

const useJobManagement = () => {
  const [jobs, setJobs] = useState([]);
  const [applicants, setApplicants] = useState([]);
  const [selectedApplicant, setSelectedApplicant] = useState(null);
  const [showApplicantProfile, setShowApplicantProfile] = useState(false);
  const [showContactModal, setShowContactModal] = useState(false);

  // Mock data for jobs with different statuses
  const mockJobs = [
    {
      id: "1",
      title: "Desarrollador Full-Stack React",
      budget: 2500,
      applicants: 12,
      status: "Abierto",
      description:
        "Buscamos un desarrollador full-stack con experiencia en React y Node.js para proyecto de 3 meses.",
      skills: ["React", "Node.js", "TypeScript"],
      createdAt: "2024-01-15T10:00:00.000Z",
      hasContractedFreelancer: false,
      hiredFreelancer: null,
      duration: "2-3 meses",
      milestones: [
        {
          id: 1,
          title: "Diseño de UI/UX",
          description: "Crear wireframes y mockups de la aplicación",
          amount: 500,
          dueDate: "2024-02-15",
          status: "pending",
          completedAt: null,
          deliverables: [],
        },
        {
          id: 2,
          title: "Desarrollo Frontend",
          description:
            "Implementar componentes React y funcionalidades básicas",
          amount: 800,
          dueDate: "2024-03-01",
          status: "pending",
          completedAt: null,
          deliverables: [],
        },
        {
          id: 3,
          title: "Desarrollo Backend",
          description: "Crear API REST con Node.js y MongoDB",
          amount: 700,
          dueDate: "2024-03-15",
          status: "pending",
          completedAt: null,
          deliverables: [],
        },
        {
          id: 4,
          title: "Testing y Deployment",
          description: "Pruebas unitarias e integración y despliegue",
          amount: 500,
          dueDate: "2024-03-30",
          status: "pending",
          completedAt: null,
          deliverables: [],
        },
      ],
    },
    {
      id: "2",
      title: "Smart Contract Developer",
      budget: 4000,
      applicants: 8,
      status: "En Curso",
      description:
        "Desarrollo de smart contracts en Stellar para aplicación DeFi.",
      skills: ["Stellar", "Soroban", "Rust"],
      createdAt: "2024-01-10T14:30:00.000Z",
      hasContractedFreelancer: true,
      hiredFreelancer: {
        id: "freelancer-1",
        name: "Carlos Rodríguez",
        photoUrl: "",
        skills: "React, Node.js, TypeScript, Stellar",
        reputation: 4.8,
        hourlyRate: 25,
      },
      duration: "3-4 meses",
      milestones: [
        {
          id: 1,
          title: "Análisis de Requisitos",
          description: "Definir especificaciones técnicas del smart contract",
          amount: 800,
          dueDate: "2024-01-25",
          status: "completed",
          completedAt: "2024-01-20T10:00:00.000Z",
          deliverables: [
            "Documento de especificaciones",
            "Diagrama de arquitectura",
          ],
        },
        {
          id: 2,
          title: "Desarrollo del Smart Contract",
          description: "Implementar la lógica del contrato en Soroban",
          amount: 1600,
          dueDate: "2024-02-15",
          status: "review",
          submittedAt: "2024-02-12T16:30:00.000Z",
          completedAt: null,
          deliverables: ["Código fuente del contrato", "Tests unitarios"],
        },
        {
          id: 3,
          title: "Testing y Auditoría",
          description: "Pruebas exhaustivas y auditoría de seguridad",
          amount: 800,
          dueDate: "2024-02-28",
          status: "pending",
          completedAt: null,
          deliverables: ["Reporte de auditoría", "Documentación técnica"],
        },
        {
          id: 4,
          title: "Deployment y Documentación",
          description: "Despliegue en testnet y documentación final",
          amount: 800,
          dueDate: "2024-03-10",
          status: "pending",
          completedAt: null,
          deliverables: ["Contrato desplegado", "Guía de usuario"],
        },
      ],
    },
    {
      id: "3",
      title: "UI/UX Designer",
      budget: 1800,
      applicants: 15,
      status: "Abierto",
      description: "Diseño de interfaces para aplicación móvil blockchain.",
      skills: ["Figma", "Adobe XD", "Prototyping"],
      createdAt: "2024-01-12T09:15:00.000Z",
      hasContractedFreelancer: false,
      hiredFreelancer: null,
      duration: "1-2 meses",
      milestones: [
        {
          id: 1,
          title: "Research y Wireframes",
          description: "Investigación de usuarios y creación de wireframes",
          amount: 400,
          dueDate: "2024-02-01",
          status: "pending",
          completedAt: null,
          deliverables: [],
        },
        {
          id: 2,
          title: "Diseño de Interfaces",
          description: "Crear mockups y prototipos interactivos",
          amount: 800,
          dueDate: "2024-02-15",
          status: "pending",
          completedAt: null,
          deliverables: [],
        },
        {
          id: 3,
          title: "Testing de Usabilidad",
          description: "Pruebas con usuarios y iteraciones",
          amount: 400,
          dueDate: "2024-02-28",
          status: "pending",
          completedAt: null,
          deliverables: [],
        },
        {
          id: 4,
          title: "Entrega Final",
          description: "Assets finales y documentación",
          amount: 200,
          dueDate: "2024-03-05",
          status: "pending",
          completedAt: null,
          deliverables: [],
        },
      ],
    },
    {
      id: "4",
      title: "DevOps Engineer",
      budget: 3200,
      applicants: 6,
      status: "Completado",
      description:
        "Configuración de infraestructura cloud para plataforma blockchain.",
      skills: ["AWS", "Docker", "Kubernetes"],
      createdAt: "2024-01-05T16:45:00.000Z",
      hasContractedFreelancer: true,
      hiredFreelancer: {
        id: "freelancer-2",
        name: "Ana Martínez",
        photoUrl: "",
        skills: "AWS, Docker, Kubernetes, Terraform",
        reputation: 4.6,
        hourlyRate: 30,
      },
      duration: "2-3 meses",
      milestones: [
        {
          id: 1,
          title: "Configuración de Infraestructura",
          description: "Configurar servidores y servicios AWS",
          amount: 800,
          dueDate: "2024-01-20",
          status: "completed",
          completedAt: "2024-01-18T14:30:00.000Z",
          deliverables: [
            "Servidores configurados",
            "Documentación de infraestructura",
          ],
        },
        {
          id: 2,
          title: "Configuración de Contenedores",
          description: "Docker y Kubernetes setup",
          amount: 800,
          dueDate: "2024-01-30",
          status: "completed",
          completedAt: "2024-01-28T09:15:00.000Z",
          deliverables: ["Contenedores Docker", "Configuración K8s"],
        },
        {
          id: 3,
          title: "CI/CD Pipeline",
          description: "Configurar pipelines de integración continua",
          amount: 800,
          dueDate: "2024-02-10",
          status: "completed",
          completedAt: "2024-02-08T16:45:00.000Z",
          deliverables: ["Pipeline configurado", "Scripts de deployment"],
        },
        {
          id: 4,
          title: "Monitoreo y Seguridad",
          description: "Configurar monitoreo y medidas de seguridad",
          amount: 800,
          dueDate: "2024-02-20",
          status: "completed",
          completedAt: "2024-02-18T11:20:00.000Z",
          deliverables: ["Sistema de monitoreo", "Configuración de seguridad"],
        },
      ],
    },
  ];

  // Mock data for applicants with detailed profiles
  const mockApplicants = [
    {
      id: "applicant-1",
      name: "María García",
      photoUrl: "",
      skills: "React, Vue.js, CSS, TypeScript",
      reputation: 4.5,
      hourlyRate: 20,
      appliedAt: "2024-01-16T09:00:00.000Z",
      status: "pending",
      isPremium: false,
      profile: {
        fullName: "María García",
        experience:
          "Desarrolladora frontend con 3 años de experiencia en React y Vue.js. Especializada en aplicaciones web modernas y responsive.",
        github: "https://github.com/mariagarcia",
        linkedin: "https://linkedin.com/in/mariagarcia",
        twitter: "https://twitter.com/mariagarcia",
        portfolio: "https://mariagarcia.dev",
        nftAddress: "0x7a8b9c2d3e4f5a6b7c8d9e0f1a2b3c4d5e6f7a8",
        reviews: [
          {
            id: 1,
            rating: 5,
            comment: "Excelente trabajo, muy profesional y puntual.",
            reviewer: "Juan Pérez",
            date: "2024-01-10",
          },
          {
            id: 2,
            rating: 4,
            comment: "Buena comunicación y calidad de código.",
            reviewer: "Ana López",
            date: "2024-01-05",
          },
        ],
      },
    },
    {
      id: "applicant-2",
      name: "Juan Pérez",
      photoUrl: "",
      skills: "React, Node.js, PostgreSQL, MongoDB",
      reputation: 4.2,
      hourlyRate: 22,
      appliedAt: "2024-01-17T14:30:00.000Z",
      status: "pending",
      isPremium: false,
      profile: {
        fullName: "Juan Pérez",
        experience:
          "Desarrollador full-stack con 5 años de experiencia. Especializado en aplicaciones web escalables y APIs REST.",
        github: "https://github.com/juanperez",
        linkedin: "https://linkedin.com/in/juanperez",
        twitter: "https://twitter.com/juanperez",
        portfolio: "https://juanperez.dev",
        nftAddress: "0x1a2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0",
        reviews: [
          {
            id: 3,
            rating: 4,
            comment: "Muy buen desarrollador, entregó el proyecto a tiempo.",
            reviewer: "Carlos Rodríguez",
            date: "2024-01-08",
          },
        ],
      },
    },
    {
      id: "applicant-3",
      name: "Laura Fernández",
      photoUrl: "",
      skills: "React, TypeScript, Stellar, Soroban",
      reputation: 4.8,
      hourlyRate: 28,
      appliedAt: "2024-01-18T11:15:00.000Z",
      status: "pending",
      isPremium: true,
      profile: {
        fullName: "Laura Fernández",
        experience:
          "Desarrolladora blockchain con experiencia en Stellar y Soroban. Especializada en smart contracts y aplicaciones DeFi.",
        github: "https://github.com/laurafernandez",
        linkedin: "https://linkedin.com/in/laurafernandez",
        twitter: "https://twitter.com/laurafernandez",
        portfolio: "https://laurafernandez.dev",
        nftAddress: "0x3b4c5d6e7f8a9b0c1d2e3f4a5b6c7d8e9f0a1b2",
        reviews: [
          {
            id: 4,
            rating: 5,
            comment: "Excelente conocimiento en blockchain y Stellar.",
            reviewer: "María González",
            date: "2024-01-12",
          },
          {
            id: 5,
            rating: 5,
            comment: "Muy profesional y con gran experiencia técnica.",
            reviewer: "Roberto Silva",
            date: "2024-01-06",
          },
        ],
      },
    },
    {
      id: "applicant-4",
      name: "Carlos Rodríguez",
      photoUrl: "",
      skills: "React, Node.js, TypeScript, Stellar",
      reputation: 4.9,
      hourlyRate: 35,
      appliedAt: "2024-01-19T08:45:00.000Z",
      status: "pending",
      isPremium: true,
      profile: {
        fullName: "Carlos Rodríguez",
        experience:
          "Desarrollador senior con 7 años de experiencia en aplicaciones web y blockchain. Especializado en React, Node.js y Stellar.",
        github: "https://github.com/carlosrodriguez",
        linkedin: "https://linkedin.com/in/carlosrodriguez",
        twitter: "https://twitter.com/carlosrodriguez",
        portfolio: "https://carlosrodriguez.dev",
        nftAddress: "0x4c5d6e7f8a9b0c1d2e3f4a5b6c7d8e9f0a1b2c3",
        reviews: [
          {
            id: 6,
            rating: 5,
            comment: "Excelente desarrollador, muy profesional y puntual.",
            reviewer: "Ana Martínez",
            date: "2024-01-15",
          },
          {
            id: 7,
            rating: 5,
            comment: "Gran experiencia técnica y comunicación clara.",
            reviewer: "Luis García",
            date: "2024-01-10",
          },
          {
            id: 8,
            rating: 5,
            comment: "Muy recomendado, entregó el proyecto antes de tiempo.",
            reviewer: "María López",
            date: "2024-01-05",
          },
        ],
      },
    },
    {
      id: "applicant-5",
      name: "Ana Martínez",
      photoUrl: "",
      skills: "UI/UX, Figma, Adobe XD, Prototyping",
      reputation: 4.7,
      hourlyRate: 30,
      appliedAt: "2024-01-20T12:30:00.000Z",
      status: "pending",
      isPremium: false,
      profile: {
        fullName: "Ana Martínez",
        experience:
          "Diseñadora UI/UX con 4 años de experiencia en diseño de interfaces y experiencia de usuario. Especializada en Figma y Adobe XD.",
        github: "https://github.com/anamartinez",
        linkedin: "https://linkedin.com/in/anamartinez",
        twitter: "https://twitter.com/anamartinez",
        portfolio: "https://anamartinez.dev",
        nftAddress: "0x5d6e7f8a9b0c1d2e3f4a5b6c7d8e9f0a1b2c3d4",
        reviews: [
          {
            id: 9,
            rating: 4,
            comment: "Excelente diseñadora, muy creativa y profesional.",
            reviewer: "Roberto Silva",
            date: "2024-01-12",
          },
          {
            id: 10,
            rating: 5,
            comment: "Gran trabajo de diseño, muy satisfecho con el resultado.",
            reviewer: "Carlos López",
            date: "2024-01-08",
          },
        ],
      },
    },
  ];

  // Load jobs data
  useEffect(() => {
    setJobs(mockJobs);
  }, []);

  // Load applicants for a specific job
  const loadApplicants = (jobId) => {
    setApplicants(mockApplicants);
  };

  // View applicant profile
  const viewApplicantProfile = (applicant) => {
    setSelectedApplicant(applicant);
    setShowApplicantProfile(true);
  };

  // Close applicant profile
  const closeApplicantProfile = () => {
    setSelectedApplicant(null);
    setShowApplicantProfile(false);
  };

  // Contact applicant
  const contactApplicant = (applicant) => {
    setSelectedApplicant(applicant);
    setShowContactModal(true);
  };

  // Close contact modal
  const closeContactModal = () => {
    setSelectedApplicant(null);
    setShowContactModal(false);
  };

  // Hire applicant
  const hireApplicant = (applicantId) => {
    setApplicants((prev) =>
      prev.map((app) =>
        app.id === applicantId
          ? { ...app, status: "hired" }
          : { ...app, status: "rejected" }
      )
    );
    alert("¡Freelancer contratado exitosamente!");
  };

  // Reject applicant
  const rejectApplicant = (applicantId) => {
    setApplicants((prev) =>
      prev.map((app) =>
        app.id === applicantId ? { ...app, status: "rejected" } : app
      )
    );
    alert("Postulante rechazado.");
  };

  // Update job data
  const updateJob = (jobId, updates) => {
    setJobs((prev) =>
      prev.map((job) => (job.id === jobId ? { ...job, ...updates } : job))
    );
  };

  // Get jobs by status
  const getJobsByStatus = (hasContracted) => {
    return jobs.filter((job) => job.hasContractedFreelancer === hasContracted);
  };

  // Get sorted applicants (premium first, then by reputation)
  const getSortedApplicants = () => {
    return applicants.sort((a, b) => {
      // Premium users first
      if (a.isPremium && !b.isPremium) return -1;
      if (!a.isPremium && b.isPremium) return 1;

      // Then by reputation (highest first)
      return b.reputation - a.reputation;
    });
  };

  // Get premium applicants
  const getPremiumApplicants = () => {
    return applicants.filter((applicant) => applicant.isPremium);
  };

  // Get regular applicants
  const getRegularApplicants = () => {
    return applicants.filter((applicant) => !applicant.isPremium);
  };

  return {
    jobs,
    applicants,
    selectedApplicant,
    showApplicantProfile,
    showContactModal,
    loadApplicants,
    viewApplicantProfile,
    closeApplicantProfile,
    contactApplicant,
    closeContactModal,
    hireApplicant,
    rejectApplicant,
    updateJob,
    getJobsByStatus,
    getSortedApplicants,
    getPremiumApplicants,
    getRegularApplicants,
  };
};

export default useJobManagement;
