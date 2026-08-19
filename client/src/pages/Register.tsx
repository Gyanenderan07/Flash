/**
 * Flash registration route — a crisp account-creation flow with live validation and an
 * opt-in Flash Club signal, using the established obsidian, white, and Flash Volt system.
 */
import { useMemo, useState } from "react";
import { ArrowRight, Check, Eye, EyeOff, LoaderCircle, LockKeyhole, Mail, Phone, UserRound, Zap } from "lucide-react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { toast } from "sonner";
import { useAuth } from "@/contexts/AuthContext";

type RegisterState = { name: string; phone: string; email: string; password: string; flashClub: boolean };
const initialState: RegisterState = { name: "", phone: "", email: "", password: "", flashClub: true };

function passwordScore(password: string) { return [password.length >= 8, /[A-Z]/.test(password), /\d/.test(password), /[^A-Za-z0-9]/.test(password)].filter(Boolean).length; }
function strengthLabel(score: number) { return score <= 1 ? "Weak" : score <= 3 ? "Medium" : "Strong"; }

export default function Register() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { registerAccount } = useAuth();
  const [form, setForm] = useState<RegisterState>(initialState);
  const [showPassword, setShowPassword] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const score = useMemo(() => passwordScore(form.password), [form.password]);
  const mobileValid = /^\d{10}$/.test(form.phone);
  const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email);
  const redirectTo = searchParams.get("redirect");
  const loginUrl = redirectTo ? `/login?redirect=${encodeURIComponent(redirectTo)}` : "/login";
  const submit = (event: React.FormEvent) => { event.preventDefault(); setSubmitted(true); if (!form.name.trim() || !mobileValid || !emailValid || form.password.length < 6) { toast.error("Complete each field before creating your account."); return; } setLoading(true); window.setTimeout(() => { const created = registerAccount(form); setLoading(false); if (!created) { toast.error("That email already has a local Flash account. Try signing in."); return; } toast.success("Your Flash account is ready."); navigate(redirectTo?.startsWith("/") ? redirectTo : "/account"); }, 500); };
  return <section className="register-page shell"><div className="register-page__head"><Link className="auth-poster__brand" to="/"><Zap fill="currentColor" /> Flash</Link><p>Already have an account? <Link to={loginUrl}>Log in</Link></p></div><div className="register-stage"><section className="register-intro"><span className="register-intro__bolt"><Zap fill="currentColor" /></span><p className="eyebrow">Create your fast lane</p><h1>Make every<br /><em>drop yours.</em></h1><p>A faster route to saved finds, orders, and Flash Club perks starts here.</p><div className="register-benefits"><p><Check size={16} /> Browser-local account state for this storefront prototype</p><p><Check size={16} /> Flash Club opt-in at checkout</p><p><Check size={16} /> Order activity once you complete a purchase</p></div></section><form className="register-form" onSubmit={submit}><div className="register-form__heading"><p className="eyebrow">Account details</p><h2>Get moving.</h2></div><label className="auth-field">Full name<div className="input-icon-field"><UserRound size={17} /><input autoComplete="name" value={form.name} onChange={(event) => setForm({ ...form, name: event.target.value })} placeholder="Your full name" /></div>{submitted && !form.name.trim() && <small className="field-error">Enter your name.</small>}</label><label className="auth-field">Mobile number<div className="phone-field"><span>+91</span><input autoComplete="tel" inputMode="numeric" maxLength={10} value={form.phone} onChange={(event) => setForm({ ...form, phone: event.target.value.replace(/\D/g, "") })} placeholder="10-digit mobile number" /></div>{submitted && !mobileValid && <small className="field-error">Enter a valid 10-digit mobile number.</small>}</label><label className="auth-field">Email address<div className="input-icon-field"><Mail size={17} /><input autoComplete="email" type="email" value={form.email} onChange={(event) => setForm({ ...form, email: event.target.value })} placeholder="you@example.com" /></div>{submitted && !emailValid && <small className="field-error">Enter a valid email address.</small>}</label><label className="auth-field">Create password<div className="input-icon-field"><LockKeyhole size={17} /><input autoComplete="new-password" type={showPassword ? "text" : "password"} value={form.password} onChange={(event) => setForm({ ...form, password: event.target.value })} placeholder="At least 8 characters" /><button type="button" aria-label={showPassword ? "Hide password" : "Show password"} onClick={() => setShowPassword((current) => !current)}>{showPassword ? <EyeOff size={17} /> : <Eye size={17} />}</button></div><div className="strength-meter"><i className={`strength-${score}`}><b /></i><span>{form.password ? strengthLabel(score) : "Password strength"}</span></div>{submitted && form.password.length < 6 && <small className="field-error">Use at least 6 characters.</small>}</label><label className="club-opt-in"><input type="checkbox" checked={form.flashClub} onChange={(event) => setForm({ ...form, flashClub: event.target.checked })} /><span><b>Join Flash Club automatically</b><small>Unlock exclusive 10% instant cashback on prepaid orders.</small></span></label><button className="lime-button register-submit" disabled={loading} type="submit">{loading ? <><LoaderCircle className="auth-spinner" size={17} /> Creating account</> : <>Create account <ArrowRight size={18} /></>}</button><p className="auth-switch">Already have an account? <Link to={loginUrl}>Log in</Link></p></form></div></section>;
}
