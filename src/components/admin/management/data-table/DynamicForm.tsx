"use client"

import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Switch } from "@/components/ui/switch"
import { Checkbox } from "@/components/ui/checkbox"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { UseFormReturn } from "react-hook-form"

type Option = { label: string; value: string }

type FieldConfig = {
  key: string
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
  options?: Option[] // for select / checkbox groups
  multiple?: boolean // for multi select
}

type DynamicFormProps = {
    schema: any
  form: UseFormReturn<any>
  formId: string
  fields: FieldConfig[]
  onSubmit: (data: any) => void
}

export function DynamicForm({ form, formId, fields, onSubmit }: DynamicFormProps) {
  return (
    <form
      id={formId}
      onSubmit={form.handleSubmit(onSubmit)}
      className="space-y-4"
    >
      {fields.map((fieldConfig) => {
        if (fieldConfig.hidden) return null

        return (
          <FormField
            key={fieldConfig.key}
            control={form.control}
            name={fieldConfig.key}
            render={({ field }) => (
              <FormItem className={fieldConfig.className} style={fieldConfig.style}>
                {fieldConfig.label && <FormLabel>{fieldConfig.label}</FormLabel>}
                <FormControl>
                  {/** Text / Number */}
                  {(fieldConfig.inputType === "text" || fieldConfig.inputType === "number") && (
                    <Input
                      type={fieldConfig.inputType}
                      placeholder={fieldConfig.placeholder}
                      disabled={fieldConfig.disabled}
                      readOnly={fieldConfig.readOnly}
                      {...field}
                      value={field.value ?? ""}
                    />
                  )}

                  {/** Switch */}
                  {fieldConfig.inputType === "switch" && (
                    <Switch
                      checked={!!field.value}
                      onCheckedChange={field.onChange}
                      disabled={fieldConfig.disabled}
                    />
                  )}

                  {/** Textarea */}
                  {fieldConfig.inputType === "textarea" && (
                    <Textarea
                      placeholder={fieldConfig.placeholder}
                      disabled={fieldConfig.disabled}
                      readOnly={fieldConfig.readOnly}
                      {...field}
                      value={field.value ?? ""}
                    />
                  )}

                  {/** Checkbox (single) */}
                  {fieldConfig.inputType === "checkbox" && !fieldConfig.options && (
                    <Checkbox
                      checked={!!field.value}
                      onCheckedChange={field.onChange}
                      disabled={fieldConfig.disabled}
                    />
                  )}

                  {/** Checkbox group */}
                  {fieldConfig.inputType === "checkbox" && fieldConfig.options && (
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
                  )}

                  {/** Select (single / multi) */}
                  {fieldConfig.inputType === "select" && (
                    <Select
                      value={
                        fieldConfig.multiple
                          ? undefined // handled manually for multi
                          : field.value
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
                    >
                      <SelectTrigger>
                        <SelectValue placeholder={fieldConfig.placeholder || "Select option"} />
                      </SelectTrigger>
                      <SelectContent>
                        {fieldConfig.options?.map((opt) => (
                          <SelectItem key={opt.value} value={opt.value}>
                            {opt.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  )}
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        )
      })}
    </form>
  )
}
