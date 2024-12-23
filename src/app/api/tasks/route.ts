import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

// Manejo del método POST (crear una nueva tarea)
export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { title, description } = body;

        if (!title || !description) {
            return NextResponse.json({ error: "El título y la descripción son requeridos" }, { status: 400 });
        }

        const task = await prisma.task.create({
            data: { title, description },
        });

        return NextResponse.json(task, { status: 201 });
    } catch (error) {
        console.error("Error saving task:", error);
        return NextResponse.json({ error: "Failed to save task" }, { status: 500 });
    }
}

// Manejo del método GET (consultar todas las tareas)
export async function GET(request: Request) {
    try {
        const { searchParams } = new URL(request.url);
        const id = searchParams.get("id");

        if (id) {
            // Si se proporciona un ID, buscar la tarea específica
            const task = await prisma.task.findUnique({
                where: { id: parseInt(id) },
            });

            if (!task) {
                return NextResponse.json({ error: "Tarea no encontrada" }, { status: 404 });
            }

            return NextResponse.json(task, { status: 200 });
        }

        // Si no se proporciona un ID, devolver todas las tareas
        const tasks = await prisma.task.findMany();
        return NextResponse.json(tasks, { status: 200 });
    } catch (error) {
        console.error("Error al obtener las tareas:", error);
        return NextResponse.json({ error: "Error al obtener las tareas" }, { status: 500 });
    }
}




// Manejo del método PUT (actualizar tarea)
export async function PUT(request: Request) {
    try {
        const body = await request.json();
        const { id, title, description } = body;

        if (!id || !title || !description) {
            return NextResponse.json({ error: "ID, título y descripción son requeridos" }, { status: 400 });
        }

        const updatedTask = await prisma.task.update({
            where: { id: parseInt(id) },
            data: { title, description },
        });

        return NextResponse.json(updatedTask, { status: 200 });
    } catch (error) {
        console.error("Error updating task:", error);
        return NextResponse.json({ error: "Failed to update task" }, { status: 500 });
    }
}

// Manejo del método DELETE (eliminar tarea)
export async function DELETE(request: Request) {
    try {
        const { searchParams } = new URL(request.url);
        const id = searchParams.get("id");

        if (!id) {
            return NextResponse.json({ error: "El ID es requerido" }, { status: 400 });
        }

        await prisma.task.delete({
            where: { id: parseInt(id) },
        });

        return NextResponse.json({ message: "Tarea eliminada con éxito" }, { status: 200 });
    } catch (error) {
        console.error("Error deleting task:", error);
        return NextResponse.json({ error: "Failed to delete task" }, { status: 500 });
    }
}
