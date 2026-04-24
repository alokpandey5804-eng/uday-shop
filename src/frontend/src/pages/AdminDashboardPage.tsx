import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { useNavigate } from "@tanstack/react-router";
import {
  Camera,
  ChevronDown,
  ChevronUp,
  Image as ImageIcon,
  Images,
  Loader2,
  LogOut,
  MapPin,
  Package,
  Pencil,
  Phone,
  Plus,
  ShoppingBag,
  Trash2,
  User,
  X,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import {
  useAddProduct,
  useDeleteProduct,
  useEditProduct,
  useListOrders,
  useUpdateOrderStatus,
} from "../hooks/useAdmin";
import { useProducts } from "../hooks/useProducts";
import { useAdminStore } from "../store/admin";
import type { Order, OrderStatus, Product } from "../types";

// ── Product form state ──────────────────────────────────────────────────────
interface ProductForm {
  name: string;
  description: string;
  price: string;
  category: string;
  stock: string;
}

const emptyForm: ProductForm = {
  name: "",
  description: "",
  price: "",
  category: "electronics",
  stock: "",
};

const CATEGORIES = [
  { value: "electronics", label: "Electronics" },
  { value: "fashion", label: "Fashion" },
  { value: "home", label: "Home" },
  { value: "beauty", label: "Beauty" },
  { value: "sports", label: "Sports" },
  { value: "study", label: "Study" },
];

// ── Image helpers ────────────────────────────────────────────────────────────
function fileToBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = () => reject(new Error("Failed to read file"));
    reader.readAsDataURL(file);
  });
}

// ── Image Upload Section ────────────────────────────────────────────────────
interface ImageUploadSectionProps {
  images: string[];
  onAdd: (urls: string[]) => void;
  onRemove: (index: number) => void;
  isProcessing: boolean;
  setIsProcessing: (v: boolean) => void;
}

function ImageUploadSection({
  images,
  onAdd,
  onRemove,
  isProcessing,
  setIsProcessing,
}: ImageUploadSectionProps) {
  const albumRef = useRef<HTMLInputElement>(null);
  const cameraRef = useRef<HTMLInputElement>(null);

  async function handleFiles(files: FileList | null) {
    if (!files || files.length === 0) return;
    setIsProcessing(true);
    try {
      const validFiles = Array.from(files).filter((f) =>
        f.type.startsWith("image/"),
      );
      if (validFiles.length === 0) {
        toast.error("Koi valid image nahi mili");
        return;
      }
      const base64Urls = await Promise.all(validFiles.map(fileToBase64));
      onAdd(base64Urls);
    } catch {
      toast.error("Image load karne mein problem aayi");
    } finally {
      setIsProcessing(false);
      // Reset inputs so same file can be re-selected
      if (albumRef.current) albumRef.current.value = "";
      if (cameraRef.current) cameraRef.current.value = "";
    }
  }

  return (
    <div className="space-y-3">
      <div className="flex items-center gap-2">
        {/* Album / Gallery button */}
        <Button
          type="button"
          data-ocid="products.image.upload_button"
          variant="outline"
          size="sm"
          className="gap-2 border-primary/40 text-primary hover:bg-primary/10 font-medium"
          onClick={() => albumRef.current?.click()}
          disabled={isProcessing}
        >
          <Images className="w-4 h-4" />
          Gallery se
        </Button>
        {/* Camera button */}
        <Button
          type="button"
          data-ocid="products.image.camera_button"
          variant="outline"
          size="sm"
          className="gap-2 border-primary/40 text-primary hover:bg-primary/10 font-medium"
          onClick={() => cameraRef.current?.click()}
          disabled={isProcessing}
        >
          <Camera className="w-4 h-4" />
          Camera se
        </Button>

        {isProcessing && (
          <span
            data-ocid="products.image.loading_state"
            className="flex items-center gap-1.5 text-xs text-muted-foreground"
          >
            <Loader2 className="w-3.5 h-3.5 animate-spin" />
            Upload ho raha hai…
          </span>
        )}
      </div>

      {/* Hidden file inputs */}
      <input
        ref={albumRef}
        type="file"
        accept="image/*"
        multiple
        className="hidden"
        onChange={(e) => void handleFiles(e.target.files)}
      />
      <input
        ref={cameraRef}
        type="file"
        accept="image/*"
        capture="environment"
        className="hidden"
        onChange={(e) => void handleFiles(e.target.files)}
      />

      {/* Thumbnail previews */}
      {images.length > 0 ? (
        <div
          className="flex flex-wrap gap-2 p-3 bg-muted/30 rounded-lg border border-border"
          data-ocid="products.image.list"
        >
          {images.map((url, idx) => (
            <div
              key={url.slice(0, 40)}
              data-ocid={`products.image.item.${idx + 1}`}
              className="relative group w-16 h-16 shrink-0"
            >
              <img
                src={url}
                alt={`Product thumbnail ${idx + 1}`}
                className="w-16 h-16 object-cover rounded-lg border border-border"
              />
              <button
                type="button"
                data-ocid={`products.image.delete_button.${idx + 1}`}
                onClick={() => onRemove(idx)}
                className="absolute -top-1.5 -right-1.5 w-5 h-5 bg-destructive text-destructive-foreground rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity shadow-sm"
                aria-label={`Remove image ${idx + 1}`}
              >
                <X className="w-3 h-3" />
              </button>
            </div>
          ))}
        </div>
      ) : (
        <div
          data-ocid="products.image.empty_state"
          className="flex flex-col items-center justify-center gap-2 p-5 bg-muted/20 rounded-lg border-2 border-dashed border-border text-muted-foreground"
        >
          <ImageIcon className="w-8 h-8 opacity-40" />
          <p className="text-xs text-center leading-snug">
            Gallery ya Camera se image add karo
            <br />
            <span className="text-destructive/80">
              (Kam se kam 1 image zaroori hai)
            </span>
          </p>
        </div>
      )}
    </div>
  );
}

// ── Status helpers ──────────────────────────────────────────────────────────
function statusBadge(status: OrderStatus) {
  const map: Record<string, { label: string; cls: string }> = {
    pending: {
      label: "Pending",
      cls: "bg-yellow-100 text-yellow-800 border-yellow-200",
    },
    confirmed: {
      label: "Confirmed",
      cls: "bg-blue-100 text-blue-800 border-blue-200",
    },
    shipped: {
      label: "Shipped",
      cls: "bg-orange-100 text-orange-800 border-orange-200",
    },
    delivered: {
      label: "Delivered",
      cls: "bg-green-100 text-green-800 border-green-200",
    },
  };
  const s = map[status as string] ?? {
    label: String(status),
    cls: "bg-muted text-muted-foreground border-border",
  };
  return (
    <span
      className={`text-xs font-semibold px-2 py-0.5 rounded-full border ${s.cls}`}
    >
      {s.label}
    </span>
  );
}

// ── Products Tab ─────────────────────────────────────────────────────────────
function ProductsTab({ token }: { token: string }) {
  const { data: products = [], isLoading } = useProducts(null, null, null);
  const addMutation = useAddProduct();
  const editMutation = useEditProduct();
  const deleteMutation = useDeleteProduct();

  const [modalOpen, setModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [form, setForm] = useState<ProductForm>(emptyForm);
  const [formImages, setFormImages] = useState<string[]>([]);
  const [isProcessingImages, setIsProcessingImages] = useState(false);
  const [deleteId, setDeleteId] = useState<bigint | null>(null);

  function openAdd() {
    setEditingProduct(null);
    setForm(emptyForm);
    setFormImages([]);
    setModalOpen(true);
  }

  function openEdit(p: Product) {
    setEditingProduct(p);
    setForm({
      name: p.name,
      description: p.description,
      price: String(p.price),
      category: p.category,
      stock: String(p.stock),
    });
    setFormImages([...p.images]);
    setModalOpen(true);
  }

  function handleAddImages(urls: string[]) {
    setFormImages((prev) => [...prev, ...urls]);
  }

  function handleRemoveImage(index: number) {
    setFormImages((prev) => prev.filter((_, i) => i !== index));
  }

  async function handleSave() {
    if (formImages.length === 0) {
      toast.error("Kam se kam 1 image add karo");
      return;
    }
    const payload = {
      token,
      name: form.name,
      description: form.description,
      price: Number.parseFloat(form.price),
      category: form.category,
      images: formImages,
      stock: BigInt(Number.parseInt(form.stock, 10)),
    };
    try {
      if (editingProduct) {
        await editMutation.mutateAsync({ ...payload, id: editingProduct.id });
        toast.success("Product update ho gaya!");
      } else {
        await addMutation.mutateAsync(payload);
        toast.success("Product add ho gaya!");
      }
      setModalOpen(false);
    } catch {
      toast.error("Product save nahi hua, dobara try karo");
    }
  }

  async function handleDelete() {
    if (!deleteId) return;
    try {
      await deleteMutation.mutateAsync({ token, id: deleteId });
      toast.success("Product delete ho gaya");
    } catch {
      toast.error("Delete nahi hua");
    } finally {
      setDeleteId(null);
    }
  }

  const isSaving = addMutation.isPending || editMutation.isPending;
  const canSave =
    !!form.name &&
    !!form.price &&
    !!form.stock &&
    formImages.length > 0 &&
    !isSaving &&
    !isProcessingImages;

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <p className="text-sm text-muted-foreground">
          {products.length} product{products.length !== 1 ? "s" : ""}
        </p>
        <Button
          data-ocid="products.add_button"
          size="sm"
          onClick={openAdd}
          className="gap-1.5"
        >
          <Plus className="w-4 h-4" /> Add Product
        </Button>
      </div>

      {isLoading ? (
        <div className="space-y-3" data-ocid="products.loading_state">
          {[1, 2, 3].map((i) => (
            <Skeleton key={i} className="h-14 w-full rounded-lg" />
          ))}
        </div>
      ) : products.length === 0 ? (
        <div
          data-ocid="products.empty_state"
          className="text-center py-16 text-muted-foreground"
        >
          <Package className="w-10 h-10 mx-auto mb-3 opacity-40" />
          <p className="font-medium">No products yet</p>
          <p className="text-xs mt-1">Click "Add Product" to get started</p>
        </div>
      ) : (
        <div className="overflow-x-auto rounded-xl border border-border">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-muted/50 border-b border-border">
                <th className="text-left px-4 py-3 font-semibold text-foreground">
                  Product
                </th>
                <th className="text-left px-4 py-3 font-semibold text-foreground hidden md:table-cell">
                  Category
                </th>
                <th className="text-right px-4 py-3 font-semibold text-foreground">
                  Price
                </th>
                <th className="text-right px-4 py-3 font-semibold text-foreground">
                  Stock
                </th>
                <th className="text-center px-4 py-3 font-semibold text-foreground">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {products.map((p, i) => (
                <tr
                  key={String(p.id)}
                  data-ocid={`products.item.${i + 1}`}
                  className="border-b border-border last:border-0 hover:bg-muted/30 transition-colors"
                >
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      {p.images[0] ? (
                        <img
                          src={p.images[0]}
                          alt={p.name}
                          className="w-10 h-10 object-cover rounded-lg bg-muted shrink-0"
                        />
                      ) : (
                        <div className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center shrink-0">
                          <ImageIcon className="w-4 h-4 text-muted-foreground" />
                        </div>
                      )}
                      <span className="font-medium text-foreground line-clamp-2 max-w-[200px]">
                        {p.name}
                      </span>
                    </div>
                  </td>
                  <td className="px-4 py-3 hidden md:table-cell">
                    <Badge variant="secondary" className="capitalize">
                      {p.category}
                    </Badge>
                  </td>
                  <td className="px-4 py-3 text-right font-mono font-semibold text-foreground">
                    ₹{p.price.toLocaleString("en-IN")}
                  </td>
                  <td className="px-4 py-3 text-right">
                    <span
                      className={
                        Number(p.stock) < 5
                          ? "text-destructive font-semibold"
                          : "text-foreground"
                      }
                    >
                      {String(p.stock)}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center justify-center gap-2">
                      <Button
                        data-ocid={`products.edit_button.${i + 1}`}
                        size="sm"
                        variant="outline"
                        className="h-7 px-2 gap-1"
                        onClick={() => openEdit(p)}
                      >
                        <Pencil className="w-3 h-3" /> Edit
                      </Button>
                      <Button
                        data-ocid={`products.delete_button.${i + 1}`}
                        size="sm"
                        variant="outline"
                        className="h-7 px-2 gap-1 text-destructive hover:bg-destructive/10 border-destructive/30"
                        onClick={() => setDeleteId(p.id)}
                      >
                        <Trash2 className="w-3 h-3" /> Delete
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Add/Edit Modal */}
      <Dialog open={modalOpen} onOpenChange={setModalOpen}>
        <DialogContent
          data-ocid="products.dialog"
          className="max-w-lg max-h-[90vh] overflow-y-auto"
        >
          <DialogHeader>
            <DialogTitle>
              {editingProduct ? "Edit Product" : "Add New Product"}
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-2">
            <div className="space-y-1.5">
              <Label>Product Name</Label>
              <Input
                data-ocid="products.name.input"
                value={form.name}
                onChange={(e) =>
                  setForm((f) => ({ ...f, name: e.target.value }))
                }
                placeholder="e.g. Samsung Galaxy S24"
              />
            </div>
            <div className="space-y-1.5">
              <Label>Description</Label>
              <Textarea
                data-ocid="products.description.textarea"
                value={form.description}
                onChange={(e) =>
                  setForm((f) => ({ ...f, description: e.target.value }))
                }
                placeholder="Product description…"
                rows={3}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <Label>Price (₹)</Label>
                <Input
                  data-ocid="products.price.input"
                  type="number"
                  min="0"
                  step="0.01"
                  value={form.price}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, price: e.target.value }))
                  }
                  placeholder="0.00"
                />
              </div>
              <div className="space-y-1.5">
                <Label>Stock</Label>
                <Input
                  data-ocid="products.stock.input"
                  type="number"
                  min="0"
                  value={form.stock}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, stock: e.target.value }))
                  }
                  placeholder="0"
                />
              </div>
            </div>
            <div className="space-y-1.5">
              <Label>Category</Label>
              <Select
                value={form.category}
                onValueChange={(v) => setForm((f) => ({ ...f, category: v }))}
              >
                <SelectTrigger data-ocid="products.category.select">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {CATEGORIES.map((c) => (
                    <SelectItem key={c.value} value={c.value}>
                      {c.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Image Upload — replaces textarea */}
            <div className="space-y-1.5">
              <Label>
                Product Images{" "}
                <span className="text-muted-foreground text-xs">
                  (Gallery ya Camera se)
                </span>
              </Label>
              <ImageUploadSection
                images={formImages}
                onAdd={handleAddImages}
                onRemove={handleRemoveImage}
                isProcessing={isProcessingImages}
                setIsProcessing={setIsProcessingImages}
              />
            </div>
          </div>
          <DialogFooter className="gap-2">
            <Button
              data-ocid="products.cancel_button"
              variant="outline"
              onClick={() => setModalOpen(false)}
            >
              Cancel
            </Button>
            <Button
              data-ocid="products.save_button"
              onClick={() => void handleSave()}
              disabled={!canSave}
            >
              {isSaving ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Saving…
                </>
              ) : editingProduct ? (
                "Save Changes"
              ) : (
                "Add Product"
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirm */}
      <AlertDialog
        open={!!deleteId}
        onOpenChange={(open) => !open && setDeleteId(null)}
      >
        <AlertDialogContent data-ocid="products.delete_dialog">
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Product?</AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently remove the product from your catalog. This
              action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel data-ocid="products.cancel_button">
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              data-ocid="products.confirm_button"
              onClick={() => void handleDelete()}
              className="bg-destructive hover:bg-destructive/90"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}

// ── Orders Tab ───────────────────────────────────────────────────────────────
function OrdersTab({ token }: { token: string }) {
  const { data: orders = [], isLoading } = useListOrders(token);
  const updateMutation = useUpdateOrderStatus();
  const [updatingId, setUpdatingId] = useState<bigint | null>(null);
  const [expandedId, setExpandedId] = useState<bigint | null>(null);

  async function handleStatusChange(order: Order, newStatus: string) {
    setUpdatingId(order.id);
    try {
      await updateMutation.mutateAsync({
        token,
        id: order.id,
        status: newStatus,
      });
      toast.success(`Order #${order.id} updated to ${newStatus}`);
    } catch {
      toast.error("Failed to update order status");
    } finally {
      setUpdatingId(null);
    }
  }

  function toggleExpand(id: bigint) {
    setExpandedId((prev) => (prev === id ? null : id));
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <p className="text-sm text-muted-foreground">
          {orders.length} order{orders.length !== 1 ? "s" : ""}
        </p>
      </div>

      {isLoading ? (
        <div className="space-y-3" data-ocid="orders.loading_state">
          {[1, 2, 3].map((i) => (
            <Skeleton key={i} className="h-14 w-full rounded-lg" />
          ))}
        </div>
      ) : orders.length === 0 ? (
        <div
          data-ocid="orders.empty_state"
          className="text-center py-16 text-muted-foreground"
        >
          <ShoppingBag className="w-10 h-10 mx-auto mb-3 opacity-40" />
          <p className="font-medium">No orders yet</p>
          <p className="text-xs mt-1">
            Orders will appear here once customers place them
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {orders.map((order, i) => (
            <div
              key={String(order.id)}
              data-ocid={`orders.item.${i + 1}`}
              className="border border-border rounded-xl overflow-hidden bg-card"
            >
              {/* Order Row */}
              <div className="flex flex-wrap items-center gap-3 px-4 py-3 hover:bg-muted/20 transition-colors">
                {/* ID */}
                <div className="w-20 shrink-0">
                  <p className="text-[10px] text-muted-foreground uppercase tracking-wide">
                    Order
                  </p>
                  <p className="font-mono font-bold text-foreground text-xs">
                    #{String(order.id).padStart(4, "0")}
                  </p>
                </div>

                {/* Customer */}
                <div className="flex-1 min-w-[140px]">
                  <div className="flex items-center gap-1.5">
                    <User className="w-3.5 h-3.5 text-muted-foreground shrink-0" />
                    <p className="text-sm font-semibold text-foreground truncate">
                      {order.customerName}
                    </p>
                  </div>
                  <div className="flex items-center gap-1.5 mt-0.5">
                    <Phone className="w-3.5 h-3.5 text-muted-foreground shrink-0" />
                    <p className="text-xs text-muted-foreground">
                      {order.customerPhone}
                    </p>
                  </div>
                </div>

                {/* Items + Total */}
                <div className="shrink-0 text-right hidden sm:block">
                  <p className="text-xs text-muted-foreground">
                    {order.items.reduce((s, it) => s + Number(it.quantity), 0)}{" "}
                    item(s)
                  </p>
                  <p className="text-sm font-bold text-foreground">
                    ₹{order.totalPrice.toLocaleString("en-IN")}
                  </p>
                </div>

                {/* Payment Method */}
                <div className="shrink-0 hidden md:block">
                  <Badge
                    variant="outline"
                    className="text-[10px] font-medium capitalize"
                  >
                    {order.paymentMethod}
                  </Badge>
                </div>

                {/* Status Badge */}
                <div className="shrink-0">{statusBadge(order.status)}</div>

                {/* Status Updater */}
                <div className="shrink-0">
                  <Select
                    value={order.status as string}
                    onValueChange={(v) => void handleStatusChange(order, v)}
                    disabled={updatingId === order.id}
                  >
                    <SelectTrigger
                      data-ocid={`orders.status_select.${i + 1}`}
                      className="h-7 text-xs w-32 gap-1"
                    >
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="pending">Pending</SelectItem>
                      <SelectItem value="confirmed">Confirmed</SelectItem>
                      <SelectItem value="shipped">Shipped</SelectItem>
                      <SelectItem value="delivered">Delivered</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Expand Toggle */}
                <button
                  type="button"
                  data-ocid={`orders.expand_button.${i + 1}`}
                  onClick={() => toggleExpand(order.id)}
                  className="p-1.5 rounded-md hover:bg-secondary transition-colors text-muted-foreground shrink-0"
                  aria-label="Toggle order details"
                >
                  {expandedId === order.id ? (
                    <ChevronUp className="w-4 h-4" />
                  ) : (
                    <ChevronDown className="w-4 h-4" />
                  )}
                </button>
              </div>

              {/* Expanded Details — Customer address + all info */}
              {expandedId === order.id && (
                <div className="border-t border-border bg-muted/20">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-0 divide-y sm:divide-y-0 sm:divide-x divide-border">
                    {/* Customer & Delivery Address */}
                    <div className="px-4 py-4">
                      <div className="flex items-center gap-1.5 mb-3">
                        <User className="w-4 h-4 text-primary shrink-0" />
                        <p className="text-xs font-bold text-foreground uppercase tracking-wide">
                          Customer Details
                        </p>
                      </div>
                      <div className="bg-card border border-border rounded-lg p-3 space-y-2">
                        <div className="flex items-center gap-2">
                          <User className="w-3.5 h-3.5 text-primary shrink-0" />
                          <p className="text-sm font-semibold text-foreground">
                            {order.customerName}
                          </p>
                        </div>
                        <div className="flex items-center gap-2">
                          <Phone className="w-3.5 h-3.5 text-primary shrink-0" />
                          <p className="text-sm text-foreground">
                            {order.customerPhone}
                          </p>
                        </div>
                        <div className="flex items-start gap-2">
                          <MapPin className="w-3.5 h-3.5 text-primary shrink-0 mt-0.5" />
                          <div>
                            <p className="text-sm font-medium text-foreground leading-snug">
                              {order.deliveryAddress}
                            </p>
                            <p className="text-xs text-muted-foreground mt-0.5">
                              {order.deliveryCity} — {order.deliveryPincode}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Items Ordered */}
                    <div className="px-4 py-4">
                      <div className="flex items-center gap-1.5 mb-3">
                        <Package className="w-4 h-4 text-primary shrink-0" />
                        <p className="text-xs font-bold text-foreground uppercase tracking-wide">
                          Items Ordered
                        </p>
                      </div>
                      <div className="bg-card border border-border rounded-lg p-3 space-y-2">
                        {order.items.map((item, idx) => (
                          <div
                            key={item.productId || `${item.productName}-${idx}`}
                            className="flex items-center justify-between gap-2 text-xs"
                            data-ocid={`orders.order_item.${i + 1}.${idx + 1}`}
                          >
                            <span className="text-foreground truncate flex-1 leading-snug">
                              {item.productName}{" "}
                              <span className="text-muted-foreground">
                                × {String(item.quantity)}
                              </span>
                            </span>
                            <span className="font-semibold text-foreground shrink-0">
                              ₹
                              {(
                                item.priceAtPurchase * Number(item.quantity)
                              ).toLocaleString("en-IN")}
                            </span>
                          </div>
                        ))}
                        <div className="flex items-center justify-between pt-2 border-t border-border mt-1">
                          <span className="text-xs text-muted-foreground">
                            Payment:{" "}
                            <span className="font-medium text-foreground capitalize">
                              {order.paymentMethod}
                            </span>
                          </span>
                          <span className="text-sm font-bold text-primary">
                            ₹{order.totalPrice.toLocaleString("en-IN")}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// ── Main Page ────────────────────────────────────────────────────────────────
export function AdminDashboardPage() {
  const navigate = useNavigate();
  const { isAuthenticated, token, logout } = useAdminStore();

  useEffect(() => {
    if (!isAuthenticated) {
      void navigate({ to: "/admin" });
    }
  }, [isAuthenticated, navigate]);

  function handleLogout() {
    logout();
    void navigate({ to: "/" });
  }

  if (!isAuthenticated || !token) return null;

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-card border-b border-border shadow-sm sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
              <Package className="w-4 h-4 text-primary-foreground" />
            </div>
            <div>
              <h1 className="font-display font-bold text-foreground text-lg leading-none">
                Admin Dashboard
              </h1>
              <p className="text-xs text-muted-foreground leading-none mt-0.5">
                Uday Shop
              </p>
            </div>
          </div>
          <Button
            data-ocid="admin.logout_button"
            variant="outline"
            size="sm"
            onClick={handleLogout}
            className="gap-2"
          >
            <LogOut className="w-4 h-4" />
            <span className="hidden sm:inline">Logout</span>
          </Button>
        </div>
      </header>

      {/* Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        <Tabs defaultValue="products" data-ocid="admin.tabs">
          <TabsList className="mb-6 h-10">
            <TabsTrigger
              data-ocid="admin.products.tab"
              value="products"
              className="gap-2 px-5"
            >
              <Package className="w-4 h-4" />
              Products
            </TabsTrigger>
            <TabsTrigger
              data-ocid="admin.orders.tab"
              value="orders"
              className="gap-2 px-5"
            >
              <ShoppingBag className="w-4 h-4" />
              Orders
            </TabsTrigger>
          </TabsList>

          <TabsContent value="products">
            <Card>
              <CardContent className="p-6">
                <ProductsTab token={token} />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="orders">
            <Card>
              <CardContent className="p-6">
                <OrdersTab token={token} />
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}
