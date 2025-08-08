import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";

const NotificationCenter = ({ jobManagement }) => {
  const navigate = useNavigate();
  const [filter, setFilter] = useState("all"); // "all", "urgent", "reviews", "proposals"

  // Generar notificaciones basadas en los datos
  const generateNotifications = () => {
    const notifications = [];

    // Entregas pendientes de revisión
    jobManagement.jobs.forEach((job) => {
      if (job.milestones) {
        job.milestones.forEach((milestone) => {
          if (milestone.status === "review") {
            notifications.push({
              id: `review-${job.id}-${milestone.id}`,
              type: "review",
              priority: "urgent",
              title: "Entrega pendiente de revisión",
              message: `${milestone.title} - ${job.title}`,
              time: "2 horas",
              icon: "📋",
              action: () =>
                navigate(
                  `/employer/jobs/${job.id}/milestone/${milestone.id}/review`
                ),
              actionText: "Revisar",
            });
          }
        });
      }
    });

    // Nuevas propuestas en trabajos abiertos
    jobManagement.jobs.forEach((job) => {
      if (!job.hasContractedFreelancer && job.applicants > 0) {
        notifications.push({
          id: `proposals-${job.id}`,
          type: "proposals",
          priority: "medium",
          title: "Nuevas propuestas recibidas",
          message: `${job.applicants} propuestas en "${job.title}"`,
          time: "5 horas",
          icon: "📨",
          action: () => navigate(`/employer/jobs/${job.id}`),
          actionText: "Ver propuestas",
        });
      }
    });

    // Deadlines próximos
    jobManagement.jobs.forEach((job) => {
      if (job.milestones) {
        job.milestones.forEach((milestone) => {
          if (milestone.status === "in_progress") {
            const dueDate = new Date(milestone.dueDate);
            const today = new Date();
            const daysUntilDue = Math.ceil(
              (dueDate - today) / (1000 * 60 * 60 * 24)
            );

            if (daysUntilDue <= 3 && daysUntilDue > 0) {
              notifications.push({
                id: `deadline-${job.id}-${milestone.id}`,
                type: "deadline",
                priority: "urgent",
                title: "Deadline próximo",
                message: `${milestone.title} vence en ${daysUntilDue} días`,
                time: "1 día",
                icon: "⏰",
                action: () => navigate(`/employer/jobs/${job.id}`),
                actionText: "Ver trabajo",
              });
            }
          }
        });
      }
    });

    // Actualizaciones generales (simuladas)
    const generalUpdates = [
      {
        id: "update-1",
        type: "update",
        priority: "low",
        title: "Freelancer envió actualización",
        message: "Carlos R. actualizó el progreso del Smart Contract",
        time: "3 horas",
        icon: "💬",
        action: () => navigate("/employer/trabajos"),
        actionText: "Ver trabajos",
      },
      {
        id: "payment-1",
        type: "payment",
        priority: "medium",
        title: "Pago liberado exitosamente",
        message: "Se liberaron $800 USDC por completar hito",
        time: "1 día",
        icon: "💰",
        action: () => navigate("/employer/wallet"),
        actionText: "Ver wallet",
      },
      {
        id: "completion-1",
        type: "completion",
        priority: "medium",
        title: "Hito completado",
        message: "Ana M. completó 'Configuración de Infraestructura'",
        time: "2 días",
        icon: "✅",
        action: () => navigate("/employer/trabajos"),
        actionText: "Ver detalles",
      },
    ];

    return [...notifications, ...generalUpdates];
  };

  const allNotifications = generateNotifications();

  const filteredNotifications = allNotifications.filter((notification) => {
    if (filter === "all") return true;
    if (filter === "urgent") return notification.priority === "urgent";
    if (filter === "reviews") return notification.type === "review";
    if (filter === "proposals") return notification.type === "proposals";
    return true;
  });

  const urgentCount = allNotifications.filter(
    (n) => n.priority === "urgent"
  ).length;

  const getPriorityColor = (priority) => {
    switch (priority) {
      case "urgent":
        return "border-l-red-400 bg-red-50";
      case "medium":
        return "border-l-yellow-400 bg-yellow-50";
      case "low":
        return "border-l-green-400 bg-green-50";
      default:
        return "border-l-gray-400 bg-gray-50";
    }
  };

  const filters = [
    { key: "all", label: "Todas", count: allNotifications.length },
    { key: "urgent", label: "Urgentes", count: urgentCount },
    {
      key: "reviews",
      label: "Revisiones",
      count: allNotifications.filter((n) => n.type === "review").length,
    },
    {
      key: "proposals",
      label: "Propuestas",
      count: allNotifications.filter((n) => n.type === "proposals").length,
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="bg-white rounded-xl p-6 shadow-lg border border-gray-100"
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-blue-500 rounded-lg flex items-center justify-center">
            <span className="text-white text-lg">🔔</span>
          </div>
          <div>
            <h2 className="text-xl font-bold text-gray-900">
              Centro de Notificaciones
            </h2>
            <p className="text-sm text-gray-600">
              {urgentCount > 0
                ? `${urgentCount} requieren atención urgente`
                : "Todo al día"}
            </p>
          </div>
        </div>
        {urgentCount > 0 && (
          <div className="bg-red-100 text-red-600 px-3 py-1 rounded-full text-sm font-medium">
            {urgentCount} urgentes
          </div>
        )}
      </div>

      {/* Filtros */}
      <div className="flex flex-wrap gap-2 mb-6">
        {filters.map((filterItem) => (
          <button
            key={filterItem.key}
            onClick={() => setFilter(filterItem.key)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
              filter === filterItem.key
                ? "bg-purple-100 text-purple-700 border border-purple-200"
                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            }`}
          >
            {filterItem.label}
            {filterItem.count > 0 && (
              <span className="ml-2 bg-white px-2 py-0.5 rounded-full text-xs">
                {filterItem.count}
              </span>
            )}
          </button>
        ))}
      </div>

      {/* Lista de notificaciones */}
      <div className="space-y-3 max-h-96 overflow-y-auto">
        <AnimatePresence>
          {filteredNotifications.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-8"
            >
              <span className="text-4xl mb-2 block">📭</span>
              <p className="text-gray-500">
                No hay notificaciones en esta categoría
              </p>
            </motion.div>
          ) : (
            filteredNotifications.map((notification, index) => (
              <motion.div
                key={notification.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                className={`border-l-4 rounded-lg p-4 hover:shadow-md transition-shadow duration-200 ${getPriorityColor(
                  notification.priority
                )}`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-3 flex-1">
                    <span className="text-2xl flex-shrink-0">
                      {notification.icon}
                    </span>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-gray-900 text-sm">
                        {notification.title}
                      </h3>
                      <p className="text-gray-700 text-sm mt-1">
                        {notification.message}
                      </p>
                      <p className="text-gray-500 text-xs mt-2">
                        Hace {notification.time}
                      </p>
                    </div>
                  </div>
                  <motion.button
                    onClick={notification.action}
                    className="bg-purple-600 text-white px-3 py-1 rounded-lg text-xs font-medium hover:bg-purple-700 transition-colors flex-shrink-0 ml-3"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {notification.actionText}
                  </motion.button>
                </div>
              </motion.div>
            ))
          )}
        </AnimatePresence>
      </div>

      {/* Footer */}
      {filteredNotifications.length > 0 && (
        <div className="mt-4 pt-4 border-t border-gray-200">
          <div className="flex items-center justify-between">
            <p className="text-xs text-gray-500">
              {filteredNotifications.length} notificaciones mostradas
            </p>
            <button className="text-xs text-purple-600 hover:text-purple-800 font-medium">
              Marcar todas como leídas
            </button>
          </div>
        </div>
      )}
    </motion.div>
  );
};

export default NotificationCenter;
