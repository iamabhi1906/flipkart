"use client";

import React, { useEffect, useMemo, useState } from "react";
import {
  Box,
  Button,
  ButtonBase,
  Popover,
  Select,
  Typography,
  styled,
} from "@mui/material";
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

const CategoryBar = ({ props }: { props: CategoryBarProps }) => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

  const [activeCategory, setActiveCategory] = useState<CategoryNode | null>(
    null,
  );

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await api.get("/categories", {
          params: props,
        });

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

  const categoryTree = useMemo<CategoryNode[]>(() => {
    const map = new Map<string, CategoryNode>();
    const roots: CategoryNode[] = [];
    for (const category of categories) {
      map.set(category.id, {
        ...category,
        children: [],
      });
    }

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
        roots.push(node);
      }
    }

    return roots;
  }, [categories]);

  const handleCategoryClick = (
    event: React.MouseEvent<HTMLButtonElement>,
    category: CategoryNode,
  ) => {
    event.stopPropagation();

    if (category.children.length === 0) {
      // router.push(`/category/${category.slug}`);

      return;
    }

    setAnchorEl(event.currentTarget);
    setActiveCategory(category);
  };

  const handleClose = () => {
    setAnchorEl(null);
    setActiveCategory(null);
  };

  if (loading) {
    return (
      <Box>
        <Typography variant="body2">Loading...</Typography>
      </Box>
    );
  }

  if (error) {
    return (
      <Box>
        <Typography variant="body2">{error}</Typography>
      </Box>
    );
  }

  return (
    <Box>
      <Box>
        {categoryTree.map((category) => (
          <Button
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
          </Button>
        ))}
      </Box>

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
          <Select>
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
          </Select>
        )}
      </Popover>
    </Box>
  );
};

export default CategoryBar;
