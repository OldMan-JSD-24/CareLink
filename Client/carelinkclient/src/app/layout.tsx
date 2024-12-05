import "./globals.css";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="flex bg-gray-100 min-h-screen">
        {/* Sidebar */}
        <aside className="w-64 bg-blue-600 text-white flex flex-col">
          <div className="p-6 text-2xl font-bold">CareLink</div>
          <nav className="mt-6 flex-1">
            <ul className="space-y-2">
              <li>
                <a
                  href="/"
                  className="block px-6 py-3 hover:bg-blue-500 rounded-lg"
                >
                  Dashboard
                </a>
              </li>
              <li>
                <a
                  href="/search"
                  className="block px-6 py-3 hover:bg-blue-500 rounded-lg"
                >
                  Rechercher
                </a>
              </li>
              <li>
                <a
                  href="/profile"
                  className="block px-6 py-3 hover:bg-blue-500 rounded-lg"
                >
                  Profil
                </a>
              </li>
              <li>
                <a
                  href="/booking"
                  className="block px-6 py-3 hover:bg-blue-500 rounded-lg"
                >
                  Réservations
                </a>
              </li>
            </ul>
          </nav>
          <div className="p-6 text-sm text-center">
            © 2024 CareLink
          </div>
        </aside>

        {/* Main content */}
        <div className="flex-1 flex flex-col">
          {/* Header */}
          <header className="bg-white shadow px-6 py-4">
            <div className="flex justify-between items-center">
              <h1 className="text-xl font-bold text-gray-700">
                CareLink Dashboard
              </h1>
              <nav className="space-x-4">
                <a
                  href="/profile"
                  className="text-gray-600 hover:text-blue-600"
                >
                  Mon Profil
                </a>
                <a
                  href="/logout"
                  className="text-gray-600 hover:text-blue-600"
                >
                  Déconnexion
                </a>
              </nav>
            </div>
          </header>

          {/* Page content */}
          <main className="flex-1 p-6">{children}</main>
        </div>
      </body>
    </html>
  );
}
