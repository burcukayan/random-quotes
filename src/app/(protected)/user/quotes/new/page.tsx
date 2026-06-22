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
import { useActionState, startTransition } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { QUOTE_CATEGORIES } from "@/types/quotes";
import { addNewQuote } from "./action";
import { redirect } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  AddNewQuoteState,
  NewQuoteInput,
  newQuoteSchema,
} from "@/types/quotes";

const initialAddNewQuoteState: AddNewQuoteState = {
  success: false,
};

export default function AddNewQuotePage() {
  const [state, dispatchAction, isPending] = useActionState<
    AddNewQuoteState,
    FormData
  >(addNewQuote, initialAddNewQuoteState);

  const {
    register,
    trigger,
    setValue,
    formState: { errors: clientSideErrors },
  } = useForm<NewQuoteInput>({
    mode: "onBlur",
    resolver: zodResolver(newQuoteSchema),
  });

  const handleClientValidation = async (formData: FormData) => {
    const isFormValid = await trigger();
    if (isFormValid) {
      startTransition(() => {
        dispatchAction(formData);
      });
    }
  };

  if (isPending) return <p>Loading...</p>;

  if (state.success) return redirect("/user/quotes/new/success");

  return (
    <main className="min-h-screen flex-col justify-items-center pt-20">
      <form className="w-full max-w-md" action={handleClientValidation}>
        <FieldGroup>
          <FieldSet>
            <FieldLegend>Add A New Quote</FieldLegend>

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
                  defaultValue={state.data?.author}
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
                  defaultValue={state.data?.quote}
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
                  defaultValue={state.data?.category}
                  onValueChange={(value) => {
                    setValue("category", value as NewQuoteInput["category"], { shouldValidate: true });
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
              Create
            </Button>
            <Button variant="outline" type="reset" disabled={isPending}>
              Clear
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
