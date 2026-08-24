"use client";

import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import Button from "@mui/material/Button";
import Badge from "@mui/material/Badge";
import AccountCircle from "@mui/icons-material/AccountCircle";
import StorefrontIcon from "@mui/icons-material/Storefront";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { useAppDispatch, useAppSelector } from "@/store";
import { getUserThunk, logoutThunk } from "@/features/users/user.action";
import { useRouter } from "next/navigation";
import { useCart } from "@/context/cart-context";
import CartDrawer from "@/components/cart/cart-drawer";

export default function PrimarySearchAppBar() {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { cart, openDrawer } = useCart();
  const userRaw = useAppSelector((state: any) => state.users?.user);
  const user = userRaw?.data || userRaw;

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const isMenuOpen = Boolean(anchorEl);

  React.useEffect(() => {
    dispatch(getUserThunk());
  }, [dispatch]);

  const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleNavigate = (path: string) => {
    router.push(path);
    handleMenuClose();
  };

  const handleLogout = async () => {
    await dispatch(logoutThunk());
    handleMenuClose();
    router.push("/login");
  };

  const menuId = "primary-search-account-menu";
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      id={menuId}
      keepMounted
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={() => handleNavigate("/")}>Home</MenuItem>
      <MenuItem onClick={() => handleNavigate("/products")}>Browse Catalog</MenuItem>
      <MenuItem onClick={() => handleNavigate("/account")}>My Account</MenuItem>
      {user && user.role === "admin" ? (
        <MenuItem onClick={() => handleNavigate("/admin/vendors")}>Admin Panel</MenuItem>
      ) : user && user.role === "vendor" ? (
        <MenuItem onClick={() => handleNavigate("/vendor")}>Seller Hub</MenuItem>
      ) : (
        <MenuItem onClick={() => handleNavigate("/become-seller")}>Become a Seller</MenuItem>
      )}
      <MenuItem onClick={handleLogout}>Logout</MenuItem>
    </Menu>
  );

  return (
    <Box style={{ display: "flex", flexDirection: "column" }}>
      <AppBar position="fixed" style={{ backgroundColor: "#2874F0", height: "56px" }}>
        <Toolbar style={{ maxWidth: "1248px", margin: "0 auto", width: "100%", height: "56px" }}>
          <Typography
            variant="h6"
            noWrap
            style={{ cursor: "pointer", flexGrow: 1, fontWeight: 700 }}
            onClick={() => router.push("/")}
          >
            Flipkart
          </Typography>

          <Button
            onClick={() =>
              user?.role === "admin"
                ? router.push("/admin/vendors")
                : user?.role === "vendor"
                ? router.push("/vendor")
                : router.push("/become-seller")
            }
            startIcon={<StorefrontIcon />}
            style={{
              color: "#ffffff",
              textTransform: "none",
              fontWeight: 600,
              marginRight: 16,
              backgroundColor: "rgba(255, 255, 255, 0.12)",
            }}
          >
            {user?.role === "admin"
              ? "Admin Panel"
              : user?.role === "vendor"
              ? "Seller Hub"
              : "Become a Seller"}
          </Button>

          <IconButton
            size="large"
            aria-label="shopping cart"
            onClick={openDrawer}
            style={{ color: "#ffffff", marginRight: 8 }}
          >
            <Badge badgeContent={cart?.totalItems || 0} color="error">
              <ShoppingCartIcon />
            </Badge>
          </IconButton>

          <Box style={{ display: "flex", alignItems: "center" }}>
            {user ? (
              <>
                <Typography
                  variant="body2"
                  style={{ marginRight: 8, cursor: "pointer" }}
                  onClick={handleProfileMenuOpen}
                >
                  {user.email || user.username}
                </Typography>
                <IconButton
                  size="large"
                  onClick={handleProfileMenuOpen}
                  style={{ color: "#ffffff" }}
                >
                  <AccountCircle />
                </IconButton>
              </>
            ) : (
              <Button color="inherit" onClick={() => router.push("/login")}>
                Login / Sign Up
              </Button>
            )}
          </Box>
        </Toolbar>
      </AppBar>
      {renderMenu}
      <CartDrawer />
    </Box>
  );
}
