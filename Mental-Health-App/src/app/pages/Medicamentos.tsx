import { useState } from "react";
import { useNavigate, useParams } from "react-router";
import { useData } from "../context/DataContext";
import { Card } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Textarea } from "../components/ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "../components/ui/dialog";
import { ArrowLeft, Plus, Pill, Calendar, CheckCircle2, XCircle } from "lucide-react";
import { format } from "date-fns";
import { es } from "date-fns/locale";

export default function Medicamentos() {
  const navigate = useNavigate();
  const { id } = useParams();
  const { pacientes, medicamentos, agregarMedicamento } = useData();
  const [dialogOpen, setDialogOpen] = useState(false);

  const paciente = pacientes.find((p) => p.id === id);
  const medicamentosPaciente = medicamentos.filter((m) => m.pacienteId === id);

  const [formData, setFormData] = useState({
    nombre: "",
    dosis: "",
    frecuencia: "",
    fechaInicio: new Date().toISOString().split("T")[0],
    notas: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (id) {
      agregarMedicamento({
        pacienteId: id,
        nombre: formData.nombre,
        dosis: formData.dosis,
        frecuencia: formData.frecuencia,
        fechaInicio: new Date(formData.fechaInicio),
        notas: formData.notas,
      });
      setFormData({
        nombre: "",
        dosis: "",
        frecuencia: "",
        fechaInicio: new Date().toISOString().split("T")[0],
        notas: "",
      });
      setDialogOpen(false);
    }
  };

  if (!paciente) {
    return <div>Paciente no encontrado</div>;
  }

  const medicamentosActivos = medicamentosPaciente.filter((m) => !m.fechaFin);
  const medicamentosInactivos = medicamentosPaciente.filter((m) => m.fechaFin);

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
            <h1 className="text-2xl font-bold text-gray-800">Medicamentos</h1>
            <p className="text-sm text-gray-600">{paciente.nombre}</p>
          </div>
        </div>

        {/* Add Button */}
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild>
            <Button className="w-full bg-purple-600 hover:bg-purple-700 text-white mb-6 py-6 rounded-xl shadow-lg">
              <Plus className="w-5 h-5 mr-2" />
              Agregar Medicamento
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>Nuevo Medicamento</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="nombre">Nombre del Medicamento</Label>
                <Input
                  id="nombre"
                  value={formData.nombre}
                  onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}
                  placeholder="Ej: Escitalopram"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="dosis">Dosis</Label>
                <Input
                  id="dosis"
                  value={formData.dosis}
                  onChange={(e) => setFormData({ ...formData, dosis: e.target.value })}
                  placeholder="Ej: 10mg"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="frecuencia">Frecuencia</Label>
                <Input
                  id="frecuencia"
                  value={formData.frecuencia}
                  onChange={(e) => setFormData({ ...formData, frecuencia: e.target.value })}
                  placeholder="Ej: 1 vez al día"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="fechaInicio">Fecha de Inicio</Label>
                <Input
                  id="fechaInicio"
                  type="date"
                  value={formData.fechaInicio}
                  onChange={(e) => setFormData({ ...formData, fechaInicio: e.target.value })}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="notas">Notas</Label>
                <Textarea
                  id="notas"
                  value={formData.notas}
                  onChange={(e) => setFormData({ ...formData, notas: e.target.value })}
                  placeholder="Instrucciones especiales..."
                  className="min-h-20"
                />
              </div>
              <Button type="submit" className="w-full bg-purple-600 hover:bg-purple-700">
                Guardar Medicamento
              </Button>
            </form>
          </DialogContent>
        </Dialog>

        {/* Active Medications */}
        {medicamentosActivos.length > 0 && (
          <div className="mb-6">
            <h2 className="font-bold text-gray-800 mb-3 ml-1 flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-green-600" />
              Medicamentos Activos
            </h2>
            <div className="space-y-3">
              {medicamentosActivos.map((med) => (
                <Card key={med.id} className="p-5 bg-white border-0 shadow-lg">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                      <Pill className="w-6 h-6 text-purple-600" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <h3 className="font-bold text-gray-800 text-lg">{med.nombre}</h3>
                          <p className="text-purple-600 font-medium">{med.dosis}</p>
                        </div>
                        <span className="bg-green-100 text-green-700 text-xs px-3 py-1 rounded-full font-medium">
                          Activo
                        </span>
                      </div>
                      <p className="text-sm text-gray-600 mb-2">📅 {med.frecuencia}</p>
                      <div className="flex items-center gap-2 text-xs text-gray-500">
                        <Calendar className="w-4 h-4" />
                        <span>
                          Desde {format(med.fechaInicio, "dd MMM yyyy", { locale: es })}
                        </span>
                      </div>
                      {med.notas && (
                        <p className="text-xs text-gray-600 mt-3 p-2 bg-purple-50 rounded">{med.notas}</p>
                      )}
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* Inactive Medications */}
        {medicamentosInactivos.length > 0 && (
          <div>
            <h2 className="font-bold text-gray-800 mb-3 ml-1 flex items-center gap-2">
              <XCircle className="w-5 h-5 text-gray-400" />
              Medicamentos Previos
            </h2>
            <div className="space-y-3">
              {medicamentosInactivos.map((med) => (
                <Card key={med.id} className="p-5 bg-white border-0 shadow-md opacity-75">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center">
                      <Pill className="w-6 h-6 text-gray-400" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <h3 className="font-bold text-gray-800">{med.nombre}</h3>
                          <p className="text-gray-500 text-sm">{med.dosis}</p>
                        </div>
                        <span className="bg-gray-200 text-gray-600 text-xs px-3 py-1 rounded-full">
                          Finalizado
                        </span>
                      </div>
                      <div className="text-xs text-gray-500 space-y-1">
                        <div className="flex items-center gap-2">
                          <Calendar className="w-3 h-3" />
                          <span>
                            {format(med.fechaInicio, "dd MMM yyyy", { locale: es })} -{" "}
                            {med.fechaFin && format(med.fechaFin, "dd MMM yyyy", { locale: es })}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        )}

        {medicamentosActivos.length === 0 && medicamentosInactivos.length === 0 && (
          <Card className="bg-white p-8 text-center border-0 shadow-lg">
            <Pill className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500">No hay medicamentos registrados</p>
          </Card>
        )}
      </div>
    </div>
  );
}
