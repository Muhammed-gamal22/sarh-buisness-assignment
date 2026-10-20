
import { useMemo, useRef } from "react";
import { useForm, useFieldArray, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQueryClient } from "@tanstack/react-query";
import { Plus, Trash2 } from "lucide-react";

import useModalStore from "@/store/modal-store";
import ModalLayout from "@/Layouts/ModalLayout";
import { postData } from "@/services/services";
import {
  createOrderSchema,
  type CreateOrderFormValues,
  type CreateOrderInput,
} from "@/schemas/order.schema";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const AddOrderModal = () => {
  const { isOpen, setOpen } = useModalStore();
  const queryClient = useQueryClient();


  const idempotencyKeyRef = useRef<string | null>(null);

  const {
    register,
    control,
    handleSubmit,
    reset,
    setError,
    clearErrors,
    formState: { errors, isSubmitting },
  } = useForm<
    CreateOrderFormValues,
    unknown,
    CreateOrderInput
  >({
    resolver: zodResolver(createOrderSchema),
    defaultValues: {
      customerName: "",
      customerEmail: "",
      items: [
        {
          productName: "",
          quantity: 1,
          unitPrice: 0,
        },
      ],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "items",
  });

  const items = useWatch({
    control,
    name: "items",
  });

  const totalAmount = useMemo(() => {
    return (items ?? []).reduce((total, item) => {
      const quantity = Number(item?.quantity);
      const unitPrice = Number(item?.unitPrice);

      if (
        !Number.isFinite(quantity) ||
        !Number.isFinite(unitPrice)
      ) {
        return total;
      }

      return total + quantity * unitPrice;
    }, 0);
  }, [items]);

  const handleOpenChange = (open: boolean) => {
    if (isSubmitting) return;

    setOpen(open);

    if (!open) {
      reset();
      clearErrors();

      idempotencyKeyRef.current = null;
    }
  };

  const onSubmit = async (values: CreateOrderInput) => {
    clearErrors("root.server");


    if (!idempotencyKeyRef.current) {
      idempotencyKeyRef.current = crypto.randomUUID();
    }

    try {
      await postData(
        "/orders",
        {
          customerName: values.customerName,
          customerEmail: values.customerEmail,
          items: values.items,
        },
        {
          headers: {
            "Idempotency-Key": idempotencyKeyRef.current,
          },
        }
      );

      idempotencyKeyRef.current = null;

      await queryClient.invalidateQueries({
        queryKey: ["orders"],
      });

      setOpen(false);
      reset();
      clearErrors();
    } catch (error) {
      console.error("Failed to create order:", error);

      setError("root.server", {
        type: "server",
        message:
          "تعذر التأكد من إنشاء الطلب. حاول مرة أخرى.",
      });
    }
  };

  const serverError = errors.root?.server?.message;

  return (
    <ModalLayout
      open={isOpen}
      onOpenChange={handleOpenChange}
      className="max-w-2xl"
    >
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="max-h-[85vh] space-y-5 overflow-y-auto p-5"
        dir="rtl"
        noValidate
      >
        <div>
          <h2 className="text-xl font-bold">
            إضافة طلب جديد
          </h2>
          <p className="mt-1 text-sm text-muted-foreground">
            أدخل بيانات العميل والمنتجات المطلوبة.
          </p>
        </div>
        <div className="space-y-2">
          <Label htmlFor="customerName">
            اسم العميل
          </Label>

          <Input
            id="customerName"
            maxLength={100}
            placeholder="اسم العميل"
            disabled={isSubmitting}
            aria-invalid={!!errors.customerName}
            {...register("customerName")}
          />

          {errors.customerName && (
            <p role="alert" className="text-sm text-destructive">
              {errors.customerName.message}
            </p>
          )}
        </div>
        <div className="space-y-2">
          <Label htmlFor="customerEmail">
            البريد الإلكتروني
          </Label>

          <Input
            id="customerEmail"
            type="email"
            maxLength={254}
            placeholder="customer@example.com"
            disabled={isSubmitting}
            aria-invalid={!!errors.customerEmail}
            {...register("customerEmail")}
          />

          {errors.customerEmail && (
            <p role="alert" className="text-sm text-destructive">
              {errors.customerEmail.message}
            </p>
          )}
        </div>
        <div className="space-y-3">
          <div className="flex items-center justify-between gap-3">
            <Label>المنتجات</Label>

            <Button
              type="button"
              variant="outline"
              size="sm"
              disabled={isSubmitting || fields.length >= 100}
              onClick={() =>
                append({
                  productName: "",
                  quantity: 1,
                  unitPrice: 0,
                })
              }
            >
              <Plus className="ml-1 h-4 w-4" />
              إضافة منتج
            </Button>
          </div>

          {typeof errors.items?.message === "string" && (
            <p role="alert" className="text-sm text-destructive">
              {errors.items.message}
            </p>
          )}

          {fields.map((field, index) => (
            <div
              key={field.id}
              className="grid grid-cols-1 gap-3 rounded-xl border p-3 sm:grid-cols-[minmax(0,1fr)_100px_130px_auto] sm:items-start"
            >
              <div className="space-y-2">
                <Label htmlFor={`product-${index}`}>
                  اسم المنتج
                </Label>

                <Input
                  id={`product-${index}`}
                  maxLength={100}
                  placeholder="مثال: Keyboard"
                  disabled={isSubmitting}
                  aria-invalid={
                    !!errors.items?.[index]?.productName
                  }
                  {...register(
                    `items.${index}.productName` as const
                  )}
                />

                {errors.items?.[index]?.productName && (
                  <p role="alert" className="text-sm text-destructive">
                    {errors.items[index]?.productName?.message}
                  </p>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor={`quantity-${index}`}>
                  الكمية
                </Label>

                <Input
                  id={`quantity-${index}`}
                  type="number"
                  min={1}
                  max={10000}
                  step={1}
                  disabled={isSubmitting}
                  aria-invalid={
                    !!errors.items?.[index]?.quantity
                  }
                  {...register(
                    `items.${index}.quantity` as const,
                    { valueAsNumber: true }
                  )}
                />

                {errors.items?.[index]?.quantity && (
                  <p role="alert" className="text-sm text-destructive">
                    {errors.items[index]?.quantity?.message}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor={`price-${index}`}>
                  سعر الوحدة
                </Label>

                <Input
                  id={`price-${index}`}
                  type="number"
                  min={0}
                  step="any"
                  disabled={isSubmitting}
                  aria-invalid={
                    !!errors.items?.[index]?.unitPrice
                  }
                  {...register(
                    `items.${index}.unitPrice` as const,
                    { valueAsNumber: true }
                  )}
                />

                {errors.items?.[index]?.unitPrice && (
                  <p role="alert" className="text-sm text-destructive">
                    {errors.items[index]?.unitPrice?.message}
                  </p>
                )}
              </div>

              <Button
                type="button"
                variant="ghost"
                size="icon"
                title="حذف المنتج"
                aria-label={`حذف المنتج ${index + 1}`}
                disabled={isSubmitting || fields.length === 1}
                onClick={() => remove(index)}
              >
                <Trash2 className="h-4 w-4 text-destructive" />
              </Button>
            </div>
          ))}
        </div>

        {/* Total */}
        <div className="flex items-center justify-between rounded-xl bg-muted/60 p-4">
          <span className="text-sm text-muted-foreground">
            إجمالي الطلب
          </span>

          <span className="text-xl font-bold">
            {new Intl.NumberFormat("en-US", {
              maximumFractionDigits: 2,
            }).format(totalAmount)}
          </span>
        </div>

        {serverError && (
          <p role="alert" className="text-sm text-destructive">
            {serverError}
          </p>
        )}

        {/* Actions */}
        <div className="flex justify-end gap-2 border-t pt-4">
          <Button
            type="button"
            variant="outline"
            disabled={isSubmitting}
            onClick={() => handleOpenChange(false)}
          >
            إلغاء
          </Button>

          <Button
            type="submit"
            disabled={isSubmitting}
          >
            {isSubmitting
              ? "جاري الإضافة..."
              : "إنشاء الطلب"}
          </Button>
        </div>
      </form>
    </ModalLayout>
  );
};

export default AddOrderModal;
