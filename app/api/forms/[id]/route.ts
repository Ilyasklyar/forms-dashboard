import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { formsStore } from "@/lib/formsStore";
import { UserRole } from "@/types/roles";
import { authOptions } from "@/lib/utils/authOptions";
import { formSchema } from "@/lib/schemas/form.schemas";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const form = formsStore.getById(id);
  if (!form) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json(form);
}

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await getServerSession(authOptions);

  if (!session || session.user?.role !== UserRole.Admin) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const { id } = await params;
  const body = await req.json();
  const result = formSchema.safeParse(body);

  if (!result.success) {
    return NextResponse.json(
      { error: "Validation failed", details: result.error.issues },
      { status: 400 }
    );
  }

  const updatedForm = formsStore.update(id, result.data);

  if (!updatedForm)
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json(updatedForm);
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await getServerSession(authOptions);

  if (!session || session.user?.role !== UserRole.Admin) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const { id } = await params;

  const form = formsStore.getById(id);
  if (!form) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  formsStore.remove(id);
  return NextResponse.json({ message: "Deleted" });
}
