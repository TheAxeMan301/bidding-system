import { NextResponse } from "next/server";
import { getBids, acceptBid, Bid } from "@/lib/bids";

export async function GET(
    { params }: { params: { id: string }}
) {
    const bid_id = params.id;
    const success = acceptBid(bid_id);
    return NextResponse.json({success,});
}
