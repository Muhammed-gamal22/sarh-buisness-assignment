import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useMutation } from "@tanstack/react-query";
import { postData } from "@/services/services";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { useTokenStore } from "@/store/services/token-store";
import { toast } from "sonner";
import { AxiosError } from "axios";
import { ErrorResponse } from "@/types";
import { useEffect } from "react";

type LoginForm = {
  email: string;
  password: string;
};

export default function Login() {
  const navigate = useNavigate();
  const { setToken } = useTokenStore();


  const { mutate, isPending } = useMutation({
    mutationFn: async (data: LoginForm) => postData("/login", data),
    onSuccess: (response) => {
      localStorage.setItem("token", response.token);
      if (response.token) {
        setToken(response.token);
        navigate("/hq");
      }

    },
    onError: (error: AxiosError<ErrorResponse>) => {
      toast.error(error?.response?.data?.message || error.message);
    },
  });
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginForm>({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: LoginForm) => {
    await mutate(data);
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-muted/40 px-4">
      <Card className="w-full max-w-md shadow-xl">
        <CardHeader className="space-y-2 text-center">
          <CardTitle className="text-3xl flex flex-col items-center justify-center font-bold">
            <img
              src="/akar.png"
              alt="Logo"
              className="h-20 w-20 object-contain"
            />
            <h2>Headquarter Login</h2>
          </CardTitle>
        </CardHeader>

        <CardContent>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-5"
          >
            <div className="space-y-2">
              <Label htmlFor="email">البريد الإلكتروني</Label>

              <Input
                id="email"
                type="email"
                placeholder="البريد الإلكتروني"
                {...register("email", {
                  required: "البريد الإلكتروني مطلوب",
                  pattern: {
                    value:
                      /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    message: "الرجاء إدخال بريد إلكتروني صالح",
                  },
                })}
              />

              {errors.email && (
                <p className="text-sm text-destructive">
                  {errors.email.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">كلمة المرور</Label>
              <Input
                id="password"
                type="password"
                placeholder="كلمة المرور"
                {...register("password", {
                  required: "كلمة المرور مطلوبة",
                  minLength: {
                    value: 6,
                    message:
                      "كلمة المرور يجب أن تكون على الأقل 6 أحرف",
                  },
                })}
              />

              {errors.password && (
                <p className="text-sm text-destructive">
                  {errors.password.message}
                </p>
              )}
            </div>

            <Button
              type="submit"
              className="w-full"
              disabled={isSubmitting}
            >
              {isPending ? "جاري تسجيل الدخول..." : "تسجيل الدخول"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}