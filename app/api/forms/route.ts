import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { formsStore } from "@/lib/formsStore";
import { UserRole } from "@/types/roles";
import { authOptions } from "@/lib/utils/authOptions";

export async function GET() {
  const forms = formsStore.getAll();
  return NextResponse.json(forms);
}

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);

  if (!session || session.user?.role !== UserRole.Admin) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const body = await req.json();
  const newForm = formsStore.create(body);
  return NextResponse.json(newForm);
}
