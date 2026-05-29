import { useState } from "react";
import { useNavigate, useParams } from "react-router";
import { useData } from "../context/DataContext";
import { Card } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Textarea } from "../components/ui/textarea";
import { Slider } from "../components/ui/slider";
import { Checkbox } from "../components/ui/checkbox";
import { ArrowLeft, Save, Calendar } from "lucide-react";

const sintomasComunes = [
  "Taquicardia",
  "Sudoración",
  "Temblores",
  "Mareo",
  "Náuseas",
  "Respiración agitada",
  "Dolor en el pecho",
  "Despersonalización",
  "Miedo intenso",
  "Tensión muscular",
];

export default function RegistroCrisis() {
  const navigate = useNavigate();
  const { id } = useParams();
  const { pacientes, agregarCrisis } = useData();
  const paciente = pacientes.find((p) => p.id === id);

  const [formData, setFormData] = useState({
    fecha: new Date().toISOString().split("T")[0],
    intensidad: 5,
    duracion: 30,
    sintomas: [] as string[],
    notas: "",
  });

  const toggleSintoma = (sintoma: string) => {
    setFormData({
      ...formData,
      sintomas: formData.sintomas.includes(sintoma)
        ? formData.sintomas.filter((s) => s !== sintoma)
        : [...formData.sintomas, sintoma],
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (id) {
      agregarCrisis({
        pacienteId: id,
        fecha: new Date(formData.fecha),
        intensidad: formData.intensidad,
        duracion: formData.duracion,
        sintomas: formData.sintomas,
        notas: formData.notas,
      });
      navigate(`/paciente/${id}/timeline`);
    }
  };

  if (!paciente) {
    return <div>Paciente no encontrado</div>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 to-purple-200 p-4">
      <div className="max-w-md mx-auto pb-6">
        {/* Header */}
        <div className="flex items-center gap-4 mb-6">
          <button
            onClick={() => navigate(`/paciente/${id}`)}
            className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-md"
          >
            <ArrowLeft className="w-5 h-5 text-purple-600" />
          </button>
          <div>
            <h1 className="text-2xl font-bold text-gray-800">Registrar Crisis</h1>
            <p className="text-sm text-gray-600">{paciente.nombre}</p>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Fecha */}
          <Card className="bg-white p-5 border-0 shadow-lg">
            <Label htmlFor="fecha" className="flex items-center gap-2 mb-2">
              <Calendar className="w-4 h-4 text-purple-600" />
              Fecha de la Crisis
            </Label>
            <Input
              id="fecha"
              type="date"
              value={formData.fecha}
              onChange={(e) => setFormData({ ...formData, fecha: e.target.value })}
              className="bg-purple-50 border-purple-200"
              required
            />
          </Card>

          {/* Intensidad */}
          <Card className="bg-white p-5 border-0 shadow-lg">
            <Label className="mb-3 block">Intensidad de la Crisis</Label>
            <div className="flex items-center gap-4 mb-3">
              <span className="text-sm text-gray-600 w-12">Leve</span>
              <Slider
                value={[formData.intensidad]}
                onValueChange={([value]) => setFormData({ ...formData, intensidad: value })}
                min={1}
                max={10}
                step={1}
                className="flex-1"
              />
              <span className="text-sm text-gray-600 w-12 text-right">Severa</span>
            </div>
            <div className="text-center">
              <span className="text-4xl font-bold text-purple-600">{formData.intensidad}</span>
              <span className="text-gray-400 text-xl">/10</span>
            </div>
          </Card>

          {/* Duración */}
          <Card className="bg-white p-5 border-0 shadow-lg">
            <Label htmlFor="duracion" className="mb-2 block">
              Duración (minutos)
            </Label>
            <Input
              id="duracion"
              type="number"
              value={formData.duracion}
              onChange={(e) => setFormData({ ...formData, duracion: parseInt(e.target.value) || 0 })}
              className="bg-purple-50 border-purple-200"
              min="1"
              required
            />
          </Card>

          {/* Síntomas */}
          <Card className="bg-white p-5 border-0 shadow-lg">
            <Label className="mb-3 block">Síntomas Experimentados</Label>
            <div className="grid grid-cols-2 gap-3">
              {sintomasComunes.map((sintoma) => (
                <div key={sintoma} className="flex items-center gap-2">
                  <Checkbox
                    id={sintoma}
                    checked={formData.sintomas.includes(sintoma)}
                    onCheckedChange={() => toggleSintoma(sintoma)}
                  />
                  <label htmlFor={sintoma} className="text-sm text-gray-700 cursor-pointer">
                    {sintoma}
                  </label>
                </div>
              ))}
            </div>
          </Card>

          {/* Notas */}
          <Card className="bg-white p-5 border-0 shadow-lg">
            <Label htmlFor="notas" className="mb-2 block">
              Notas Adicionales
            </Label>
            <Textarea
              id="notas"
              placeholder="Describe el contexto, desencadenantes, o cualquier observación relevante..."
              value={formData.notas}
              onChange={(e) => setFormData({ ...formData, notas: e.target.value })}
              className="bg-purple-50 border-purple-200 min-h-32"
            />
          </Card>

          {/* Submit Button */}
          <Button
            type="submit"
            className="w-full bg-purple-600 hover:bg-purple-700 text-white py-6 rounded-xl shadow-lg"
          >
            <Save className="w-5 h-5 mr-2" />
            Guardar Crisis
          </Button>
        </form>
      </div>
    </div>
  );
}
