import { useState } from "react";
import { useNavigate, useParams } from "react-router";
import { useData } from "../context/DataContext";
import { Card } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Textarea } from "../components/ui/textarea";
import { ArrowLeft, Save } from "lucide-react";

export default function EditarPaciente() {
  const navigate = useNavigate();
  const { id } = useParams();
  const { pacientes, agregarPaciente, actualizarPaciente } = useData();

  const paciente = pacientes.find((p) => p.id === id);
  const esNuevo = id === "nuevo";

  const [formData, setFormData] = useState({
    nombre: paciente?.nombre || "",
    edad: paciente?.edad || 0,
    telefono: paciente?.telefono || "",
    email: paciente?.email || "",
    diagnostico: paciente?.diagnostico || "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (esNuevo) {
      agregarPaciente(formData);
      navigate("/pacientes");
    } else if (id) {
      actualizarPaciente(id, formData);
      navigate(`/paciente/${id}`);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 to-purple-200 p-4">
      <div className="max-w-md mx-auto">
        {/* Header */}
        <div className="flex items-center gap-4 mb-6">
          <button
            onClick={() => navigate(-1)}
            className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-md"
          >
            <ArrowLeft className="w-5 h-5 text-purple-600" />
          </button>
          <h1 className="text-2xl font-bold text-gray-800">
            {esNuevo ? "Nuevo Paciente" : "Editar Paciente"}
          </h1>
        </div>

        {/* Form */}
        <Card className="bg-white p-6 border-0 shadow-lg">
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-2">
              <Label htmlFor="nombre">Nombre Completo</Label>
              <Input
                id="nombre"
                type="text"
                placeholder="Ingresa el nombre"
                value={formData.nombre}
                onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}
                className="bg-purple-50 border-purple-200"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="edad">Edad</Label>
              <Input
                id="edad"
                type="number"
                placeholder="Ingresa la edad"
                value={formData.edad || ""}
                onChange={(e) => setFormData({ ...formData, edad: parseInt(e.target.value) || 0 })}
                className="bg-purple-50 border-purple-200"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="telefono">Teléfono</Label>
              <Input
                id="telefono"
                type="tel"
                placeholder="555-0000"
                value={formData.telefono}
                onChange={(e) => setFormData({ ...formData, telefono: e.target.value })}
                className="bg-purple-50 border-purple-200"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="correo@ejemplo.com"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="bg-purple-50 border-purple-200"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="diagnostico">Diagnóstico</Label>
              <Textarea
                id="diagnostico"
                placeholder="Ingresa el diagnóstico"
                value={formData.diagnostico}
                onChange={(e) => setFormData({ ...formData, diagnostico: e.target.value })}
                className="bg-purple-50 border-purple-200 min-h-24"
                required
              />
            </div>

            <Button
              type="submit"
              className="w-full bg-purple-600 hover:bg-purple-700 text-white py-6 rounded-xl"
            >
              <Save className="w-5 h-5 mr-2" />
              {esNuevo ? "Crear Paciente" : "Guardar Cambios"}
            </Button>
          </form>
        </Card>
      </div>
    </div>
  );
}
