import { useNavigate, useParams } from "react-router";
import { useData } from "../context/DataContext";
import { Card } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { ArrowLeft, TrendingDown, TrendingUp, Pill, Activity } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine } from "recharts";
import { format } from "date-fns";
import { es } from "date-fns/locale";

export default function Timeline() {
  const navigate = useNavigate();
  const { id } = useParams();
  const { pacientes, crisis, medicamentos } = useData();

  const paciente = pacientes.find((p) => p.id === id);
  const crisisPaciente = crisis.filter((c) => c.pacienteId === id).sort((a, b) => a.fecha.getTime() - b.fecha.getTime());
  const medicamentosPaciente = medicamentos.filter((m) => m.pacienteId === id).sort((a, b) => a.fechaInicio.getTime() - b.fechaInicio.getTime());

  if (!paciente) {
    return <div>Paciente no encontrado</div>;
  }

  // Preparar datos para el gráfico
  const chartData = crisisPaciente.map((c) => ({
    fecha: format(c.fecha, "dd MMM", { locale: es }),
    intensidad: c.intensidad,
    duracion: c.duracion,
    fullDate: c.fecha,
  }));

  // Calcular tendencia
  const promedioIntensidad = crisisPaciente.reduce((acc, c) => acc + c.intensidad, 0) / crisisPaciente.length;
  const ultimasCrisis = crisisPaciente.slice(-3);
  const promedioReciente = ultimasCrisis.reduce((acc, c) => acc + c.intensidad, 0) / ultimasCrisis.length;
  const tendencia = promedioReciente < promedioIntensidad ? "mejora" : "empeora";

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 to-purple-200 p-4">
      <div className="max-w-md mx-auto">
        {/* Header */}
        <div className="flex items-center gap-4 mb-6">
          <button
            onClick={() => navigate(`/paciente/${id}`)}
            className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-md"
          >
            <ArrowLeft className="w-5 h-5 text-purple-600" />
          </button>
          <div>
            <h1 className="text-2xl font-bold text-gray-800">Timeline</h1>
            <p className="text-sm text-gray-600">{paciente.nombre}</p>
          </div>
        </div>

        {/* Trend Card */}
        <Card className={`p-5 mb-6 border-0 shadow-lg ${tendencia === "mejora" ? "bg-gradient-to-br from-green-500 to-green-600" : "bg-gradient-to-br from-orange-500 to-orange-600"} text-white`}>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              {tendencia === "mejora" ? (
                <TrendingDown className="w-8 h-8" />
              ) : (
                <TrendingUp className="w-8 h-8" />
              )}
              <div>
                <p className="text-sm opacity-90">Tendencia</p>
                <p className="text-xl font-bold">{tendencia === "mejora" ? "Mejorando" : "Requiere atención"}</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-sm opacity-90">Intensidad promedio</p>
              <p className="text-3xl font-bold">{promedioReciente.toFixed(1)}</p>
            </div>
          </div>
        </Card>

        {/* Chart */}
        <Card className="bg-white p-5 mb-6 border-0 shadow-lg">
          <h2 className="font-bold text-gray-800 mb-4">Evolución de Crisis</h2>
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis
                dataKey="fecha"
                tick={{ fontSize: 12, fill: "#6b7280" }}
                stroke="#d1d5db"
              />
              <YAxis
                domain={[0, 10]}
                tick={{ fontSize: 12, fill: "#6b7280" }}
                stroke="#d1d5db"
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#fff",
                  border: "none",
                  borderRadius: "8px",
                  boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
                }}
              />
              <Line
                type="monotone"
                dataKey="intensidad"
                stroke="#9333ea"
                strokeWidth={3}
                dot={{ fill: "#9333ea", r: 6 }}
                activeDot={{ r: 8 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </Card>

        {/* Medication Changes */}
        <Card className="bg-white p-5 mb-6 border-0 shadow-lg">
          <div className="flex items-center gap-3 mb-4">
            <Pill className="w-5 h-5 text-purple-600" />
            <h2 className="font-bold text-gray-800">Cambios de Medicamento</h2>
          </div>
          <div className="space-y-3">
            {medicamentosPaciente.map((med) => (
              <div key={med.id} className="flex items-start gap-3 p-3 bg-purple-50 rounded-lg">
                <div className="w-2 h-2 bg-purple-600 rounded-full mt-2"></div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <p className="font-semibold text-gray-800">{med.nombre}</p>
                    <span className={`text-xs px-2 py-1 rounded-full ${med.fechaFin ? "bg-gray-200 text-gray-600" : "bg-green-100 text-green-700"}`}>
                      {med.fechaFin ? "Finalizado" : "Activo"}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600">{med.dosis} - {med.frecuencia}</p>
                  <p className="text-xs text-gray-500 mt-1">
                    Inicio: {format(med.fechaInicio, "dd MMM yyyy", { locale: es })}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Crisis List */}
        <Card className="bg-white p-5 border-0 shadow-lg mb-4">
          <div className="flex items-center gap-3 mb-4">
            <Activity className="w-5 h-5 text-purple-600" />
            <h2 className="font-bold text-gray-800">Historial de Crisis</h2>
          </div>
          <div className="space-y-3">
            {crisisPaciente.slice().reverse().map((c) => (
              <div
                key={c.id}
                className="p-3 bg-gray-50 rounded-lg cursor-pointer hover:bg-purple-50 transition-colors"
                onClick={() => navigate(`/paciente/${id}/crisis/${c.id}`)}
              >
                <div className="flex items-center justify-between mb-2">
                  <p className="font-semibold text-gray-800">
                    {format(c.fecha, "dd MMMM yyyy", { locale: es })}
                  </p>
                  <div className="flex items-center gap-2">
                    <div className={`w-3 h-3 rounded-full ${c.intensidad >= 7 ? "bg-red-500" : c.intensidad >= 5 ? "bg-orange-500" : "bg-yellow-500"}`}></div>
                    <span className="text-sm font-bold text-purple-600">{c.intensidad}/10</span>
                  </div>
                </div>
                <div className="flex items-center gap-4 text-sm text-gray-600">
                  <span>⏱️ {c.duracion} min</span>
                  <span>📝 {c.sintomas.length} síntomas</span>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Add Crisis Button */}
        <Button
          onClick={() => navigate(`/paciente/${id}/crisis/nueva`)}
          className="w-full bg-purple-600 hover:bg-purple-700 text-white py-6 rounded-xl shadow-lg"
        >
          + Registrar Nueva Crisis
        </Button>
      </div>
    </div>
  );
}
