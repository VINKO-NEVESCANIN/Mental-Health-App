import { useNavigate } from "react-router";
import { useData } from "../context/DataContext";
import { Card } from "../components/ui/card";
import { Avatar, AvatarFallback } from "../components/ui/avatar";
import { ArrowLeft, Activity, Pill, Calendar } from "lucide-react";

export default function MisPacientes() {
  const navigate = useNavigate();
  const { pacientes, crisis, medicamentos } = useData();

  const getPacienteStats = (pacienteId: string) => {
    const crisisCount = crisis.filter((c) => c.pacienteId === pacienteId).length;
    const medicamentosActivos = medicamentos.filter(
      (m) => m.pacienteId === pacienteId && !m.fechaFin
    ).length;
    return { crisisCount, medicamentosActivos };
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 to-purple-200 p-4">
      <div className="max-w-md mx-auto">
        {/* Header */}
        <div className="flex items-center gap-4 mb-6">
          <button
            onClick={() => navigate("/home")}
            className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-md"
          >
            <ArrowLeft className="w-5 h-5 text-purple-600" />
          </button>
          <h1 className="text-2xl font-bold text-gray-800">Mis Pacientes</h1>
        </div>

        {/* Patients Grid */}
        <div className="grid grid-cols-1 gap-4">
          {pacientes.map((paciente) => {
            const stats = getPacienteStats(paciente.id);
            return (
              <Card
                key={paciente.id}
                className="p-5 cursor-pointer hover:shadow-xl transition-shadow bg-white border-0"
                onClick={() => navigate(`/paciente/${paciente.id}`)}
              >
                <div className="flex items-start gap-4 mb-4">
                  <Avatar className="w-16 h-16 bg-purple-100">
                    <AvatarFallback className="bg-purple-500 text-white text-xl">
                      {paciente.nombre.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <h3 className="font-bold text-gray-800 text-lg">{paciente.nombre}</h3>
                    <p className="text-sm text-gray-500">{paciente.edad} años</p>
                    <p className="text-xs text-purple-600 mt-1">{paciente.diagnostico}</p>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-2">
                  <div className="bg-purple-50 rounded-lg p-3">
                    <Activity className="w-5 h-5 text-purple-600 mb-1" />
                    <p className="text-xs text-gray-600">Crisis</p>
                    <p className="font-bold text-purple-600">{stats.crisisCount}</p>
                  </div>
                  <div className="bg-pink-50 rounded-lg p-3">
                    <Pill className="w-5 h-5 text-pink-600 mb-1" />
                    <p className="text-xs text-gray-600">Medicam.</p>
                    <p className="font-bold text-pink-600">{stats.medicamentosActivos}</p>
                  </div>
                  <div className="bg-indigo-50 rounded-lg p-3">
                    <Calendar className="w-5 h-5 text-indigo-600 mb-1" />
                    <p className="text-xs text-gray-600">Citas</p>
                    <p className="font-bold text-indigo-600">2</p>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>
      </div>
    </div>
  );
}
