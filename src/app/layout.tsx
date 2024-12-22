export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body >
        <header >
          <h1 className="text-xl font-bold">Gestor de Tareas</h1>
        </header>
        <main >
          {children}
        </main>
        <footer >
          © 2024 Gestor de Tareas. Todos los derechos reservados.
        </footer>
      </body>
    </html>
  );
}
