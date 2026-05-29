import { useNavigate, useParams } from "react-router";
import { useData } from "../context/DataContext";
import { Card } from "../components/ui/card";
import { ArrowLeft, Clock, Activity, AlertCircle, FileText } from "lucide-react";
import { format } from "date-fns";
import { es } from "date-fns/locale";

export default function VerCrisis() {
  const navigate = useNavigate();
  const { id, crisisId } = useParams();
  const { pacientes, crisis } = useData();

  const paciente = pacientes.find((p) => p.id === id);
  const crisisData = crisis.find((c) => c.id === crisisId);

  if (!paciente || !crisisData) {
    return <div>Crisis no encontrada</div>;
  }

  const nivelSeveridad =
    crisisData.intensidad >= 8 ? "Severa" : crisisData.intensidad >= 5 ? "Moderada" : "Leve";
  const colorSeveridad =
    crisisData.intensidad >= 8
      ? "from-red-500 to-red-600"
      : crisisData.intensidad >= 5
      ? "from-orange-500 to-orange-600"
      : "from-yellow-500 to-yellow-600";

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 to-purple-200 p-4">
      <div className="max-w-md mx-auto">
        {/* Header */}
        <div className="flex items-center gap-4 mb-6">
          <button
            onClick={() => navigate(`/paciente/${id}/timeline`)}
            className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-md"
          >
            <ArrowLeft className="w-5 h-5 text-purple-600" />
          </button>
          <div>
            <h1 className="text-2xl font-bold text-gray-800">Detalle de Crisis</h1>
            <p className="text-sm text-gray-600">{paciente.nombre}</p>
          </div>
        </div>

        {/* Severity Card */}
        <Card className={`bg-gradient-to-br ${colorSeveridad} text-white p-6 mb-6 border-0 shadow-lg`}>
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <AlertCircle className="w-8 h-8" />
              <div>
                <p className="text-sm opacity-90">Nivel de Severidad</p>
                <p className="text-2xl font-bold">{nivelSeveridad}</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-sm opacity-90">Intensidad</p>
              <p className="text-5xl font-bold">{crisisData.intensidad}</p>
            </div>
          </div>
          <div className="flex items-center gap-2 text-sm opacity-90">
            <Clock className="w-4 h-4" />
            <span>{format(crisisData.fecha, "dd 'de' MMMM yyyy", { locale: es })}</span>
          </div>
        </Card>

        {/* Duration Card */}
        <Card className="bg-white p-5 mb-4 border-0 shadow-lg">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
              <Clock className="w-5 h-5 text-purple-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Duración</p>
              <p className="text-2xl font-bold text-gray-800">{crisisData.duracion} minutos</p>
            </div>
          </div>
        </Card>

        {/* Symptoms Card */}
        <Card className="bg-white p-5 mb-4 border-0 shadow-lg">
          <div className="flex items-center gap-3 mb-4">
            <Activity className="w-5 h-5 text-purple-600" />
            <h2 className="font-bold text-gray-800">Síntomas</h2>
          </div>
          <div className="flex flex-wrap gap-2">
            {crisisData.sintomas.map((sintoma, index) => (
              <span
                key={index}
                className="px-3 py-2 bg-purple-100 text-purple-700 rounded-full text-sm font-medium"
              >
                {sintoma}
              </span>
            ))}
          </div>
        </Card>

        {/* Notes Card */}
        {crisisData.notas && (
          <Card className="bg-white p-5 border-0 shadow-lg">
            <div className="flex items-center gap-3 mb-3">
              <FileText className="w-5 h-5 text-purple-600" />
              <h2 className="font-bold text-gray-800">Notas</h2>
            </div>
            <p className="text-gray-700 leading-relaxed">{crisisData.notas}</p>
          </Card>
        )}

        {/* Stats Grid */}
        <div className="grid grid-cols-3 gap-3 mt-6">
          <Card className="bg-purple-50 p-4 border-0 text-center">
            <p className="text-xs text-gray-600 mb-1">Intensidad</p>
            <p className="text-2xl font-bold text-purple-600">{crisisData.intensidad}/10</p>
          </Card>
          <Card className="bg-pink-50 p-4 border-0 text-center">
            <p className="text-xs text-gray-600 mb-1">Duración</p>
            <p className="text-2xl font-bold text-pink-600">{crisisData.duracion}m</p>
          </Card>
          <Card className="bg-indigo-50 p-4 border-0 text-center">
            <p className="text-xs text-gray-600 mb-1">Síntomas</p>
            <p className="text-2xl font-bold text-indigo-600">{crisisData.sintomas.length}</p>
          </Card>
        </div>
      </div>
    </div>
  );
}
