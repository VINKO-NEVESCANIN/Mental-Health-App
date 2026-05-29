import { createContext, useContext, useState, ReactNode } from "react";

export interface Crisis {
  id: string;
  pacienteId: string;
  fecha: Date;
  intensidad: number;
  duracion: number;
  sintomas: string[];
  notas: string;
}

export interface Medicamento {
  id: string;
  pacienteId: string;
  nombre: string;
  dosis: string;
  frecuencia: string;
  fechaInicio: Date;
  fechaFin?: Date;
  notas: string;
}

export interface Paciente {
  id: string;
  nombre: string;
  edad: number;
  telefono: string;
  email: string;
  diagnostico: string;
  foto?: string;
}

export interface Cita {
  id: string;
  pacienteId: string;
  fecha: Date;
  hora: string;
  tipo: string;
  notas: string;
}

interface DataContextType {
  pacientes: Paciente[];
  crisis: Crisis[];
  medicamentos: Medicamento[];
  citas: Cita[];
  agregarPaciente: (paciente: Omit<Paciente, "id">) => void;
  actualizarPaciente: (id: string, paciente: Partial<Paciente>) => void;
  agregarCrisis: (crisis: Omit<Crisis, "id">) => void;
  agregarMedicamento: (medicamento: Omit<Medicamento, "id">) => void;
  agregarCita: (cita: Omit<Cita, "id">) => void;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

const datosIniciales = {
  pacientes: [
    {
      id: "1",
      nombre: "María González",
      edad: 32,
      telefono: "555-0101",
      email: "maria.g@email.com",
      diagnostico: "Trastorno de ansiedad generalizada",
    },
    {
      id: "2",
      nombre: "Carlos Rodríguez",
      edad: 45,
      telefono: "555-0102",
      email: "carlos.r@email.com",
      diagnostico: "Trastorno de pánico",
    },
    {
      id: "3",
      nombre: "Ana Martínez",
      edad: 28,
      telefono: "555-0103",
      email: "ana.m@email.com",
      diagnostico: "Ansiedad social",
    },
  ],
  crisis: [
    {
      id: "1",
      pacienteId: "1",
      fecha: new Date(2026, 4, 25),
      intensidad: 8,
      duracion: 45,
      sintomas: ["Taquicardia", "Sudoración", "Mareo"],
      notas: "Crisis durante reunión laboral",
    },
    {
      id: "2",
      pacienteId: "1",
      fecha: new Date(2026, 4, 20),
      intensidad: 6,
      duracion: 30,
      sintomas: ["Respiración agitada", "Temblores"],
      notas: "Mejora después de ejercicios de respiración",
    },
    {
      id: "3",
      pacienteId: "1",
      fecha: new Date(2026, 4, 15),
      intensidad: 9,
      duracion: 60,
      sintomas: ["Taquicardia", "Náuseas", "Despersonalización"],
      notas: "Crisis severa en transporte público",
    },
    {
      id: "4",
      pacienteId: "1",
      fecha: new Date(2026, 4, 10),
      intensidad: 5,
      duracion: 20,
      sintomas: ["Sudoración", "Tensión muscular"],
      notas: "Primera crisis después de nuevo medicamento",
    },
  ],
  medicamentos: [
    {
      id: "1",
      pacienteId: "1",
      nombre: "Escitalopram",
      dosis: "10mg",
      frecuencia: "1 vez al día",
      fechaInicio: new Date(2026, 4, 1),
      notas: "Tomar en la mañana con alimentos",
    },
    {
      id: "2",
      pacienteId: "1",
      nombre: "Alprazolam",
      dosis: "0.5mg",
      frecuencia: "Según necesidad",
      fechaInicio: new Date(2026, 3, 15),
      fechaFin: new Date(2026, 4, 1),
      notas: "Medicamento anterior, reemplazado por Escitalopram",
    },
  ],
  citas: [
    {
      id: "1",
      pacienteId: "1",
      fecha: new Date(2026, 5, 2),
      hora: "10:00",
      tipo: "Consulta de seguimiento",
      notas: "Evaluar efectividad de nuevo tratamiento",
    },
    {
      id: "2",
      pacienteId: "2",
      fecha: new Date(2026, 5, 3),
      hora: "14:30",
      tipo: "Primera consulta",
      notas: "Evaluación inicial",
    },
  ],
};

export function DataProvider({ children }: { children: ReactNode }) {
  const [pacientes, setPacientes] = useState<Paciente[]>(datosIniciales.pacientes);
  const [crisis, setCrisis] = useState<Crisis[]>(datosIniciales.crisis);
  const [medicamentos, setMedicamentos] = useState<Medicamento[]>(datosIniciales.medicamentos);
  const [citas, setCitas] = useState<Cita[]>(datosIniciales.citas);

  const agregarPaciente = (paciente: Omit<Paciente, "id">) => {
    const nuevo = { ...paciente, id: Date.now().toString() };
    setPacientes([...pacientes, nuevo]);
  };

  const actualizarPaciente = (id: string, paciente: Partial<Paciente>) => {
    setPacientes(pacientes.map((p) => (p.id === id ? { ...p, ...paciente } : p)));
  };

  const agregarCrisis = (crisis: Omit<Crisis, "id">) => {
    const nueva = { ...crisis, id: Date.now().toString() };
    setCrisis((prev) => [...prev, nueva]);
  };

  const agregarMedicamento = (medicamento: Omit<Medicamento, "id">) => {
    const nuevo = { ...medicamento, id: Date.now().toString() };
    setMedicamentos((prev) => [...prev, nuevo]);
  };

  const agregarCita = (cita: Omit<Cita, "id">) => {
    const nueva = { ...cita, id: Date.now().toString() };
    setCitas((prev) => [...prev, nueva]);
  };

  return (
    <DataContext.Provider
      value={{
        pacientes,
        crisis,
        medicamentos,
        citas,
        agregarPaciente,
        actualizarPaciente,
        agregarCrisis,
        agregarMedicamento,
        agregarCita,
      }}
    >
      {children}
    </DataContext.Provider>
  );
}

export function useData() {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error("useData debe usarse dentro de DataProvider");
  }
  return context;
}
