import { Box, Chip, Step, StepLabel, Stepper, Typography } from "@mui/material";

const ORDER_STEPS = [
  {
    key: "pending",
    label: "Order Placed",
  },
  {
    key: "confirmed",
    label: "Confirmed",
  },
  {
    key: "processing",
    label: "Processing",
  },
  {
    key: "shipped",
    label: "Shipped",
  },
  {
    key: "out_for_delivery",
    label: "Out for Delivery",
  },
  {
    key: "delivered",
    label: "Delivered",
  },
];

const getStepIndex = (status?: string) => {
  if (!status) return 0;
  const index = ORDER_STEPS.findIndex((step) => step.key === status);
  if (status === "completed") {
    return ORDER_STEPS.length - 1;
  }
  return index >= 0 ? index : 0;
};

export default function OrderStepper({ order }: { order: any }) {
  return (
    <>
      {order.status === "cancelled" ||
      order.status === "partially_cancelled" ? (
        <Box
          sx={{
            py: 2,
            px: 1,
            display: "flex",
            justifyContent: "center",
          }}
        >
          <Chip
            label={
              order.status === "partially_cancelled"
                ? "PARTIALLY CANCELLED"
                : "CANCELLED"
            }
            color="error"
            sx={{
              fontWeight: 700,
              px: 1,
            }}
          />
        </Box>
      ) : (
        <Box
          sx={{
            width: "100%",
            overflowX: "auto",
            py: 2,
            "&::-webkit-scrollbar": {
              height: 6,
            },
          }}
        >
          <Stepper
            activeStep={getStepIndex(order.status)}
            alternativeLabel
            sx={{
              minWidth: 700,
            }}
          >
            {ORDER_STEPS.map((step) => (
              <Step key={step.key}>
                <StepLabel>
                  <Typography
                    variant="caption"
                    sx={{
                      fontWeight: 700,
                      whiteSpace: "nowrap",
                    }}
                  >
                    {step.label}
                  </Typography>
                </StepLabel>
              </Step>
            ))}
          </Stepper>
        </Box>
      )}
    </>
  );
}
