import { createBrowserRouter } from "react-router";
import HomeDoctor from "./pages/HomeDoctor";
import Login from "./pages/Login";
import Pacientes from "./pages/Pacientes";
import MisPacientes from "./pages/MisPacientes";
import EditarPaciente from "./pages/EditarPaciente";
import PerfilPaciente from "./pages/PerfilPaciente";
import RegistroCrisis from "./pages/RegistroCrisis";
import VerCrisis from "./pages/VerCrisis";
import Timeline from "./pages/Timeline";
import MisCitas from "./pages/MisCitas";
import Medicamentos from "./pages/Medicamentos";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Login,
  },
  {
    path: "/home",
    Component: HomeDoctor,
  },
  {
    path: "/pacientes",
    Component: Pacientes,
  },
  {
    path: "/mis-pacientes",
    Component: MisPacientes,
  },
  {
    path: "/paciente/:id",
    Component: PerfilPaciente,
  },
  {
    path: "/paciente/:id/editar",
    Component: EditarPaciente,
  },
  {
    path: "/paciente/:id/crisis/nueva",
    Component: RegistroCrisis,
  },
  {
    path: "/paciente/:id/crisis/:crisisId",
    Component: VerCrisis,
  },
  {
    path: "/paciente/:id/timeline",
    Component: Timeline,
  },
  {
    path: "/citas",
    Component: MisCitas,
  },
  {
    path: "/paciente/:id/medicamentos",
    Component: Medicamentos,
  },
]);
