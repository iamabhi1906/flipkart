"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Box, Typography, Alert, CircularProgress } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import InventoryIcon from "@mui/icons-material/Inventory";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import WarningIcon from "@mui/icons-material/Warning";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

import PrimarySearchAppBar from "@/components/appbar";
import CategoryBar from "@/components/category";
import { useAppDispatch, useAppSelector } from "@/store";
import { getUserThunk } from "@/features/users/user.action";
import {
  getMyVendorProducts,
  createProduct,
  updateProduct,
  deleteProduct,
  getCategories,
  ProductData,
} from "@/services/product.service";
import styles from "./vendor.module.css";

const INITIAL_PRODUCT_FORM: ProductData & { editingId?: string } = {
  name: "",
  categoryId: "",
  description: "",
  sku: "",
  price: 0,
  compareAtPrice: 0,
  stockQuantity: 10,
  status: "active",
  imageUrls: [""],
};

export default function VendorProductsPage() {
  const dispatch = useAppDispatch();
  const router = useRouter();

  const userRaw = useAppSelector((state: any) => state.users?.user);
  const user = userRaw?.data || userRaw;

  const [products, setProducts] = useState<ProductData[]>([]);
  const [categories, setCategories] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [showForm, setShowForm] = useState(false);

  const [feedback, setFeedback] = useState<{
    type: "success" | "error";
    msg: string;
  } | null>(null);

  const [formData, setFormData] = useState<
    ProductData & { editingId?: string }
  >(INITIAL_PRODUCT_FORM);

  useEffect(() => {
    dispatch(getUserThunk());
    loadCategories();
    loadVendorProducts();
  }, [dispatch]);

  const loadCategories = async () => {
    try {
      const data = await getCategories();
      const catList = Array.isArray(data) ? data : data?.items || [];
      setCategories(catList);
      if (catList.length > 0 && !formData.categoryId) {
        setFormData((prev) => ({ ...prev, categoryId: catList[0].id }));
      }
    } catch (err) {
      // Handle category load error quietly
    }
  };

  const loadVendorProducts = async () => {
    setLoading(true);
    try {
      const data = await getMyVendorProducts();
      const list = Array.isArray(data) ? data : data?.items || [];
      setProducts(list);
    } catch (err: any) {
      // If user is not yet vendor or no products
    } finally {
      setLoading(false);
    }
  };

  const handleOpenAddForm = () => {
    setFormData({
      ...INITIAL_PRODUCT_FORM,
      categoryId: categories.length > 0 ? categories[0].id : "",
    });
    setShowForm(true);
  };

  const handleEditProduct = (prod: ProductData) => {
    const existingImages =
      prod.images && prod.images.length > 0
        ? prod.images.map((img: any) => img.imageUrl || img)
        : prod.imageUrls || [""];

    setFormData({
      editingId: prod.id,
      name: prod.name,
      categoryId: prod.categoryId || (prod.category?.id ?? ""),
      description: prod.description || "",
      sku: prod.sku || "",
      price: Number(prod.price) || 0,
      compareAtPrice: prod.compareAtPrice ? Number(prod.compareAtPrice) : 0,
      stockQuantity: prod.stockQuantity ?? 10,
      status: prod.status || "active",
      imageUrls: existingImages.length > 0 ? existingImages : [""],
    });
    setShowForm(true);
  };

  const handleCancelForm = () => {
    setShowForm(false);
    setFormData(INITIAL_PRODUCT_FORM);
  };

  const handleAddImageUrl = () => {
    setFormData((prev) => ({
      ...prev,
      imageUrls: [...(prev.imageUrls || []), ""],
    }));
  };

  const handleImageUrlChange = (index: number, value: string) => {
    const updated = [...(formData.imageUrls || [])];
    updated[index] = value;
    setFormData((prev) => ({ ...prev, imageUrls: updated }));
  };

  const handleRemoveImageUrl = (index: number) => {
    const updated = (formData.imageUrls || []).filter((_, i) => i !== index);
    setFormData((prev) => ({
      ...prev,
      imageUrls: updated.length > 0 ? updated : [""],
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.categoryId || formData.price <= 0) {
      setFeedback({
        type: "error",
        msg: "Please fill in Product Name, Category, and a valid Price.",
      });
      return;
    }

    setSubmitting(true);
    setFeedback(null);

    // Filter out empty image URLs
    const filteredImages = (formData.imageUrls || []).filter(
      (url) => url.trim().length > 0,
    );

    const payload: ProductData = {
      name: formData.name,
      categoryId: formData.categoryId,
      description: formData.description,
      sku: formData.sku || undefined,
      price: Number(formData.price),
      compareAtPrice: formData.compareAtPrice
        ? Number(formData.compareAtPrice)
        : undefined,
      stockQuantity: Number(formData.stockQuantity || 0),
      status: formData.status || "active",
      imageUrls: filteredImages.length > 0 ? filteredImages : undefined,
    };

    try {
      if (formData.editingId) {
        await updateProduct(formData.editingId, payload);
        setFeedback({
          type: "success",
          msg: "Product updated successfully!",
        });
      } else {
        await createProduct(payload);
        setFeedback({
          type: "success",
          msg: "New product added to inventory!",
        });
      }

      setShowForm(false);
      setFormData(INITIAL_PRODUCT_FORM);
      loadVendorProducts();
    } catch (err: any) {
      const errorMsg =
        err.response?.data?.message ||
        err.message ||
        "Failed to save product. Ensure vendor role is registered.";
      setFeedback({
        type: "error",
        msg: typeof errorMsg === "string" ? errorMsg : JSON.stringify(errorMsg),
      });
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this product?")) return;
    setFeedback(null);
    try {
      await deleteProduct(id);
      setFeedback({
        type: "success",
        msg: "Product deleted successfully!",
      });
      loadVendorProducts();
    } catch (err: any) {
      setFeedback({
        type: "error",
        msg: err.response?.data?.message || "Failed to delete product",
      });
    }
  };

  // Stats calculation
  const totalProducts = products.length;
  const totalStock = products.reduce(
    (sum, p) => sum + Number(p.stockQuantity || 0),
    0,
  );
  const activeProducts = products.filter((p) => p.status === "active").length;
  const lowStockCount = products.filter(
    (p) => Number(p.stockQuantity || 0) <= 5,
  ).length;

  return (
    <Box className={styles.container}>
      <PrimarySearchAppBar />
      <CategoryBar props={{ page: 1, limit: 9 }} />

      <Box className={styles.mainWrapper}>
        {/* Header Title Row */}
        <Box className={styles.headerRow}>
          <Box>
            <Typography className={styles.headerTitle}>
              Seller Product Hub
            </Typography>
            <Typography className={styles.headerSub}>
              Add, manage, and track inventory for your Flipkart storefront catalog
            </Typography>
          </Box>
          <button onClick={handleOpenAddForm} className={styles.addProductBtn}>
            <AddIcon /> ADD NEW PRODUCT
          </button>
        </Box>

        {/* Stats Grid */}
        <Box className={styles.statsGrid}>
          <Box className={styles.statCard}>
            <Box className={styles.statIconBox} sx={{ backgroundColor: "#eff6ff", color: "#2563eb" }}>
              <InventoryIcon />
            </Box>
            <Box className={styles.statInfo}>
              <Typography className={styles.statValue}>{totalProducts}</Typography>
              <Typography className={styles.statLabel}>Total Products</Typography>
            </Box>
          </Box>

          <Box className={styles.statCard}>
            <Box className={styles.statIconBox} sx={{ backgroundColor: "#f0fdf4", color: "#16a34a" }}>
              <CheckCircleIcon />
            </Box>
            <Box className={styles.statInfo}>
              <Typography className={styles.statValue}>{activeProducts}</Typography>
              <Typography className={styles.statLabel}>Active Listings</Typography>
            </Box>
          </Box>

          <Box className={styles.statCard}>
            <Box className={styles.statIconBox} sx={{ backgroundColor: "#faf5ff", color: "#9333ea" }}>
              <InventoryIcon />
            </Box>
            <Box className={styles.statInfo}>
              <Typography className={styles.statValue}>{totalStock}</Typography>
              <Typography className={styles.statLabel}>Total Stock Items</Typography>
            </Box>
          </Box>

          <Box className={styles.statCard}>
            <Box className={styles.statIconBox} sx={{ backgroundColor: "#fef2f2", color: "#dc2626" }}>
              <WarningIcon />
            </Box>
            <Box className={styles.statInfo}>
              <Typography className={styles.statValue}>{lowStockCount}</Typography>
              <Typography className={styles.statLabel}>Low Stock Items</Typography>
            </Box>
          </Box>
        </Box>

        {/* Main Content Card */}
        <Box className={styles.contentCard}>
          {feedback && (
            <Alert
              severity={feedback.type}
              sx={{ mb: 3 }}
              onClose={() => setFeedback(null)}
            >
              {feedback.msg}
            </Alert>
          )}

          {/* Add / Edit Product Form */}
          {showForm && (
            <Box className={styles.formCard}>
              <Typography className={styles.formTitle}>
                {formData.editingId ? "EDIT PRODUCT" : "ADD NEW PRODUCT"}
              </Typography>

              <form onSubmit={handleSubmit}>
                <Box className={styles.formRow}>
                  <Box className={styles.formGroup} style={{ flex: 2 }}>
                    <label className={styles.formLabel}>Product Name *</label>
                    <input
                      type="text"
                      required
                      className={styles.formInput}
                      placeholder="e.g. Apple iPhone 15 Pro (128GB, Natural Titanium)"
                      value={formData.name}
                      onChange={(e) =>
                        setFormData({ ...formData, name: e.target.value })
                      }
                    />
                  </Box>

                  <Box className={styles.formGroup} style={{ flex: 1 }}>
                    <label className={styles.formLabel}>Category *</label>
                    <select
                      required
                      className={styles.formSelect}
                      value={formData.categoryId}
                      onChange={(e) =>
                        setFormData({ ...formData, categoryId: e.target.value })
                      }
                    >
                      <option value="">Select Category</option>
                      {categories.map((cat: any) => (
                        <option key={cat.id} value={cat.id}>
                          {cat.name}
                        </option>
                      ))}
                    </select>
                  </Box>
                </Box>

                <Box className={styles.formRow}>
                  <Box className={styles.formGroup}>
                    <label className={styles.formLabel}>Selling Price (₹) *</label>
                    <input
                      type="number"
                      required
                      min="1"
                      className={styles.formInput}
                      placeholder="e.g. 12999"
                      value={formData.price || ""}
                      onChange={(e) =>
                        setFormData({ ...formData, price: Number(e.target.value) })
                      }
                    />
                  </Box>

                  <Box className={styles.formGroup}>
                    <label className={styles.formLabel}>Original / MRP Price (₹)</label>
                    <input
                      type="number"
                      min="0"
                      className={styles.formInput}
                      placeholder="e.g. 15999"
                      value={formData.compareAtPrice || ""}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          compareAtPrice: Number(e.target.value),
                        })
                      }
                    />
                  </Box>

                  <Box className={styles.formGroup}>
                    <label className={styles.formLabel}>Stock Quantity *</label>
                    <input
                      type="number"
                      required
                      min="0"
                      className={styles.formInput}
                      placeholder="10"
                      value={formData.stockQuantity}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          stockQuantity: Number(e.target.value),
                        })
                      }
                    />
                  </Box>

                  <Box className={styles.formGroup}>
                    <label className={styles.formLabel}>SKU (Optional)</label>
                    <input
                      type="text"
                      className={styles.formInput}
                      placeholder="Auto-generated if empty"
                      value={formData.sku}
                      onChange={(e) =>
                        setFormData({ ...formData, sku: e.target.value })
                      }
                    />
                  </Box>
                </Box>

                <Box className={styles.formRow}>
                  <Box className={styles.formGroup}>
                    <label className={styles.formLabel}>Product Description</label>
                    <textarea
                      className={styles.formTextarea}
                      placeholder="Provide detailed specifications, features, and description..."
                      value={formData.description}
                      onChange={(e) =>
                        setFormData({ ...formData, description: e.target.value })
                      }
                    />
                  </Box>
                </Box>

                {/* Product Image URLs */}
                <Box sx={{ mb: 2 }}>
                  <label className={styles.formLabel}>Product Image URLs</label>
                  {(formData.imageUrls || [""]).map((url, idx) => (
                    <Box key={idx} className={styles.imageUrlRow}>
                      <input
                        type="url"
                        className={styles.formInput}
                        placeholder="https://images.unsplash.com/... or image link"
                        value={url}
                        onChange={(e) => handleImageUrlChange(idx, e.target.value)}
                      />
                      {(formData.imageUrls || []).length > 1 && (
                        <button
                          type="button"
                          onClick={() => handleRemoveImageUrl(idx)}
                          className={styles.deleteActionBtn}
                        >
                          Remove
                        </button>
                      )}
                    </Box>
                  ))}
                  <button
                    type="button"
                    onClick={handleAddImageUrl}
                    className={styles.addImageUrlBtn}
                  >
                    + Add Another Image URL
                  </button>
                </Box>

                <Box className={styles.formActions}>
                  <button
                    type="submit"
                    disabled={submitting}
                    className={styles.saveBtn}
                  >
                    {submitting
                      ? "SAVING..."
                      : formData.editingId
                      ? "UPDATE PRODUCT"
                      : "SAVE PRODUCT"}
                  </button>
                  <button
                    type="button"
                    onClick={handleCancelForm}
                    className={styles.cancelBtn}
                  >
                    CANCEL
                  </button>
                </Box>
              </form>
            </Box>
          )}

          {/* Product List Table */}
          {loading ? (
            <Box sx={{ display: "flex", justifyContent: "center", py: 6 }}>
              <CircularProgress color="primary" />
            </Box>
          ) : products.length === 0 ? (
            <Box className={styles.emptyState}>
              <InventoryIcon sx={{ fontSize: 64, color: "#cbd5e1", mb: 2 }} />
              <Typography className={styles.emptyTitle}>
                No Products Found in Inventory
              </Typography>
              <Typography className={styles.emptySub}>
                Start selling on Flipkart by adding your first product listing
              </Typography>
              <button onClick={handleOpenAddForm} className={styles.saveBtn}>
                + ADD YOUR FIRST PRODUCT
              </button>
            </Box>
          ) : (
            <Box className={styles.tableWrapper}>
              <table className={styles.productsTable}>
                <thead>
                  <tr>
                    <th>Product</th>
                    <th>Category</th>
                    <th>Price</th>
                    <th>Stock</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {products.map((prod) => {
                    const primaryImg =
                      prod.images && prod.images.length > 0
                        ? prod.images[0].imageUrl || prod.images[0]
                        : prod.imageUrls && prod.imageUrls.length > 0
                        ? prod.imageUrls[0]
                        : "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=200";

                    const categoryName =
                      prod.category?.name || "General";
                    const stock = Number(prod.stockQuantity || 0);

                    return (
                      <tr key={prod.id}>
                        <td>
                          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                            <Image
                              src={primaryImg}
                              alt={prod.name}
                              width={50}
                              height={50}
                              className={styles.productThumb}
                              unoptimized
                            />
                            <Box>
                              <Typography className={styles.productNameText}>
                                {prod.name}
                              </Typography>
                              <Typography className={styles.productSkuText}>
                                SKU: {prod.sku || "N/A"}
                              </Typography>
                            </Box>
                          </Box>
                        </td>

                        <td>{categoryName}</td>

                        <td>
                          <span className={styles.priceText}>
                            ₹{Number(prod.price).toLocaleString("en-IN")}
                          </span>
                          {prod.compareAtPrice &&
                            Number(prod.compareAtPrice) > Number(prod.price) && (
                              <span className={styles.comparePriceText}>
                                ₹
                                {Number(prod.compareAtPrice).toLocaleString(
                                  "en-IN",
                                )}
                              </span>
                            )}
                        </td>

                        <td>
                          <span
                            className={`${styles.stockBadge} ${
                              stock === 0
                                ? styles.outOfStock
                                : stock <= 5
                                ? styles.lowStock
                                : styles.inStock
                            }`}
                          >
                            {stock === 0
                              ? "Out of Stock"
                              : stock <= 5
                              ? `Low (${stock})`
                              : `${stock} Units`}
                          </span>
                        </td>

                        <td>
                          <span
                            style={{
                              textTransform: "uppercase",
                              fontSize: 12,
                              fontWeight: 700,
                              color:
                                prod.status === "active" ? "#16a34a" : "#64748b",
                            }}
                          >
                            {prod.status || "ACTIVE"}
                          </span>
                        </td>

                        <td>
                          <Box className={styles.actionBtnGroup}>
                            <button
                              onClick={() => handleEditProduct(prod)}
                              className={styles.editActionBtn}
                            >
                              Edit
                            </button>
                            <button
                              onClick={() => prod.id && handleDelete(prod.id)}
                              className={styles.deleteActionBtn}
                            >
                              Delete
                            </button>
                          </Box>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </Box>
          )}
        </Box>
      </Box>
    </Box>
  );
}
