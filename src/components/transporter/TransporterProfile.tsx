import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { User, Truck, Star, Phone, Mail, MapPin } from 'lucide-react';

export default function TransporterProfile() {
  const [profileData, setProfileData] = useState({
    name: 'Juan Pérez',
    email: 'juan.perez@email.com',
    phone: '+34 600 123 456',
    company: 'Transportes Pérez S.L.',
    address: 'Calle Mayor 123, Madrid',
    description: 'Transportista profesional con más de 10 años de experiencia'
  });

  const [vehicleData, setVehicleData] = useState({
    type: 'trailer',
    brand: 'Mercedes-Benz',
    model: 'Actros',
    year: '2020',
    plate: '1234-ABC',
    maxWeight: '24000',
    maxVolume: '90'
  });

  const stats = {
    totalDeliveries: 156,
    rating: 4.8,
    completionRate: 98,
    totalEarnings: '€45,230'
  };

  const certifications = [
    { name: 'ADR Básico', status: 'activo' },
    { name: 'Tacógrafo Digital', status: 'activo' },
    { name: 'CAP Transporte', status: 'activo' }
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-blue-900">Mi Perfil</h1>
        <p className="text-blue-600">Gestiona tu información personal y profesional</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="border-blue-200 bg-blue-50/20">
          <CardContent className="p-6 text-center">
            <div className="w-20 h-20 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <User className="h-10 w-10 text-white" />
            </div>
            <h3 className="font-semibold text-blue-900">{profileData.name}</h3>
            <p className="text-blue-600 text-sm">{profileData.company}</p>
            <div className="flex items-center justify-center gap-1 mt-2">
              <Star className="h-4 w-4 text-yellow-500" />
              <span className="font-medium text-blue-900">{stats.rating}</span>
            </div>
          </CardContent>
        </Card>

        <Card className="border-blue-200 bg-blue-50/20">
          <CardContent className="p-6">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-blue-800 text-sm">Entregas Totales</span>
                <span className="font-bold text-blue-900">{stats.totalDeliveries}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-blue-800 text-sm">Tasa de Éxito</span>
                <span className="font-bold text-green-700">{stats.completionRate}%</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-blue-800 text-sm">Ganancias Totales</span>
                <span className="font-bold text-green-700">{stats.totalEarnings}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-blue-200 bg-blue-50/20">
          <CardContent className="p-6">
            <h4 className="font-semibold text-blue-900 mb-3">Certificaciones</h4>
            <div className="space-y-2">
              {certifications.map((cert, index) => (
                <div key={index} className="flex items-center justify-between">
                  <span className="text-blue-800 text-sm">{cert.name}</span>
                  <Badge className="bg-green-100 text-green-800">
                    {cert.status}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="personal" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="personal">Información Personal</TabsTrigger>
          <TabsTrigger value="vehicle">Vehículo</TabsTrigger>
        </TabsList>

        <TabsContent value="personal">
          <Card className="border-blue-200 bg-blue-50/20">
            <CardHeader>
              <CardTitle className="text-blue-900">Información Personal</CardTitle>
            </CardHeader>
            <CardContent>
              <form className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name" className="text-blue-800">
                      <User className="inline h-4 w-4 mr-1" />
                      Nombre Completo
                    </Label>
                    <Input
                      id="name"
                      value={profileData.name}
                      onChange={(e) => setProfileData({...profileData, name: e.target.value})}
                      className="border-blue-300 focus:border-blue-500"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="company" className="text-blue-800">
                      Empresa
                    </Label>
                    <Input
                      id="company"
                      value={profileData.company}
                      onChange={(e) => setProfileData({...profileData, company: e.target.value})}
                      className="border-blue-300 focus:border-blue-500"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-blue-800">
                      <Mail className="inline h-4 w-4 mr-1" />
                      Email
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      value={profileData.email}
                      onChange={(e) => setProfileData({...profileData, email: e.target.value})}
                      className="border-blue-300 focus:border-blue-500"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone" className="text-blue-800">
                      <Phone className="inline h-4 w-4 mr-1" />
                      Teléfono
                    </Label>
                    <Input
                      id="phone"
                      value={profileData.phone}
                      onChange={(e) => setProfileData({...profileData, phone: e.target.value})}
                      className="border-blue-300 focus:border-blue-500"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="address" className="text-blue-800">
                    <MapPin className="inline h-4 w-4 mr-1" />
                    Dirección
                  </Label>
                  <Input
                    id="address"
                    value={profileData.address}
                    onChange={(e) => setProfileData({...profileData, address: e.target.value})}
                    className="border-blue-300 focus:border-blue-500"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="description" className="text-blue-800">
                    Descripción
                  </Label>
                  <Textarea
                    id="description"
                    value={profileData.description}
                    onChange={(e) => setProfileData({...profileData, description: e.target.value})}
                    className="border-blue-300 focus:border-blue-500"
                    rows={3}
                  />
                </div>
                <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                  Guardar Cambios
                </Button>
              </form>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="vehicle">
          <Card className="border-blue-200 bg-blue-50/20">
            <CardHeader>
              <CardTitle className="text-blue-900">Información del Vehículo</CardTitle>
            </CardHeader>
            <CardContent>
              <form className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="vehicleType" className="text-blue-800">
                      <Truck className="inline h-4 w-4 mr-1" />
                      Tipo de Vehículo
                    </Label>
                    <Select value={vehicleData.type} onValueChange={(value) => setVehicleData({...vehicleData, type: value})}>
                      <SelectTrigger className="border-blue-300 focus:border-blue-500">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="furgoneta">Furgoneta</SelectItem>
                        <SelectItem value="camion-rigido">Camión Rígido</SelectItem>
                        <SelectItem value="trailer">Tráiler</SelectItem>
                        <SelectItem value="mega-trailer">Mega Tráiler</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="plate" className="text-blue-800">
                      Matrícula
                    </Label>
                    <Input
                      id="plate"
                      value={vehicleData.plate}
                      onChange={(e) => setVehicleData({...vehicleData, plate: e.target.value})}
                      className="border-blue-300 focus:border-blue-500"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="brand" className="text-blue-800">
                      Marca
                    </Label>
                    <Input
                      id="brand"
                      value={vehicleData.brand}
                      onChange={(e) => setVehicleData({...vehicleData, brand: e.target.value})}
                      className="border-blue-300 focus:border-blue-500"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="model" className="text-blue-800">
                      Modelo
                    </Label>
                    <Input
                      id="model"
                      value={vehicleData.model}
                      onChange={(e) => setVehicleData({...vehicleData, model: e.target.value})}
                      className="border-blue-300 focus:border-blue-500"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="year" className="text-blue-800">
                      Año
                    </Label>
                    <Input
                      id="year"
                      value={vehicleData.year}
                      onChange={(e) => setVehicleData({...vehicleData, year: e.target.value})}
                      className="border-blue-300 focus:border-blue-500"
                    />
                  </div>
                </div>
                <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                  Actualizar Vehículo
                </Button>
              </form>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}