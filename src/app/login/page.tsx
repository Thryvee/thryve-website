import { redirect } from "next/navigation";

export default function LoginRedirect() {
  redirect("https://thryve-dashboard.vercel.app/login");
}
