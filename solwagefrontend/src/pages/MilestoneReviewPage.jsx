import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useParams, useNavigate } from "react-router-dom";

const MilestoneReviewPage = ({ auth }) => {
  const { jobId, milestoneId } = useParams();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [job, setJob] = useState(null);
  const [milestone, setMilestone] = useState(null);
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [reviewData, setReviewData] = useState({
    feedback: "",
    rating: 5,
    approved: null,
    requestChanges: false,
    changeRequests: "",
  });

  // Mock data para el trabajo y el hito
  useEffect(() => {
    const loadMilestoneData = async () => {
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Simular datos del trabajo con hito en revisión
      const mockJob = {
        id: jobId,
        title: "Desarrollo de Smart Contract DeFi",
        description:
          "Desarrollo completo de un contrato inteligente para protocolo DeFi en Soroban",
        freelancer: {
          name: "Carlos Rodríguez",
          avatar: "",
          rating: 4.9,
          completedJobs: 45,
          skills: ["Rust", "Soroban", "DeFi", "Smart Contracts"],
        },
        budget: 3200,
        currency: "USDC",
      };

      const mockMilestone = {
        id: parseInt(milestoneId),
        title: "Implementación de Governance",
        description:
          "Desarrollar sistema de governance y voting para el protocolo DeFi",
        amount: 800,
        dueDate: "2024-03-01T23:59:59.000Z",
        status: "review",
        submittedAt: "2024-02-25T14:30:00.000Z",
        deliverables: [
          { name: "Contrato de governance", type: "rs", delivered: true },
          { name: "Sistema de voting", type: "rs", delivered: true },
          { name: "Tests de integración", type: "rs", delivered: true },
        ],
        submission: {
          description:
            "He completado la implementación del sistema de governance con las siguientes características:\n\n1. **Contrato de Governance Principal**: Implementé el contrato principal que maneja las propuestas y votaciones.\n\n2. **Sistema de Voting**: Desarrollé un sistema de votación ponderada basado en tokens de governance.\n\n3. **Mecanismo de Veto**: Agregué el sistema de veto con timelock solicitado para propuestas críticas.\n\n4. **Tests Completos**: Incluí tests de integración que cubren todos los casos de uso principales.\n\n**Archivos entregados:**\n- governance_contract.rs (Contrato principal)\n- voting_system.rs (Sistema de votación)\n- veto_mechanism.rs (Mecanismo de veto)\n- integration_tests.rs (Tests completos)\n- README.md (Documentación)\n\n**Funcionalidades implementadas:**\n- ✅ Creación de propuestas\n- ✅ Sistema de votación ponderada\n- ✅ Mecanismo de veto con timelock\n- ✅ Ejecución automática de propuestas aprobadas\n- ✅ Dashboard de governance para usuarios\n\nTodos los tests pasan y el código está listo para review. ¡Espero tu feedback!",
          files: [
            {
              name: "governance_contract.rs",
              size: "15.2 KB",
              type: "rust",
              url: "https://github.com/freelancer/defi-governance/blob/main/src/governance_contract.rs",
            },
            {
              name: "voting_system.rs",
              size: "8.7 KB",
              type: "rust",
              url: "https://github.com/freelancer/defi-governance/blob/main/src/voting_system.rs",
            },
            {
              name: "veto_mechanism.rs",
              size: "6.3 KB",
              type: "rust",
              url: "https://github.com/freelancer/defi-governance/blob/main/src/veto_mechanism.rs",
            },
            {
              name: "integration_tests.rs",
              size: "12.8 KB",
              type: "rust",
              url: "https://github.com/freelancer/defi-governance/blob/main/tests/integration_tests.rs",
            },
            {
              name: "README.md",
              size: "4.2 KB",
              type: "markdown",
              url: "https://github.com/freelancer/defi-governance/blob/main/README.md",
            },
          ],
          comments:
            "He implementado todas las funcionalidades solicitadas y agregué algunas mejoras adicionales como el dashboard de governance. El código está completamente documentado y testado.",
        },
        previousComments: [
          {
            id: 1,
            author: "Cliente",
            message:
              "¿Podrías agregar un mecanismo de veto para propuestas críticas?",
            timestamp: "2024-02-20T14:30:00.000Z",
            type: "question",
          },
          {
            id: 2,
            author: "Carlos Rodríguez",
            message:
              "Por supuesto, implementaré un sistema de veto con timelock para propuestas críticas. Esto añadirá una capa extra de seguridad.",
            timestamp: "2024-02-20T16:45:00.000Z",
            type: "response",
          },
        ],
      };

      setJob(mockJob);
      setMilestone(mockMilestone);
      setIsLoading(false);
    };

    loadMilestoneData();
  }, [jobId, milestoneId]);

  const handleApprove = () => {
    setReviewData((prev) => ({
      ...prev,
      approved: true,
      requestChanges: false,
    }));
    setShowReviewModal(true);
  };

  const handleRequestChanges = () => {
    setReviewData((prev) => ({
      ...prev,
      approved: false,
      requestChanges: true,
    }));
    setShowReviewModal(true);
  };

  const submitReview = async () => {
    if (!reviewData.feedback.trim()) {
      alert("Por favor proporciona feedback para el freelancer");
      return;
    }

    if (reviewData.requestChanges && !reviewData.changeRequests.trim()) {
      alert("Por favor especifica qué cambios se necesitan");
      return;
    }

    // Simular envío de review
    await new Promise((resolve) => setTimeout(resolve, 1500));

    const action = reviewData.approved ? "aprobado" : "solicitado cambios en";
    alert(
      `¡Has ${action} el hito exitosamente! El freelancer recibirá una notificación.`
    );

    // Navegar de vuelta a la gestión del trabajo
    navigate(`/employer/jobs/${jobId}`);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("es-ES", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const getFileIcon = (type) => {
    switch (type.toLowerCase()) {
      case "rust":
      case "rs":
        return "🦀";
      case "javascript":
      case "js":
        return "📜";
      case "typescript":
      case "ts":
        return "📘";
      case "python":
      case "py":
        return "🐍";
      case "markdown":
      case "md":
        return "📝";
      case "pdf":
        return "📄";
      case "png":
      case "jpg":
      case "jpeg":
        return "🖼️";
      default:
        return "📎";
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Cargando entrega para revisión...</p>
        </div>
      </div>
    );
  }

  if (!job || !milestone) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Hito no encontrado
          </h2>
          <p className="text-gray-600 mb-4">
            El hito que buscas no existe o no está disponible para revisión.
          </p>
          <button
            onClick={() => navigate("/employer/dashboard")}
            className="bg-purple-600 text-white px-6 py-2 rounded-lg hover:bg-purple-700 transition-colors"
          >
            Volver al Dashboard
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-8">
              <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                Solwage
              </h1>
              <nav className="hidden md:flex items-center space-x-6">
                <button
                  onClick={() => navigate(`/employer/jobs/${jobId}`)}
                  className="text-gray-600 hover:text-purple-600 transition-colors"
                >
                  ← Volver a Gestión del Trabajo
                </button>
                <span className="text-purple-600 font-medium">
                  Revisar Hito
                </span>
              </nav>
            </div>
            <div className="flex items-center space-x-4">
              <button
                onClick={() => auth.logout()}
                className="bg-red-500 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-red-600 transition-all duration-300"
              >
                Cerrar Sesión
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Contenido principal */}
      <div className="p-4 md:p-6">
        <div className="max-w-6xl mx-auto space-y-6">
          {/* Información del Trabajo y Freelancer */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100"
          >
            <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between mb-6">
              <div className="flex-1">
                <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
                  {job.title}
                </h1>
                <p className="text-gray-600 mb-4">{job.description}</p>
              </div>

              <div className="lg:ml-6 lg:w-80">
                <div className="bg-gradient-to-br from-purple-50 to-blue-50 rounded-lg p-4">
                  <div className="flex items-center space-x-3 mb-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-blue-500 rounded-full flex items-center justify-center text-white font-bold">
                      {job.freelancer.name[0]}
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">
                        {job.freelancer.name}
                      </h3>
                      <div className="flex items-center space-x-1 text-sm text-gray-600">
                        <span>⭐ {job.freelancer.rating}</span>
                        <span>•</span>
                        <span>{job.freelancer.completedJobs} trabajos</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2 mb-4">
                    {job.freelancer.skills.map((skill, index) => (
                      <span
                        key={index}
                        className="px-2 py-1 bg-purple-100 text-purple-700 text-xs rounded-full font-medium"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>

                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Valor del Hito:</span>
                      <span className="font-bold text-green-600">
                        ${milestone.amount} {job.currency}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Entregado:</span>
                      <span className="font-medium">
                        {formatDate(milestone.submittedAt)}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Información del Hito */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100"
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-900">
                {milestone.title}
              </h2>
              <span className="px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-sm font-medium">
                ⏳ En Revisión
              </span>
            </div>

            <p className="text-gray-700 mb-6">{milestone.description}</p>

            {/* Entregables */}
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">
                Entregables Requeridos
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {milestone.deliverables.map((deliverable, idx) => (
                  <div
                    key={idx}
                    className="flex items-center space-x-3 p-3 bg-green-50 border border-green-200 rounded-lg"
                  >
                    <span className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center text-white text-sm">
                      ✓
                    </span>
                    <div>
                      <span className="text-green-800 font-medium">
                        {deliverable.name}
                      </span>
                      <span className="text-green-600 text-sm ml-2">
                        ({deliverable.type})
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Entrega del Freelancer */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100"
          >
            <h2 className="text-xl font-bold text-gray-900 mb-6">
              Entrega del Freelancer
            </h2>

            {/* Descripción de la entrega */}
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">
                Descripción de la Entrega
              </h3>
              <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                <div className="prose prose-sm max-w-none">
                  {milestone.submission.description
                    .split("\n")
                    .map((paragraph, index) => {
                      if (
                        paragraph.trim().startsWith("**") &&
                        paragraph.trim().endsWith("**")
                      ) {
                        return (
                          <h4
                            key={index}
                            className="font-semibold text-gray-900 mt-4 mb-2"
                          >
                            {paragraph.replace(/\*\*/g, "")}
                          </h4>
                        );
                      }
                      if (paragraph.trim().startsWith("- ✅")) {
                        return (
                          <div
                            key={index}
                            className="flex items-center space-x-2 text-green-700 my-1"
                          >
                            <span>✅</span>
                            <span>{paragraph.replace("- ✅", "").trim()}</span>
                          </div>
                        );
                      }
                      if (paragraph.trim()) {
                        return (
                          <p key={index} className="mb-2 text-gray-700">
                            {paragraph}
                          </p>
                        );
                      }
                      return <br key={index} />;
                    })}
                </div>
              </div>
            </div>

            {/* Archivos entregados */}
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">
                Archivos Entregados
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                {milestone.submission.files.map((file, index) => (
                  <motion.a
                    key={index}
                    href={file.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center space-x-3 p-4 bg-blue-50 border border-blue-200 rounded-lg hover:bg-blue-100 transition-colors cursor-pointer"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <span className="text-2xl">{getFileIcon(file.type)}</span>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-blue-900 truncate">
                        {file.name}
                      </p>
                      <p className="text-sm text-blue-700">{file.size}</p>
                    </div>
                    <span className="text-blue-600">
                      <svg
                        className="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                        />
                      </svg>
                    </span>
                  </motion.a>
                ))}
              </div>
            </div>

            {/* Comentarios adicionales */}
            {milestone.submission.comments && (
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">
                  Comentarios Adicionales
                </h3>
                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                  <p className="text-green-800">
                    {milestone.submission.comments}
                  </p>
                </div>
              </div>
            )}
          </motion.div>

          {/* Historial de Comentarios */}
          {milestone.previousComments &&
            milestone.previousComments.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100"
              >
                <h2 className="text-xl font-bold text-gray-900 mb-6">
                  Historial de Comentarios
                </h2>
                <div className="space-y-4">
                  {milestone.previousComments.map((comment) => (
                    <div
                      key={comment.id}
                      className={`p-4 rounded-lg ${
                        comment.type === "question"
                          ? "bg-blue-50 border-l-4 border-blue-400"
                          : "bg-green-50 border-l-4 border-green-400"
                      }`}
                    >
                      <div className="flex justify-between items-start mb-2">
                        <span className="font-medium text-sm text-gray-900">
                          {comment.author}
                        </span>
                        <span className="text-xs text-gray-500">
                          {formatDate(comment.timestamp)}
                        </span>
                      </div>
                      <p className="text-sm text-gray-700">{comment.message}</p>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

          {/* Acciones de Revisión */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100"
          >
            <h2 className="text-xl font-bold text-gray-900 mb-6">
              Acciones de Revisión
            </h2>
            <p className="text-gray-600 mb-6">
              Revisa cuidadosamente la entrega del freelancer y decide si
              aprobar el hito o solicitar cambios.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <motion.button
                onClick={handleApprove}
                className="flex-1 bg-gradient-to-r from-green-600 to-green-700 text-white px-6 py-3 rounded-lg font-semibold hover:from-green-700 hover:to-green-800 transition-all duration-300 flex items-center justify-center space-x-2"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <span>✅</span>
                <span>Aprobar Hito</span>
              </motion.button>

              <motion.button
                onClick={handleRequestChanges}
                className="flex-1 bg-gradient-to-r from-yellow-600 to-orange-600 text-white px-6 py-3 rounded-lg font-semibold hover:from-yellow-700 hover:to-orange-700 transition-all duration-300 flex items-center justify-center space-x-2"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <span>🔄</span>
                <span>Solicitar Cambios</span>
              </motion.button>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Modal de Review */}
      {showReviewModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-2xl p-6 w-full max-w-2xl max-h-[80vh] overflow-y-auto"
          >
            <h3 className="text-xl font-bold text-gray-900 mb-4">
              {reviewData.approved ? "Aprobar Hito" : "Solicitar Cambios"}
            </h3>

            <div className="space-y-4">
              {/* Rating */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Calificación del trabajo (1-5 estrellas)
                </label>
                <div className="flex space-x-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      onClick={() =>
                        setReviewData((prev) => ({ ...prev, rating: star }))
                      }
                      className={`text-2xl transition-colors ${
                        star <= reviewData.rating
                          ? "text-yellow-500"
                          : "text-gray-300"
                      }`}
                    >
                      ⭐
                    </button>
                  ))}
                </div>
              </div>

              {/* Feedback */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Feedback para el freelancer *
                </label>
                <textarea
                  value={reviewData.feedback}
                  onChange={(e) =>
                    setReviewData((prev) => ({
                      ...prev,
                      feedback: e.target.value,
                    }))
                  }
                  placeholder={
                    reviewData.approved
                      ? "Comenta qué te gustó del trabajo, calidad del código, documentación, etc..."
                      : "Explica qué aspectos necesitan mejoras..."
                  }
                  rows={4}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                />
              </div>

              {/* Cambios solicitados (solo si no se aprueba) */}
              {reviewData.requestChanges && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Cambios específicos solicitados *
                  </label>
                  <textarea
                    value={reviewData.changeRequests}
                    onChange={(e) =>
                      setReviewData((prev) => ({
                        ...prev,
                        changeRequests: e.target.value,
                      }))
                    }
                    placeholder="Detalla específicamente qué cambios necesitas..."
                    rows={3}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                  />
                </div>
              )}

              <div className="flex space-x-3 pt-4">
                <button
                  onClick={() => setShowReviewModal(false)}
                  className="flex-1 py-3 px-4 border border-gray-300 rounded-lg font-medium text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  Cancelar
                </button>
                <button
                  onClick={submitReview}
                  className={`flex-1 py-3 px-4 text-white rounded-lg font-medium transition-colors ${
                    reviewData.approved
                      ? "bg-green-600 hover:bg-green-700"
                      : "bg-yellow-600 hover:bg-yellow-700"
                  }`}
                >
                  {reviewData.approved
                    ? "✅ Aprobar Hito"
                    : "🔄 Enviar Solicitud de Cambios"}
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default MilestoneReviewPage;
