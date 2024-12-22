"use client";

import Link from "next/link";

export default function Home() {
  return (
    <div className="grid place-items-center w-full h-full">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl text-center">
        <div>
          <h1 className="text-4xl font-bold mb-4">Bienvenido a Tarea Manager</h1>
          <p className="text-lg text-gray-600">
            Gestiona tus tareas de manera sencilla y organizada.
          </p>
        </div>
        <div>
          <Link
            href="/tasks"
            className="bg-blue-500 text-white px-6 py-3 rounded text-lg shadow-lg inline-block"
          >
            Ir a la Gestión de Tareas
          </Link>
        </div>
      </div>
    </div>
  );
}
