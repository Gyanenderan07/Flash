/**
 * Flash Google Identity — Official Google Identity Services (GIS) Web SDK integration.
 * Triggers official Google account chooser popup / One Tap prompt and validates credentials.
 */
import { useEffect, useRef, useState } from "react";
import { LoaderCircle } from "lucide-react";
import { toast } from "sonner";
import { useAuth } from "@/contexts/AuthContext";

type GoogleIdApi = {
  initialize: (options: {
    client_id: string;
    callback: (response: { credential?: string }) => void;
    auto_select?: boolean;
    cancel_on_tap_outside?: boolean;
    itp_support?: boolean;
  }) => void;
  renderButton: (
    element: HTMLElement,
    options: {
      theme: "outline" | "filled_black";
      size: "large" | "medium";
      text: "continue_with" | "signin_with";
      shape: "pill" | "rectangular";
      logo_alignment: "left" | "center";
      width: number;
    }
  ) => void;
  prompt: (momentListener?: (notification: { isNotDisplayed: () => boolean; getNotDisplayedReason: () => string; isDismissed: () => boolean; getDismissedReason: () => string }) => void) => void;
};

const getGoogleId = (): GoogleIdApi | undefined =>
  (Reflect.get(window, "google") as { accounts?: { id?: GoogleIdApi } } | undefined)?.accounts?.id;

const GIS_SRC = "https://accounts.google.com/gsi/client";

let scriptPromise: Promise<void> | null = null;
function loadGoogleIdentity(): Promise<void> {
  if (getGoogleId()) return Promise.resolve();
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
  onCredential,
  onSuccess,
  disabled,
  oneTap = false,
}: {
  onCredential?: (credential: string) => void;
  onSuccess?: () => void;
  disabled?: boolean;
  oneTap?: boolean;
}) {
  const holderRef = useRef<HTMLDivElement>(null);
  const { signInWithGoogleCredential } = useAuth();
  const [loading, setLoading] = useState(false);
  const [gisLoaded, setGisLoaded] = useState(false);

  const rawClientId = import.meta.env.VITE_GOOGLE_CLIENT_ID as string | undefined;
  const isClientIdConfigured = Boolean(
    rawClientId &&
      !rawClientId.includes("your-google-client-id") &&
      !rawClientId.includes("flashapp.apps")
  );

  const handleCredentialReceived = async (credential: string) => {
    setLoading(true);
    try {
      if (onCredential) {
        onCredential(credential);
      }
      const success = await signInWithGoogleCredential(credential);
      if (success) {
        toast.success("Signed in with Google successfully.");
        onSuccess?.();
      } else {
        toast.error("Could not validate Google credential.");
      }
    } catch {
      toast.error("An error occurred during Google authentication.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    let active = true;
    if (!isClientIdConfigured || !rawClientId) return;

    loadGoogleIdentity()
      .then(() => {
        const googleId = getGoogleId();
        if (!active || !googleId) return;

        setGisLoaded(true);

        googleId.initialize({
          client_id: rawClientId,
          callback: (response) => {
            if (response.credential) {
              handleCredentialReceived(response.credential);
            }
          },
          auto_select: false,
          cancel_on_tap_outside: true,
          itp_support: true,
        });

        if (holderRef.current) {
          holderRef.current.innerHTML = "";
          googleId.renderButton(holderRef.current, {
            theme: "outline",
            size: "large",
            text: "continue_with",
            shape: "pill",
            logo_alignment: "left",
            width: Math.min(Math.max(holderRef.current.clientWidth || 280, 240), 360),
          });
        }

        if (oneTap) {
          window.setTimeout(() => {
            if (active) googleId.prompt();
          }, 500);
        }
      })
      .catch(() => {
        if (active) setGisLoaded(false);
      });

    return () => {
      active = false;
    };
  }, [isClientIdConfigured, rawClientId, oneTap]);

  const handleManualClick = async () => {
    if (!isClientIdConfigured || !rawClientId) {
      toast.error("Google Client ID is not configured. Please set VITE_GOOGLE_CLIENT_ID in your environment.");
      return;
    }

    setLoading(true);
    try {
      await loadGoogleIdentity();
      const googleId = getGoogleId();
      if (!googleId) {
        toast.error("Google Identity Services SDK is not available.");
        setLoading(false);
        return;
      }

      googleId.initialize({
        client_id: rawClientId,
        callback: (response) => {
          if (response.credential) {
            handleCredentialReceived(response.credential);
          } else {
            setLoading(false);
          }
        },
        cancel_on_tap_outside: true,
      });

      googleId.prompt((notification) => {
        if (notification.isNotDisplayed() || notification.isDismissed()) {
          setLoading(false);
          const reason = notification.getNotDisplayedReason() || notification.getDismissedReason();
          if (reason && reason !== "unregistered_origin") {
            // User closed or dismissed prompt
          }
        }
      });
    } catch {
      toast.error("Could not trigger Google Sign-In prompt.");
      setLoading(false);
    }
  };

  return (
    <div className="google-auth-wrapper w-full">
      {isClientIdConfigured && gisLoaded && holderRef.current ? (
        <div className="google-identity-slot" ref={holderRef} aria-label="Continue with Google" />
      ) : (
        <button
          type="button"
          disabled={disabled || loading}
          onClick={handleManualClick}
          className="gsi-material-button w-full relative flex items-center justify-center gap-3 py-3 px-5 border border-[#E5E7EB] rounded-full bg-white hover:bg-gray-50 active:scale-[0.98] transition-all duration-200 shadow-sm disabled:opacity-70 disabled:cursor-wait"
        >
          <div className="gsi-material-button-icon flex items-center justify-center w-5 h-5 flex-shrink-0">
            {loading ? (
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
            {loading ? "Connecting..." : "Continue with Google"}
          </span>
        </button>
      )}
    </div>
  );
}
