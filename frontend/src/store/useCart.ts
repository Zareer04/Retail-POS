import { create } from 'zustand';

interface CartItem {
   id: number;
   name: string;
   price: number;
   quantity: number;
}

interface CartStore {
   items: CartItem[];
   addItem: (item: CartItem) => void;
   removeItem: (id: number) => void;
   increaseQuantity: (id: number) => void;
   decreaseQuantity: (id: number) => void;
   clearCart: () => void;
}

export const useCart = create<CartStore>(set => ({
   items: [],
   addItem: item =>
      set(state => {
         const existingItem = state.items.find(i => i.id === item.id);
         if (existingItem) {
            return {
               ...state,
               items: state.items.map(i =>
                  i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
               ),
            };
         }
         return {
            ...state,
            items: [...state.items, { ...item, quantity: 1 }],
         };
      }),
   removeItem: id =>
      set(state => ({
         ...state,
         items: state.items.filter(item => item.id !== id),
      })),
   increaseQuantity: id =>
      set(state => ({
         ...state,
         items: state.items.map(item =>
            item.id === id ? { ...item, quantity: item.quantity + 1 } : item
         ),
      })),
   decreaseQuantity: id =>
      set(state => ({
         ...state,
         items: state.items.map(item =>
            item.id === id
               ? { ...item, quantity: Math.max(1, item.quantity - 1) }
               : item
         ),
      })),
   clearCart: () => set(() => ({ items: [] })),
}));
