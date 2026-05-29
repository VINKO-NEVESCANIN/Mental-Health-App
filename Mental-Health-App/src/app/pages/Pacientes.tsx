import { useNavigate } from "react-router";
import { useData } from "../context/DataContext";
import { Card } from "../components/ui/card";
import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";
import { Avatar, AvatarFallback } from "../components/ui/avatar";
import { ArrowLeft, Search, Plus, User } from "lucide-react";
import { useState } from "react";

export default function Pacientes() {
  const navigate = useNavigate();
  const { pacientes } = useData();
  const [busqueda, setBusqueda] = useState("");

  const pacientesFiltrados = pacientes.filter((p) =>
    p.nombre.toLowerCase().includes(busqueda.toLowerCase())
  );

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
          <h1 className="text-2xl font-bold text-gray-800">Pacientes</h1>
        </div>

        {/* Search */}
        <div className="relative mb-6">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <Input
            type="text"
            placeholder="Buscar paciente..."
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
            className="pl-10 bg-white border-0 shadow-md"
          />
        </div>

        {/* Add Button */}
        <Button
          onClick={() => navigate("/paciente/nuevo/editar")}
          className="w-full bg-purple-600 hover:bg-purple-700 text-white mb-6 py-6 rounded-xl shadow-lg"
        >
          <Plus className="w-5 h-5 mr-2" />
          Agregar Nuevo Paciente
        </Button>

        {/* Patients List */}
        <div className="space-y-3">
          {pacientesFiltrados.map((paciente) => (
            <Card
              key={paciente.id}
              className="p-4 cursor-pointer hover:shadow-xl transition-shadow bg-white border-0"
              onClick={() => navigate(`/paciente/${paciente.id}`)}
            >
              <div className="flex items-center gap-4">
                <Avatar className="w-14 h-14 bg-purple-100">
                  <AvatarFallback className="bg-purple-500 text-white">
                    {paciente.nombre.charAt(0)}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-800">{paciente.nombre}</h3>
                  <p className="text-sm text-gray-500">{paciente.edad} años</p>
                  <p className="text-xs text-purple-600 mt-1">{paciente.diagnostico}</p>
                </div>
                <div className="text-right">
                  <User className="w-5 h-5 text-purple-400 ml-auto mb-1" />
                  <p className="text-xs text-gray-400">{paciente.telefono}</p>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
