/**
 * Flash Google Identity — Official Google Identity Services OAuth 2.0 Popup Integration.
 * Uses initTokenClient to trigger Google's native account chooser popup dynamically.
 */
import { useState } from "react";
import { LoaderCircle } from "lucide-react";
import { toast } from "sonner";
import { useAuth } from "@/contexts/AuthContext";

const GIS_SRC = "https://accounts.google.com/gsi/client";
const DEFAULT_CLIENT_ID = "380835034980-1i5imfmnd5iamu6ih9akthqqvtna51n7.apps.googleusercontent.com";

let scriptPromise: Promise<void> | null = null;
function loadGoogleIdentity(): Promise<void> {
  const existing = (window as any).google?.accounts?.oauth2;
  if (existing) return Promise.resolve();
  if (scriptPromise) return scriptPromise;
  scriptPromise = new Promise((resolve, reject) => {
    const script = document.createElement("script");
    script.src = GIS_SRC;
    script.async = true;
    script.defer = true;
    script.onload = () => resolve();
    script.onerror = () => reject(new Error("Google Identity Services SDK failed to load"));
    document.head.appendChild(script);
  });
  return scriptPromise;
}

export default function GoogleIdentityButton({
  onSuccess,
  disabled,
  oneTap,
}: {
  onSuccess?: () => void;
  disabled?: boolean;
  oneTap?: boolean;
}) {
  const [isLoading, setIsLoading] = useState(false);
  const { signInWithGoogleProfile } = useAuth();

  const handleGoogleSignIn = async () => {
    setIsLoading(true);

    try {
      await loadGoogleIdentity();
      const rawClientId = import.meta.env.VITE_GOOGLE_CLIENT_ID as string | undefined;
      const clientId = rawClientId && !rawClientId.includes("your-google-client-id")
        ? rawClientId
        : DEFAULT_CLIENT_ID;

      const google = (window as any).google;

      if (!google?.accounts?.oauth2) {
        toast.error("Google Identity Services script not loaded in browser.");
        setIsLoading(false);
        return;
      }

      // Initialize official Google OAuth 2.0 popup token client
      const client = google.accounts.oauth2.initTokenClient({
        client_id: clientId,
        scope: "openid email profile",
        callback: async (tokenResponse: any) => {
          if (tokenResponse && tokenResponse.access_token) {
            try {
              // Fetch the real signed-in user's profile from Google
              const res = await fetch("https://www.googleapis.com/oauth2/v3/userinfo", {
                headers: { Authorization: `Bearer ${tokenResponse.access_token}` },
              });

              if (!res.ok) {
                toast.error("Could not fetch user profile from Google.");
                setIsLoading(false);
                return;
              }

              const profile = await res.json();

              const activeUser = {
                id: profile.sub,
                name: profile.name || profile.given_name || "Google User",
                email: profile.email,
                avatar: profile.picture || `https://api.dicebear.com/9.x/personas/svg?seed=${encodeURIComponent(profile.email || "user")}&backgroundColor=e2f800`,
              };

              const flashUserStorage = {
                ...activeUser,
                isLoggedIn: true,
                provider: "google",
              };

              try {
                localStorage.setItem("flash_user", JSON.stringify(flashUserStorage));
              } catch (e) {
                console.error("Storage error:", e);
              }

              signInWithGoogleProfile(activeUser);
              toast.success(`Welcome to Flash, ${activeUser.name.split(" ")[0]}.`);
              onSuccess?.();
            } catch (err) {
              console.error("Failed to fetch user profile:", err);
              toast.error("An error occurred while signing in with Google.");
            } finally {
              setIsLoading(false);
            }
          } else {
            setIsLoading(false);
          }
        },
        error_callback: (err: any) => {
          console.error("Google OAuth Popup Error:", err);
          toast.error("Google sign-in was cancelled or blocked.");
          setIsLoading(false);
        },
      });

      // Request access token -> Opens the official Google Account Chooser popup
      client.requestAccessToken({ prompt: "select_account" });
    } catch (error) {
      console.error("Google Sign-In Exception:", error);
      toast.error("Could not initialize Google Sign-In.");
      setIsLoading(false);
    }
  };

  return (
    <div className="google-auth-wrapper w-full">
      <button
        type="button"
        onClick={handleGoogleSignIn}
        disabled={disabled || isLoading}
        className="gsi-material-button w-full relative flex items-center justify-center gap-3 py-3 px-5 border border-[#E5E7EB] rounded-full bg-white hover:bg-gray-50 active:scale-[0.98] transition-all duration-200 shadow-sm disabled:opacity-75 disabled:cursor-wait"
      >
        <div className="gsi-material-button-icon flex items-center justify-center w-5 h-5 flex-shrink-0">
          {isLoading ? (
            <LoaderCircle className="auth-spinner w-5 h-5 animate-spin text-[#0F1115]" />
          ) : (
            <svg
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 48 48"
              className="w-5 h-5 block"
            >
              <path
                fill="#EA4335"
                d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"
              />
              <path
                fill="#4285F4"
                d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"
              />
              <path
                fill="#FBBC05"
                d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"
              />
              <path
                fill="#34A853"
                d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"
              />
              <path fill="none" d="M0 0h48v48H0z" />
            </svg>
          )}
        </div>
        <span className="gsi-material-button-contents text-sm font-semibold text-[#0F1115] tracking-tight">
          {isLoading ? "Opening Google..." : "Continue with Google"}
        </span>
      </button>
    </div>
  );
}
