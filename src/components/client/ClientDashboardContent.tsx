import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Package, Truck, Clock, CheckCircle } from 'lucide-react';

export default function ClientDashboardContent() {
  const stats = [
    { title: 'Cargas Activas', value: '3', icon: Package, color: 'from-blue-600 to-indigo-600' },
    { title: 'En Tránsito', value: '2', icon: Truck, color: 'from-cyan-500 to-blue-600' },
    { title: 'Pendientes', value: '1', icon: Clock, color: 'from-yellow-400 to-yellow-600' },
    { title: 'Completadas', value: '15', icon: CheckCircle, color: 'from-green-500 to-teal-500' },
  ];

  const recentShipments = [
    { id: '001', origin: 'Madrid', destination: 'Barcelona', status: 'En tránsito', date: '2024-01-15' },
    { id: '002', origin: 'Sevilla', destination: 'Valencia', status: 'Completado', date: '2024-01-14' },
    { id: '003', origin: 'Bilbao', destination: 'Zaragoza', status: 'Pendiente', date: '2024-01-13' },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent mb-2">Dashboard Cliente</h1>
        <p className="text-blue-600">Resumen de tus envíos y actividad</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <Card key={stat.title} className="group border-0 bg-white/80 backdrop-blur-sm hover:bg-white/90 shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <div className={`p-3 rounded-xl bg-gradient-to-r ${stat.color} shadow-lg`}>
                  <Icon className="h-6 w-6 text-white" />
                </div>
                <CardTitle className="text-base font-semibold text-slate-800 group-hover:text-blue-600 transition-colors duration-300">{stat.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-blue-900">{stat.value}</div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <Card className="border-0 bg-white/80 backdrop-blur-sm shadow-xl hover:shadow-2xl transition-all duration-500">
        <CardHeader>
          <CardTitle className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">Envíos Recientes</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentShipments.map((shipment) => (
              <div key={shipment.id} className="flex items-center justify-between p-4 border border-blue-200 rounded-xl bg-white/60 shadow-sm hover:shadow-md transition-all">
                <div>
                  <p className="font-semibold text-blue-900">#{shipment.id}</p>
                  <p className="text-sm text-blue-600">{shipment.origin} → {shipment.destination}</p>
                </div>
                <div className="text-right">
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold shadow-sm transition-colors duration-300 ${
                    shipment.status === 'Completado' ? 'bg-green-100 text-green-800' :
                    shipment.status === 'En tránsito' ? 'bg-blue-100 text-blue-800' :
                    'bg-yellow-100 text-yellow-800'
                  }`}>
                    {shipment.status}
                  </span>
                  <p className="text-sm text-blue-500 mt-1">{shipment.date}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}