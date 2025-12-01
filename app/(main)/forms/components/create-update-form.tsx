"use client";

import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import Button from "@/components/button";
import { Form, FormData, formSchema } from "@/lib/schemas/form.schemas";
import FormInput from "@/components/form-input";
import { createForm, updateForm } from "@/lib/service/forms";
import { useState } from "react";
import { useToastStore } from "@/lib/store/toast";

interface CreateUpdateFormProps {
  isUpdate?: boolean;
  formData?: Form;
}

export default function CreateUpdateForm({
  isUpdate = false,
  formData,
}: CreateUpdateFormProps) {
  const router = useRouter();
  const { showToast } = useToastStore();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
      fieldsCount: 0,
      ...formData,
    },
  });

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);
    try {
      if (isUpdate && formData?.id) {
        await updateForm(formData.id, data);
        showToast("Form updated successfully", "success");
      } else {
        await createForm(data);
        showToast("Form created successfully", "success");
      }

      router.refresh();
      router.push("/forms");
    } catch (err) {
      console.log(err);
      showToast("Failed to save form", "error");
    } finally {
      setIsSubmitting(false);
    }
  };

  const getButtonText = () => {
    if (isUpdate) return isSubmitting ? "Updating..." : "Update";
    return isSubmitting ? "Creating..." : "Create";
  };

  return (
    <div className="flex items-center justify-center mt-10">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="border p-6 rounded w-[360px] flex flex-col gap-4"
        noValidate
      >
        <h2 className="text-xl font-semibold text-center">
          {isUpdate ? "Update form" : "Create form"}
        </h2>

        <FormInput
          label="Title"
          placeholder="Enter title"
          registration={register("title")}
          error={errors.title}
        />

        <FormInput
          label="Description"
          placeholder="Optional"
          registration={register("description")}
          error={errors.description}
        />

        <FormInput
          label="Fields count"
          type="number"
          registration={register("fieldsCount", { valueAsNumber: true })}
          error={errors.fieldsCount}
        />

        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium">Status</label>
          <select
            {...register("status")}
            className={`border p-2 rounded outline-none ${
              errors.status ? "border-red-500" : "border-gray-300"
            }`}
          >
            <option value="">Select Status</option>
            <option value="draft">Draft</option>
            <option value="active">Active</option>
            <option value="archived">Archived</option>
          </select>

          {errors.status && (
            <p className="text-red-500 text-xs">{errors.status.message}</p>
          )}
        </div>

        <Button label={getButtonText()} type="submit" disabled={isSubmitting} />
      </form>
    </div>
  );
}
