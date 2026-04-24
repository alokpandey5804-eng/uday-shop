import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useNavigate } from "@tanstack/react-router";
import { Eye, EyeOff, Lock, ShieldCheck } from "lucide-react";
import { useEffect, useState } from "react";
import { useAdminLoginWithActor } from "../hooks/useAdmin";
import { useAdminStore } from "../store/admin";

export function AdminLoginPage() {
  const navigate = useNavigate();
  const { isAuthenticated, login } = useAdminStore();
  const loginMutation = useAdminLoginWithActor();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    if (isAuthenticated) {
      void navigate({ to: "/admin/dashboard" });
    }
  }, [isAuthenticated, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");
    try {
      const token = await loginMutation.mutateAsync({ username, password });
      if (token) {
        login(token);
        void navigate({ to: "/admin/dashboard" });
      } else {
        setErrorMsg("Invalid credentials. Please try again.");
      }
    } catch {
      setErrorMsg("Invalid credentials. Please try again.");
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-background"
      style={{
        background:
          "linear-gradient(135deg, oklch(0.97 0.012 230) 0%, oklch(0.93 0.03 255) 100%)",
      }}
    >
      <div className="w-full max-w-md px-4">
        {/* Brand */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-primary mb-4 shadow-lg">
            <ShieldCheck className="w-8 h-8 text-primary-foreground" />
          </div>
          <h1 className="text-3xl font-display font-bold text-foreground">
            Uday Admin
          </h1>
          <p className="text-muted-foreground mt-1 text-sm">
            Seller Panel — Owner Access Only
          </p>
        </div>

        <Card className="shadow-xl border-border/60">
          <CardHeader className="pb-2 pt-6 px-6">
            <div className="flex items-center gap-2">
              <Lock className="w-4 h-4 text-primary" />
              <span className="font-display font-semibold text-foreground">
                Sign In
              </span>
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              Enter your admin credentials to continue
            </p>
          </CardHeader>
          <CardContent className="px-6 pb-6 pt-4">
            <form onSubmit={(e) => void handleSubmit(e)} className="space-y-5">
              <div className="space-y-1.5">
                <Label htmlFor="username" className="text-sm font-medium">
                  Username
                </Label>
                <Input
                  id="username"
                  data-ocid="admin_login.username.input"
                  type="text"
                  placeholder="Enter username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  autoComplete="username"
                  required
                  className="h-11"
                />
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="password" className="text-sm font-medium">
                  Password
                </Label>
                <div className="relative">
                  <Input
                    id="password"
                    data-ocid="admin_login.password.input"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    autoComplete="current-password"
                    required
                    className="h-11 pr-10"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((v) => !v)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                    aria-label={
                      showPassword ? "Hide password" : "Show password"
                    }
                  >
                    {showPassword ? (
                      <EyeOff className="w-4 h-4" />
                    ) : (
                      <Eye className="w-4 h-4" />
                    )}
                  </button>
                </div>
              </div>

              {errorMsg && (
                <div
                  data-ocid="admin_login.error_state"
                  className="flex items-center gap-2 rounded-lg bg-destructive/10 border border-destructive/30 px-3 py-2.5 text-sm text-destructive"
                >
                  <Lock className="w-3.5 h-3.5 shrink-0" />
                  {errorMsg}
                </div>
              )}

              <Button
                data-ocid="admin_login.submit_button"
                type="submit"
                className="w-full h-11 font-semibold"
                disabled={loginMutation.isPending}
              >
                {loginMutation.isPending ? (
                  <span className="flex items-center gap-2">
                    <span className="w-4 h-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                    Signing in…
                  </span>
                ) : (
                  "Sign In"
                )}
              </Button>
            </form>
          </CardContent>
        </Card>

        <p className="text-center text-xs text-muted-foreground mt-6">
          © {new Date().getFullYear()} Uday Shop · Admin Portal
        </p>
      </div>
    </div>
  );
}
