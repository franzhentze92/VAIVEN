import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Switch } from '@/components/ui/switch';
import { Progress } from '@/components/ui/progress';
import { 
  Calendar, 
  MapPin, 
  Truck, 
  Package, 
  Euro, 
  Route,
  Clock,
  AlertCircle,
  CheckCircle,
  Plus,
  Save,
  Eye,
  TrendingUp,
  Star,
  Users,
  Zap,
  Info,
  Shield,
  Thermometer,
  Repeat,
  CalendarDays
} from 'lucide-react';

export default function PublishRoute() {
  const [formData, setFormData] = useState({
    origin: '',
    destination: '',
    departureDate: '',
    vehicleType: '',
    maxWeight: '',
    maxVolume: '',
    price: '',
    description: '',
    isRecurring: false,
    frequency: '',
    specialRequirements: '',
    insurance: false,
    temperatureControl: false
  });

  const [activeTab, setActiveTab] = useState('basic');
  const [formProgress, setFormProgress] = useState(25);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Route published:', formData);
  };

  const vehicleTypes = [
    { value: 'furgoneta', label: 'Furgoneta', capacity: 'Hasta 1,500 kg', icon: Truck, price: 'Q1,500-3,000' },
    { value: 'camion-rigido', label: 'Camión Rígido', capacity: 'Hasta 7,500 kg', icon: Truck, price: 'Q3,000-6,000' },
    { value: 'trailer', label: 'Tráiler', capacity: 'Hasta 24,000 kg', icon: Truck, price: 'Q6,000-12,000' },
    { value: 'mega-trailer', label: 'Mega Tráiler', capacity: 'Hasta 40,000 kg', icon: Truck, price: 'Q10,000-20,000' },
  ];

  const recentRoutes = [
    { id: '1', origin: 'Ciudad de Guatemala', destination: 'Quetzaltenango', date: '2024-01-15', status: 'active', price: 'Q2,500', bookings: 3 },
    { id: '2', origin: 'Escuintla', destination: 'Retalhuleu', date: '2024-01-18', status: 'completed', price: 'Q1,800', bookings: 1 },
    { id: '3', origin: 'Cobán', destination: 'Puerto Barrios', date: '2024-01-20', status: 'active', price: 'Q3,200', bookings: 2 },
  ];

  const marketInsights = [
    { route: 'Ciudad de Guatemala → Quetzaltenango', avgPrice: 'Q2,400', demand: 'Alta', trend: 'up' },
    { route: 'Escuintla → Retalhuleu', avgPrice: 'Q1,700', demand: 'Media', trend: 'stable' },
    { route: 'Cobán → Puerto Barrios', avgPrice: 'Q3,000', demand: 'Baja', trend: 'down' },
  ];

  const calculateFormProgress = () => {
    let progress = 0;
    if (formData.origin) progress += 20;
    if (formData.destination) progress += 20;
    if (formData.departureDate) progress += 15;
    if (formData.vehicleType) progress += 15;
    if (formData.maxWeight) progress += 10;
    if (formData.price) progress += 10;
    if (formData.description) progress += 10;
    return progress;
  };

  // Update progress when form data changes
  useState(() => {
    setFormProgress(calculateFormProgress());
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Publicar Nueva Ruta</h1>
          <p className="text-gray-600 mt-1">Comparte tu ruta disponible para cargas</p>
        </div>
        <div className="flex space-x-3">
          <Button variant="outline" className="border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white">
            <Eye className="h-4 w-4 mr-2" />
            Vista Previa
          </Button>
          <Button className="bg-blue-500 hover:bg-blue-600">
            <Save className="h-4 w-4 mr-2" />
            Guardar Borrador
          </Button>
        </div>
      </div>

      {/* Progress Bar */}
      <Card className="border-gray-200">
        <CardContent className="pt-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-700">Progreso del formulario</span>
            <span className="text-sm text-gray-500">{formProgress}%</span>
          </div>
          <Progress value={formProgress} className="h-2" />
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Form */}
        <div className="lg:col-span-2">
          <Card className="border-gray-200">
            <CardHeader>
              <CardTitle className="text-gray-900 flex items-center gap-2">
                <Route className="h-5 w-5 text-blue-500" />
                Detalles de la Ruta
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="basic">Básico</TabsTrigger>
                  <TabsTrigger value="advanced">Avanzado</TabsTrigger>
                  <TabsTrigger value="requirements">Requisitos</TabsTrigger>
                </TabsList>

                <TabsContent value="basic" className="space-y-6">
                  <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Route Details */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="origin" className="text-gray-700 font-medium">
                          <MapPin className="inline h-4 w-4 mr-1 text-blue-500" />
                          Ciudad de Origen
                        </Label>
                        <Input
                          id="origin"
                          value={formData.origin}
                          onChange={(e) => setFormData({...formData, origin: e.target.value})}
                          placeholder="ej. Ciudad de Guatemala"
                          className="border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="destination" className="text-gray-700 font-medium">
                          <MapPin className="inline h-4 w-4 mr-1 text-blue-500" />
                          Ciudad de Destino
                        </Label>
                        <Input
                          id="destination"
                          value={formData.destination}
                          onChange={(e) => setFormData({...formData, destination: e.target.value})}
                          placeholder="ej. Quetzaltenango"
                          className="border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="departureDate" className="text-gray-700 font-medium">
                          <Calendar className="inline h-4 w-4 mr-1 text-blue-500" />
                          Fecha de Salida
                        </Label>
                        <Input
                          id="departureDate"
                          type="date"
                          value={formData.departureDate}
                          onChange={(e) => setFormData({...formData, departureDate: e.target.value})}
                          className="border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="vehicleType" className="text-gray-700 font-medium">
                          <Truck className="inline h-4 w-4 mr-1 text-blue-500" />
                          Tipo de Vehículo
                        </Label>
                        <Select onValueChange={(value) => setFormData({...formData, vehicleType: value})}>
                          <SelectTrigger className="border-gray-300 focus:border-blue-500 focus:ring-blue-500">
                            <SelectValue placeholder="Seleccionar tipo" />
                          </SelectTrigger>
                          <SelectContent>
                            {vehicleTypes.map((type) => (
                              <SelectItem key={type.value} value={type.value}>
                                <div className="flex items-center justify-between w-full">
                                  <div className="flex items-center space-x-2">
                                    <type.icon className="h-4 w-4" />
                                    <span>{type.label}</span>
                                  </div>
                                  <div className="text-right">
                                    <div className="text-xs text-gray-500">{type.capacity}</div>
                                    <div className="text-xs font-medium text-blue-500">{type.price}</div>
                                  </div>
                                </div>
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="maxWeight" className="text-gray-700 font-medium">
                          <Package className="inline h-4 w-4 mr-1 text-blue-500" />
                          Peso Máximo (kg)
                        </Label>
                        <Input
                          id="maxWeight"
                          type="number"
                          value={formData.maxWeight}
                          onChange={(e) => setFormData({...formData, maxWeight: e.target.value})}
                          placeholder="1000"
                          className="border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="maxVolume" className="text-gray-700 font-medium">
                          <Package className="inline h-4 w-4 mr-1 text-blue-500" />
                          Volumen Máximo (m³)
                        </Label>
                        <Input
                          id="maxVolume"
                          type="number"
                          value={formData.maxVolume}
                          onChange={(e) => setFormData({...formData, maxVolume: e.target.value})}
                          placeholder="50"
                          className="border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="price" className="text-gray-700 font-medium">
                          <Euro className="inline h-4 w-4 mr-1 text-blue-500" />
                          Precio (Q)
                        </Label>
                        <Input
                          id="price"
                          type="number"
                          value={formData.price}
                          onChange={(e) => setFormData({...formData, price: e.target.value})}
                          placeholder="500"
                          className="border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="description" className="text-gray-700 font-medium">
                        Descripción Adicional
                      </Label>
                      <Textarea
                        id="description"
                        value={formData.description}
                        onChange={(e) => setFormData({...formData, description: e.target.value})}
                        placeholder="Información adicional sobre la ruta, condiciones especiales, etc..."
                        className="border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                        rows={3}
                      />
                    </div>

                    <Button type="submit" className="w-full bg-blue-500 hover:bg-blue-600 text-white">
                      <Plus className="h-4 w-4 mr-2" />
                      Publicar Ruta
                    </Button>
                  </form>
                </TabsContent>

                <TabsContent value="advanced" className="space-y-6">
                  <div className="space-y-6">
                    <div className="flex items-center space-x-2 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                      <Repeat className="h-5 w-5 text-blue-600" />
                      <div>
                        <Label htmlFor="recurring" className="text-gray-700 font-medium">
                          Ruta Recurrente
                        </Label>
                        <p className="text-sm text-gray-600">Establece una ruta que se repita regularmente</p>
                      </div>
                      <Switch
                        id="recurring"
                        checked={formData.isRecurring}
                        onCheckedChange={(checked) => setFormData({...formData, isRecurring: checked})}
                      />
                    </div>

                    {formData.isRecurring && (
                      <div className="space-y-2">
                        <Label htmlFor="frequency" className="text-gray-700 font-medium">
                          <CalendarDays className="inline h-4 w-4 mr-1 text-blue-500" />
                          Frecuencia
                        </Label>
                        <Select onValueChange={(value) => setFormData({...formData, frequency: value})}>
                          <SelectTrigger className="border-gray-300 focus:border-blue-500 focus:ring-blue-500">
                            <SelectValue placeholder="Seleccionar frecuencia" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="daily">Diaria</SelectItem>
                            <SelectItem value="weekly">Semanal</SelectItem>
                            <SelectItem value="biweekly">Quincenal</SelectItem>
                            <SelectItem value="monthly">Mensual</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    )}

                    <div className="space-y-2">
                      <Label htmlFor="specialRequirements" className="text-gray-700 font-medium">
                        Requisitos Especiales
                      </Label>
                      <Textarea
                        id="specialRequirements"
                        value={formData.specialRequirements}
                        onChange={(e) => setFormData({...formData, specialRequirements: e.target.value})}
                        placeholder="Especifica requisitos especiales para la carga..."
                        className="border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                        rows={3}
                      />
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="requirements" className="space-y-6">
                  <div className="space-y-4">
                    <div className="flex items-center space-x-2 p-4 bg-green-50 border border-green-200 rounded-lg">
                      <Shield className="h-5 w-5 text-green-600" />
                      <div>
                        <Label htmlFor="insurance" className="text-gray-700 font-medium">
                          Seguro de Carga Incluido
                        </Label>
                        <p className="text-sm text-gray-600">Ofrece mayor seguridad a tus clientes</p>
                      </div>
                      <Switch
                        id="insurance"
                        checked={formData.insurance}
                        onCheckedChange={(checked) => setFormData({...formData, insurance: checked})}
                      />
                    </div>

                    <div className="flex items-center space-x-2 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                      <Thermometer className="h-5 w-5 text-blue-600" />
                      <div>
                        <Label htmlFor="temperatureControl" className="text-gray-700 font-medium">
                          Control de Temperatura
                        </Label>
                        <p className="text-sm text-gray-600">Ideal para productos sensibles a la temperatura</p>
                      </div>
                      <Switch
                        id="temperatureControl"
                        checked={formData.temperatureControl}
                        onCheckedChange={(checked) => setFormData({...formData, temperatureControl: checked})}
                      />
                    </div>

                    <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                      <div className="flex items-start space-x-2">
                        <Info className="h-5 w-5 text-blue-600 mt-0.5" />
                        <div>
                          <h4 className="font-medium text-blue-900">Información Importante</h4>
                          <p className="text-sm text-blue-700 mt-1">
                            Asegúrate de que toda la información sea precisa. Las rutas publicadas serán visibles para todos los clientes.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Quick Stats */}
          <Card className="border-gray-200">
            <CardHeader>
              <CardTitle className="text-gray-900 text-lg flex items-center">
                <TrendingUp className="h-5 w-5 mr-2 text-blue-500" />
                Estadísticas Rápidas
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Rutas Activas</span>
                <Badge variant="secondary" className="bg-blue-100 text-blue-700">5</Badge>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Cargas Completadas</span>
                <Badge variant="secondary" className="bg-green-100 text-green-800">142</Badge>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Ingresos del Mes</span>
                <Badge variant="secondary" className="bg-purple-100 text-purple-800">Q2,450</Badge>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Calificación</span>
                <div className="flex items-center space-x-1">
                  <Star className="h-4 w-4 text-yellow-500 fill-current" />
                  <span className="text-sm font-medium">4.8</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Market Insights */}
          <Card className="border-gray-200">
            <CardHeader>
              <CardTitle className="text-gray-900 text-lg flex items-center">
                <Zap className="h-5 w-5 mr-2 text-[blue-500]" />
                Insights del Mercado
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {marketInsights.map((insight, index) => (
                  <div key={index} className="p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                    <div className="flex justify-between items-start mb-2">
                      <p className="font-medium text-gray-900">{insight.route}</p>
                      <Badge variant="outline" className={
                        insight.demand === 'Alta' ? 'bg-green-100 text-green-800 border-green-200' :
                        insight.demand === 'Media' ? 'bg-yellow-100 text-yellow-800 border-yellow-200' :
                        'bg-red-100 text-red-800 border-red-200'
                      }>
                        {insight.demand}
                      </Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Precio promedio</span>
                      <span className="text-sm font-medium text-gray-900">{insight.avgPrice}</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Recent Routes */}
          <Card className="border-gray-200">
            <CardHeader>
              <CardTitle className="text-gray-900 text-lg flex items-center">
                <Clock className="h-5 w-5 mr-2 text-[blue-500]" />
                Rutas Recientes
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {recentRoutes.map((route) => (
                  <div key={route.id} className="p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <p className="font-medium text-gray-900">{route.origin} → {route.destination}</p>
                        <p className="text-sm text-gray-600">{route.date}</p>
                      </div>
                      <Badge variant={
                        route.status === 'active' ? 'default' : 'secondary'
                      } className={
                        route.status === 'active' ? 'bg-[blue-500]' : 'bg-gray-100 text-gray-800'
                      }>
                        {route.status === 'active' ? 'Activa' : 'Completada'}
                      </Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium text-gray-900">{route.price}</span>
                      <div className="flex items-center space-x-1 text-sm text-gray-500">
                        <Users className="h-3 w-3" />
                        <span>{route.bookings} reservas</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Tips */}
          <Card className="border-gray-200">
            <CardHeader>
              <CardTitle className="text-gray-900 text-lg flex items-center">
                <CheckCircle className="h-5 w-5 mr-2 text-[blue-500]" />
                Consejos
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3 text-sm text-gray-600">
                <div className="flex items-start space-x-2">
                  <div className="w-2 h-2 bg-[blue-500] rounded-full mt-2 flex-shrink-0"></div>
                  <p>Incluye descripciones detalladas para atraer más clientes</p>
                </div>
                <div className="flex items-start space-x-2">
                  <div className="w-2 h-2 bg-[blue-500] rounded-full mt-2 flex-shrink-0"></div>
                  <p>Establece precios competitivos basados en el mercado</p>
                </div>
                <div className="flex items-start space-x-2">
                  <div className="w-2 h-2 bg-[blue-500] rounded-full mt-2 flex-shrink-0"></div>
                  <p>Mantén actualizada la información de tu vehículo</p>
                </div>
                <div className="flex items-start space-x-2">
                  <div className="w-2 h-2 bg-[blue-500] rounded-full mt-2 flex-shrink-0"></div>
                  <p>Responde rápidamente a las solicitudes</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
