import { useState } from 'react'
import { Navigate } from 'react-router-dom'
import { Plus, Edit2, Trash2, X, Package } from 'lucide-react'
import { useAuth } from '../context/AuthContext'
import { useProducts } from '../context/ProductContext'
import { Product } from '../types'
import { formatPrice, cn } from '../lib/utils'
import { brands, categories } from '../data/products'

type ModalMode = 'create' | 'edit' | null

export default function Admin() {
  const { isAdmin } = useAuth()
  const { products, addProduct, updateProduct, deleteProduct } = useProducts()
  const [modalMode, setModalMode] = useState<ModalMode>(null)
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null)

  // Form state
  const [formData, setFormData] = useState({
    nombre: '',
    precio: '',
    marca: brands[0],
    imagen_url: '',
    descripcion: '',
    stock: '',
    categoria: categories[0],
  })

  if (!isAdmin) {
    return <Navigate to="/" replace />
  }

  const openCreateModal = () => {
    setFormData({
      nombre: '',
      precio: '',
      marca: brands[0],
      imagen_url: '',
      descripcion: '',
      stock: '',
      categoria: categories[0],
    })
    setSelectedProduct(null)
    setModalMode('create')
  }

  const openEditModal = (product: Product) => {
    setFormData({
      nombre: product.nombre,
      precio: product.precio.toString(),
      marca: product.marca,
      imagen_url: product.imagen_url,
      descripcion: product.descripcion,
      stock: product.stock.toString(),
      categoria: product.categoria || categories[0],
    })
    setSelectedProduct(product)
    setModalMode('edit')
  }

  const closeModal = () => {
    setModalMode(null)
    setSelectedProduct(null)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    const productData = {
      nombre: formData.nombre,
      precio: parseFloat(formData.precio),
      marca: formData.marca,
      imagen_url: formData.imagen_url,
      descripcion: formData.descripcion,
      stock: parseInt(formData.stock),
      categoria: formData.categoria,
    }

    if (modalMode === 'create') {
      addProduct(productData)
    } else if (modalMode === 'edit' && selectedProduct) {
      updateProduct({ ...productData, id: selectedProduct.id })
    }

    closeModal()
  }

  const handleDelete = (id: string) => {
    deleteProduct(id)
    setDeleteConfirm(null)
  }

  const totalStock = products.reduce((sum, p) => sum + p.stock, 0)
  const totalValue = products.reduce((sum, p) => sum + p.precio * p.stock, 0)

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Panel de Administración</h1>
          <p className="mt-2 text-muted-foreground">Gestiona el inventario de productos</p>
        </div>
        <button
          onClick={openCreateModal}
          className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
        >
          <Plus className="h-5 w-5" />
          Nuevo Producto
        </button>
      </div>

      {/* Stats */}
      <div className="mt-8 grid gap-4 sm:grid-cols-3">
        <div className="rounded-2xl border border-border bg-card p-6">
          <p className="text-sm text-muted-foreground">Total Productos</p>
          <p className="mt-2 text-3xl font-bold">{products.length}</p>
        </div>
        <div className="rounded-2xl border border-border bg-card p-6">
          <p className="text-sm text-muted-foreground">Stock Total</p>
          <p className="mt-2 text-3xl font-bold">{totalStock} unidades</p>
        </div>
        <div className="rounded-2xl border border-border bg-card p-6">
          <p className="text-sm text-muted-foreground">Valor Inventario</p>
          <p className="mt-2 text-3xl font-bold">{formatPrice(totalValue)}</p>
        </div>
      </div>

      {/* Products Table */}
      <div className="mt-8 overflow-hidden rounded-2xl border border-border bg-card">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="border-b border-border bg-muted/50">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-semibold">Producto</th>
                <th className="px-6 py-4 text-left text-sm font-semibold">Marca</th>
                <th className="px-6 py-4 text-left text-sm font-semibold">Precio</th>
                <th className="px-6 py-4 text-left text-sm font-semibold">Stock</th>
                <th className="px-6 py-4 text-right text-sm font-semibold">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {products.map((product) => (
                <tr key={product.id} className="transition-colors hover:bg-muted/30">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-4">
                      <div className="h-12 w-12 overflow-hidden rounded-lg bg-muted">
                        <img
                          src={product.imagen_url}
                          alt={product.nombre}
                          className="h-full w-full object-cover"
                        />
                      </div>
                      <div>
                        <p className="font-medium">{product.nombre}</p>
                        <p className="text-sm text-muted-foreground">{product.categoria}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm">{product.marca}</td>
                  <td className="px-6 py-4 font-medium">{formatPrice(product.precio)}</td>
                  <td className="px-6 py-4">
                    <span
                      className={cn(
                        'inline-flex items-center rounded-full px-3 py-1 text-xs font-medium',
                        product.stock > 10
                          ? 'bg-green-100 text-green-700'
                          : product.stock > 0
                            ? 'bg-orange-100 text-orange-700'
                            : 'bg-red-100 text-red-700'
                      )}
                    >
                      {product.stock} unidades
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => openEditModal(product)}
                        className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                      >
                        <Edit2 className="h-4 w-4" />
                      </button>
                      {deleteConfirm === product.id ? (
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => handleDelete(product.id)}
                            className="rounded-lg bg-destructive px-3 py-1 text-xs font-medium text-destructive-foreground"
                          >
                            Confirmar
                          </button>
                          <button
                            onClick={() => setDeleteConfirm(null)}
                            className="rounded-lg bg-muted px-3 py-1 text-xs font-medium"
                          >
                            Cancelar
                          </button>
                        </div>
                      ) : (
                        <button
                          onClick={() => setDeleteConfirm(product.id)}
                          className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-destructive/10 hover:text-destructive"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {products.length === 0 && (
          <div className="flex flex-col items-center justify-center py-20">
            <Package className="h-12 w-12 text-muted-foreground" />
            <p className="mt-4 text-lg font-medium">No hay productos</p>
            <p className="mt-2 text-muted-foreground">Comienza agregando tu primer producto</p>
          </div>
        )}
      </div>

      {/* Modal */}
      {modalMode && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="w-full max-w-lg rounded-2xl bg-background p-6 shadow-xl">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold">
                {modalMode === 'create' ? 'Nuevo Producto' : 'Editar Producto'}
              </h2>
              <button
                onClick={closeModal}
                className="flex h-10 w-10 items-center justify-center rounded-full transition-colors hover:bg-muted"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="mt-6 space-y-4">
              <div>
                <label className="text-sm font-medium">Nombre</label>
                <input
                  type="text"
                  value={formData.nombre}
                  onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}
                  className="mt-1 w-full rounded-lg border border-border bg-background px-4 py-3 text-sm focus:border-primary focus:outline-none"
                  required
                />
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="text-sm font-medium">Precio (MXN)</label>
                  <input
                    type="number"
                    value={formData.precio}
                    onChange={(e) => setFormData({ ...formData, precio: e.target.value })}
                    className="mt-1 w-full rounded-lg border border-border bg-background px-4 py-3 text-sm focus:border-primary focus:outline-none"
                    min="0"
                    step="0.01"
                    required
                  />
                </div>
                <div>
                  <label className="text-sm font-medium">Stock</label>
                  <input
                    type="number"
                    value={formData.stock}
                    onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
                    className="mt-1 w-full rounded-lg border border-border bg-background px-4 py-3 text-sm focus:border-primary focus:outline-none"
                    min="0"
                    required
                  />
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="text-sm font-medium">Marca</label>
                  <select
                    value={formData.marca}
                    onChange={(e) => setFormData({ ...formData, marca: e.target.value })}
                    className="mt-1 w-full rounded-lg border border-border bg-background px-4 py-3 text-sm focus:border-primary focus:outline-none"
                  >
                    {brands.map((brand) => (
                      <option key={brand} value={brand}>
                        {brand}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="text-sm font-medium">Categoría</label>
                  <select
                    value={formData.categoria}
                    onChange={(e) => setFormData({ ...formData, categoria: e.target.value })}
                    className="mt-1 w-full rounded-lg border border-border bg-background px-4 py-3 text-sm focus:border-primary focus:outline-none"
                  >
                    {categories.map((cat) => (
                      <option key={cat} value={cat}>
                        {cat}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="text-sm font-medium">URL de Imagen</label>
                <input
                  type="url"
                  value={formData.imagen_url}
                  onChange={(e) => setFormData({ ...formData, imagen_url: e.target.value })}
                  className="mt-1 w-full rounded-lg border border-border bg-background px-4 py-3 text-sm focus:border-primary focus:outline-none"
                  placeholder="https://..."
                  required
                />
              </div>

              <div>
                <label className="text-sm font-medium">Descripción</label>
                <textarea
                  value={formData.descripcion}
                  onChange={(e) => setFormData({ ...formData, descripcion: e.target.value })}
                  className="mt-1 w-full rounded-lg border border-border bg-background px-4 py-3 text-sm focus:border-primary focus:outline-none"
                  rows={3}
                  required
                />
              </div>

              <div className="flex gap-4 pt-4">
                <button
                  type="button"
                  onClick={closeModal}
                  className="flex-1 rounded-full border border-border py-3 font-medium transition-colors hover:bg-muted"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="flex-1 rounded-full bg-primary py-3 font-medium text-primary-foreground transition-colors hover:bg-primary/90"
                >
                  {modalMode === 'create' ? 'Crear Producto' : 'Guardar Cambios'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
