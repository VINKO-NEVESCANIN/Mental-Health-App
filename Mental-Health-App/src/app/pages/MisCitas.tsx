import { useState } from "react";
import { useNavigate } from "react-router";
import { useData } from "../context/DataContext";
import { Card } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Avatar, AvatarFallback } from "../components/ui/avatar";
import { ArrowLeft, Plus, Calendar, Clock, User } from "lucide-react";
import { format } from "date-fns";
import { es } from "date-fns/locale";

export default function MisCitas() {
  const navigate = useNavigate();
  const { citas, pacientes } = useData();

  const citasOrdenadas = citas
    .map((cita) => ({
      ...cita,
      paciente: pacientes.find((p) => p.id === cita.pacienteId),
    }))
    .sort((a, b) => a.fecha.getTime() - b.fecha.getTime());

  const hoy = new Date();
  const citasProximas = citasOrdenadas.filter((c) => c.fecha >= hoy);
  const citasPasadas = citasOrdenadas.filter((c) => c.fecha < hoy);

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
          <h1 className="text-2xl font-bold text-gray-800">Mis Citas</h1>
        </div>

        {/* Add Button */}
        <Button className="w-full bg-purple-600 hover:bg-purple-700 text-white mb-6 py-6 rounded-xl shadow-lg">
          <Plus className="w-5 h-5 mr-2" />
          Programar Nueva Cita
        </Button>

        {/* Upcoming Appointments */}
        {citasProximas.length > 0 && (
          <div className="mb-6">
            <h2 className="font-bold text-gray-800 mb-3 ml-1">Próximas Citas</h2>
            <div className="space-y-3">
              {citasProximas.map((cita) => (
                <Card
                  key={cita.id}
                  className="p-5 bg-white border-0 shadow-lg cursor-pointer hover:shadow-xl transition-shadow"
                  onClick={() => navigate(`/paciente/${cita.pacienteId}`)}
                >
                  <div className="flex items-center gap-4 mb-3">
                    <Avatar className="w-12 h-12 bg-purple-100">
                      <AvatarFallback className="bg-purple-500 text-white">
                        {cita.paciente?.nombre.charAt(0) || "?"}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-800">{cita.paciente?.nombre}</h3>
                      <p className="text-sm text-purple-600">{cita.tipo}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 text-sm text-gray-600">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-purple-500" />
                      <span>{format(cita.fecha, "dd MMM yyyy", { locale: es })}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4 text-purple-500" />
                      <span>{cita.hora}</span>
                    </div>
                  </div>
                  {cita.notas && (
                    <p className="text-xs text-gray-500 mt-2 p-2 bg-purple-50 rounded">{cita.notas}</p>
                  )}
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* Past Appointments */}
        {citasPasadas.length > 0 && (
          <div>
            <h2 className="font-bold text-gray-800 mb-3 ml-1">Citas Pasadas</h2>
            <div className="space-y-3">
              {citasPasadas.map((cita) => (
                <Card
                  key={cita.id}
                  className="p-5 bg-white border-0 shadow-md opacity-75 cursor-pointer hover:opacity-100 transition-opacity"
                  onClick={() => navigate(`/paciente/${cita.pacienteId}`)}
                >
                  <div className="flex items-center gap-4 mb-3">
                    <Avatar className="w-12 h-12 bg-gray-100">
                      <AvatarFallback className="bg-gray-400 text-white">
                        {cita.paciente?.nombre.charAt(0) || "?"}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-800">{cita.paciente?.nombre}</h3>
                      <p className="text-sm text-gray-500">{cita.tipo}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 text-sm text-gray-500">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4" />
                      <span>{format(cita.fecha, "dd MMM yyyy", { locale: es })}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4" />
                      <span>{cita.hora}</span>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        )}

        {citasProximas.length === 0 && citasPasadas.length === 0 && (
          <Card className="bg-white p-8 text-center border-0 shadow-lg">
            <Calendar className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500">No hay citas programadas</p>
          </Card>
        )}
      </div>
    </div>
  );
}
