import { NextResponse } from "next/server";
import { getCollections, addCollection, Collection } from "@/lib/collections";

export async function GET() {
    return NextResponse.json(getCollections());
}

export async function POST(request: Request) {
    const newCollection: Collection = await request.json();
    if (!newCollection) {
        return NextResponse.json({ error: "Collection data required"}, { status: 400 });
    }
    const name: string = newCollection.name;
    const owner_id: string = newCollection.owner_id;
    const description: string = newCollection.description;
    const stock: number = newCollection.stock;
    const price: number = newCollection.price;
    const result = addCollection(name, owner_id, description, stock, price);
    return NextResponse.json(result, { status: 201 });
}
