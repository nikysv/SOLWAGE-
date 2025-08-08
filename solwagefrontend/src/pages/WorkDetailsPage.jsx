import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useParams, useNavigate } from "react-router-dom";

const WorkDetailsPage = ({ auth }) => {
  const { workId } = useParams();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [work, setWork] = useState(null);
  const [selectedMilestone, setSelectedMilestone] = useState(null);
  const [showDeliveryModal, setShowDeliveryModal] = useState(false);
  const [deliveryData, setDeliveryData] = useState({
    description: "",
    files: [],
    comments: "",
  });

  // Mock data para el trabajo
  useEffect(() => {
    const loadWorkDetails = async () => {
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Simular datos del trabajo
      const mockWork = {
        id: workId,
        title: "Desarrollo de Smart Contract DeFi",
        description:
          "Desarrollo completo de un contrato inteligente para protocolo DeFi en Soroban, incluyendo funcionalidades de staking, rewards y governance.",
        client: {
          name: "FinanceTech Solutions",
          avatar: "",
          rating: 4.8,
          completedJobs: 25,
        },
        budget: 3200,
        currency: "USDC",
        startDate: "2024-01-15T10:00:00.000Z",
        deadline: "2024-03-15T23:59:59.000Z",
        status: "En Progreso",
        progress: 60,
        totalMilestones: 4,
        completedMilestones: 2,
        skills: ["Rust", "Soroban", "DeFi", "Smart Contracts", "Stellar"],
        milestones: [
          {
            id: 1,
            title: "Análisis de Requisitos",
            description:
              "Definir especificaciones técnicas del smart contract y arquitectura general",
            amount: 800,
            dueDate: "2024-01-25T23:59:59.000Z",
            status: "completed",
            completedAt: "2024-01-20T10:00:00.000Z",
            deliverables: [
              {
                name: "Documento de especificaciones",
                type: "pdf",
                delivered: true,
              },
              {
                name: "Diagrama de arquitectura",
                type: "png",
                delivered: true,
              },
            ],
            clientFeedback:
              "Excelente trabajo en el análisis. Las especificaciones están muy detalladas.",
            clientRating: 5,
          },
          {
            id: 2,
            title: "Desarrollo del Core Contract",
            description:
              "Implementar la lógica principal del contrato: staking, rewards y funciones básicas",
            amount: 1200,
            dueDate: "2024-02-15T23:59:59.000Z",
            status: "completed",
            completedAt: "2024-02-10T15:30:00.000Z",
            deliverables: [
              {
                name: "Código fuente del contrato",
                type: "rs",
                delivered: true,
              },
              { name: "Tests unitarios", type: "rs", delivered: true },
              { name: "Documentación técnica", type: "md", delivered: true },
            ],
            clientFeedback:
              "Código limpio y bien documentado. Los tests cubren todos los casos importantes.",
            clientRating: 5,
          },
          {
            id: 3,
            title: "Implementación de Governance",
            description:
              "Desarrollar sistema de governance y voting para el protocolo DeFi",
            amount: 800,
            dueDate: "2024-03-01T23:59:59.000Z",
            status: "in_progress",
            progress: 75,
            deliverables: [
              { name: "Contrato de governance", type: "rs", delivered: false },
              { name: "Sistema de voting", type: "rs", delivered: false },
              { name: "Tests de integración", type: "rs", delivered: false },
            ],
            comments: [
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
                author: "Tu",
                message:
                  "Por supuesto, implementaré un sistema de veto con timelock para propuestas críticas. Esto añadirá una capa extra de seguridad.",
                timestamp: "2024-02-20T16:45:00.000Z",
                type: "response",
              },
            ],
          },
          {
            id: 4,
            title: "Testing y Deployment",
            description:
              "Testing completo en testnet, auditoría de seguridad y deployment final",
            amount: 400,
            dueDate: "2024-03-15T23:59:59.000Z",
            status: "pending",
            deliverables: [
              { name: "Reporte de testing", type: "pdf", delivered: false },
              { name: "Reporte de auditoría", type: "pdf", delivered: false },
              { name: "Contrato deployado", type: "link", delivered: false },
            ],
          },
        ],
      };

      setWork(mockWork);
      setIsLoading(false);
    };

    loadWorkDetails();
  }, [workId]);

  const handleDeliverMilestone = (milestone) => {
    setSelectedMilestone(milestone);
    setShowDeliveryModal(true);
  };

  const submitDelivery = async () => {
    if (!deliveryData.description.trim()) {
      alert("Por favor describe lo que estás entregando");
      return;
    }

    // Simular envío
    await new Promise((resolve) => setTimeout(resolve, 1500));

    // Actualizar estado del hito
    setWork((prev) => ({
      ...prev,
      milestones: prev.milestones.map((m) =>
        m.id === selectedMilestone.id
          ? { ...m, status: "review", submittedAt: new Date().toISOString() }
          : m
      ),
    }));

    setShowDeliveryModal(false);
    setDeliveryData({ description: "", files: [], comments: "" });
    setSelectedMilestone(null);
    alert("¡Entregable enviado! El cliente lo revisará pronto.");
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
        return "Desconocido";
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Cargando detalles del trabajo...</p>
        </div>
      </div>
    );
  }

  if (!work) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Trabajo no encontrado
          </h2>
          <p className="text-gray-600 mb-4">
            El trabajo que buscas no existe o ha sido eliminado.
          </p>
          <button
            onClick={() => navigate("/freelancer/dashboard")}
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
                  onClick={() => navigate("/freelancer/dashboard")}
                  className="text-gray-600 hover:text-purple-600 transition-colors"
                >
                  ← Volver a Trabajos Activos
                </button>
                <span className="text-purple-600 font-medium">
                  Detalles del Trabajo
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
          {/* Información del Trabajo */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100"
          >
            <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between mb-6">
              <div className="flex-1">
                <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
                  {work.title}
                </h1>
                <p className="text-gray-600 mb-4">{work.description}</p>

                <div className="flex flex-wrap gap-2 mb-4">
                  {work.skills.map((skill, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-purple-100 text-purple-700 text-sm rounded-full font-medium"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              <div className="lg:ml-6 lg:w-80">
                <div className="bg-gradient-to-br from-purple-50 to-blue-50 rounded-lg p-4">
                  <div className="flex items-center space-x-3 mb-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-blue-500 rounded-full flex items-center justify-center text-white font-bold">
                      {work.client.name[0]}
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">
                        {work.client.name}
                      </h3>
                      <div className="flex items-center space-x-1 text-sm text-gray-600">
                        <span>⭐ {work.client.rating}</span>
                        <span>•</span>
                        <span>{work.client.completedJobs} trabajos</span>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Presupuesto:</span>
                      <span className="font-bold text-green-600">
                        ${work.budget} {work.currency}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Estado:</span>
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(
                          work.status.toLowerCase()
                        )}`}
                      >
                        {work.status}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Progreso:</span>
                      <span className="font-medium">{work.progress}%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Hitos:</span>
                      <span className="font-medium">
                        {work.completedMilestones}/{work.totalMilestones}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Fecha límite:</span>
                      <span className="font-medium text-sm">
                        {formatDate(work.deadline)}
                      </span>
                    </div>
                  </div>

                  <div className="mt-4">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm text-gray-600">
                        Progreso General
                      </span>
                      <span className="text-sm font-medium">
                        {work.progress}%
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-gradient-to-r from-purple-600 to-blue-600 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${work.progress}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Hitos del Proyecto */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100"
          >
            <h2 className="text-xl font-bold text-gray-900 mb-6">
              Hitos del Proyecto
            </h2>

            <div className="space-y-6">
              {work.milestones.map((milestone, index) => (
                <div key={milestone.id} className="relative">
                  {/* Línea conectora */}
                  {index < work.milestones.length - 1 && (
                    <div className="absolute left-6 top-12 w-0.5 h-16 bg-gray-300"></div>
                  )}

                  <div className="flex items-start space-x-4">
                    {/* Indicador de estado */}
                    <div
                      className={`w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-sm ${
                        milestone.status === "completed"
                          ? "bg-green-500"
                          : milestone.status === "in_progress"
                          ? "bg-blue-500"
                          : milestone.status === "review"
                          ? "bg-yellow-500"
                          : "bg-gray-400"
                      }`}
                    >
                      {index + 1}
                    </div>

                    {/* Contenido del hito */}
                    <div className="flex-1 bg-gray-50 rounded-lg p-4">
                      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-3">
                        <h3 className="text-lg font-semibold text-gray-900 mb-2 md:mb-0">
                          {milestone.title}
                        </h3>
                        <div className="flex items-center space-x-3">
                          <span
                            className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(
                              milestone.status
                            )}`}
                          >
                            {getStatusText(milestone.status)}
                          </span>
                          <span className="text-sm font-bold text-green-600">
                            ${milestone.amount} {work.currency}
                          </span>
                        </div>
                      </div>

                      <p className="text-gray-700 mb-4">
                        {milestone.description}
                      </p>

                      {/* Entregables */}
                      <div className="mb-4">
                        <h4 className="font-medium text-gray-900 mb-2">
                          Entregables:
                        </h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                          {milestone.deliverables.map((deliverable, idx) => (
                            <div
                              key={idx}
                              className="flex items-center space-x-2 text-sm"
                            >
                              <span
                                className={`w-4 h-4 rounded-full ${
                                  deliverable.delivered
                                    ? "bg-green-500"
                                    : "bg-gray-300"
                                }`}
                              ></span>
                              <span
                                className={
                                  deliverable.delivered
                                    ? "text-green-700"
                                    : "text-gray-600"
                                }
                              >
                                {deliverable.name}
                              </span>
                              <span className="text-gray-400">
                                ({deliverable.type})
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Fecha límite y progreso */}
                      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                        <span className="text-sm text-gray-600">
                          📅 Fecha límite: {formatDate(milestone.dueDate)}
                        </span>
                        {milestone.status === "in_progress" &&
                          milestone.progress && (
                            <div className="flex items-center space-x-2 mt-2 md:mt-0">
                              <span className="text-sm text-gray-600">
                                Progreso:
                              </span>
                              <div className="w-24 bg-gray-200 rounded-full h-2">
                                <div
                                  className="bg-blue-500 h-2 rounded-full"
                                  style={{ width: `${milestone.progress}%` }}
                                ></div>
                              </div>
                              <span className="text-sm font-medium">
                                {milestone.progress}%
                              </span>
                            </div>
                          )}
                      </div>

                      {/* Comentarios y feedback */}
                      {milestone.comments && milestone.comments.length > 0 && (
                        <div className="mb-4">
                          <h4 className="font-medium text-gray-900 mb-2">
                            Comentarios:
                          </h4>
                          <div className="space-y-2">
                            {milestone.comments.map((comment) => (
                              <div
                                key={comment.id}
                                className={`p-3 rounded-lg ${
                                  comment.type === "question"
                                    ? "bg-blue-50 border-l-4 border-blue-400"
                                    : "bg-green-50 border-l-4 border-green-400"
                                }`}
                              >
                                <div className="flex justify-between items-start mb-1">
                                  <span className="font-medium text-sm">
                                    {comment.author}
                                  </span>
                                  <span className="text-xs text-gray-500">
                                    {formatDate(comment.timestamp)}
                                  </span>
                                </div>
                                <p className="text-sm text-gray-700">
                                  {comment.message}
                                </p>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Feedback del cliente */}
                      {milestone.clientFeedback && (
                        <div className="mb-4 p-3 bg-green-50 border-l-4 border-green-400 rounded-lg">
                          <h4 className="font-medium text-green-900 mb-1 flex items-center">
                            ⭐ Feedback del Cliente
                            {milestone.clientRating && (
                              <span className="ml-2 text-sm">
                                ({milestone.clientRating}/5)
                              </span>
                            )}
                          </h4>
                          <p className="text-sm text-green-800">
                            {milestone.clientFeedback}
                          </p>
                        </div>
                      )}

                      {/* Acciones */}
                      <div className="flex flex-wrap gap-2">
                        {milestone.status === "in_progress" && (
                          <motion.button
                            onClick={() => handleDeliverMilestone(milestone)}
                            className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-4 py-2 rounded-lg font-medium hover:from-purple-700 hover:to-blue-700 transition-all duration-300 text-sm"
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                          >
                            📤 Entregar Hito
                          </motion.button>
                        )}
                        {milestone.status === "completed" &&
                          milestone.completedAt && (
                            <span className="text-sm text-green-600 bg-green-100 px-3 py-1 rounded-full">
                              ✅ Completado el{" "}
                              {formatDate(milestone.completedAt)}
                            </span>
                          )}
                        {milestone.status === "review" && (
                          <span className="text-sm text-yellow-600 bg-yellow-100 px-3 py-1 rounded-full">
                            ⏳ En revisión por el cliente
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      {/* Modal de Entrega */}
      {showDeliveryModal && selectedMilestone && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-2xl p-6 w-full max-w-2xl max-h-[80vh] overflow-y-auto"
          >
            <h3 className="text-xl font-bold text-gray-900 mb-4">
              Entregar Hito: {selectedMilestone.title}
            </h3>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Descripción de la entrega *
                </label>
                <textarea
                  value={deliveryData.description}
                  onChange={(e) =>
                    setDeliveryData((prev) => ({
                      ...prev,
                      description: e.target.value,
                    }))
                  }
                  placeholder="Describe qué estás entregando y cualquier información relevante..."
                  rows={4}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Archivos/Enlaces
                </label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                  <p className="text-gray-500 mb-2">
                    📎 Arrastra archivos aquí o haz click para seleccionar
                  </p>
                  <p className="text-xs text-gray-400">
                    También puedes incluir enlaces en la descripción
                  </p>
                  <input
                    type="file"
                    multiple
                    className="hidden"
                    id="file-upload"
                  />
                  <label
                    htmlFor="file-upload"
                    className="cursor-pointer bg-gray-100 hover:bg-gray-200 px-4 py-2 rounded-lg text-sm font-medium transition-colors inline-block mt-2"
                  >
                    Seleccionar Archivos
                  </label>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Comentarios adicionales
                </label>
                <textarea
                  value={deliveryData.comments}
                  onChange={(e) =>
                    setDeliveryData((prev) => ({
                      ...prev,
                      comments: e.target.value,
                    }))
                  }
                  placeholder="Comentarios adicionales para el cliente (opcional)..."
                  rows={3}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                />
              </div>

              <div className="flex space-x-3 pt-4">
                <button
                  onClick={() => setShowDeliveryModal(false)}
                  className="flex-1 py-3 px-4 border border-gray-300 rounded-lg font-medium text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  Cancelar
                </button>
                <button
                  onClick={submitDelivery}
                  className="flex-1 py-3 px-4 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg font-medium hover:from-purple-700 hover:to-blue-700 transition-colors"
                >
                  📤 Enviar Entrega
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default WorkDetailsPage;
