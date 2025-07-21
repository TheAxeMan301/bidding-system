import { NextResponse } from "next/server";
import { getBids, addBid, Bid } from "@/lib/bids";

export async function GET() {
    return NextResponse.json(getBids());
}

export async function POST(request: Request) {
    const newBid: Bid = await request.json();
    if (!newBid) {
        return NextResponse.json({ error: "Bid data required"}, { status: 400 });
    }
    const collection_id: string = newBid.collection_id;
    const user_id: string = newBid.user_id;
    const price: number = newBid.price;
    const result = addBid(collection_id, user_id, price);
    return NextResponse.json(result, { status: 201 });
}
