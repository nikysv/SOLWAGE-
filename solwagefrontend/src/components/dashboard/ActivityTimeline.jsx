import React, { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const ActivityTimeline = ({ jobManagement, walletBalance }) => {
  const navigate = useNavigate();
  const [timeFilter, setTimeFilter] = useState("today"); // "today", "week", "month"

  // Generar actividades basadas en datos reales y simulados
  const generateActivities = () => {
    const activities = [];
    const now = new Date();

    // Actividades basadas en trabajos reales
    jobManagement.jobs.forEach((job) => {
      if (job.hasContractedFreelancer && job.milestones) {
        job.milestones.forEach((milestone) => {
          if (milestone.status === "completed" && milestone.completedAt) {
            activities.push({
              id: `milestone-completed-${job.id}-${milestone.id}`,
              type: "milestone_completed",
              title: "Hito completado",
              description: `${
                job.hiredFreelancer?.name || "Freelancer"
              } completó "${milestone.title}"`,
              project: job.title,
              timestamp: new Date(milestone.completedAt),
              icon: "✅",
              color: "green",
              amount: `+$${milestone.amount}`,
              action: () => navigate(`/employer/jobs/${job.id}`),
            });
          }

          if (milestone.status === "review" && milestone.submittedAt) {
            activities.push({
              id: `milestone-submitted-${job.id}-${milestone.id}`,
              type: "milestone_submitted",
              title: "Entrega recibida",
              description: `${
                job.hiredFreelancer?.name || "Freelancer"
              } envió "${milestone.title}" para revisión`,
              project: job.title,
              timestamp: new Date(milestone.submittedAt),
              icon: "📤",
              color: "yellow",
              action: () =>
                navigate(
                  `/employer/jobs/${job.id}/milestone/${milestone.id}/review`
                ),
            });
          }
        });
      }

      // Nuevas propuestas
      if (!job.hasContractedFreelancer && job.applicants > 0) {
        activities.push({
          id: `proposals-${job.id}`,
          type: "new_proposals",
          title: "Nuevas propuestas",
          description: `${job.applicants} freelancers aplicaron a "${job.title}"`,
          project: job.title,
          timestamp: new Date(
            now.getTime() - Math.random() * 48 * 60 * 60 * 1000
          ), // Últimas 48 horas
          icon: "📨",
          color: "blue",
          action: () => navigate(`/employer/jobs/${job.id}`),
        });
      }
    });

    // Actividades simuladas adicionales
    const simulatedActivities = [
      {
        id: "payment-released-1",
        type: "payment_released",
        title: "Pago liberado",
        description:
          "Se liberaron fondos por completar hito de infraestructura",
        project: "Sistema DevOps",
        timestamp: new Date(now.getTime() - 6 * 60 * 60 * 1000), // 6 horas
        icon: "💰",
        color: "green",
        amount: "-$800",
        action: () => navigate("/employer/wallet"),
      },
      {
        id: "freelancer-hired-1",
        type: "freelancer_hired",
        title: "Freelancer contratado",
        description: "Contrataste a Ana Martínez para el proyecto de DevOps",
        project: "Sistema DevOps",
        timestamp: new Date(now.getTime() - 2 * 24 * 60 * 60 * 1000), // 2 días
        icon: "🤝",
        color: "purple",
        action: () => navigate("/employer/trabajos"),
      },
      {
        id: "job-posted-1",
        type: "job_posted",
        title: "Trabajo publicado",
        description: "Publicaste 'Desarrollo de Smart Contract DeFi'",
        project: "Smart Contract DeFi",
        timestamp: new Date(now.getTime() - 5 * 24 * 60 * 60 * 1000), // 5 días
        icon: "📋",
        color: "blue",
        action: () => navigate("/employer/trabajos"),
      },
      {
        id: "funds-added-1",
        type: "funds_added",
        title: "Fondos añadidos",
        description: `Añadiste $${
          walletBalance > 2500 ? "1,000" : "500"
        } USDC a tu Smart Wallet`,
        project: "Wallet",
        timestamp: new Date(now.getTime() - 3 * 24 * 60 * 60 * 1000), // 3 días
        icon: "💳",
        color: "green",
        amount: `+$${walletBalance > 2500 ? "1,000" : "500"}`,
        action: () => navigate("/employer/wallet"),
      },
      {
        id: "review-completed-1",
        type: "review_completed",
        title: "Revisión completada",
        description: "Aprobaste el hito 'Análisis de Requisitos'",
        project: "Smart Contract DeFi",
        timestamp: new Date(now.getTime() - 4 * 24 * 60 * 60 * 1000), // 4 días
        icon: "⭐",
        color: "yellow",
        action: () => navigate("/employer/trabajos"),
      },
    ];

    return [...activities, ...simulatedActivities];
  };

  const allActivities = generateActivities().sort(
    (a, b) => b.timestamp - a.timestamp
  );

  // Filtrar por tiempo
  const filterActivitiesByTime = (activities) => {
    const now = new Date();
    const startOfToday = new Date(
      now.getFullYear(),
      now.getMonth(),
      now.getDate()
    );
    const startOfWeek = new Date(
      startOfToday.getTime() - 7 * 24 * 60 * 60 * 1000
    );
    const startOfMonth = new Date(
      startOfToday.getTime() - 30 * 24 * 60 * 60 * 1000
    );

    switch (timeFilter) {
      case "today":
        return activities.filter((a) => a.timestamp >= startOfToday);
      case "week":
        return activities.filter((a) => a.timestamp >= startOfWeek);
      case "month":
        return activities.filter((a) => a.timestamp >= startOfMonth);
      default:
        return activities;
    }
  };

  const filteredActivities = filterActivitiesByTime(allActivities);

  const getTimeAgo = (timestamp) => {
    const now = new Date();
    const diff = now - timestamp;
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));

    if (days > 0) return `hace ${days} día${days > 1 ? "s" : ""}`;
    if (hours > 0) return `hace ${hours} hora${hours > 1 ? "s" : ""}`;
    return "hace unos minutos";
  };

  const getColorClasses = (color) => {
    switch (color) {
      case "green":
        return "bg-green-100 text-green-600 border-green-200";
      case "blue":
        return "bg-blue-100 text-blue-600 border-blue-200";
      case "yellow":
        return "bg-yellow-100 text-yellow-600 border-yellow-200";
      case "purple":
        return "bg-purple-100 text-purple-600 border-purple-200";
      case "red":
        return "bg-red-100 text-red-600 border-red-200";
      default:
        return "bg-gray-100 text-gray-600 border-gray-200";
    }
  };

  const timeFilters = [
    { key: "today", label: "Hoy" },
    { key: "week", label: "Esta semana" },
    { key: "month", label: "Este mes" },
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
            <span className="text-white text-lg">📈</span>
          </div>
          <div>
            <h2 className="text-xl font-bold text-gray-900">
              Actividad Reciente
            </h2>
            <p className="text-sm text-gray-600">
              {filteredActivities.length} actividades en el período seleccionado
            </p>
          </div>
        </div>
      </div>

      {/* Filtros de tiempo */}
      <div className="flex space-x-2 mb-6">
        {timeFilters.map((filter) => (
          <button
            key={filter.key}
            onClick={() => setTimeFilter(filter.key)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
              timeFilter === filter.key
                ? "bg-purple-100 text-purple-700 border border-purple-200"
                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            }`}
          >
            {filter.label}
          </button>
        ))}
      </div>

      {/* Timeline */}
      <div className="relative max-h-96 overflow-y-auto">
        {filteredActivities.length === 0 ? (
          <div className="text-center py-8">
            <span className="text-4xl mb-2 block">📋</span>
            <p className="text-gray-500">No hay actividad en este período</p>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredActivities.map((activity, index) => (
              <motion.div
                key={activity.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                className="relative flex items-start space-x-4 group hover:bg-gray-50 p-3 rounded-lg transition-colors duration-200"
              >
                {/* Timeline line */}
                {index < filteredActivities.length - 1 && (
                  <div className="absolute left-6 top-12 w-0.5 h-8 bg-gray-200"></div>
                )}

                {/* Icon */}
                <div
                  className={`w-12 h-12 rounded-full flex items-center justify-center border-2 ${getColorClasses(
                    activity.color
                  )} flex-shrink-0`}
                >
                  <span className="text-lg">{activity.icon}</span>
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <h3 className="font-semibold text-gray-900 text-sm">
                      {activity.title}
                    </h3>
                    {activity.amount && (
                      <span
                        className={`text-sm font-bold ${
                          activity.amount.startsWith("+")
                            ? "text-green-600"
                            : "text-red-600"
                        }`}
                      >
                        {activity.amount}
                      </span>
                    )}
                  </div>
                  <p className="text-gray-700 text-sm mb-1">
                    {activity.description}
                  </p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <span className="text-xs text-gray-500">
                        {activity.project}
                      </span>
                      <span className="text-xs text-gray-400">•</span>
                      <span className="text-xs text-gray-500">
                        {getTimeAgo(activity.timestamp)}
                      </span>
                    </div>
                    {activity.action && (
                      <motion.button
                        onClick={activity.action}
                        className="text-xs text-purple-600 hover:text-purple-800 font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                        whileHover={{ scale: 1.05 }}
                      >
                        Ver detalles →
                      </motion.button>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>

      {/* Footer */}
      {filteredActivities.length > 0 && (
        <div className="mt-4 pt-4 border-t border-gray-200">
          <p className="text-xs text-gray-500 text-center">
            Mostrando {filteredActivities.length} de {allActivities.length}{" "}
            actividades
          </p>
        </div>
      )}
    </motion.div>
  );
};

export default ActivityTimeline;
