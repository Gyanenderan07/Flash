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
    <div className="google-auth-wrapper">
      {isClientIdConfigured && gisLoaded && holderRef.current ? (
        <div className="google-identity-slot" ref={holderRef} aria-label="Continue with Google" />
      ) : (
        <button
          type="button"
          disabled={disabled || loading}
          className="google-fallback-button"
          onClick={handleManualClick}
        >
          {loading ? (
            <>
              <LoaderCircle className="auth-spinner" size={17} /> Connecting
            </>
          ) : (
            <>
              <GoogleMark /> Continue with Google
            </>
          )}
        </button>
      )}
    </div>
  );
}

function GoogleMark() {
  return (
    <svg className="google-mark" width="18" height="18" viewBox="0 0 18 18" aria-hidden="true">
      <path
        fill="#4285F4"
        d="M17.64 9.204c0-.638-.057-1.252-.164-1.841H9v3.481h4.844a4.14 4.14 0 0 1-1.796 2.716v2.259h2.908c1.702-1.567 2.684-3.875 2.684-6.615z"
      />
      <path
        fill="#34A853"
        d="M9 18c2.43 0 4.467-.806 5.956-2.18l-2.908-2.259c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332A8.997 8.997 0 0 0 9 18z"
      />
      <path
        fill="#FBBC05"
        d="M3.964 10.71A5.41 5.41 0 0 1 3.682 9c0-.593.102-1.17.282-1.71V4.958H.957A8.996 8.996 0 0 0 0 9c0 1.452.348 2.827.957 4.042l3.007-2.332z"
      />
      <path
        fill="#EA4335"
        d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0A8.997 8.997 0 0 0 .957 4.958L3.964 7.29C4.672 5.163 6.656 3.58 9 3.58z"
      />
    </svg>
  );
}
