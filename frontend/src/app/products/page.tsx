'use client';

import { useQuery } from '@tanstack/react-query';
import { api } from '@/lib/api';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useCart } from '@/store/useCart';

import Providers from '../../../components/Providers';
import ProductListClient from '../../../components/ProductListClient';

export default function ProductsPage() {
  const add = useCart(s => s.addItem);

  const { data, isLoading } = useQuery({
    queryKey: ['products'],
    queryFn: async () => {
      const res = await api.get('products');
      return res.data;
    },
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="grid grid-cols-4 gap-4 p-6">
      {data?.map((p: any) => (
        <Card key={p.id} className="p-4">
          <h2 className="font-bold">{p.name}</h2>
          <p className="text-lg">৳ {p.price}</p>
          <Button
            className="mt-2"
            onClick={() =>
              add({
                id: p.id,
                name: p.name,
                price: p.price,
                quantity: 1,
              })
            }
          >
            Add to Cart
          </Button>
        </Card>
      ))}
    </div>
  );
}
