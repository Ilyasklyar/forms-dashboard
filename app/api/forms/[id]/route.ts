import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { formsStore } from "@/lib/formsStore";
import { UserRole } from "@/types/roles";
import { authOptions } from "@/lib/utils/authOptions";

export async function GET(req: NextRequest) {
  const id = req.url.split("/").pop()!;
  const form = formsStore.getById(id);
  if (!form) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json(form);
}

export async function PUT(req: NextRequest) {
  const session = await getServerSession(authOptions);

  if (!session || session.user?.role !== UserRole.Admin) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const id = req.url.split("/").pop()!;
  const body = await req.json();
  const updatedForm = formsStore.update(id, body);

  if (!updatedForm)
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json(updatedForm);
}

export async function DELETE(req: NextRequest) {
  const session = await getServerSession(authOptions);

  if (!session || session.user?.role !== UserRole.Admin) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const id = req.url.split("/").pop()!;
  formsStore.remove(id);
  return NextResponse.json({ message: "Deleted" });
}
