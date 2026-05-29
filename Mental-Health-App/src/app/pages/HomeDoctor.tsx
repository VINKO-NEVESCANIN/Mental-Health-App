import { useNavigate } from "react-router";
import { Users, Calendar, Clock, FileText, Activity, Pill } from "lucide-react";
import { Card } from "../components/ui/card";
import { Avatar, AvatarFallback } from "../components/ui/avatar";

export default function HomeDoctor() {
  const navigate = useNavigate();

  const menuItems = [
    { icon: Users, label: "Pacientes", path: "/pacientes", color: "bg-purple-500" },
    { icon: Calendar, label: "Mis Citas", path: "/citas", color: "bg-pink-500" },
    { icon: Activity, label: "Mis Pacientes", path: "/mis-pacientes", color: "bg-indigo-500" },
    { icon: FileText, label: "Reportes", path: "/reportes", color: "bg-blue-500" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 to-purple-200 p-4">
      <div className="max-w-md mx-auto">
        {/* Header */}
        <div className="bg-purple-600 rounded-3xl p-6 mb-6 shadow-lg">
          <div className="flex items-center justify-between mb-4">
            <Avatar className="w-16 h-16 border-4 border-white">
              <AvatarFallback className="bg-purple-400 text-white text-xl">D</AvatarFallback>
            </Avatar>
            <div className="flex gap-2">
              <button className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                <Clock className="w-5 h-5 text-white" />
              </button>
              <button className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                <Users className="w-5 h-5 text-white" />
              </button>
            </div>
          </div>
          <h1 className="text-2xl font-bold text-white mb-1">Dr. González</h1>
          <p className="text-purple-100">Psiquiatra</p>
        </div>

        {/* Menu Grid */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          {menuItems.map((item, index) => (
            <Card
              key={index}
              className="p-6 cursor-pointer hover:shadow-xl transition-shadow bg-white border-0"
              onClick={() => navigate(item.path)}
            >
              <div className={`w-14 h-14 ${item.color} rounded-2xl flex items-center justify-center mb-4`}>
                <item.icon className="w-7 h-7 text-white" />
              </div>
              <p className="font-semibold text-gray-800">{item.label}</p>
            </Card>
          ))}
        </div>

        {/* Quick Stats */}
        <Card className="bg-white p-6 border-0 shadow-lg">
          <h2 className="font-bold text-gray-800 mb-4">Resumen de Hoy</h2>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                  <Calendar className="w-5 h-5 text-purple-600" />
                </div>
                <span className="text-gray-700">Citas programadas</span>
              </div>
              <span className="font-bold text-purple-600">5</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-pink-100 rounded-full flex items-center justify-center">
                  <Users className="w-5 h-5 text-pink-600" />
                </div>
                <span className="text-gray-700">Pacientes activos</span>
              </div>
              <span className="font-bold text-pink-600">12</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-indigo-100 rounded-full flex items-center justify-center">
                  <Activity className="w-5 h-5 text-indigo-600" />
                </div>
                <span className="text-gray-700">Crisis registradas</span>
              </div>
              <span className="font-bold text-indigo-600">3</span>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
