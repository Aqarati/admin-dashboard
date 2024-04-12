import { deleteCookie } from "@/lib/cookieLib";
import { LogOut } from "lucide-react";
import LogoutButton from "./components/logoutButton";

export default function Home() {

  return (
    <>
      <h1>Hello wrold</h1>
      <br />
      <a href="/auth" className="hover:text-red-600 text-center flex">auth form</a>
      <a href="/dashboard" className="hover:text-red-600 text-center flex">dashboard </a>
      <br />
      < LogoutButton />
    </>
  );
}
