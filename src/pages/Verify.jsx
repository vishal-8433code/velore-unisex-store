import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom"; // React Router alternative for navigation
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card";

export default function VerifyPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [timeLeft, setTimeLeft] = useState(60);
  const [canResend, setCanResend] = useState(false);
  const navigate = useNavigate(); // React Router navigation

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  useEffect(() => {
    // Get phone number from sessionStorage
    const storedPhone = sessionStorage.getItem("verifyPhone");
    if (storedPhone) {
      setPhoneNumber(storedPhone);
    } else {
      // Redirect to login if no phone number found
      navigate("/login");
    }

    // Start countdown timer
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          setCanResend(true);
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [navigate]);

  const onSubmit = async (data) => {
    setIsLoading(true);

    // Simulate OTP verification
    await new Promise((resolve) => setTimeout(resolve, 2000));

    console.log("OTP verification:", data);

    if (data.otp.length === 6) {
      setIsLoading(false);
      reset();
      sessionStorage.removeItem("verifyPhone");
      alert("Account verified successfully!");
      navigate("/");
    } else {
      setIsLoading(false);
      alert("Invalid OTP. Please try again.");
    }
  };

  const handleResendOTP = async () => {
    setIsLoading(true);

    await new Promise((resolve) => setTimeout(resolve, 1000));

    setIsLoading(false);
    setTimeLeft(60);
    setCanResend(false);

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          setCanResend(true);
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    alert("OTP sent successfully!");
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-4">
      {/* Background gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-900 to-black opacity-90" />

      {/* Decorative elements */}
      <div className="absolute top-20 left-20 w-32 h-32 bg-primary/10 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-20 right-20 w-40 h-40 bg-primary/5 rounded-full blur-3xl animate-pulse delay-1000" />

      <div className="relative z-10 w-full max-w-md">
        <Card className="bg-black/40 backdrop-blur-xl border border-white/10 shadow-2xl">
          <CardHeader className="text-center space-y-4">
            <div className="mx-auto w-16 h-16 bg-gradient-to-br from-primary to-yellow-600 rounded-full flex items-center justify-center mb-4">
              <span className="text-2xl font-bold text-black">V</span>
            </div>
            <CardTitle className="text-3xl font-bold text-white">
              Verify Your <span className="text-primary">Account</span>
            </CardTitle>
            <CardDescription className="text-gray-400">
              We've sent a 6-digit OTP to
              <br />
              <span className="text-white font-medium">{phoneNumber}</span>
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-6">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="otp" className="text-white font-medium">
                  Enter OTP
                </Label>
                <Input
                  id="otp"
                  type="text"
                  placeholder="000000"
                  maxLength={6}
                  className="bg-white/5 border-white/20 text-white placeholder:text-gray-500 focus:border-primary focus:ring-primary/20 h-12 text-center text-2xl tracking-widest"
                  {...register("otp", {
                    required: "OTP is required",
                    pattern: {
                      value: /^\d{6}$/,
                      message: "Please enter a valid 6-digit OTP",
                    },
                  })}
                />
                {errors.otp && <p className="text-red-400 text-sm">{errors.otp.message}</p>}
              </div>

              <Button
                type="submit"
                disabled={isLoading}
                className="w-full h-12 bg-gradient-to-r from-primary to-yellow-600 hover:from-yellow-600 hover:to-primary text-black font-semibold transition-all duration-300 transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <div className="flex items-center space-x-2">
                    <div className="w-4 h-4 border-2 border-black/30 border-t-black rounded-full animate-spin" />
                    <span>Verifying...</span>
                  </div>
                ) : (
                  "Verify Account"
                )}
              </Button>
            </form>

            <div className="text-center space-y-4">
              <div className="text-sm text-gray-400">Didn't receive the code?</div>

              {canResend ? (
                <Button
                  type="button"
                  variant="ghost"
                  onClick={handleResendOTP}
                  disabled={isLoading}
                  className="text-primary hover:text-yellow-400 hover:bg-primary/10 transition-colors font-medium"
                >
                  Resend OTP
                </Button>
              ) : (
                <div className="text-sm text-gray-500">Resend OTP in {timeLeft}s</div>
              )}

              <button
                onClick={() => navigate("/login")}
                className="inline-block text-sm text-gray-400 hover:text-white transition-colors"
              >
                ← Back to Login
              </button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
