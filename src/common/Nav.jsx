import { useRouter } from "next/router";

export default function Nav() {
  const router = useRouter();
  const route = router.pathname.substring(1);
  const withNav = ["login", "dashboard/edit"];

  for (const iterator of withNav) {
    if (route.startsWith(iterator)) {
      return (
        <nav className="bg-white shadow">
          <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
            <h1 className="text-3xl font-bold text-gray-900 capitalize">{iterator}</h1>
          </div>
        </nav>
      );
    }
  }
  return false;
}
