import { useState } from "react";
import { useNavigate } from "react-router";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { User, Lock } from "lucide-react";

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    navigate("/home");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-500 to-purple-700 p-4">
      <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl p-8">
        <div className="text-center mb-8">
          <div className="w-20 h-20 bg-purple-600 rounded-full mx-auto mb-4 flex items-center justify-center">
            <User className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-2xl font-bold text-gray-800">Sistema de Gestión</h1>
          <p className="text-gray-500 mt-2">Portal del Doctor</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="email">Usuario</Label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <Input
                id="email"
                type="text"
                placeholder="Ingresa tu usuario"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="pl-10 bg-purple-50 border-purple-200 focus:border-purple-500"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">Contraseña</Label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <Input
                id="password"
                type="password"
                placeholder="Ingresa tu contraseña"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="pl-10 bg-purple-50 border-purple-200 focus:border-purple-500"
              />
            </div>
          </div>

          <Button type="submit" className="w-full bg-purple-600 hover:bg-purple-700 text-white py-6 rounded-xl">
            Iniciar Sesión
          </Button>

          <div className="text-center">
            <button type="button" className="text-purple-600 hover:text-purple-700 text-sm">
              ¿Olvidaste tu contraseña?
            </button>
          </div>
        </form>

        <div className="mt-8 pt-6 border-t border-gray-200 text-center">
          <p className="text-gray-600 text-sm mb-3">¿No tienes cuenta?</p>
          <Button variant="outline" className="w-full border-purple-600 text-purple-600 hover:bg-purple-50">
            Crear Cuenta
          </Button>
        </div>
      </div>
    </div>
  );
}
