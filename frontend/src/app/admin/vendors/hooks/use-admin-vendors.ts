"use client";

import { useState, useEffect } from "react";
import {
  getAllVendors,
  updateVendorStatus,
  VendorData,
} from "@/services/vendor.service";

export function useAdminVendors() {
  const [vendors, setVendors] = useState<VendorData[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedVendor, setSelectedVendor] = useState<VendorData | null>(null);

  const fetchVendors = async () => {
    setLoading(true);
    try {
      const data = await getAllVendors();
      setVendors(Array.isArray(data) ? data : []);
    } catch (err) {
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchVendors();
  }, []);

  const handleStatusChange = async (
    vendorId: string,
    newStatus: "active" | "disabled" | "suspended",
  ) => {
    try {
      await updateVendorStatus(vendorId, newStatus);
      await fetchVendors();
    } catch (err) {
      alert("Failed to update vendor status");
    }
  };

  const filteredVendors = vendors.filter((v) => {
    const term = searchTerm.toLowerCase();
    return (
      v.businessName.toLowerCase().includes(term) ||
      v.user?.email.toLowerCase().includes(term) ||
      (v.taxNumber && v.taxNumber.toLowerCase().includes(term))
    );
  });

  return {
    vendors: filteredVendors,
    loading,
    searchTerm,
    setSearchTerm,
    selectedVendor,
    setSelectedVendor,
    handleStatusChange,
  };
}
