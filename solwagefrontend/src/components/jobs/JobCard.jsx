import React from "react";
import { motion } from "framer-motion";

const JobCard = ({ job, onClick }) => {
  const getStatusColor = (status) => {
    switch (status) {
      case "Abierto":
        return "bg-green-100 text-green-800";
      case "En Curso":
        return "bg-blue-100 text-blue-800";
      case "Completado":
        return "bg-purple-100 text-purple-800";
      case "Cerrado":
        return "bg-gray-100 text-gray-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("es-ES", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  return (
    <motion.div
      className="bg-white rounded-xl shadow-lg border border-gray-100 p-6 hover:shadow-xl transition-all duration-300 cursor-pointer"
      whileHover={{ scale: 1.02, y: -2 }}
      whileTap={{ scale: 0.98 }}
      onClick={() => onClick(job.id)}
    >
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">
            {job.title}
          </h3>
          <p className="text-gray-600 text-sm mb-3 line-clamp-2">
            {job.description}
          </p>
        </div>
        <div className="ml-4 text-right">
          <span
            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(
              job.status
            )}`}
          >
            {job.status}
          </span>
        </div>
      </div>

      <div className="space-y-3">
        {/* Skills */}
        <div className="flex flex-wrap gap-2">
          {job.skills.slice(0, 3).map((skill, index) => (
            <span
              key={index}
              className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800"
            >
              {skill}
            </span>
          ))}
          {job.skills.length > 3 && (
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-600">
              +{job.skills.length - 3} más
            </span>
          )}
        </div>

        {/* Stats */}
        <div className="flex items-center justify-between text-sm text-gray-500">
          <div className="flex items-center space-x-4">
            {job.hasContractedFreelancer ? (
              <span className="flex items-center text-green-600">
                <svg
                  className="w-4 h-4 mr-1"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                  />
                </svg>
                Freelancer asignado
              </span>
            ) : (
              <span className="flex items-center text-blue-600">
                <svg
                  className="w-4 h-4 mr-1"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
                Vacante abierta
              </span>
            )}
            <span className="flex items-center">
              <svg
                className="w-4 h-4 mr-1"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"
                />
              </svg>
              ${job.budget}
            </span>
          </div>
          <span className="text-xs">{formatDate(job.createdAt)}</span>
        </div>
      </div>

      {/* Action Button */}
      <div className="mt-4 pt-4 border-t border-gray-100">
        <motion.button
          className={`w-full px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
            job.hasContractedFreelancer
              ? "bg-gradient-to-r from-green-600 to-emerald-600 text-white hover:from-green-700 hover:to-emerald-700"
              : "bg-gradient-to-r from-purple-600 to-blue-600 text-white hover:from-purple-700 hover:to-blue-700"
          }`}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          {job.hasContractedFreelancer
            ? "Gestionar Trabajo"
            : "Ver Postulantes"}
        </motion.button>
      </div>
    </motion.div>
  );
};

export default JobCard;
