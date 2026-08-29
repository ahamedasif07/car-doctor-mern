import { redirect } from "next/navigation";

export default function DashboardAddServiceRedirect() {
  redirect("/dashboard/services/add");
}
