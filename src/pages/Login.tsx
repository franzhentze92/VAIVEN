import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Card, CardContent, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Truck, User } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

const Login: React.FC = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const redirect = params.get('redirect') || '/';

  const [authType, setAuthType] = useState<'login' | 'register'>('login');
  const [userType, setUserType] = useState<'client' | 'transporter'>('client');
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: '',
    phone: '',
    company: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    login({ ...formData, userType, authType });
    if (redirect === 'client-dashboard') navigate('/client-dashboard');
    else if (redirect === 'transporter-dashboard') navigate('/transporter-dashboard');
    else navigate(redirect);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      <Card className="w-full max-w-md shadow-2xl border-0">
        <CardContent className="p-8">
          <CardTitle className="text-3xl font-bold text-center mb-6">Bienvenido a CargoConnect</CardTitle>
          <Tabs value={authType} onValueChange={(v) => setAuthType(v as 'login' | 'register')} className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-6">
              <TabsTrigger value="login">Iniciar Sesión</TabsTrigger>
              <TabsTrigger value="register">Registrarse</TabsTrigger>
            </TabsList>
            <TabsContent value="login" className="space-y-4">
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="password">Contraseña</Label>
                  <Input
                    id="password"
                    type="password"
                    value={formData.password}
                    onChange={(e) => setFormData({...formData, password: e.target.value})}
                    required
                  />
                </div>
                <div className="flex gap-2 mt-2">
                  <Button
                    type="button"
                    variant={userType === 'client' ? 'default' : 'outline'}
                    onClick={() => setUserType('client')}
                    className="flex-1 flex items-center gap-2"
                  >
                    <User className="h-4 w-4" /> Cliente
                  </Button>
                  <Button
                    type="button"
                    variant={userType === 'transporter' ? 'default' : 'outline'}
                    onClick={() => setUserType('transporter')}
                    className="flex-1 flex items-center gap-2"
                  >
                    <Truck className="h-4 w-4" /> Transportista
                  </Button>
                </div>
                <Button type="submit" className="w-full mt-4">Iniciar Sesión</Button>
              </form>
            </TabsContent>
            <TabsContent value="register" className="space-y-4">
              <div className="flex gap-2 mb-2">
                <Button
                  type="button"
                  variant={userType === 'client' ? 'default' : 'outline'}
                  onClick={() => setUserType('client')}
                  className="flex-1 flex items-center gap-2"
                >
                  <User className="h-4 w-4" /> Cliente
                </Button>
                <Button
                  type="button"
                  variant={userType === 'transporter' ? 'default' : 'outline'}
                  onClick={() => setUserType('transporter')}
                  className="flex-1 flex items-center gap-2"
                >
                  <Truck className="h-4 w-4" /> Transportista
                </Button>
              </div>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <Label htmlFor="name">Nombre</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="phone">Teléfono</Label>
                  <Input
                    id="phone"
                    value={formData.phone}
                    onChange={(e) => setFormData({...formData, phone: e.target.value})}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="password">Contraseña</Label>
                  <Input
                    id="password"
                    type="password"
                    value={formData.password}
                    onChange={(e) => setFormData({...formData, password: e.target.value})}
                    required
                  />
                </div>
                <Button type="submit" className="w-full mt-4">Registrarse</Button>
              </form>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default Login; 