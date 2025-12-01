"use client";

import { Form } from "@/lib/schemas/form.schemas";
import { useState } from "react";
import { deleteForm } from "@/lib/service/forms";
import Button from "@/components/button";
import { useToastStore } from "@/lib/store/toast";
import Link from "next/link";
import { FormStatus } from "@/types/forms";
import { formatDate } from "@/lib/utils/date";

interface FormPageUIProps {
  forms: Form[];
  isAdmin: boolean;
}

export default function FormPageUI({ forms, isAdmin }: FormPageUIProps) {
  const [filter, setFilter] = useState<string>("");
  const [localForms, setLocalForms] = useState<Form[]>(forms);
  const { showToast } = useToastStore();

  const filteredForms = localForms.filter((f) =>
    filter ? f.status === filter : true
  );

  const handleDelete = async (id: string) => {
    try {
      await deleteForm(id);
      setLocalForms((prev) => prev.filter((f) => f.id !== id));
      showToast("Form deleted successfully", "success");
    } catch (err) {
      console.log("Failed to delete form:", err);
      showToast("Failed to delete form", "error");
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-col md:flex-row gap-2 items-center justify-between">
        {isAdmin && (
          <Link
            href={"/forms/new"}
            className="min-w-fit py-2 px-4 bg-gray-500 text-white rounded hover:bg-gray-700"
          >
            Create New Form
          </Link>
        )}

        <div className="flex gap-2 items-center justify-end">
          <span>Filter:</span>
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="border p-2 rounded"
          >
            <option value="">All</option>
            <option value={FormStatus.Draft}>Draft</option>
            <option value={FormStatus.Active}>Active</option>
            <option value={FormStatus.Archived}>Archived</option>
          </select>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full min-w-[600px] border-collapse border border-gray-300 text-sm md:text-base">
          <thead>
            <tr>
              <th className="border p-2 text-center">Title</th>
              <th className="border p-2 text-center">Description</th>
              <th className="border p-2 text-center">Fields</th>
              <th className="border p-2 text-center">Status</th>
              <th className="border p-2 text-center">Updated At</th>
              {isAdmin && <th className="border p-2">Actions</th>}
            </tr>
          </thead>
          <tbody>
            {filteredForms.length === 0 ? (
              <tr>
                <td colSpan={isAdmin ? 6 : 5} className="text-center p-4">
                  No forms available
                </td>
              </tr>
            ) : (
              filteredForms.map((form) => (
                <tr key={form.id}>
                  <td className="border p-2">{form.title}</td>
                  <td className="border p-2">{form.description}</td>
                  <td className="border p-2">{form.fieldsCount}</td>
                  <td className="border p-2">{form.status}</td>
                  <td className="border p-2">{formatDate(form.updatedAt)}</td>
                  {isAdmin && (
                    <td className="border p-2 flex justify-center gap-8 items-center">
                      <Link
                        href={`/forms/${form.id}`}
                        className="text-grey-600 hover:underline"
                      >
                        Update
                      </Link>
                      <Button
                        variant="danger"
                        label="Delete"
                        onClick={() => handleDelete(form.id)}
                      />
                    </td>
                  )}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
