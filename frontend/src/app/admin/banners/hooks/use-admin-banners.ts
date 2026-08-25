import { useState, useEffect, useCallback } from "react";
import {
  getAdminBanners,
  createBanner,
  updateBanner,
  deleteBanner,
  uploadBannerImage,
  BannerData,
} from "@/services/banner.service";

export function useAdminBanners() {
  const [banners, setBanners] = useState<BannerData[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingBanner, setEditingBanner] = useState<BannerData | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const fetchBanners = useCallback(async () => {
    try {
      setLoading(true);
      const data = await getAdminBanners();
      setBanners(data);
    } catch (err) {
      console.error("Failed to load admin banners:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchBanners();
  }, [fetchBanners]);

  const filteredBanners = banners.filter((b) => {
    const term = searchTerm.toLowerCase();
    return (
      (b.title && b.title.toLowerCase().includes(term)) ||
      (b.subtitle && b.subtitle.toLowerCase().includes(term)) ||
      (b.linkUrl && b.linkUrl.toLowerCase().includes(term))
    );
  });

  const handleOpenCreateModal = () => {
    setEditingBanner(null);
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (banner: BannerData) => {
    setEditingBanner(banner);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingBanner(null);
  };

  const handleSaveBanner = async (
    data: Partial<BannerData>,
    file?: File | null,
  ) => {
    try {
      setSubmitting(true);
      let imageUrl = data.imageUrl;
      if (file) {
        imageUrl = await uploadBannerImage(file);
      }

      if (!imageUrl) {
        throw new Error("Image is required");
      }

      const payload = {
        ...data,
        imageUrl,
      };

      if (editingBanner?.id) {
        await updateBanner(editingBanner.id, payload);
      } else {
        await createBanner(payload);
      }

      await fetchBanners();
      handleCloseModal();
    } catch (err: any) {
      alert(err.message || "Failed to save banner");
    } finally {
      setSubmitting(false);
    }
  };

  const handleToggleStatus = async (banner: BannerData) => {
    if (!banner.id) return;
    try {
      await updateBanner(banner.id, { isActive: !banner.isActive });
      await fetchBanners();
    } catch (err) {
      console.error("Failed to toggle status:", err);
    }
  };

  const handleDeleteBanner = async (id: string) => {
    if (!confirm("Are you sure you want to delete this banner?")) return;
    try {
      await deleteBanner(id);
      await fetchBanners();
    } catch (err) {
      console.error("Failed to delete banner:", err);
    }
  };

  return {
    banners: filteredBanners,
    loading,
    searchTerm,
    setSearchTerm,
    isModalOpen,
    editingBanner,
    submitting,
    handleOpenCreateModal,
    handleOpenEditModal,
    handleCloseModal,
    handleSaveBanner,
    handleToggleStatus,
    handleDeleteBanner,
  };
}
