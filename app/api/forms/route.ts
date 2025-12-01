import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { formsStore } from "@/lib/formsStore";
import { UserRole } from "@/types/roles";
import { authOptions } from "@/lib/utils/authOptions";
import { formSchema } from "@/lib/schemas/form.schemas";

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
  const result = formSchema.safeParse(body);

  if (!result.success) {
    return NextResponse.json(
      { error: "Validation failed", details: result.error.issues },
      { status: 400 }
    );
  }

  const newForm = formsStore.create(result.data);
  return NextResponse.json(newForm, { status: 201 });
}
