"use client";

import * as React from "react";
import Image from "next/image";
import { useSearchParams, useRouter } from "next/navigation";
import {
  Box,
  Card,
  CardContent,
  Typography,
  CircularProgress,
} from "@mui/material";
import PrimarySearchAppBar from "@/components/appbar";
import styles from "./home-hero-carousel.module.css";
// import { getCategories } from "@/services/category.service";
import { getProducts } from "@/services/product.service";
import { getPublicBanners, BannerData } from "@/services/banner.service";

import { colors, InputAdornment, TextField } from "@mui/material";
import Link from "next/link";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
// import Coin from "@/components/icons/coin";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import KeyboardArrowDownOutlinedIcon from "@mui/icons-material/KeyboardArrowDownOutlined";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";

// swiper
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Scrollbar, A11y } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";

const defaultBanners: BannerData[] = [
  {
    id: "1",
    imageUrl:
      "https://rukminim2.flixcart.com/fk-p-flap/896/438/image/aa567e779be9989f.jpg?q=60",
    linkUrl: "/products",
  },
  {
    id: "2",
    imageUrl:
      "https://rukminim2.flixcart.com/fk-p-flap/3200/1560/image/b6851225f8d43d7c.jpg?q=60",
    linkUrl: "/products",
  },
  {
    id: "3",
    imageUrl:
      "https://rukminim2.flixcart.com/fk-p-flap/3200/1560/image/01037932d398ad83.jpg?q=60",
    linkUrl: "/products",
  },
];

export default function HomeHeroCarousel() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const searchVal = searchParams.get("search") || "";

  const [categories, setCategories] = React.useState<any[]>([]);
  const [products, setProducts] = React.useState<any[]>([]);
  const [banners, setBanners] = React.useState<BannerData[]>([]);
  const [selectedCategory, setSelectedCategory] = React.useState<string>("");
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    getPublicBanners()
      .then((res) => {
        if (Array.isArray(res) && res.length > 0) {
          setBanners(res);
        } else {
          setBanners(defaultBanners);
        }
      })
      .catch(() => {
        setBanners(defaultBanners);
      });
  }, []);

  // React.useEffect(() => {
  //   getCategories()
  //     .then((res) => {
  //       setCategories(res?.data || []);
  //     })
  //     .catch(() => {});
  // }, []);

  React.useEffect(() => {
    setLoading(true);
    const query: any = { status: "active" };
    if (searchVal) query.search = searchVal;
    if (selectedCategory) query.categoryId = selectedCategory;

    getProducts(query)
      .then((res) => {
        setProducts(res?.data || []);
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [searchVal, selectedCategory]);

  const featuredBanners = [
    {
      id: 1,
      imageUrl:
        "https://rukminim2.flixcart.com/fk-p-flap/896/438/image/aa567e779be9989f.jpg?q=60",
    },
    {
      id: 2,
      imageUrl:
        "https://rukminim2.flixcart.com/fk-p-flap/3200/1560/image/b6851225f8d43d7c.jpg?q=60",
    },
    {
      id: 3,
      imageUrl:
        "https://rukminim2.flixcart.com/fk-p-flap/3200/1560/image/01037932d398ad83.jpg?q=60",
    },
    {
      id: 4,
      imageUrl:
        "https://rukminim2.flixcart.com/fk-p-flap/896/438/image/aa567e779be9989f.jpg?q=60",
    },
    {
      id: 5,
      imageUrl:
        "https://rukminim2.flixcart.com/fk-p-flap/3200/1560/image/b6851225f8d43d7c.jpg?q=60",
    },
    {
      id: 6,
      imageUrl:
        "https://rukminim2.flixcart.com/fk-p-flap/3200/1560/image/01037932d398ad83.jpg?q=60",
    },
  ];

  return (
    <Box className={styles.container}>
      <Box className={styles.header}>
        <Box className={styles.headerTop}>
          <Box className={styles.headerTopLeft}>
            <Box className={styles.headerLogo}>
              <Image
                src={
                  "https://rukminim1.flixcart.com/fk-p-flap/26/22/image/d2ecfddf891a3922.png?q=80"
                }
                alt="Logo"
                width={20}
                height={20}
              />
              Flipkart
            </Box>
            <Box className={styles.headerTravel}>
              <Image
                src={
                  "https://rukminim1.flixcart.com/fk-p-flap/29/22/image/7ab4040af860941d.png?q=80"
                }
                alt="plane"
                width={20}
                height={20}
              />
              Travel
            </Box>
          </Box>

          <Box className={styles.headerTopRight}>
            <Box className={styles.headerLink}>
              <LocationOnIcon sx={{ fontSize: 16 }} />
              Location not set{" "}
              <Link
                href=""
                style={{
                  color: "#0771f3",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                Select delivery location
                <ChevronRightIcon sx={{ fontSize: 16 }} />
              </Link>
            </Box>
            <Box className={styles.coin}>{/* <Coin /> 0 */}</Box>
          </Box>
        </Box>

        <Box className={styles.headerBottom}>
          <Box className={styles.searchBar} sx={{ width: "74%" }}>
            <TextField
              fullWidth
              id="fullWidth"
              placeholder="Search for products, brands and more"
              sx={{
                "& .MuiInputBase-root": {
                  height: "42px",
                  borderRadius: "10px",
                  border: "2px solid #2EA1FF",
                  "& fieldset": {
                    border: "none", // Removes default border
                  },
                  "&:hover fieldset": {
                    border: "none", // Removes hover border
                  },
                  "&.Mui-focused fieldset": {
                    border: "none", // Removes focus border
                  },
                },
              }}
              slotProps={{
                input: {
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchOutlinedIcon />
                    </InputAdornment>
                  ),
                },
              }}
            />
          </Box>
          <Box className={styles.headerBottomRight}>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
                fontSize: "14px",
                fontWeight: "200",
              }}
            >
              <AccountCircleOutlinedIcon />
              Login
              <KeyboardArrowDownOutlinedIcon />
            </Box>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
                fontSize: "14px",
              }}
            >
              More
              <KeyboardArrowDownOutlinedIcon />
            </Box>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
                fontSize: "14px",
              }}
            >
              <ShoppingCartOutlinedIcon />
              Cart
            </Box>
          </Box>
        </Box>
      </Box>

      <Swiper
        modules={[Pagination]}
        spaceBetween={0}
        slidesPerView="auto"
        onSwiper={(swiper) => console.log(swiper)}
        onSlideChange={() => console.log("slide change")}
      >
        <SwiperSlide>
          <Box
            sx={{
              fontWeight: selectedCategory === "" ? "bold" : "normal",
              cursor: "pointer",
              color: selectedCategory === "" ? "#2874f0" : "inherit",
              whiteSpace: "nowrap",
            }}
            onClick={() => setSelectedCategory("")}
          >
            For You
          </Box>
        </SwiperSlide>
        {categories.map((cat) => (
          <SwiperSlide key={cat.id}>
            <Box
              component="span"
              sx={{
                fontWeight: selectedCategory === cat.id ? "bold" : "normal",
                cursor: "pointer",
                color: selectedCategory === cat.id ? "#2874f0" : "inherit",
                whiteSpace: "nowrap",
              }}
              onClick={() => setSelectedCategory(cat.id)}
            >
              {cat.name}
            </Box>
          </SwiperSlide>
        ))}
        ...
      </Swiper>

      <Box sx={{ p: "8px" }}>
        <Swiper
          modules={[Pagination]}
          spaceBetween={0}
          slidesPerView={2.5}
          loop={true}
          pagination={{
            clickable: true,

            el: ".custom-pagination",
          }}
          onSwiper={(swiper) => console.log(swiper)}
          onSlideChange={() => console.log("slide change")}
        >
          {banners.map((banner, index) => (
            <SwiperSlide key={banner.id || index}>
              <Box
                sx={{
                  cursor: banner.linkUrl ? "pointer" : "default",
                  width: "100%",
                  height: "100%",
                  position: "relative",
                }}
                onClick={() => {
                  if (banner.linkUrl) {
                    if (banner.linkUrl.startsWith("http")) {
                      window.open(banner.linkUrl, "_blank");
                    } else {
                      router.push(banner.linkUrl);
                    }
                  }
                }}
              >
                <Image
                  className={styles.bannerImage}
                  src={banner.imageUrl}
                  alt={banner.title || `Banner ${index + 1}`}
                  width={430}
                  height={224}
                  unoptimized={banner.imageUrl.startsWith("http")}
                />
              </Box>
            </SwiperSlide>
          ))}
          ...
        </Swiper>
      </Box>
    </Box>
  );
}
