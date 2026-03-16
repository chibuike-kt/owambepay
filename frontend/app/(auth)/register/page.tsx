"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Mic2, Users } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";

const roles = [
  {
    value: "host" as const,
    label: "Host",
    description: "I'm throwing a celebration",
    icon: Mic2,
  },
  {
    value: "guest" as const,
    label: "Guest",
    description: "I want to spray money",
    icon: Users,
  },
];

export default function RegisterPage() {
  const { register } = useAuth();
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    password_confirmation: "",
    role: "guest" as "host" | "guest",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);

  const set = (field: string) => (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm((prev) => ({ ...prev, [field]: e.target.value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});
    setLoading(true);
    try {
      await register(form);
    } catch (err: unknown) {
      const axiosError = err as {
        response?: {
          data?: { errors?: Record<string, string[]>; message?: string };
        };
      };
      const apiErrors = axiosError.response?.data?.errors ?? {};
      const flat: Record<string, string> = {};
      Object.entries(apiErrors).forEach(([key, messages]) => {
        flat[key] = Array.isArray(messages) ? messages[0] : messages;
      });
      setErrors(
        Object.keys(flat).length > 0
          ? flat
          : {
              general:
                axiosError.response?.data?.message ?? "Registration failed.",
            },
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#FAF8F5] bg-celebration flex items-center justify-center p-4 py-10">
      <motion.div
        className="w-full max-w-[440px]"
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      >
        {/* Brand mark */}
        <div className="text-center mb-8">
          <div className="inline-flex flex-col items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-[#C9922A] flex items-center justify-center shadow-md">
              <span style={{ fontSize: 22 }}>💸</span>
            </div>
            <div>
              <h1 className="font-display text-[28px] text-[#1A1410] leading-none tracking-[-0.02em]">
                OwambePay
              </h1>
              <p className="text-[13px] text-[#B8AFA8] mt-1 tracking-[0.02em] uppercase font-medium">
                Digital money spraying
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-[#EAE4DC] shadow-md overflow-hidden">
          <div className="px-7 py-6 border-b border-[#F3EFE9]">
            <h2 className="text-[17px] font-semibold text-[#1A1410] tracking-[-0.02em]">
              Create your account
            </h2>
            <p className="text-[13px] text-[#7A6E64] mt-0.5">
              Join the celebration in seconds
            </p>
          </div>

          <div className="px-7 py-6">
            {errors.general && (
              <motion.div
                className="mb-5 px-4 py-3 bg-[#FDF2F1] border border-[#f5c6c2] rounded-lg text-[13px] text-[#C0392B]"
                initial={{ opacity: 0, y: -6 }}
                animate={{ opacity: 1, y: 0 }}
              >
                {errors.general}
              </motion.div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <Input
                id="name"
                label="Full name"
                placeholder="Adaeze Okonkwo"
                value={form.name}
                onChange={set("name")}
                error={errors.name}
                required
              />
              <Input
                id="email"
                type="email"
                label="Email address"
                placeholder="you@example.com"
                value={form.email}
                onChange={set("email")}
                error={errors.email}
                required
              />

              {/* Role selector */}
              <div className="flex flex-col gap-1.5">
                <span className="text-[13px] font-medium text-[#3D3228] tracking-[-0.01em]">
                  I am joining as
                </span>
                <div className="grid grid-cols-2 gap-2">
                  {roles.map(({ value, label, description, icon: Icon }) => (
                    <button
                      key={value}
                      type="button"
                      onClick={() => setForm((p) => ({ ...p, role: value }))}
                      className={[
                        "flex flex-col items-start gap-1.5 px-4 py-3.5 rounded-lg border text-left transition-all duration-150",
                        form.role === value
                          ? "border-[#C9922A] bg-[#FDF6E7] ring-2 ring-[#C9922A]/20"
                          : "border-[#EAE4DC] hover:border-[#D9D0C5] hover:bg-[#FAF8F5]",
                      ].join(" ")}
                    >
                      <Icon
                        size={18}
                        strokeWidth={1.5}
                        className={
                          form.role === value
                            ? "text-[#C9922A]"
                            : "text-[#B8AFA8]"
                        }
                      />
                      <div>
                        <p
                          className={`text-[13px] font-semibold tracking-[-0.01em] ${form.role === value ? "text-[#7A5618]" : "text-[#1A1410]"}`}
                        >
                          {label}
                        </p>
                        <p className="text-[11px] text-[#B8AFA8] leading-tight mt-0.5">
                          {description}
                        </p>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              <Input
                id="password"
                type="password"
                label="Password"
                placeholder="Min. 8 characters"
                value={form.password}
                onChange={set("password")}
                error={errors.password}
                hint="Use a strong password"
                required
              />
              <Input
                id="password_confirmation"
                type="password"
                label="Confirm password"
                placeholder="Repeat your password"
                value={form.password_confirmation}
                onChange={set("password_confirmation")}
                required
              />

              <Button
                type="submit"
                className="w-full mt-1"
                size="lg"
                isLoading={loading}
              >
                Create account
                {!loading && <ArrowRight size={16} strokeWidth={2} />}
              </Button>
            </form>
          </div>

          <div className="px-7 py-4 bg-[#FAF8F5] border-t border-[#F3EFE9]">
            <p className="text-[13px] text-[#7A6E64] text-center">
              Already have an account?{" "}
              <Link
                href="/login"
                className="text-[#C9922A] font-medium hover:text-[#B8821E] transition-colors"
              >
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
