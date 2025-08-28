"use client"

import { FormField, FormItem, FormLabel, FormControl, FormMessage, Form } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Switch } from "@/components/ui/switch"
import { Checkbox } from "@/components/ui/checkbox"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { FieldValues, Path, UseFormReturn } from "react-hook-form"
import { z, ZodType } from "zod"

export type FieldConfig<TSchema extends ZodType> = {
  key: Path<z.infer<TSchema> & FieldValues>   // 🔥 ensures the key is a valid form path
  label?: string
  inputType: "text" | "number" | "switch" | "select" | "textarea" | "checkbox"
  placeholder?: string
  defaultValue?: unknown
  required?: boolean
  disabled?: boolean
  readOnly?: boolean
  hidden?: boolean
  className?: string
  style?: React.CSSProperties
  options?: { label: string; value: string | number }[] // for select/multi
  multiple?: boolean // for select/multi
}
type DynamicFormProps<TSchema extends ZodType> = {
  form: UseFormReturn<z.infer<TSchema> & FieldValues>
  formId: string
  fields: FieldConfig<TSchema>[]
  onSubmit: (data: z.infer<TSchema>) => void
}
export function DynamicForm<TSchema extends ZodType>({
  form,
  formId,
  fields,
  onSubmit,
}: DynamicFormProps<TSchema>) {
  return (
    <Form {...form}>
      <form
        id={formId}
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-4"
      >
        {fields.map((fieldConfig) => (
          <FormField
            key={fieldConfig.key}
            control={form.control}
            name={fieldConfig.key}
            render={({ field }) => (
              <FormItem>
                <FormLabel>{fieldConfig.label ?? fieldConfig.key}</FormLabel>
                <FormControl>
                  {fieldConfig.inputType === "text" ? (
                    <Input
                      placeholder={fieldConfig.placeholder}
                      {...field}
                      disabled={fieldConfig.disabled}
                      readOnly={fieldConfig.readOnly}
                      className={fieldConfig.className}
                      style={fieldConfig.style}
                    />
                  ) : fieldConfig.inputType === "number" ? (
                    <Input
                      type="number"
                      placeholder={fieldConfig.placeholder}
                      disabled={fieldConfig.disabled}
                      readOnly={fieldConfig.readOnly}
                      required={fieldConfig.required}
                      value={field.value ?? ""}
                      onChange={(e) => {
                        const value = e.target.value;
                        field.onChange(value === "" ? "" : Number(value));
                      }}
                    />
                  ) : fieldConfig.inputType === "switch" ? (
                    <Switch
                      checked={!!field.value}
                      onCheckedChange={field.onChange}
                      disabled={fieldConfig.disabled}
                      required={fieldConfig.required}
                    />
                  ) : fieldConfig.inputType === "textarea" ? (
                    <Textarea
                      placeholder={fieldConfig.placeholder}
                      disabled={fieldConfig.disabled}
                      readOnly={fieldConfig.readOnly}
                      required={fieldConfig.required}
                      {...field}
                      value={field.value ?? ""}
                    />
                  ) : (fieldConfig.inputType === "checkbox" && !fieldConfig.options) ? (
                    <Checkbox
                      checked={!!field.value}
                      onCheckedChange={field.onChange}
                      disabled={fieldConfig.disabled}
                      required={fieldConfig.required}
                    />
                  ) : (fieldConfig.inputType === "checkbox" && fieldConfig.options) ? (
                    <div className="flex flex-col gap-2">
                      {fieldConfig.options.map((opt) => (
                        <label key={opt.value} className="flex items-center gap-2">
                          <Checkbox
                            checked={Array.isArray(field.value) ? field.value.includes(opt.value) : false}
                            onCheckedChange={(checked) => {
                              let newValue = Array.isArray(field.value) ? [...field.value] : []
                              if (checked) {
                                newValue.push(opt.value)
                              } else {
                                newValue = newValue.filter((v) => v !== opt.value)
                              }
                              field.onChange(newValue)
                            }}
                          />
                          <span>{opt.label}</span>
                        </label>
                      ))}
                    </div>
                  ) : fieldConfig.inputType === "select" ? (
                    <Select
                      value={
                        fieldConfig.multiple
                          ? (Array.isArray(field.value) ? field.value.map(String) : [])
                          : (field.value ? String(field.value) : "")
                      }
                      onValueChange={(val) => {
                        if (fieldConfig.multiple) {
                          const values = Array.isArray(field.value) ? [...field.value] : []
                          if (!values.includes(val)) values.push(val)
                          field.onChange(values)
                        } else {
                          field.onChange(val)
                        }
                      }}
                      disabled={fieldConfig.disabled}
                      required={fieldConfig.required}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder={fieldConfig.placeholder || "Select option"} />
                      </SelectTrigger>
                      <SelectContent>
                        {fieldConfig.options?.map((opt) => (
                          <SelectItem key={String(opt.value)} value={String(opt.value)}>
                            {opt.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  ) : null}
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        ))}
      </form>
    </Form>
  )
}
