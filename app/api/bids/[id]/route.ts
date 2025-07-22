import { NextResponse } from "next/server";
import { updateBid, deleteBid } from "@/lib/bids"

export async function PUT(
    request: Request,
    { params }: { params: { id: string }}
) {
    const updates = await request.json();
    const updated = updateBid(params.id, updates);
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
    const success: boolean = deleteBid(params.id);
    if (!success) {
        return NextResponse.json({ error: "Not found"}, { status: 404 });
    }
    return NextResponse.json({ success: true });
}
