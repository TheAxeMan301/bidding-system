import { NextResponse } from "next/server";
import { updateCollection, deleteCollection } from "@/lib/collections"

export async function PUT(
    request: Request,
    { params }: { params: { id: string }}
) {
    const updates = await request.json();
    const updated = updateCollection(params.id, updates);
    if (!updated) {
        return NextResponse.json({ error: "Not found"}, { status: 404 });
    }
    return NextResponse.json(updated);
}

export async function DELETE(
    _: Request,
    { params }: { params: { id: string }}
) {
    const { id } = await params;
    const success: boolean = deleteCollection(id);
    if (!success) {
        return NextResponse.json({ error: "Not found"}, { status: 404 });
    }
    return NextResponse.json({ success: true });
}
