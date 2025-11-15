// import { useEffect, useState } from 'react';
// import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
// import { Button } from '@/components/ui/button';
// import { Badge } from '@/components/ui/badge';
// import { MapPin, CheckCircle, Clock } from 'lucide-react';
// import { getSocket } from '@/lib/socket';
// import axiosInstance from '@/lib/axios';
// import { useToast } from '@/hooks/use-toast';

// interface Delivery {
//   id: string;
//   publicationName: string;
//   status: 'pending' | 'on_the_way' | 'delivered' | 'received';
//   scheduledDate: string;
//   deliveryPerson: string;
//   estimatedTime?: string;
// }

// const DeliveryTracking = () => {
//   const [deliveries, setDeliveries] = useState<Delivery[]>([]);
//   const [isLoading, setIsLoading] = useState(true);
//   const { toast } = useToast();

//   useEffect(() => {
//     fetchDeliveries();
//     setupSocketListeners();

//     return () => {
//       const socket = getSocket();
//       if (socket) {
//         socket.off('delivery-update');
//       }
//     };
//   }, []);

//   const fetchDeliveries = async () => {
//     try {
//       const response = await axiosInstance.get('/customer/delivery');
//       setDeliveries(response.data);
//     } catch (error) {
//       toast({
//         title: 'Error',
//         description: 'Failed to fetch delivery information',
//         variant: 'destructive',
//       });
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const setupSocketListeners = () => {
//     const socket = getSocket();
//     if (socket) {
//       socket.on('delivery-update', (data: Delivery) => {
//         setDeliveries((prev) =>
//           prev.map((delivery) => (delivery.id === data.id ? data : delivery))
//         );
//         toast({
//           title: 'Delivery Update',
//           description: `${data.publicationName} is now ${data.status.replace('_', ' ')}`,
//         });
//       });
//     }
//   };

//   const markAsReceived = async (deliveryId: string) => {
//     try {
//       await axiosInstance.patch(`/customer/delivery/${deliveryId}/received`);
//       toast({
//         title: 'Confirmed',
//         description: 'Delivery marked as received',
//       });
//       fetchDeliveries();
//     } catch (error) {
//       toast({
//         title: 'Error',
//         description: 'Failed to mark as received',
//         variant: 'destructive',
//       });
//     }
//   };

//   const getStatusConfig = (status: string) => {
//     const configs: Record<string, any> = {
//       pending: { icon: Clock, label: 'Pending', color: 'text-muted-foreground', variant: 'secondary' },
//       on_the_way: { icon: MapPin, label: 'On the Way', color: 'text-warning', variant: 'outline' },
//       delivered: { icon: CheckCircle, label: 'Delivered', color: 'text-accent', variant: 'default' },
//       received: { icon: CheckCircle, label: 'Received', color: 'text-success', variant: 'default' },
//     };
//     return configs[status] || configs.pending;
//   };

//   if (isLoading) {
//     return (
//       <div className="space-y-6">
//         {[1, 2, 3].map((i) => (
//           <Card key={i} className="animate-pulse">
//             <CardContent className="p-6">
//               <div className="h-32 bg-muted rounded" />
//             </CardContent>
//           </Card>
//         ))}
//       </div>
//     );
//   }

//   return (
//     <div className="space-y-6">
//       <div>
//         <h1 className="text-3xl font-bold">Delivery Tracking</h1>
//         <p className="text-muted-foreground mt-1">Track your newspaper deliveries in real-time</p>
//       </div>

//       {deliveries.length === 0 ? (
//         <Card>
//           <CardContent className="flex flex-col items-center justify-center py-16">
//             <MapPin className="h-16 w-16 text-muted-foreground mb-4" />
//             <p className="text-muted-foreground text-lg">No deliveries scheduled</p>
//           </CardContent>
//         </Card>
//       ) : (
//         <div className="grid gap-6">
//           {deliveries.map((delivery) => {
//             const statusConfig = getStatusConfig(delivery.status);
//             const StatusIcon = statusConfig.icon;

//             return (
//               <Card key={delivery.id} className="hover:shadow-lg transition-shadow">
//                 <CardHeader>
//                   <div className="flex items-start justify-between">
//                     <div>
//                       <CardTitle className="text-xl">{delivery.publicationName}</CardTitle>
//                       <p className="text-sm text-muted-foreground mt-1">
//                         Scheduled: {new Date(delivery.scheduledDate).toLocaleDateString()}
//                       </p>
//                       <p className="text-sm text-muted-foreground">
//                         Delivery Person: {delivery.deliveryPerson}
//                       </p>
//                     </div>
//                     <Badge variant={statusConfig.variant}>
//                       <StatusIcon className={`h-4 w-4 mr-1 ${statusConfig.color}`} />
//                       {statusConfig.label}
//                     </Badge>
//                   </div>
//                 </CardHeader>
//                 <CardContent className="space-y-4">
//                   {delivery.estimatedTime && delivery.status === 'on_the_way' && (
//                     <div className="p-4 bg-warning/10 border border-warning rounded-lg">
//                       <p className="text-sm font-medium">
//                         Estimated arrival: {delivery.estimatedTime}
//                       </p>
//                     </div>
//                   )}

//                   {delivery.status === 'delivered' && (
//                     <Button onClick={() => markAsReceived(delivery.id)}>
//                       <CheckCircle className="h-4 w-4 mr-2" />
//                       Mark as Received
//                     </Button>
//                   )}

//                   {delivery.status === 'received' && (
//                     <div className="p-4 bg-success/10 border border-success rounded-lg">
//                       <p className="text-sm font-medium text-success">
//                         ✓ Successfully received
//                       </p>
//                     </div>
//                   )}
//                 </CardContent>
//               </Card>
//             );
//           })}
//         </div>
//       )}
//     </div>
//   );
// };

// export default DeliveryTracking;
import { useEffect, useState } from 'react';
import { Card, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { MapPin, CheckCircle, Clock, Truck } from 'lucide-react';

interface Delivery {
  id: string;
  publicationName: string;
  status: 'pending' | 'on_the_way' | 'delivered' | 'received';
  scheduledDate: string;
  deliveryPerson: string;
  estimatedTime?: string;
}

const DeliveryTracking = () => {
  const [deliveries, setDeliveries] = useState<Delivery[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const dummyDeliveries: Delivery[] = [
      {
        id: '1',
        publicationName: 'The Daily Times',
        status: 'on_the_way',
        scheduledDate: '2025-11-12T00:00:00Z',
        deliveryPerson: 'Ravi Kumar',
        estimatedTime: '10:30 AM',
      },
      {
        id: '2',
        publicationName: 'Morning Herald',
        status: 'delivered',
        scheduledDate: '2025-11-10T00:00:00Z',
        deliveryPerson: 'Suresh Reddy',
      },
      {
        id: '3',
        publicationName: 'Evening Express',
        status: 'received',
        scheduledDate: '2025-11-09T00:00:00Z',
        deliveryPerson: 'Anita Sharma',
      },
    ];

    setDeliveries(dummyDeliveries);
    setIsLoading(false);
  }, []);

  const getStatusBadge = (status: string) => {
    const variants: Record<string, any> = {
      pending: { label: 'Pending', class: 'bg-gray-200 text-gray-700' },
      on_the_way: { label: 'On the Way', class: 'bg-blue-100 text-blue-600' },
      delivered: { label: 'Delivered', class: 'bg-yellow-100 text-yellow-700' },
      received: { label: 'Received', class: 'bg-green-100 text-green-600' },
    };
    const config = variants[status] || variants.pending;
    return (
      <Badge className={`${config.class} px-3 py-1 rounded-full text-sm font-medium`}>
        {config.label}
      </Badge>
    );
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending':
        return <Clock className="h-10 w-10 text-gray-500" />;
      case 'on_the_way':
        return <Truck className="h-10 w-10 text-blue-600" />;
      case 'delivered':
        return <MapPin className="h-10 w-10 text-yellow-600" />;
      case 'received':
        return <CheckCircle className="h-10 w-10 text-green-600" />;
      default:
        return <Clock className="h-10 w-10 text-gray-500" />;
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64 text-muted-foreground text-lg">
        Loading deliveries...
      </div>
    );
  }

  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold mb-4">Delivery Tracking</h1>
      <p className="text-base text-muted-foreground mb-6">
        Track your newspaper deliveries easily
      </p>

      {deliveries.length === 0 ? (
        <Card className="flex flex-col items-center justify-center py-10 w-full h-[100px]">
          <MapPin className="h-8 w-8 text-muted-foreground mb-2" />
          <p className="text-muted-foreground text-lg">No deliveries yet</p>
        </Card>
      ) : (
        <div className="flex flex-col gap-3">
          {deliveries.map((delivery) => (
            <Card
              key={delivery.id}
              className="w-full h-[100px] shadow-sm hover:shadow-md transition-shadow rounded-lg flex items-center px-4"
            >
              <div className="flex items-center gap-4 w-full">
                <div className="flex-shrink-0">{getStatusIcon(delivery.status)}</div>
                <div className="flex flex-col flex-grow">
                  <div className="flex justify-between items-center">
                    <CardTitle className="text-lg font-semibold">
                      {delivery.publicationName}
                    </CardTitle>
                    {getStatusBadge(delivery.status)}
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">
                    {delivery.deliveryPerson} •{' '}
                    {new Date(delivery.scheduledDate).toLocaleDateString()}
                    {delivery.estimatedTime && ` • ETA: ${delivery.estimatedTime}`}
                  </p>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default DeliveryTracking;


