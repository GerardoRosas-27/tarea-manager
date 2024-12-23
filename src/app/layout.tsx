
import "../styles/globals.css"

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" data-theme="dark">
      <body className="flex flex-col justify-between min-h-screen text-center">
        <header className="bg-blue-500 text-white w-full p-4">
          <h1 className="text-xl font-bold">Gestor de Tareas</h1>
        </header>
        <main className="flex flex-col items-center justify-center flex-grow">
          {children}
        </main>
        <footer className="bg-gray-500 text-white w-full py-2">
          © 2024 Gestor de Tareas. Todos los derechos reservados.
        </footer>
      </body>
    </html>
  );
}
