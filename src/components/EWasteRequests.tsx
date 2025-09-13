import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Eye, Trash2 } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

import type { Database } from '@/integrations/supabase/ewaste.types';
type EWasteRequest = Database['public']['Tables']['ewaste_requests']['Row'];

export function EWasteRequests() {
  const [requests, setRequests] = useState<EWasteRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedRequest, setSelectedRequest] = useState<EWasteRequest | null>(null);

  useEffect(() => {
    fetchRequests();
  }, []);

  const fetchRequests = async () => {
    try {
      const { data, error } = await supabase
        .from('ewaste_requests')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setRequests(data || []);
    } catch (error) {
      console.error('Error fetching e-waste requests:', error);
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status: EWasteRequest['status']) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-500';
      case 'approved':
        return 'bg-green-500';
      case 'rejected':
        return 'bg-red-500';
      case 'sold':
        return 'bg-blue-500';
      default:
        return 'bg-gray-500';
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <div className="space-y-4">
      {requests.map((request) => (
        <Card key={request.id} className="overflow-hidden">
          <CardHeader className="p-4">
            <div className="flex justify-between items-start">
              <div>
                <CardTitle className="text-lg font-semibold">{request.title}</CardTitle>
                <p className="text-sm text-muted-foreground">
                  Submitted on {formatDate(request.created_at)}
                </p>
              </div>
              <Badge className={getStatusColor(request.status)}>
                {request.status.charAt(0).toUpperCase() + request.status.slice(1)}
              </Badge>
            </div>
          </CardHeader>
          <CardContent className="p-4 pt-0">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="text-sm line-clamp-2">{request.description}</p>
                {request.price_estimate && (
                  <p className="mt-2 font-medium">
                    Estimated Value: ${request.price_estimate}
                  </p>
                )}
              </div>
              <div className="flex justify-end space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setSelectedRequest(request)}
                >
                  <Eye className="w-4 h-4 mr-2" />
                  View Details
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}

      <Dialog open={!!selectedRequest} onOpenChange={() => setSelectedRequest(null)}>
        {selectedRequest && (
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>{selectedRequest.title}</DialogTitle>
              <DialogDescription>
                Submitted on {formatDate(selectedRequest.created_at)}
              </DialogDescription>
            </DialogHeader>
            <div className="mt-4 space-y-4">
              <img
                src={selectedRequest.image_url}
                alt={selectedRequest.title}
                className="w-full h-auto rounded-lg"
              />
              <div>
                <h4 className="font-semibold mb-2">Description</h4>
                <p>{selectedRequest.description}</p>
              </div>
              {selectedRequest.price_estimate && (
                <div>
                  <h4 className="font-semibold mb-2">Estimated Value</h4>
                  <p>${selectedRequest.price_estimate}</p>
                </div>
              )}
              <div>
                <h4 className="font-semibold mb-2">Status</h4>
                <Badge className={getStatusColor(selectedRequest.status)}>
                  {selectedRequest.status.charAt(0).toUpperCase() + selectedRequest.status.slice(1)}
                </Badge>
              </div>
            </div>
          </DialogContent>
        )}
      </Dialog>
    </div>
  );
}