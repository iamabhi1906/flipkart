"use client";

import React, { useEffect, useMemo, useState } from "react";
import { Box, ButtonBase, Popover, Typography, styled } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { api } from "@/utils/api";

interface Category {
  id: string;
  name: string;
  parentId?: string | null;
}

interface CategoryNode extends Category {
  children: CategoryNode[];
}

interface CategoryBarProps {
  page: number;
  limit: number;
  search?: string;
  parentId?: string;
}

/* ---------------------------------- */
/* Styled Components */
/* ---------------------------------- */

const Bar = styled(Box)({
  width: "100%",
  minHeight: 56,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  backgroundColor: "#fff",
  borderBottom: "1px solid #e0e0e0",
  position: "relative",
  zIndex: 1000,
});

const Container = styled(Box)({
  width: "1248px",
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
});

const CategoryButton = styled(ButtonBase)({
  display: "flex",
  alignItems: "center",
  gap: 2,
  padding: "10px 8px",
  borderRadius: 4,
  fontSize: "13px",
  fontWeight: 500,
  color: "#212121",
  whiteSpace: "nowrap",

  "&:hover": {
    color: "#2874f0",
    backgroundColor: "#f5f5f5",
  },
});

const Dropdown = styled(Box)({
  minWidth: 220,
  maxWidth: 300,
  padding: "8px 0",
  backgroundColor: "#fff",
});

const CategoryItem = styled(ButtonBase)({
  width: "100%",
  minHeight: 42,
  padding: "0 16px",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  textAlign: "left",

  "&:hover": {
    backgroundColor: "#f5f5f5",
    color: "#2874f0",
  },
});

const CategoryName = styled(Typography)({
  fontSize: "14px",
  fontWeight: 400,
});

/* ---------------------------------- */
/* Component */
/* ---------------------------------- */

const CategoryBar = ({ props }: { props: CategoryBarProps }) => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

  const [activeCategory, setActiveCategory] = useState<CategoryNode | null>(
    null,
  );

  /* ---------------------------------- */
  /* Fetch categories */
  /* ---------------------------------- */

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await api.get("/categories", {
          params: props,
        });

        console.log("Categories API:", response.data);

        setCategories(response.data.data.data);
      } catch (error) {
        console.error("Failed to fetch categories:", error);
        setError("Failed to load categories");
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, [props]);

  /* ---------------------------------- */
  /* Build tree */
  /* ---------------------------------- */

  const categoryTree = useMemo<CategoryNode[]>(() => {
    const map = new Map<string, CategoryNode>();
    const roots: CategoryNode[] = [];

    // Create nodes
    for (const category of categories) {
      map.set(category.id, {
        ...category,
        children: [],
      });
    }

    // Connect children
    for (const category of categories) {
      const node = map.get(category.id);

      if (!node) {
        continue;
      }

      if (!category.parentId) {
        roots.push(node);
        continue;
      }

      const parent = map.get(category.parentId);

      if (parent) {
        parent.children.push(node);
      } else {
        // Parent wasn't returned by API.
        roots.push(node);
      }
    }

    return roots;
  }, [categories]);

  /* ---------------------------------- */
  /* Open category */
  /* ---------------------------------- */

  const handleCategoryClick = (
    event: React.MouseEvent<HTMLButtonElement>,
    category: CategoryNode,
  ) => {
    event.stopPropagation();

    if (category.children.length === 0) {
      console.log("Selected category:", category);

      // Navigate here if required
      // router.push(`/category/${category.slug}`);

      return;
    }

    setAnchorEl(event.currentTarget);
    setActiveCategory(category);
  };

  /* ---------------------------------- */
  /* Close */
  /* ---------------------------------- */

  const handleClose = () => {
    setAnchorEl(null);
    setActiveCategory(null);
  };

  /* ---------------------------------- */
  /* Loading */
  /* ---------------------------------- */

  if (loading) {
    return (
      <Bar>
        <Typography variant="body2">Loading...</Typography>
      </Bar>
    );
  }

  /* ---------------------------------- */
  /* Error */
  /* ---------------------------------- */

  if (error) {
    return (
      <Bar>
        <Typography variant="body2">{error}</Typography>
      </Bar>
    );
  }

  /* ---------------------------------- */
  /* Render */
  /* ---------------------------------- */

  return (
    <Bar>
      <Container>
        {categoryTree.map((category) => (
          <CategoryButton
            key={category.id}
            onClick={(event) => handleCategoryClick(event, category)}
          >
            {category.name}

            {category.children.length > 0 && (
              <ExpandMoreIcon
                sx={{
                  fontSize: 18,
                }}
              />
            )}
          </CategoryButton>
        ))}
      </Container>

      {/* Dropdown */}

      <Popover
        open={Boolean(anchorEl)}
        anchorEl={anchorEl}
        onClose={handleClose}
        disableScrollLock
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
        slotProps={{
          paper: {
            elevation: 4,
          },
        }}
      >
        {activeCategory && (
          <Dropdown>
            {activeCategory.children.map((child) => (
              <CategoryItem
                key={child.id}
                onClick={(event) => handleCategoryClick(event, child)}
              >
                <CategoryName>{child.name}</CategoryName>

                {child.children.length > 0 && (
                  <ChevronRightIcon
                    sx={{
                      fontSize: 20,
                    }}
                  />
                )}
              </CategoryItem>
            ))}
          </Dropdown>
        )}
      </Popover>
    </Bar>
  );
};

export default CategoryBar;
