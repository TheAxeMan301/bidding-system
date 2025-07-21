import { NextResponse } from "next/server";
import { getUsers, User} from "@/lib/users";

export async function GET() {
    return NextResponse.json(getUsers());
}
