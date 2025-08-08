import React from "react";
import { motion } from "framer-motion";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";

const ExecutiveSummary = ({ jobManagement, walletBalance }) => {
  // Calcular métricas desde los trabajos
  const activeJobs = jobManagement.jobs.filter(
    (job) => job.hasContractedFreelancer
  );
  const openJobs = jobManagement.jobs.filter(
    (job) => !job.hasContractedFreelancer
  );
  const totalApplicants = jobManagement.jobs.reduce(
    (sum, job) => sum + (job.applicants || 0),
    0
  );

  // Calcular fondos en escrow (suma de milestones pendientes y en progreso)
  const escrowAmount = activeJobs.reduce((sum, job) => {
    if (job.milestones) {
      const pendingAmount = job.milestones
        .filter(
          (m) =>
            m.status === "pending" ||
            m.status === "in_progress" ||
            m.status === "review"
        )
        .reduce((mSum, m) => mSum + m.amount, 0);
      return sum + pendingAmount;
    }
    return sum;
  }, 0);

  // Datos para gráfico de estado de trabajos
  const jobStatusData = [
    { name: "Activos", value: activeJobs.length, color: "#10B981" },
    { name: "Abiertos", value: openJobs.length, color: "#3B82F6" },
  ];

  // Datos para gráfico de gastos mensuales (simulados)
  const monthlySpendingData = [
    { month: "Oct", amount: 1200 },
    { month: "Nov", amount: 2800 },
    { month: "Dic", amount: 3400 },
    { month: "Ene", amount: walletBalance > 2500 ? 4200 : 2100 },
  ];

  const metrics = [
    {
      title: "Trabajos Activos",
      value: activeJobs.length,
      change: "+2",
      changeType: "positive",
      icon: "💼",
      description: "Proyectos en curso",
    },
    {
      title: "Freelancers Contratados",
      value: activeJobs.length,
      change: "+1",
      changeType: "positive",
      icon: "👥",
      description: "Talento trabajando",
    },
    {
      title: "Fondos en Escrow",
      value: `$${escrowAmount.toLocaleString()}`,
      change: "+$800",
      changeType: "positive",
      icon: "🔒",
      description: "Pagos pendientes",
    },
    {
      title: "Nuevas Propuestas",
      value: totalApplicants,
      change: "+5",
      changeType: "positive",
      icon: "📋",
      description: "Esta semana",
    },
  ];

  return (
    <div className="space-y-6">
      {/* Métricas principales */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {metrics.map((metric, index) => (
          <motion.div
            key={metric.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="bg-white rounded-xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-shadow duration-300"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-purple-100 to-blue-100 rounded-lg flex items-center justify-center">
                <span className="text-2xl">{metric.icon}</span>
              </div>
              <span
                className={`text-sm font-medium px-2 py-1 rounded-full ${
                  metric.changeType === "positive"
                    ? "bg-green-100 text-green-600"
                    : "bg-red-100 text-red-600"
                }`}
              >
                {metric.change}
              </span>
            </div>
            <h3 className="text-3xl font-bold text-gray-900 mb-1">
              {metric.value}
            </h3>
            <p className="text-sm font-medium text-gray-600 mb-1">
              {metric.title}
            </p>
            <p className="text-xs text-gray-500">{metric.description}</p>
          </motion.div>
        ))}
      </div>

      {/* Gráficos */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Distribución de trabajos */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="bg-white rounded-xl p-6 shadow-lg border border-gray-100"
        >
          <h3 className="text-lg font-bold text-gray-900 mb-4">
            Estado de Trabajos
          </h3>
          <div className="h-48">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={jobStatusData}
                  cx="50%"
                  cy="50%"
                  innerRadius={40}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {jobStatusData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  formatter={(value, name) => [`${value} trabajos`, name]}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="flex justify-center space-x-4 mt-4">
            {jobStatusData.map((item) => (
              <div key={item.name} className="flex items-center space-x-2">
                <div
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: item.color }}
                ></div>
                <span className="text-sm text-gray-600">{item.name}</span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Gastos mensuales */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="bg-white rounded-xl p-6 shadow-lg border border-gray-100"
        >
          <h3 className="text-lg font-bold text-gray-900 mb-4">
            Gastos Mensuales
          </h3>
          <div className="h-48">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={monthlySpendingData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="month" tick={{ fontSize: 12 }} />
                <YAxis tick={{ fontSize: 12 }} />
                <Tooltip
                  formatter={(value) => [
                    `$${value.toLocaleString()}`,
                    "Gastos",
                  ]}
                  labelStyle={{ color: "#374151" }}
                />
                <Bar
                  dataKey="amount"
                  fill="url(#colorGradient)"
                  radius={[4, 4, 0, 0]}
                />
                <defs>
                  <linearGradient
                    id="colorGradient"
                    x1="0"
                    y1="0"
                    x2="0"
                    y2="1"
                  >
                    <stop offset="5%" stopColor="#8B5CF6" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="#3B82F6" stopOpacity={0.6} />
                  </linearGradient>
                </defs>
              </BarChart>
            </ResponsiveContainer>
          </div>
          <p className="text-xs text-gray-500 mt-2">
            Este mes: $
            {monthlySpendingData[
              monthlySpendingData.length - 1
            ]?.amount.toLocaleString()}{" "}
            USDC
          </p>
        </motion.div>
      </div>

      {/* Tendencias y comparación */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.6 }}
        className="bg-gradient-to-r from-purple-50 to-blue-50 rounded-xl p-6 border border-purple-100"
      >
        <h3 className="text-lg font-bold text-gray-900 mb-4">
          Resumen del Mes
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-purple-600">
              $
              {monthlySpendingData[
                monthlySpendingData.length - 1
              ]?.amount.toLocaleString()}
            </div>
            <div className="text-sm text-gray-600">Invertido este mes</div>
            <div className="text-xs text-green-600">+24% vs mes anterior</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-600">
              {activeJobs.length}
            </div>
            <div className="text-sm text-gray-600">Proyectos completándose</div>
            <div className="text-xs text-green-600">Dentro de cronograma</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-green-600">4.8⭐</div>
            <div className="text-sm text-gray-600">Rating promedio</div>
            <div className="text-xs text-green-600">+0.2 vs mes anterior</div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default ExecutiveSummary;
