import { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from './AuthContext';

export interface InventoryItem {
  id: string;
  name: string;
  quantity: number;
  price: number;
  category: string;
  description?: string;
  lowStockThreshold?: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface Alert {
  id: string;
  type: 'low_stock' | 'out_of_stock' | 'high_value';
  message: string;
  itemId: string;
  itemName: string;
  severity: 'low' | 'medium' | 'high';
  read: boolean;
  createdAt: Date;
}

interface InventoryContextType {
  items: InventoryItem[];
  alerts: Alert[];
  loading: boolean;
  addItem: (item: Omit<InventoryItem, 'id' | 'createdAt' | 'updatedAt'>) => Promise<void>;
  updateItem: (id: string, item: Partial<InventoryItem>) => Promise<void>;
  deleteItem: (id: string) => Promise<void>;
  getItem: (id: string) => InventoryItem | undefined;
  getStats: () => {
    totalItems: number;
    totalValue: number;
    lowStockItems: number;
    categories: Record<string, number>;
  };
  markAlertAsRead: (alertId: string) => Promise<void>;
  deleteAlert: (alertId: string) => Promise<void>;
  checkAlerts: () => Promise<void>;
  refreshItems: () => Promise<void>;
}

const InventoryContext = createContext<InventoryContextType | undefined>(undefined);

export function InventoryProvider({ children }: { children: ReactNode }) {
  const { user, isAuthenticated } = useAuth();
  const [items, setItems] = useState<InventoryItem[]>([]);
  const [alerts, setAlerts] = useState<Alert[]>([]);
  const [loading, setLoading] = useState(true);

  // Load items from Supabase or localStorage
  const loadItems = async () => {
    if (!isAuthenticated || !user) {
      // Fallback to localStorage
      const storedItems = localStorage.getItem('inventory-items');
      if (storedItems) {
        try {
          const parsed = JSON.parse(storedItems);
          setItems(parsed.map((item: any) => ({
            ...item,
            createdAt: new Date(item.createdAt),
            updatedAt: new Date(item.updatedAt),
          })));
        } catch (e) {
          console.error('Failed to load items from localStorage:', e);
        }
      }
      setLoading(false);
      return;
    }

    try {
      // Try Supabase first
      const { data, error } = await supabase
        .from('inventory_items')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (error) {
        throw error;
      }

      if (data) {
        const formattedItems: InventoryItem[] = data.map((item: any) => ({
          id: item.id,
          name: item.name,
          quantity: item.quantity,
          price: parseFloat(item.price),
          category: item.category,
          description: item.description,
          lowStockThreshold: item.low_stock_threshold,
          createdAt: new Date(item.created_at),
          updatedAt: new Date(item.updated_at),
        }));
        setItems(formattedItems);
      }
    } catch (error) {
      console.warn('Failed to load from Supabase, using localStorage:', error);
      // Fallback to localStorage
      const storedItems = localStorage.getItem('inventory-items');
      if (storedItems) {
        try {
          const parsed = JSON.parse(storedItems);
          setItems(parsed.map((item: any) => ({
            ...item,
            createdAt: new Date(item.createdAt),
            updatedAt: new Date(item.updatedAt),
          })));
        } catch (e) {
          console.error('Failed to load items:', e);
        }
      }
    } finally {
      setLoading(false);
    }
  };

  // Load alerts from Supabase or localStorage
  const loadAlerts = async () => {
    if (!isAuthenticated || !user) {
      // Fallback to localStorage
      const storedAlerts = localStorage.getItem('inventory-alerts');
      if (storedAlerts) {
        try {
          const parsed = JSON.parse(storedAlerts);
          setAlerts(parsed.map((alert: any) => ({
            ...alert,
            createdAt: new Date(alert.createdAt),
          })));
        } catch (e) {
          console.error('Failed to load alerts from localStorage:', e);
        }
      }
      return;
    }

    try {
      const { data, error } = await supabase
        .from('alerts')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false })
        .limit(50);

      if (error) {
        throw error;
      }

      if (data) {
        const formattedAlerts: Alert[] = data.map((alert: any) => ({
          id: alert.id,
          type: alert.type,
          message: alert.message,
          itemId: alert.item_id || '',
          itemName: alert.item_name || '',
          severity: alert.severity,
          read: alert.read,
          createdAt: new Date(alert.created_at),
        }));
        setAlerts(formattedAlerts);
      }
    } catch (error) {
      console.warn('Failed to load alerts from Supabase, using localStorage:', error);
      // Fallback to localStorage
      const storedAlerts = localStorage.getItem('inventory-alerts');
      if (storedAlerts) {
        try {
          const parsed = JSON.parse(storedAlerts);
          setAlerts(parsed.map((alert: any) => ({
            ...alert,
            createdAt: new Date(alert.createdAt),
          })));
        } catch (e) {
          console.error('Failed to load alerts:', e);
        }
      }
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      loadItems();
      loadAlerts();
    } else {
      setLoading(false);
    }
  }, [isAuthenticated, user?.id]);

  // Save items to Supabase or localStorage
  const saveItems = async (itemsToSave: InventoryItem[]) => {
    // Always save to localStorage as backup
    localStorage.setItem('inventory-items', JSON.stringify(itemsToSave));

    if (!isAuthenticated || !user) {
      return;
    }

    try {
      // Sync to Supabase
      const itemsToSync = itemsToSave.map(item => ({
        id: item.id,
        user_id: user.id,
        name: item.name,
        quantity: item.quantity,
        price: item.price,
        category: item.category,
        description: item.description || null,
        low_stock_threshold: item.lowStockThreshold || 10,
      }));

      // Upsert all items
      const { error } = await supabase
        .from('inventory_items')
        .upsert(itemsToSync, { onConflict: 'id' });

      if (error) {
        throw error;
      }
    } catch (error) {
      console.warn('Failed to save to Supabase:', error);
      // Continue with localStorage only
    }
  };

  const addItem = async (itemData: Omit<InventoryItem, 'id' | 'createdAt' | 'updatedAt'>) => {
    const newItem: InventoryItem = {
      ...itemData,
      id: crypto.randomUUID(),
      createdAt: new Date(),
      updatedAt: new Date(),
      lowStockThreshold: itemData.lowStockThreshold || 10,
    };

    const updatedItems = [...items, newItem];
    setItems(updatedItems);
    await saveItems(updatedItems);
    await checkAlerts();
  };

  const updateItem = async (id: string, updates: Partial<InventoryItem>) => {
    const updatedItems = items.map(item =>
      item.id === id
        ? { ...item, ...updates, updatedAt: new Date() }
        : item
    );
    setItems(updatedItems);
    await saveItems(updatedItems);
    await checkAlerts();
  };

  const deleteItem = async (id: string) => {
    const updatedItems = items.filter(item => item.id !== id);
    setItems(updatedItems);
    await saveItems(updatedItems);

    // Delete alerts for this item
    const updatedAlerts = alerts.filter(alert => alert.itemId !== id);
    setAlerts(updatedAlerts);
    await saveAlerts(updatedAlerts);

    // Delete from Supabase
    if (isAuthenticated && user) {
      try {
        await supabase.from('inventory_items').delete().eq('id', id);
        await supabase.from('alerts').delete().eq('item_id', id);
      } catch (error) {
        console.warn('Failed to delete from Supabase:', error);
      }
    }
  };

  const getItem = (id: string) => {
    return items.find(item => item.id === id);
  };

  const getStats = () => {
    const totalItems = items.length;
    const totalValue = items.reduce((sum, item) => sum + item.quantity * item.price, 0);
    const lowStockItems = items.filter(item => 
      item.quantity <= (item.lowStockThreshold || 10)
    ).length;
    
    const categories: Record<string, number> = {};
    items.forEach(item => {
      categories[item.category] = (categories[item.category] || 0) + 1;
    });

    return {
      totalItems,
      totalValue,
      lowStockItems,
      categories,
    };
  };

  const saveAlerts = async (alertsToSave: Alert[]) => {
    // Always save to localStorage as backup
    localStorage.setItem('inventory-alerts', JSON.stringify(alertsToSave));

    if (!isAuthenticated || !user) {
      return;
    }

    try {
      const alertsToSync = alertsToSave.map(alert => ({
        id: alert.id,
        user_id: user.id,
        type: alert.type,
        message: alert.message,
        item_id: alert.itemId || null,
        item_name: alert.itemName,
        severity: alert.severity,
        read: alert.read,
      }));

      const { error } = await supabase
        .from('alerts')
        .upsert(alertsToSync, { onConflict: 'id' });

      if (error) {
        throw error;
      }
    } catch (error) {
      console.warn('Failed to save alerts to Supabase:', error);
    }
  };

  const checkAlerts = async () => {
    const newAlerts: Alert[] = [];
    
    items.forEach(item => {
      const threshold = item.lowStockThreshold || 10;
      
      if (item.quantity === 0) {
        const existingAlert = alerts.find(
          a => a.itemId === item.id && a.type === 'out_of_stock' && !a.read
        );
        if (!existingAlert) {
          newAlerts.push({
            id: crypto.randomUUID(),
            type: 'out_of_stock',
            message: `${item.name} is out of stock!`,
            itemId: item.id,
            itemName: item.name,
            severity: 'high',
            read: false,
            createdAt: new Date(),
          });
        }
      } else if (item.quantity <= threshold) {
        const existingAlert = alerts.find(
          a => a.itemId === item.id && a.type === 'low_stock' && !a.read
        );
        if (!existingAlert) {
          newAlerts.push({
            id: crypto.randomUUID(),
            type: 'low_stock',
            message: `${item.name} is running low (${item.quantity} remaining)`,
            itemId: item.id,
            itemName: item.name,
            severity: item.quantity <= threshold / 2 ? 'high' : 'medium',
            read: false,
            createdAt: new Date(),
          });
        }
      }
    });

    if (newAlerts.length > 0) {
      const updatedAlerts = [...newAlerts, ...alerts];
      setAlerts(updatedAlerts);
      await saveAlerts(updatedAlerts);
    }
  };

  const markAlertAsRead = async (alertId: string) => {
    const updatedAlerts = alerts.map(alert =>
      alert.id === alertId ? { ...alert, read: true } : alert
    );
    setAlerts(updatedAlerts);
    await saveAlerts(updatedAlerts);

    if (isAuthenticated && user) {
      try {
        await supabase
          .from('alerts')
          .update({ read: true })
          .eq('id', alertId);
      } catch (error) {
        console.warn('Failed to update alert in Supabase:', error);
      }
    }
  };

  const deleteAlert = async (alertId: string) => {
    const updatedAlerts = alerts.filter(alert => alert.id !== alertId);
    setAlerts(updatedAlerts);
    await saveAlerts(updatedAlerts);

    if (isAuthenticated && user) {
      try {
        await supabase.from('alerts').delete().eq('id', alertId);
      } catch (error) {
        console.warn('Failed to delete alert from Supabase:', error);
      }
    }
  };

  const refreshItems = async () => {
    setLoading(true);
    await loadItems();
    await loadAlerts();
    setLoading(false);
  };

  return (
    <InventoryContext.Provider
      value={{
        items,
        alerts,
        loading,
        addItem,
        updateItem,
        deleteItem,
        getItem,
        getStats,
        markAlertAsRead,
        deleteAlert,
        checkAlerts,
        refreshItems,
      }}
    >
      {children}
    </InventoryContext.Provider>
  );
}

export function useInventory() {
  const context = useContext(InventoryContext);
  if (context === undefined) {
    throw new Error('useInventory must be used within an InventoryProvider');
  }
  return context;
}
