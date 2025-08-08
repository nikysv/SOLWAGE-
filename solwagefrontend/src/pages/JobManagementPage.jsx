import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useParams, useNavigate } from "react-router-dom";
import useJobManagement from "../hooks/useJobManagement";
import BackButton from "../components/common/BackButton";
import ApplicantProfileModal from "../components/applicants/ApplicantProfileModal";
import ContactModal from "../components/applicants/ContactModal";
import {
  SOROBAN_ESCROW_CONTRACT_ID,
  truncateContractId,
} from "../constants/blockchain";

const JobManagementPage = ({ auth }) => {
  const { jobId } = useParams();
  const navigate = useNavigate();

  // Use the job management hook
  const jobManagement = useJobManagement();

  // Get job data from the hook based on jobId
  const job = jobManagement.jobs.find((j) => j.id === jobId) || {
    id: jobId,
    title: "Trabajo no encontrado",
    description: "Este trabajo no existe o ha sido eliminado.",
    budget: 0,
    skills: [],
    status: "No encontrado",
    hasContractedFreelancer: false,
    hiredFreelancer: null,
    milestones: [],
  };

  const [activeTab, setActiveTab] = useState("overview");
  const [showMilestoneModal, setShowMilestoneModal] = useState(false);
  const [selectedMilestone, setSelectedMilestone] = useState(null);

  // Load applicants when component mounts - Fixed to prevent infinite loop
  useEffect(() => {
    jobManagement.loadApplicants(jobId);
  }, [jobId]); // Removed jobManagement from dependencies

  const getStatusColor = (status) => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-800";
      case "in_progress":
        return "bg-blue-100 text-blue-800";
      case "review":
        return "bg-yellow-100 text-yellow-800";
      case "pending":
        return "bg-gray-100 text-gray-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case "completed":
        return "Completado";
      case "in_progress":
        return "En Progreso";
      case "review":
        return "En Revisión";
      case "pending":
        return "Pendiente";
      default:
        return "Pendiente";
    }
  };

  const handleMilestoneReview = (milestoneId) => {
    navigate(`/employer/jobs/${jobId}/milestone/${milestoneId}/review`);
  };

  const handleMilestoneApprove = () => {
    if (!selectedMilestone) return;

    const updatedMilestones = job.milestones.map((m) =>
      m.id === selectedMilestone.id
        ? { ...m, status: "completed", completedAt: new Date().toISOString() }
        : m
    );

    jobManagement.updateJob(jobId, {
      milestones: updatedMilestones,
    });

    setShowMilestoneModal(false);
    setSelectedMilestone(null);
    alert("¡Hito aprobado! Los fondos han sido liberados.");
  };

  const handleMilestoneReject = () => {
    if (!selectedMilestone) return;

    const updatedMilestones = job.milestones.map((m) =>
      m.id === selectedMilestone.id ? { ...m, status: "pending" } : m
    );

    jobManagement.updateJob(jobId, {
      milestones: updatedMilestones,
    });

    setShowMilestoneModal(false);
    setSelectedMilestone(null);
    alert(
      "Hito rechazado. Se ha notificado al freelancer para realizar correcciones."
    );
  };

  // Handle applicant actions
  const handleViewApplicantProfile = (applicant) => {
    jobManagement.viewApplicantProfile(applicant);
  };

  const handleContactApplicant = (applicant) => {
    jobManagement.contactApplicant(applicant);
  };

  const handleHireApplicant = (applicantId) => {
    jobManagement.hireApplicant(applicantId);
    // Update job status to contracted
    const hiredApplicant = jobManagement.applicants.find(
      (app) => app.id === applicantId
    );
    jobManagement.updateJob(jobId, {
      hasContractedFreelancer: true,
      status: "En Curso",
      hiredFreelancer: hiredApplicant,
    });
  };

  const handleRejectApplicant = (applicantId) => {
    jobManagement.rejectApplicant(applicantId);
  };

  const handleSendMessage = (messageData) => {
    console.log("Mensaje enviado:", messageData);
    alert(`Mensaje enviado a ${messageData.applicantName}`);
  };

  const totalBudget = job.milestones.reduce((sum, m) => sum + m.amount, 0);
  const completedBudget = job.milestones
    .filter((m) => m.status === "completed")
    .reduce((sum, m) => sum + m.amount, 0);
  const progressPercentage = (completedBudget / totalBudget) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex items-center justify-between mb-6">
            <BackButton />
          </div>

          <div className="bg-white rounded-2xl shadow-xl p-6 border border-gray-100">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
              <div>
                <h1 className="text-3xl font-bold text-gray-900 mb-2">
                  {job.title}
                </h1>
                <p className="text-gray-600 mb-4">{job.description}</p>
                <div className="flex flex-wrap gap-4">
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-purple-100 text-purple-800">
                    ${job.budget}
                  </span>
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
                    {job.duration}
                  </span>
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
                    {job.status}
                  </span>
                </div>
              </div>

              <div className="mt-4 lg:mt-0">
                <div className="text-right">
                  <p className="text-sm text-gray-500">Progreso del Proyecto</p>
                  <p className="text-2xl font-bold text-purple-600">
                    {progressPercentage.toFixed(0)}%
                  </p>
                  <p className="text-sm text-gray-600">
                    ${completedBudget} / ${totalBudget}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Tabs */}
        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 mb-8">
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8 px-6">
              {[
                { id: "overview", label: "Vista General" },
                { id: "milestones", label: "Hitos" },
                { id: "applicants", label: "Postulantes" },
                { id: "freelancer", label: "Freelancer" },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                    activeTab === tab.id
                      ? "border-purple-500 text-purple-600"
                      : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </nav>
          </div>

          <div className="p-6">
            {/* Vista General */}
            {activeTab === "overview" && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="space-y-6"
              >
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="bg-gradient-to-br from-purple-50 to-blue-50 rounded-lg p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      Presupuesto Total
                    </h3>
                    <p className="text-3xl font-bold text-purple-600">
                      ${totalBudget}
                    </p>
                    <p className="text-sm text-gray-600">
                      Presupuesto asignado
                    </p>
                  </div>

                  <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-lg p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      Fondos Liberados
                    </h3>
                    <p className="text-3xl font-bold text-green-600">
                      ${completedBudget}
                    </p>
                    <p className="text-sm text-gray-600">Hitos completados</p>
                  </div>

                  <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      En Escrow
                    </h3>
                    <p className="text-3xl font-bold text-blue-600">
                      ${totalBudget - completedBudget}
                    </p>
                    <p className="text-sm text-gray-600">
                      Pendiente de liberación
                    </p>
                    <div className="mt-3 pt-3 border-t border-blue-200">
                      <p className="text-xs text-gray-500 mb-1">
                        🔒 Protegido por Smart Contract Soroban
                      </p>
                      <p className="text-xs text-gray-400 font-mono">
                        Contrato:{" "}
                        {truncateContractId(SOROBAN_ESCROW_CONTRACT_ID)}
                      </p>
                    </div>
                  </div>
                </div>

                {job.hiredFreelancer ? (
                  <div className="bg-gray-50 rounded-lg p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">
                      Freelancer Asignado
                    </h3>
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-blue-500 rounded-full flex items-center justify-center">
                        <span className="text-white font-semibold">
                          {job.hiredFreelancer.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </span>
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900">
                          {job.hiredFreelancer.name}
                        </h4>
                        <p className="text-gray-600">
                          {job.hiredFreelancer.skills}
                        </p>
                        <div className="flex items-center space-x-2 mt-1">
                          <span className="text-yellow-500">★</span>
                          <span className="text-sm text-gray-600">
                            {job.hiredFreelancer.reputation}
                          </span>
                          <span className="text-sm text-gray-500">
                            • ${job.hiredFreelancer.hourlyRate}/hora
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="bg-gray-50 rounded-lg p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">
                      Estado de la Vacante
                    </h3>
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-yellow-500 to-orange-500 rounded-full flex items-center justify-center">
                        <span className="text-white font-semibold">⏳</span>
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900">
                          Vacante Abierta
                        </h4>
                        <p className="text-gray-600">
                          Esperando postulaciones de freelancers
                        </p>
                        <div className="flex items-center space-x-2 mt-1">
                          <span className="text-sm text-gray-500">
                            {jobManagement.applicants.length} postulantes
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </motion.div>
            )}

            {/* Hitos */}
            {activeTab === "milestones" && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="space-y-6"
              >
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-gray-900">
                    Hitos del Proyecto
                  </h3>
                  <p className="text-sm text-gray-600">
                    {job.milestones.length} hitos definidos
                  </p>
                </div>

                <div className="space-y-4">
                  {job.milestones.map((milestone, index) => (
                    <motion.div
                      key={milestone.id}
                      className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow"
                      whileHover={{ scale: 1.01 }}
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center space-x-3 mb-2">
                            <span className="text-sm font-medium text-gray-500">
                              Hito {index + 1}
                            </span>
                            <span
                              className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(
                                milestone.status
                              )}`}
                            >
                              {getStatusText(milestone.status)}
                            </span>
                          </div>

                          <h4 className="text-lg font-semibold text-gray-900 mb-2">
                            {milestone.title}
                          </h4>
                          <p className="text-gray-600 mb-4">
                            {milestone.description}
                          </p>

                          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                            <div>
                              <p className="text-sm text-gray-500">
                                Presupuesto
                              </p>
                              <p className="font-semibold text-gray-900">
                                ${milestone.amount}
                              </p>
                            </div>
                            <div>
                              <p className="text-sm text-gray-500">
                                Fecha Límite
                              </p>
                              <p className="font-semibold text-gray-900">
                                {new Date(
                                  milestone.dueDate
                                ).toLocaleDateString()}
                              </p>
                            </div>
                            <div>
                              <p className="text-sm text-gray-500">Estado</p>
                              <p className="font-semibold text-gray-900">
                                {getStatusText(milestone.status)}
                              </p>
                            </div>
                          </div>

                          {milestone.status === "in_progress" && (
                            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
                              <h5 className="font-medium text-blue-900 mb-2">
                                Entregables Pendientes
                              </h5>
                              <p className="text-blue-700 text-sm">
                                El freelancer está trabajando en este hito. Se
                                notificará cuando esté listo para revisión.
                              </p>
                            </div>
                          )}

                          {milestone.status === "completed" &&
                            milestone.deliverables && (
                              <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-4">
                                <h5 className="font-medium text-green-900 mb-2">
                                  Entregables Completados
                                </h5>
                                <ul className="text-green-700 text-sm space-y-1">
                                  {milestone.deliverables.map(
                                    (deliverable, i) => (
                                      <li key={i} className="flex items-center">
                                        <span className="text-green-500 mr-2">
                                          ✓
                                        </span>
                                        {deliverable}
                                      </li>
                                    )
                                  )}
                                </ul>
                                <p className="text-green-600 text-xs mt-2">
                                  Completado el{" "}
                                  {new Date(
                                    milestone.completedAt
                                  ).toLocaleDateString()}
                                </p>
                              </div>
                            )}
                        </div>

                        <div className="ml-4">
                          {milestone.status === "review" && (
                            <motion.button
                              onClick={() =>
                                handleMilestoneReview(milestone.id)
                              }
                              className="px-4 py-2 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 transition-colors"
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                            >
                              📋 Revisar Entrega
                            </motion.button>
                          )}
                          {milestone.status === "completed" && (
                            <span className="px-4 py-2 bg-green-100 text-green-800 rounded-lg text-sm">
                              ✅ Completado
                            </span>
                          )}
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Postulantes */}
            {activeTab === "applicants" && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="space-y-6"
              >
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-gray-900">
                    Postulantes
                  </h3>
                  <p className="text-sm text-gray-600">
                    {jobManagement.applicants.length} postulantes
                  </p>
                </div>

                {/* Premium Applicants Section */}
                {jobManagement.getPremiumApplicants().length > 0 && (
                  <div className="space-y-4">
                    <div className="flex items-center space-x-2 mb-4">
                      <span className="text-yellow-500 text-lg">🏆</span>
                      <h4 className="text-lg font-semibold text-gray-900">
                        Talentos Premium
                      </h4>
                      <span className="text-sm text-gray-500">
                        ({jobManagement.getPremiumApplicants().length})
                      </span>
                    </div>

                    {jobManagement.getPremiumApplicants().map((applicant) => (
                      <motion.div
                        key={applicant.id}
                        className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow"
                        whileHover={{ scale: 1.01 }}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-4">
                            <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-blue-500 rounded-full flex items-center justify-center">
                              <span className="text-white font-semibold">
                                {applicant.name
                                  .split(" ")
                                  .map((n) => n[0])
                                  .join("")}
                              </span>
                            </div>
                            <div>
                              <div className="flex items-center space-x-2">
                                <h4 className="font-semibold text-gray-900">
                                  {applicant.name}
                                </h4>
                                <span className="text-yellow-500 text-sm">
                                  🏆
                                </span>
                              </div>
                              <p className="text-gray-600">
                                {applicant.skills}
                              </p>
                              <div className="flex items-center space-x-2 mt-1">
                                <span className="text-yellow-500">★</span>
                                <span className="text-sm text-gray-600">
                                  {applicant.reputation}
                                </span>
                                <span className="text-sm text-gray-500">
                                  • ${applicant.hourlyRate}/hora
                                </span>
                              </div>
                            </div>
                          </div>

                          <div className="flex items-center space-x-2">
                            <div className="text-right mr-4">
                              <span
                                className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                                  applicant.status === "rejected"
                                    ? "bg-red-100 text-red-800"
                                    : applicant.status === "hired"
                                    ? "bg-green-100 text-green-800"
                                    : "bg-gray-100 text-gray-800"
                                }`}
                              >
                                {applicant.status === "rejected"
                                  ? "Rechazado"
                                  : applicant.status === "hired"
                                  ? "Contratado"
                                  : "Pendiente"}
                              </span>
                              <p className="text-xs text-gray-500 mt-1">
                                {new Date(
                                  applicant.appliedAt
                                ).toLocaleDateString()}
                              </p>
                            </div>

                            <div className="flex space-x-2">
                              <motion.button
                                onClick={() =>
                                  handleViewApplicantProfile(applicant)
                                }
                                className="px-3 py-1 bg-blue-600 text-white text-xs rounded hover:bg-blue-700 transition-colors"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                              >
                                Ver Perfil
                              </motion.button>
                              <motion.button
                                onClick={() =>
                                  handleContactApplicant(applicant)
                                }
                                className="px-3 py-1 bg-green-600 text-white text-xs rounded hover:bg-green-700 transition-colors"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                              >
                                Contactar
                              </motion.button>
                              {applicant.status === "pending" &&
                                !job.hasContractedFreelancer && (
                                  <>
                                    <motion.button
                                      onClick={() =>
                                        handleHireApplicant(applicant.id)
                                      }
                                      className="px-3 py-1 bg-purple-600 text-white text-xs rounded hover:bg-purple-700 transition-colors"
                                      whileHover={{ scale: 1.05 }}
                                      whileTap={{ scale: 0.95 }}
                                    >
                                      Contratar
                                    </motion.button>
                                    <motion.button
                                      onClick={() =>
                                        handleRejectApplicant(applicant.id)
                                      }
                                      className="px-3 py-1 bg-red-600 text-white text-xs rounded hover:bg-red-700 transition-colors"
                                      whileHover={{ scale: 1.05 }}
                                      whileTap={{ scale: 0.95 }}
                                    >
                                      Rechazar
                                    </motion.button>
                                  </>
                                )}
                              {job.hasContractedFreelancer &&
                                applicant.status === "pending" && (
                                  <span className="text-xs text-gray-500 px-2 py-1 bg-gray-100 rounded">
                                    Vacante cerrada
                                  </span>
                                )}
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                )}

                {/* Regular Applicants Section */}
                {jobManagement.getRegularApplicants().length > 0 && (
                  <div className="space-y-4">
                    <div className="flex items-center space-x-2 mb-4">
                      <span className="text-gray-500 text-lg">👥</span>
                      <h4 className="text-lg font-semibold text-gray-900">
                        Todos los Postulantes
                      </h4>
                      <span className="text-sm text-gray-500">
                        ({jobManagement.getRegularApplicants().length})
                      </span>
                    </div>

                    {jobManagement.getRegularApplicants().map((applicant) => (
                      <motion.div
                        key={applicant.id}
                        className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow"
                        whileHover={{ scale: 1.01 }}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-4">
                            <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-blue-500 rounded-full flex items-center justify-center">
                              <span className="text-white font-semibold">
                                {applicant.name
                                  .split(" ")
                                  .map((n) => n[0])
                                  .join("")}
                              </span>
                            </div>
                            <div>
                              <h4 className="font-semibold text-gray-900">
                                {applicant.name}
                              </h4>
                              <p className="text-gray-600">
                                {applicant.skills}
                              </p>
                              <div className="flex items-center space-x-2 mt-1">
                                <span className="text-yellow-500">★</span>
                                <span className="text-sm text-gray-600">
                                  {applicant.reputation}
                                </span>
                                <span className="text-sm text-gray-500">
                                  • ${applicant.hourlyRate}/hora
                                </span>
                              </div>
                            </div>
                          </div>

                          <div className="flex items-center space-x-2">
                            <div className="text-right mr-4">
                              <span
                                className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                                  applicant.status === "rejected"
                                    ? "bg-red-100 text-red-800"
                                    : applicant.status === "hired"
                                    ? "bg-green-100 text-green-800"
                                    : "bg-gray-100 text-gray-800"
                                }`}
                              >
                                {applicant.status === "rejected"
                                  ? "Rechazado"
                                  : applicant.status === "hired"
                                  ? "Contratado"
                                  : "Pendiente"}
                              </span>
                              <p className="text-xs text-gray-500 mt-1">
                                {new Date(
                                  applicant.appliedAt
                                ).toLocaleDateString()}
                              </p>
                            </div>

                            <div className="flex space-x-2">
                              <motion.button
                                onClick={() =>
                                  handleViewApplicantProfile(applicant)
                                }
                                className="px-3 py-1 bg-blue-600 text-white text-xs rounded hover:bg-blue-700 transition-colors"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                              >
                                Ver Perfil
                              </motion.button>
                              <motion.button
                                onClick={() =>
                                  handleContactApplicant(applicant)
                                }
                                className="px-3 py-1 bg-green-600 text-white text-xs rounded hover:bg-green-700 transition-colors"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                              >
                                Contactar
                              </motion.button>
                              {applicant.status === "pending" &&
                                !job.hasContractedFreelancer && (
                                  <>
                                    <motion.button
                                      onClick={() =>
                                        handleHireApplicant(applicant.id)
                                      }
                                      className="px-3 py-1 bg-purple-600 text-white text-xs rounded hover:bg-purple-700 transition-colors"
                                      whileHover={{ scale: 1.05 }}
                                      whileTap={{ scale: 0.95 }}
                                    >
                                      Contratar
                                    </motion.button>
                                    <motion.button
                                      onClick={() =>
                                        handleRejectApplicant(applicant.id)
                                      }
                                      className="px-3 py-1 bg-red-600 text-white text-xs rounded hover:bg-red-700 transition-colors"
                                      whileHover={{ scale: 1.05 }}
                                      whileTap={{ scale: 0.95 }}
                                    >
                                      Rechazar
                                    </motion.button>
                                  </>
                                )}
                              {job.hasContractedFreelancer &&
                                applicant.status === "pending" && (
                                  <span className="text-xs text-gray-500 px-2 py-1 bg-gray-100 rounded">
                                    Vacante cerrada
                                  </span>
                                )}
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                )}
              </motion.div>
            )}

            {/* Freelancer */}
            {activeTab === "freelancer" && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="space-y-6"
              >
                {job.hiredFreelancer ? (
                  <>
                    <div className="bg-white border border-gray-200 rounded-lg p-6">
                      <h3 className="text-lg font-semibold text-gray-900 mb-4">
                        Información del Freelancer
                      </h3>

                      <div className="flex items-start space-x-6">
                        <div className="w-20 h-20 bg-gradient-to-br from-purple-500 to-blue-500 rounded-full flex items-center justify-center">
                          <span className="text-white font-semibold text-xl">
                            {job.hiredFreelancer.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </span>
                        </div>

                        <div className="flex-1">
                          <h4 className="text-xl font-semibold text-gray-900 mb-2">
                            {job.hiredFreelancer.name}
                          </h4>
                          <p className="text-gray-600 mb-4">
                            {job.hiredFreelancer.skills}
                          </p>

                          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div>
                              <p className="text-sm text-gray-500">
                                Reputación
                              </p>
                              <div className="flex items-center space-x-1">
                                <span className="text-yellow-500">★</span>
                                <span className="font-semibold text-gray-900">
                                  {job.hiredFreelancer.reputation}
                                </span>
                              </div>
                            </div>
                            <div>
                              <p className="text-sm text-gray-500">
                                Tarifa por Hora
                              </p>
                              <p className="font-semibold text-gray-900">
                                ${job.hiredFreelancer.hourlyRate}
                              </p>
                            </div>
                            <div>
                              <p className="text-sm text-gray-500">Estado</p>
                              <p className="font-semibold text-green-600">
                                Activo
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
                      <h4 className="font-semibold text-blue-900 mb-2">
                        Comunicación
                      </h4>
                      <p className="text-blue-700 text-sm mb-4">
                        Puedes comunicarte directamente con el freelancer para
                        coordinar el trabajo y resolver dudas.
                      </p>
                      <motion.button
                        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        Enviar Mensaje
                      </motion.button>
                    </div>
                  </>
                ) : (
                  <div className="bg-white border border-gray-200 rounded-lg p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">
                      Estado de la Vacante
                    </h3>
                    <div className="flex items-center space-x-4">
                      <div className="w-20 h-20 bg-gradient-to-br from-yellow-500 to-orange-500 rounded-full flex items-center justify-center">
                        <span className="text-white font-semibold text-xl">
                          ⏳
                        </span>
                      </div>
                      <div className="flex-1">
                        <h4 className="text-xl font-semibold text-gray-900 mb-2">
                          Vacante Abierta
                        </h4>
                        <p className="text-gray-600 mb-4">
                          No hay freelancer asignado aún. Los hitos estarán
                          disponibles una vez que contrates a un freelancer.
                        </p>
                        <div className="flex items-center space-x-2">
                          <span className="text-sm text-gray-500">
                            {jobManagement.applicants.length} postulantes
                            disponibles
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </motion.div>
            )}
          </div>
        </div>

        {/* Modal de Revisión de Hito */}
        {showMilestoneModal && selectedMilestone && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-white rounded-2xl p-6 max-w-md w-full mx-4"
            >
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Revisar Hito
              </h3>
              <p className="text-gray-600 mb-6">
                ¿Estás satisfecho con el trabajo entregado para el hito "
                {selectedMilestone.title}"?
              </p>

              <div className="space-y-3">
                <motion.button
                  onClick={handleMilestoneApprove}
                  className="w-full px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Aprobar y Liberar Fondos
                </motion.button>

                <motion.button
                  onClick={handleMilestoneReject}
                  className="w-full px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Rechazar y Solicitar Cambios
                </motion.button>

                <motion.button
                  onClick={() => setShowMilestoneModal(false)}
                  className="w-full px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Cancelar
                </motion.button>
              </div>
            </motion.div>
          </div>
        )}

        {/* Applicant Profile Modal */}
        <ApplicantProfileModal
          applicant={jobManagement.selectedApplicant}
          isOpen={jobManagement.showApplicantProfile}
          onClose={jobManagement.closeApplicantProfile}
          onContact={handleContactApplicant}
          onHire={handleHireApplicant}
          onReject={handleRejectApplicant}
        />

        {/* Contact Modal */}
        <ContactModal
          applicant={jobManagement.selectedApplicant}
          isOpen={jobManagement.showContactModal}
          onClose={jobManagement.closeContactModal}
          onSendMessage={handleSendMessage}
        />
      </div>
    </div>
  );
};

export default JobManagementPage;
