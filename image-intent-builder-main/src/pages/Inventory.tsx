import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useInventory } from "@/contexts/InventoryContext";
import { DashboardCard } from "@/components/DashboardCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Package, Plus, Search, Edit, Trash2, AlertTriangle, Bell } from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { InventoryItem } from "@/contexts/InventoryContext";

const categories = ['Electronics', 'Clothing', 'Home & Garden', 'Food & Beverages', 'Books', 'Toys', 'Other'];

export default function Inventory() {
  const { t } = useTranslation();
  const { items, alerts, loading, addItem, updateItem, deleteItem, markAlertAsRead, deleteAlert } = useInventory();
  const [searchTerm, setSearchTerm] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<InventoryItem | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    quantity: 0,
    price: 0,
    category: "",
    description: "",
    lowStockThreshold: 10,
  });

  const filteredItems = items.filter(item =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const unreadAlerts = alerts.filter(alert => !alert.read);

  const handleOpenDialog = (item?: InventoryItem) => {
    if (item) {
      setEditingItem(item);
      setFormData({
        name: item.name,
        quantity: item.quantity,
        price: item.price,
        category: item.category,
        description: item.description || "",
        lowStockThreshold: item.lowStockThreshold || 10,
      });
    } else {
      setEditingItem(null);
      setFormData({
        name: "",
        quantity: 0,
        price: 0,
        category: "",
        description: "",
        lowStockThreshold: 10,
      });
    }
    setIsDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
    setEditingItem(null);
    setFormData({
      name: "",
      quantity: 0,
      price: 0,
      category: "",
      description: "",
      lowStockThreshold: 10,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingItem) {
      updateItem(editingItem.id, formData);
    } else {
      addItem(formData);
    }
    handleCloseDialog();
  };

  const handleDelete = (id: string) => {
    if (confirm("Are you sure you want to delete this item?")) {
      deleteItem(id);
    }
  };

  if (loading) {
    return (
      <div className="p-6 space-y-6 relative z-10 animate-in fade-in duration-500">
        <div className="flex items-center justify-center py-12">
          <div className="text-center">
            <Package className="w-16 h-16 mx-auto mb-4 text-muted-foreground animate-pulse" />
            <p className="text-muted-foreground">Loading inventory...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6 relative z-10 animate-in fade-in duration-500">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">{t('inventory')}</h1>
          <p className="text-muted-foreground mt-1">{t('inventory')}</p>
        </div>
        <Button 
          className="gap-2 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
          onClick={() => handleOpenDialog()}
        >
          <Plus className="w-4 h-4" />
          {t('addItem')}
        </Button>
      </div>

      {/* Alerts Section */}
      {unreadAlerts.length > 0 && (
        <DashboardCard className="border-orange-500/50 bg-orange-500/10">
          <div className="flex items-center gap-2 mb-4">
            <Bell className="w-5 h-5 text-orange-500 animate-pulse" />
            <h3 className="text-lg font-semibold text-foreground">{t('alerts')}</h3>
            <Badge variant="destructive" className="ml-auto">{unreadAlerts.length}</Badge>
          </div>
          <div className="space-y-2">
            {unreadAlerts.slice(0, 5).map((alert) => (
              <Alert
                key={alert.id}
                className={cn(
                  "cursor-pointer transition-all hover:scale-[1.02]",
                  alert.severity === 'high' && "border-red-500 bg-red-500/10",
                  alert.severity === 'medium' && "border-orange-500 bg-orange-500/10",
                  alert.severity === 'low' && "border-yellow-500 bg-yellow-500/10"
                )}
                onClick={() => markAlertAsRead(alert.id)}
              >
                <AlertTriangle className="h-4 w-4" />
                <AlertTitle>{alert.message}</AlertTitle>
                <AlertDescription className="text-xs text-muted-foreground">
                  {new Date(alert.createdAt).toLocaleString()}
                </AlertDescription>
              </Alert>
            ))}
          </div>
        </DashboardCard>
      )}

      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
        <Input 
          placeholder="Search products..." 
          className="pl-10 bg-secondary/50 backdrop-blur-sm border-primary/30" 
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {filteredItems.length === 0 ? (
        <DashboardCard>
          <div className="text-center py-12">
            <Package className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
            <h3 className="text-xl font-semibold text-foreground mb-2">{t('noItems')}</h3>
            <p className="text-muted-foreground mb-4">Start by adding your first product to the inventory</p>
            <Button onClick={() => handleOpenDialog()}>{t('addItem')}</Button>
          </div>
        </DashboardCard>
      ) : (
        <DashboardCard>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>{t('itemName')}</TableHead>
                <TableHead>{t('category')}</TableHead>
                <TableHead>{t('quantity')}</TableHead>
                <TableHead>{t('price')}</TableHead>
                <TableHead>Total Value</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredItems.map((item) => {
                const isLowStock = item.quantity <= (item.lowStockThreshold || 10);
                const isOutOfStock = item.quantity === 0;
                return (
                  <TableRow 
                    key={item.id}
                    className={cn(
                      "transition-all hover:bg-secondary/50 hover:scale-[1.01] animate-in fade-in slide-in-from-left",
                      isOutOfStock && "bg-red-500/10",
                      isLowStock && !isOutOfStock && "bg-orange-500/10"
                    )}
                    style={{ animationDelay: `${items.indexOf(item) * 50}ms` }}
                  >
                    <TableCell className="font-medium">{item.name}</TableCell>
                    <TableCell>
                      <Badge variant="outline">{item.category}</Badge>
                    </TableCell>
                    <TableCell>{item.quantity}</TableCell>
                    <TableCell>${item.price.toFixed(2)}</TableCell>
                    <TableCell className="font-semibold">
                      ${(item.quantity * item.price).toFixed(2)}
                    </TableCell>
                    <TableCell>
                      {isOutOfStock ? (
                        <Badge variant="destructive">Out of Stock</Badge>
                      ) : isLowStock ? (
                        <Badge variant="outline" className="border-orange-500 text-orange-500">
                          Low Stock
                        </Badge>
                      ) : (
                        <Badge variant="outline" className="border-green-500 text-green-500">
                          In Stock
                        </Badge>
                      )}
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleOpenDialog(item)}
                          className="hover:bg-primary/10"
                        >
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleDelete(item.id)}
                          className="hover:bg-destructive/10 text-destructive"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </DashboardCard>
      )}

      {/* Add/Edit Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="backdrop-blur-xl bg-card/30 border-border/30 max-w-2xl">
          <DialogHeader>
            <DialogTitle>{editingItem ? t('editItem') : t('addItem')}</DialogTitle>
            <DialogDescription>
              {editingItem ? 'Update item details' : 'Add a new item to your inventory'}
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">{t('itemName')}</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                  className="bg-secondary/50 backdrop-blur-sm border-primary/30"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="category">{t('category')}</Label>
                <Select
                  value={formData.category}
                  onValueChange={(value) => setFormData({ ...formData, category: value })}
                  required
                >
                  <SelectTrigger className="bg-secondary/50 backdrop-blur-sm border-primary/30">
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((cat) => (
                      <SelectItem key={cat} value={cat}>
                        {cat}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="quantity">{t('quantity')}</Label>
                <Input
                  id="quantity"
                  type="number"
                  min="0"
                  value={formData.quantity}
                  onChange={(e) => setFormData({ ...formData, quantity: parseInt(e.target.value) || 0 })}
                  required
                  className="bg-secondary/50 backdrop-blur-sm border-primary/30"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="price">{t('price')}</Label>
                <Input
                  id="price"
                  type="number"
                  min="0"
                  step="0.01"
                  value={formData.price}
                  onChange={(e) => setFormData({ ...formData, price: parseFloat(e.target.value) || 0 })}
                  required
                  className="bg-secondary/50 backdrop-blur-sm border-primary/30"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="threshold">Low Stock Threshold</Label>
                <Input
                  id="threshold"
                  type="number"
                  min="0"
                  value={formData.lowStockThreshold}
                  onChange={(e) => setFormData({ ...formData, lowStockThreshold: parseInt(e.target.value) || 10 })}
                  className="bg-secondary/50 backdrop-blur-sm border-primary/30"
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Input
                id="description"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="bg-secondary/50 backdrop-blur-sm border-primary/30"
              />
            </div>
            <DialogFooter>
              <Button type="button" variant="outline" onClick={handleCloseDialog}>
                Cancel
              </Button>
              <Button type="submit" className="bg-gradient-to-r from-purple-500 to-pink-500">
                {editingItem ? 'Update' : 'Add'} Item
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
