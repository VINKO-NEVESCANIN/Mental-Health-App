import { useNavigate, useParams } from "react-router";
import { useData } from "../context/DataContext";
import { Card } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Avatar, AvatarFallback } from "../components/ui/avatar";
import {
  ArrowLeft,
  Edit,
  Activity,
  Pill,
  Calendar,
  Heart,
  Clock,
  TrendingUp,
} from "lucide-react";

export default function PerfilPaciente() {
  const navigate = useNavigate();
  const { id } = useParams();
  const { pacientes, crisis, medicamentos } = useData();

  const paciente = pacientes.find((p) => p.id === id);
  const crisisPaciente = crisis.filter((c) => c.pacienteId === id);
  const medicamentosPaciente = medicamentos.filter((m) => m.pacienteId === id && !m.fechaFin);

  if (!paciente) {
    return <div>Paciente no encontrado</div>;
  }

  const menuItems = [
    { icon: Activity, label: "Timeline", path: `/paciente/${id}/timeline`, color: "bg-purple-500" },
    { icon: Heart, label: "Crisis", path: `/paciente/${id}/crisis/nueva`, color: "bg-pink-500" },
    { icon: Pill, label: "Medicamentos", path: `/paciente/${id}/medicamentos`, color: "bg-indigo-500" },
    { icon: Calendar, label: "Citas", path: "/citas", color: "bg-blue-500" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 to-purple-200 p-4">
      <div className="max-w-md mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <button
            onClick={() => navigate("/pacientes")}
            className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-md"
          >
            <ArrowLeft className="w-5 h-5 text-purple-600" />
          </button>
          <button
            onClick={() => navigate(`/paciente/${id}/editar`)}
            className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-md"
          >
            <Edit className="w-5 h-5 text-purple-600" />
          </button>
        </div>

        {/* Profile Card */}
        <Card className="bg-white p-6 mb-6 border-0 shadow-lg">
          <div className="flex items-center gap-4 mb-6">
            <Avatar className="w-20 h-20 bg-purple-100">
              <AvatarFallback className="bg-purple-500 text-white text-2xl">
                {paciente.nombre.charAt(0)}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <h1 className="text-2xl font-bold text-gray-800">{paciente.nombre}</h1>
              <p className="text-gray-500">{paciente.edad} años</p>
            </div>
          </div>

          <div className="space-y-3">
            <div className="flex items-center gap-3 text-gray-700">
              <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                <span className="text-purple-600 text-xs">📞</span>
              </div>
              <span>{paciente.telefono}</span>
            </div>
            <div className="flex items-center gap-3 text-gray-700">
              <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                <span className="text-purple-600 text-xs">📧</span>
              </div>
              <span className="text-sm">{paciente.email}</span>
            </div>
            <div className="flex items-start gap-3 text-gray-700">
              <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                <span className="text-purple-600 text-xs">📋</span>
              </div>
              <div className="flex-1">
                <p className="font-semibold text-sm">Diagnóstico</p>
                <p className="text-sm">{paciente.diagnostico}</p>
              </div>
            </div>
          </div>
        </Card>

        {/* Quick Actions */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          {menuItems.map((item, index) => (
            <Card
              key={index}
              className="p-5 cursor-pointer hover:shadow-xl transition-shadow bg-white border-0"
              onClick={() => navigate(item.path)}
            >
              <div className={`w-12 h-12 ${item.color} rounded-xl flex items-center justify-center mb-3`}>
                <item.icon className="w-6 h-6 text-white" />
              </div>
              <p className="font-semibold text-gray-800 text-sm">{item.label}</p>
            </Card>
          ))}
        </div>

        {/* Recent Activity */}
        <Card className="bg-white p-5 border-0 shadow-lg mb-4">
          <h2 className="font-bold text-gray-800 mb-4">Actividad Reciente</h2>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                  <Activity className="w-5 h-5 text-purple-600" />
                </div>
                <div>
                  <p className="font-semibold text-sm text-gray-800">Crisis registradas</p>
                  <p className="text-xs text-gray-500">Último mes</p>
                </div>
              </div>
              <span className="font-bold text-purple-600 text-lg">{crisisPaciente.length}</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-pink-100 rounded-full flex items-center justify-center">
                  <Pill className="w-5 h-5 text-pink-600" />
                </div>
                <div>
                  <p className="font-semibold text-sm text-gray-800">Medicamentos activos</p>
                  <p className="text-xs text-gray-500">Tratamiento actual</p>
                </div>
              </div>
              <span className="font-bold text-pink-600 text-lg">{medicamentosPaciente.length}</span>
            </div>
          </div>
        </Card>

        {/* Quick Stats */}
        {crisisPaciente.length > 0 && (
          <Card className="bg-gradient-to-br from-purple-500 to-purple-600 p-5 border-0 shadow-lg text-white">
            <div className="flex items-center gap-3 mb-3">
              <TrendingUp className="w-6 h-6" />
              <h3 className="font-bold">Última Crisis</h3>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-purple-100 text-xs mb-1">Intensidad</p>
                <p className="text-2xl font-bold">{crisisPaciente[0].intensidad}/10</p>
              </div>
              <div>
                <p className="text-purple-100 text-xs mb-1">Duración</p>
                <p className="text-2xl font-bold">{crisisPaciente[0].duracion} min</p>
              </div>
            </div>
          </Card>
        )}
      </div>
    </div>
  );
}
