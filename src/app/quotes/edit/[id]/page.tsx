"use client";

import { Button } from "@/components/ui/button";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSet,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useActionState, startTransition, useEffect, useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { QUOTE_CATEGORIES, Quote } from "@/types/quotes";
import { redirect, useParams, useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  AddNewQuoteState,
  NewQuoteInput,
  newQuoteSchema,
} from "@/types/quotes";
import { updateQuote } from "./action";

const initialEditQuoteState: AddNewQuoteState = {
  success: false,
};

export default function EditQuotePage() {
  const params = useParams();
  const quoteId = params.id as string;
  const router = useRouter();

  const [existingQuote, setExistingQuote] = useState<Quote | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const [state, dispatchAction, isPending] = useActionState<
    AddNewQuoteState,
    FormData
  >(updateQuote, initialEditQuoteState);

  const {
    register,
    trigger,
    setValue,
    reset,
    formState: { errors: clientSideErrors },
  } = useForm<NewQuoteInput>({
    mode: "onBlur",
    resolver: zodResolver(newQuoteSchema),
  });

  useEffect(() => {
    async function fetchQuote() {
      try {
        const response = await fetch(`/api/quotes/${quoteId}`);
        if (!response.ok) throw new Error("Söz bulunamadı");

        const data = await response.json();
        setExistingQuote(data);

        reset({
          author: data.author,
          quote: data.quote,
          category: data.category as any,
        });
        setValue("category", data.category, { shouldValidate: false });
      } catch (error) {
        console.error("Hata:", error);
      } finally {
        setIsLoading(false);
      }
    }

    if (quoteId) {
      fetchQuote();
    }
  }, [quoteId, reset, setValue]);

  const handleClientValidation = async (formData: FormData) => {
    const isFormValid = await trigger();
    if (isFormValid) {
      formData.append("quoteId", quoteId);

      startTransition(() => {
        dispatchAction(formData);
      });
    }
  };

  if (isLoading)
    return <p className="text-center pt-20">Veriler yükleniyor...</p>;
  if (isPending) return <p className="text-center pt-20">Kaydediliyor...</p>;
  if (state.success) {
    redirect("/");
  }

  return (
    <main className="min-h-screen flex-col justify-items-center pt-20">
      <form className="w-full max-w-md" action={handleClientValidation}>
        <FieldGroup>
          <FieldSet>
            <FieldLegend>Edit Quote</FieldLegend>

            <FieldGroup>
              <Field>
                <FieldLabel htmlFor="author">Author</FieldLabel>
                <Input
                  type="text"
                  id="author"
                  placeholder="Evil Rabbit"
                  aria-invalid={
                    !!state.errors?.fieldErrors?.author ||
                    !!clientSideErrors.author
                  }
                  defaultValue={existingQuote?.author || state.data?.author}
                  {...register("author")}
                  aria-describedby={"author-error"}
                />

                <div id="author-error" aria-live="polite">
                  {clientSideErrors.author ? (
                    <FieldError errors={clientSideErrors.author.message}>
                      {clientSideErrors.author.message}
                    </FieldError>
                  ) : state.errors?.fieldErrors?.author ? (
                    <FieldError errors={state.errors?.fieldErrors?.author}>
                      {state.errors?.fieldErrors?.author}
                    </FieldError>
                  ) : null}
                </div>
              </Field>

              <Field>
                <FieldLabel htmlFor="quote">Quote</FieldLabel>
                <Textarea
                  id="quote"
                  className="resize-none"
                  aria-invalid={!!state.errors?.fieldErrors?.quote}
                  defaultValue={existingQuote?.quote || state.data?.quote}
                  {...register("quote")}
                  aria-describedby="quote-error"
                />
                <div id="quote-error" aria-live="polite">
                  {clientSideErrors.quote ? (
                    <FieldError errors={clientSideErrors.quote.message}>
                      {clientSideErrors.quote.message}
                    </FieldError>
                  ) : state.errors?.fieldErrors?.quote ? (
                    <FieldError errors={state.errors?.fieldErrors?.quote}>
                      {state.errors?.fieldErrors?.quote}
                    </FieldError>
                  ) : null}
                </div>
              </Field>

              <Field>
                <FieldLabel htmlFor="category">Category</FieldLabel>
                <Select
                  name="category"
                  defaultValue={existingQuote?.category || state.data?.category}
                  onValueChange={(value) => {
                    setValue("category", value as NewQuoteInput["category"], {
                      shouldValidate: true,
                    });
                  }}
                >
                  <SelectTrigger
                    id="category"
                    aria-invalid={
                      !!state.errors?.fieldErrors?.category ||
                      !!clientSideErrors.category
                    }
                    aria-describedby="category-error"
                  >
                    <SelectValue placeholder="Select a category" />
                  </SelectTrigger>
                  <SelectContent>
                    {QUOTE_CATEGORIES.map((category) => (
                      <SelectItem key={category} value={category}>
                        {category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <div id="category-error" aria-live="polite">
                  {clientSideErrors.category ? (
                    <FieldError errors={clientSideErrors.category.message}>
                      {clientSideErrors.category.message}
                    </FieldError>
                  ) : state.errors?.fieldErrors?.category ? (
                    <FieldError errors={state.errors?.fieldErrors?.category}>
                      {state.errors?.fieldErrors?.category}
                    </FieldError>
                  ) : null}
                </div>
              </Field>
            </FieldGroup>
          </FieldSet>
          <Field orientation="horizontal">
            <Button type="submit" disabled={isPending}>
              Update
            </Button>
            <Button
              variant="outline"
              type="button"
              disabled={isPending}
              onClick={() => router.push("/")}
            >
              Cancel
            </Button>
          </Field>
        </FieldGroup>
      </form>
      {state.message && (
        <p className="mt-10" aria-live="polite" role="status">
          {state.message}
        </p>
      )}
    </main>
  );
}
