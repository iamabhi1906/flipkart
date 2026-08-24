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
import AccountCircle from "@mui/icons-material/AccountCircle";
import StorefrontIcon from "@mui/icons-material/Storefront";
import { useAppDispatch, useAppSelector } from "@/store";
import { getUserThunk, logoutThunk } from "@/features/users/user.action";
import { useRouter } from "next/navigation";

export default function PrimarySearchAppBar() {
  const dispatch = useAppDispatch();
  const router = useRouter();
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
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={() => handleNavigate("/")}>Home</MenuItem>
      <MenuItem onClick={() => handleNavigate("/account")}>My Account</MenuItem>
      {user && user.role === "admin" ? (
        <MenuItem onClick={() => handleNavigate("/admin")}>
          Admin Panel
        </MenuItem>
      ) : user && user.role === "vendor" ? (
        <MenuItem onClick={() => handleNavigate("/vendor")}>
          Seller Hub
        </MenuItem>
      ) : (
        <MenuItem onClick={() => handleNavigate("/become-seller")}>
          Become a Seller
        </MenuItem>
      )}
      <MenuItem onClick={handleLogout}>Logout</MenuItem>
    </Menu>
  );

  return (
    <Box
      sx={{
        flexGrow: 1,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <AppBar
        position="fixed"
        sx={{ backgroundColor: "#2874F0", height: "56px" }}
      >
        <Toolbar
          sx={{
            maxWidth: "1248px",
            margin: "0 auto",
            width: "100%",
            height: "56px",
          }}
        >
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ cursor: "pointer", flexGrow: 1, fontWeight: 700 }}
            onClick={() => router.push("/")}
          >
            Flipkart
          </Typography>

          {/* Dynamic Seller / Admin Hub Button */}
          {user && user.role === "admin" ? (
            <Button
              onClick={() => router.push("/admin/vendors")}
              startIcon={<StorefrontIcon />}
              sx={{
                color: "#ffffff",
                textTransform: "none",
                fontWeight: 600,
                fontSize: "14px",
                mr: 2,
                px: 1.5,
                py: 0.5,
                borderRadius: "4px",
                backgroundColor: "rgba(255, 255, 255, 0.12)",
                "&:hover": {
                  backgroundColor: "rgba(255, 255, 255, 0.22)",
                },
              }}
            >
              Admin Panel
            </Button>
          ) : user && user.role === "vendor" ? (
            <Button
              onClick={() => router.push("/vendor")}
              startIcon={<StorefrontIcon />}
              sx={{
                color: "#ffffff",
                textTransform: "none",
                fontWeight: 600,
                fontSize: "14px",
                mr: 2,
                px: 1.5,
                py: 0.5,
                borderRadius: "4px",
                backgroundColor: "rgba(255, 255, 255, 0.12)",
                "&:hover": {
                  backgroundColor: "rgba(255, 255, 255, 0.22)",
                },
              }}
            >
              Seller Hub
            </Button>
          ) : (
            <Button
              onClick={() => router.push("/become-seller")}
              startIcon={<StorefrontIcon />}
              sx={{
                color: "#ffffff",
                textTransform: "none",
                fontWeight: 600,
                fontSize: "14px",
                mr: 2,
                px: 1.5,
                py: 0.5,
                borderRadius: "4px",
                backgroundColor: "rgba(255, 255, 255, 0.12)",
                "&:hover": {
                  backgroundColor: "rgba(255, 255, 255, 0.22)",
                },
              }}
            >
              Become a Seller
            </Button>
          )}

          <Box sx={{ display: "flex", alignItems: "center" }}>
            {user ? (
              <>
                <Typography variant="body2" sx={{ mr: 1, cursor: "pointer" }} onClick={handleProfileMenuOpen}>
                  {user.email || user.username}
                </Typography>
                <IconButton
                  size="large"
                  edge="end"
                  aria-label="account of current user"
                  aria-controls={menuId}
                  aria-haspopup="true"
                  onClick={handleProfileMenuOpen}
                  color="inherit"
                >
                  <AccountCircle />
                </IconButton>
              </>
            ) : (
              <Box sx={{ display: "flex", gap: 1 }}>
                <Button color="inherit" onClick={() => router.push("/login")}>
                  Login / Sign Up
                </Button>
              </Box>
            )}
          </Box>
        </Toolbar>
      </AppBar>
      {renderMenu}
    </Box>
  );
}
