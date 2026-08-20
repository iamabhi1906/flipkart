"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Box,
  Button,
  Typography,
  TextField,
  CircularProgress,
} from "@mui/material";
import styles from "./login.module.css";
import Image from "next/image";

import { useAppDispatch } from "@/store";
import {
  requestOtpThunk,
  verifyOtpThunk,
  resendOtpThunk,
} from "@/features/users/user.action";

const emailSchema = z.object({
  email: z.string().email("Invalid email address").min(1, "Email is required"),
});

const otpSchema = z.object({
  otp: z
    .string()
    .length(6, "OTP must be 6 digits")
    .regex(/^[0-9]+$/, "OTP must contain only numbers"),
});

export default function LoginPage() {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const [step, setStep] = useState<"email" | "otp">("email");
  const [email, setEmail] = useState("");
  const [apiError, setApiError] = useState("");
  const [apiSuccess, setApiSuccess] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [resendCooldown, setResendCooldown] = useState(0);

  const {
    register: registerEmail,
    handleSubmit: handleSubmitEmail,
    formState: { errors: emailErrors },
  } = useForm<{ email: string }>({
    resolver: zodResolver(emailSchema),
    defaultValues: { email: "" },
  });

  const {
    register: registerOtp,
    handleSubmit: handleSubmitOtp,
    formState: { errors: otpErrors },
    setValue: setOtpValue,
  } = useForm<{ otp: string }>({
    resolver: zodResolver(otpSchema),
    defaultValues: { otp: "" },
  });

  // Handle 60s resend cooldown timer
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (resendCooldown > 0) {
      timer = setTimeout(() => {
        setResendCooldown((prev) => prev - 1);
      }, 1000);
    }
    return () => clearTimeout(timer);
  }, [resendCooldown]);

  const onEmailSubmit = async (data: { email: string }) => {
    setApiError("");
    setApiSuccess("");
    setIsSubmitting(true);
    try {
      const res = await dispatch(requestOtpThunk(data.email)).unwrap();
      setEmail(data.email);
      setStep("otp");
      setApiSuccess(res.message || "Verification code sent to your email.");
      setResendCooldown(60);
    } catch (err: any) {
      setApiError(
        typeof err === "string"
          ? err
          : err.message || "Failed to send verification code",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const onOtpSubmit = async (data: { otp: string }) => {
    setApiError("");
    setApiSuccess("");
    setIsSubmitting(true);
    try {
      const res = await dispatch(
        verifyOtpThunk({ email, otp: data.otp }),
      ).unwrap();
      if (res?.user?.role === "admin") {
        router.push("/admin");
      } else {
        router.push("/dashboard");
      }
    } catch (err: any) {
      setApiError(
        typeof err === "string" ? err : err.message || "Invalid or expired OTP",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleResend = async () => {
    if (resendCooldown > 0 || isSubmitting) return;
    setApiError("");
    setApiSuccess("");
    setIsSubmitting(true);
    try {
      const res = await dispatch(resendOtpThunk(email)).unwrap();
      setApiSuccess(res.message || "A new verification code has been sent.");
      setResendCooldown(60);
      setOtpValue("otp", "");
    } catch (err: any) {
      setApiError(
        typeof err === "string" ? err : err.message || "Failed to resend OTP",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChangeEmail = () => {
    setStep("email");
    setApiError("");
    setApiSuccess("");
  };

  return (
    <Box className={styles.container}>
      <Box className={styles.formContainer}>
        {/* Left Section Banner */}
        <Box className={styles.leftSection}>
          <Box>
            <Box sx={{ fontSize: "28px", fontWeight: "500" }}>
              {step === "email" ? "Login / Sign Up" : "Verification"}
            </Box>
            <Box
              sx={{
                mt: "22px",
                lineHeight: "1.5",
                fontSize: "18px",
                fontWeight: "400",
                color: "rgb(219, 219, 219)",
              }}
            >
              {step === "email"
                ? "Get access to your Orders, Wishlist and Recommendations"
                : "Enter the 6-digit code sent to your email address"}
            </Box>
          </Box>
          <Image
            src="https://static-assets-web.flixcart.com/fk-p-linchpin-web/fk-cp-zion/img/login_img_c4a81e.png"
            width={222}
            height={140}
            alt="Flipkart Auth Illustration"
            className={styles.leftImage}
          />
        </Box>

        {/* Right Section Form */}
        <Box className={styles.rightSection}>
          {step === "email" ? (
            /* Step 1: Email Form */
            <form
              onSubmit={handleSubmitEmail(onEmailSubmit)}
              style={{ width: "100%" }}
            >
              {apiError && (
                <Typography
                  className={styles.errorMessage}
                  sx={{ mb: 2, fontWeight: 600 }}
                >
                  {apiError}
                </Typography>
              )}

              <TextField
                sx={{ width: "100%" }}
                id="email-input"
                label="Enter Email Address"
                variant="standard"
                type="email"
                {...registerEmail("email")}
                error={!!emailErrors.email}
                helperText={emailErrors.email?.message}
                disabled={isSubmitting}
                autoFocus
              />

              <Typography
                sx={{
                  mt: "32px",
                  fontSize: "12px",
                  fontWeight: "400",
                  color: "rgba(46, 42, 42, 0.51)",
                }}
              >
                By continuing, you agree to Flipkart&apos;s Terms of Use and
                Privacy Policy.
              </Typography>

              <Button
                type="submit"
                variant="contained"
                disabled={isSubmitting}
                className={styles.submitButton}
                sx={{
                  mt: "16px",
                  width: "100%",
                  textTransform: "none",
                  fontSize: "16px",
                  fontWeight: "600",
                  backgroundColor: "#fb641b",
                  height: "48px",
                  "&:hover": {
                    backgroundColor: "#e65611",
                  },
                }}
              >
                {isSubmitting ? (
                  <CircularProgress size={24} color="inherit" />
                ) : (
                  "Continue"
                )}
              </Button>
            </form>
          ) : (
            /* Step 2: OTP Form */
            <form
              onSubmit={handleSubmitOtp(onOtpSubmit)}
              style={{ width: "100%" }}
            >
              <Box sx={{ mb: 2 }}>
                <Typography
                  sx={{
                    fontSize: "20px",
                    fontWeight: "600",
                    color: "#212121",
                    mb: 0.5,
                  }}
                >
                  Check your email
                </Typography>
                <Typography sx={{ fontSize: "14px", color: "#878787" }}>
                  We sent a 6-digit verification code to:
                </Typography>
                <Typography
                  sx={{
                    fontSize: "15px",
                    fontWeight: "600",
                    color: "#2874f0",
                    mt: 0.5,
                  }}
                >
                  {email}
                </Typography>
              </Box>

              {apiError && (
                <Typography
                  className={styles.errorMessage}
                  sx={{ mb: 2, fontWeight: 600 }}
                >
                  {apiError}
                </Typography>
              )}

              {apiSuccess && (
                <Typography
                  sx={{
                    mb: 2,
                    fontWeight: 600,
                  }}
                >
                  {apiSuccess}
                </Typography>
              )}

              <TextField
                sx={{ width: "100%" }}
                id="otp-input"
                label="Enter 6-Digit Verification Code"
                variant="standard"
                type="text"
                slotProps={{
                  htmlInput: {
                    maxLength: 6,
                    style: {
                      fontSize: "22px",
                      letterSpacing: "8px",
                      textAlign: "center",
                    },
                  },
                }}
                {...registerOtp("otp")}
                error={!!otpErrors.otp}
                helperText={otpErrors.otp?.message}
                disabled={isSubmitting}
                autoFocus
              />

              <Button
                type="submit"
                variant="contained"
                disabled={isSubmitting}
                className={styles.submitButton}
                sx={{
                  mt: "24px",
                  width: "100%",
                  textTransform: "none",
                  fontSize: "16px",
                  fontWeight: "600",
                  backgroundColor: "#fb641b",
                  height: "48px",
                  "&:hover": {
                    backgroundColor: "#e65611",
                  },
                }}
              >
                {isSubmitting ? (
                  <CircularProgress size={24} color="inherit" />
                ) : (
                  "Verify"
                )}
              </Button>

              <Box
                sx={{
                  mt: 3,
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Typography sx={{ fontSize: "13px", color: "#878787" }}>
                  Didn&apos;t receive it?
                </Typography>
                <Button
                  onClick={handleResend}
                  disabled={resendCooldown > 0 || isSubmitting}
                  sx={{
                    textTransform: "none",
                    fontWeight: 600,
                    fontSize: "13px",
                    color: resendCooldown > 0 ? "#878787" : "#2874f0",
                  }}
                >
                  {resendCooldown > 0
                    ? `Resend code in ${resendCooldown}s`
                    : "Resend code"}
                </Button>
              </Box>

              <Box sx={{ mt: 1, textAlign: "center" }}>
                <Button
                  onClick={handleChangeEmail}
                  disabled={isSubmitting}
                  sx={{
                    textTransform: "none",
                    fontSize: "13px",
                    color: "#878787",
                    "&:hover": { color: "#2874f0" },
                  }}
                >
                  Change Email Address
                </Button>
              </Box>
            </form>
          )}

          <Box sx={{ width: "100%", textAlign: "center" }}>
            <Link href="/register" className={styles.link}>
              New to Flipkart? Create an account
            </Link>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
