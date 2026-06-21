import { redirect } from "next/navigation";

export default function LoginRedirect() {
  redirect("https://thryve-dashboard-production.up.railway.app/login");
}
