/**
 * Flash browser-auth state — local profiles power the static prototype while retaining a clear
 * upgrade path to secure server authentication and official Google Identity credential hydration.
 */
import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from "react";

export type AuthUser = { id: string; name: string; email?: string; phone?: string; avatar?: string; flashClub: boolean; provider: "email" | "phone" | "Google" | "Apple" };
export type GoogleProfile = { id: string; name: string; email: string; avatar: string };
type Registration = { name: string; phone: string; email: string; password: string; flashClub: boolean };
type StoredCredential = Registration & { id: string; avatar: string };
type PhoneProfile = { phone: string; name: string; avatar: string; flashClub: boolean };
type GoogleTokenClaims = { sub?: string; name?: string; email?: string; picture?: string };
type AppleTokenClaims = { sub?: string; email?: string; iss?: string; exp?: number };

type AuthValue = {
  user: AuthUser | null;
  requestOtp: (phone: string) => boolean;
  verifyOtp: (phone: string, otp: string) => "existing" | "new" | false;
  completePhoneSignup: (phone: string, name: string) => boolean;
  loginWithPassword: (email: string, password: string) => boolean;
  registerAccount: (details: Registration) => boolean;
  hydrateGoogleCredential: (credential: string) => boolean;
  signInWithGoogleCredential: (credential: string) => Promise<boolean>;
  signInWithGoogleProfile: (profile: GoogleProfile) => void;
  signInWithAppleResponse: (idToken: string, userPayload?: any) => Promise<boolean>;
  signInWithSocial: (provider: "Apple") => void;
  signOut: () => void;
};

const AUTH_STORAGE_KEY = "flash-auth-user-v4";
const CREDENTIAL_STORAGE_KEY = "flash-auth-credentials-v1";
const PHONE_STORAGE_KEY = "flash-auth-phone-profiles-v1";
const AuthContext = createContext<AuthValue | null>(null);
const avatarFor = (seed: string) => `https://api.dicebear.com/9.x/personas/svg?seed=${encodeURIComponent(seed)}&backgroundColor=e2f800`;

function readItem<T>(key: string, fallback: T): T { try { return JSON.parse(localStorage.getItem(key) ?? JSON.stringify(fallback)); } catch { return fallback; } }

function decodeJwtPayload<T>(token: string): T | null {
  try {
    const payload = token.split(".")[1];
    if (!payload) return null;
    const decoded = atob(payload.replace(/-/g, "+").replace(/_/g, "/"));
    return JSON.parse(decodeURIComponent(Array.from(decoded).map((character) => `%${character.charCodeAt(0).toString(16).padStart(2, "0")}`).join(""))) as T;
  } catch {
    return null;
  }
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(() => readItem<AuthUser | null>(AUTH_STORAGE_KEY, null));
  const [credentials, setCredentials] = useState<StoredCredential[]>(() => readItem<StoredCredential[]>(CREDENTIAL_STORAGE_KEY, []));
  const [phoneProfiles, setPhoneProfiles] = useState<PhoneProfile[]>(() => readItem<PhoneProfile[]>(PHONE_STORAGE_KEY, []));

  useEffect(() => { if (user) localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(user)); else localStorage.removeItem(AUTH_STORAGE_KEY); }, [user]);
  useEffect(() => { localStorage.setItem(CREDENTIAL_STORAGE_KEY, JSON.stringify(credentials)); }, [credentials]);
  useEffect(() => { localStorage.setItem(PHONE_STORAGE_KEY, JSON.stringify(phoneProfiles)); }, [phoneProfiles]);

  const requestOtp = useCallback((phone: string) => /^\d{10}$/.test(phone.replace(/\D/g, "")), []);

  const verifyOtp = useCallback((phone: string, otp: string) => {
    const normalizedPhone = phone.replace(/\D/g, "");
    if (!/^\d{10}$/.test(normalizedPhone) || !/^\d{6}$/.test(otp)) return false;
    const known = phoneProfiles.find((profile) => profile.phone === normalizedPhone);
    if (!known) return "new";
    setUser({ id: `phone-${normalizedPhone}`, name: known.name, phone: `+91 ${normalizedPhone}`, avatar: known.avatar, flashClub: known.flashClub, provider: "phone" });
    return "existing";
  }, [phoneProfiles]);

  const completePhoneSignup = useCallback((phone: string, name: string) => {
    const normalizedPhone = phone.replace(/\D/g, ""); const cleanedName = name.trim();
    if (!/^\d{10}$/.test(normalizedPhone) || cleanedName.length < 2) return false;
    const profile: PhoneProfile = { phone: normalizedPhone, name: cleanedName, avatar: avatarFor(cleanedName), flashClub: false };
    setPhoneProfiles((current) => current.some((item) => item.phone === normalizedPhone) ? current : [...current, profile]);
    setUser({ id: `phone-${normalizedPhone}`, name: profile.name, phone: `+91 ${normalizedPhone}`, avatar: profile.avatar, flashClub: false, provider: "phone" });
    return true;
  }, []);

  const loginWithPassword = useCallback((email: string, password: string) => { const credential = credentials.find((entry) => entry.email.toLowerCase() === email.trim().toLowerCase() && entry.password === password); if (!credential) return false; setUser({ id: credential.id, name: credential.name, email: credential.email, phone: `+91 ${credential.phone}`, avatar: credential.avatar, flashClub: credential.flashClub, provider: "email" }); return true; }, [credentials]);

  const registerAccount = useCallback((details: Registration) => { const email = details.email.trim().toLowerCase(); const phone = details.phone.replace(/\D/g, ""); if (!details.name.trim() || !/^\d{10}$/.test(phone) || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || details.password.length < 6 || credentials.some((entry) => entry.email.toLowerCase() === email)) return false; const credential: StoredCredential = { ...details, id: `email-${email}`, email, phone, name: details.name.trim(), avatar: avatarFor(details.name) }; setCredentials((current) => [...current, credential]); setUser({ id: credential.id, name: credential.name, email: credential.email, phone: `+91 ${credential.phone}`, avatar: credential.avatar, flashClub: credential.flashClub, provider: "email" }); return true; }, [credentials]);

  const signInWithGoogleProfile = useCallback((profile: GoogleProfile) => setUser({ id: `google-${profile.id}`, name: profile.name, email: profile.email, avatar: profile.avatar || avatarFor(profile.email), flashClub: false, provider: "Google" }), []);

  const signInWithGoogleCredential = useCallback(async (credential: string): Promise<boolean> => {
    try {
      const res = await fetch("/api/auth/google", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ credential }),
      });
      if (res.ok) {
        const data = await res.json();
        if (data.user) {
          setUser(data.user);
          return true;
        }
      }
    } catch {
      /* fallback decoding below */
    }

    // Client-side JWT fallback parsing
    const claims = decodeJwtPayload<GoogleTokenClaims>(credential);
    if (!claims?.sub || !claims.email) return false;
    signInWithGoogleProfile({
      id: claims.sub,
      name: claims.name?.trim() || claims.email.split("@")[0],
      email: claims.email,
      avatar: claims.picture || avatarFor(claims.email),
    });
    return true;
  }, [signInWithGoogleProfile]);

  const hydrateGoogleCredential = useCallback((credential: string) => {
    const claims = decodeJwtPayload<GoogleTokenClaims>(credential);
    if (!claims?.sub || !claims.email) return false;
    signInWithGoogleProfile({ id: claims.sub, name: claims.name?.trim() || claims.email.split("@")[0], email: claims.email, avatar: claims.picture || avatarFor(claims.email) });
    return true;
  }, [signInWithGoogleProfile]);

  const signInWithAppleResponse = useCallback(async (idToken: string, userPayload?: any): Promise<boolean> => {
    try {
      const res = await fetch("/api/auth/apple", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ idToken, user: userPayload }),
      });
      if (res.ok) {
        const data = await res.json();
        if (data.user) {
          setUser(data.user);
          return true;
        }
      }
    } catch {
      /* fallback decoding below */
    }

    // Client-side JWT fallback parsing
    const claims = decodeJwtPayload<AppleTokenClaims>(idToken);
    if (!claims?.sub) return false;

    let fullName = "Apple User";
    if (userPayload?.name) {
      const first = userPayload.name.firstName || "";
      const last = userPayload.name.lastName || "";
      const constructed = `${first} ${last}`.trim();
      if (constructed) fullName = constructed;
    }

    const email = claims.email || userPayload?.email || `apple.${claims.sub.slice(0, 8)}@privaterelay.appleid.com`;
    setUser({
      id: `apple-${claims.sub}`,
      name: fullName,
      email: email,
      avatar: avatarFor(fullName),
      flashClub: false,
      provider: "Apple",
    });
    return true;
  }, []);

  const signInWithSocial = useCallback((provider: "Apple") => {
    // Left for backwards compatibility; real Apple button uses signInWithAppleResponse
    const email = `apple.user@privaterelay.appleid.com`;
    setUser({ id: "apple-user", name: "Apple User", email, avatar: avatarFor("Apple User"), flashClub: false, provider });
  }, []);

  const signOut = useCallback(() => setUser(null), []);

  const value = useMemo<AuthValue>(
    () => ({ user, requestOtp, verifyOtp, completePhoneSignup, loginWithPassword, registerAccount, hydrateGoogleCredential, signInWithGoogleCredential, signInWithGoogleProfile, signInWithAppleResponse, signInWithSocial, signOut }),
    [user, requestOtp, verifyOtp, completePhoneSignup, loginWithPassword, registerAccount, hydrateGoogleCredential, signInWithGoogleCredential, signInWithGoogleProfile, signInWithAppleResponse, signInWithSocial, signOut]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() { const context = useContext(AuthContext); if (!context) throw new Error("useAuth must be used inside AuthProvider"); return context; }
