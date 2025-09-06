"use client"

import { FormField, FormItem, FormLabel, FormControl, FormMessage, Form } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Switch } from "@/components/ui/switch"
import { Checkbox } from "@/components/ui/checkbox"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { FieldArray, FieldArrayPath, FieldValues, Path, UseFormReturn, useFieldArray } from "react-hook-form"
import { z, ZodType } from "zod"
import { MultiSelect, MultiSelectOption } from "@/components/ui/multi-select"
import { Button } from "@/components/ui/button"

export type ArrayItemFieldConfig = {
  key: string
  label?: string
  inputType: "text" | "number" | "select" | "checkbox"
  placeholder?: string
  options?: { label: string; value: string }[]
}

export type FieldConfig<TSchema extends ZodType = ZodType<unknown, unknown>> = {
  key: Path<z.infer<TSchema> & FieldValues>   // 🔥 ensures the key is a valid form path
  label?: string
  inputType: "text" | "number" | "switch" | "select" | "textarea" | "checkbox" | "multi-select" | "dynamic-array";
  placeholder?: string
  defaultValue?: unknown
  required?: boolean
  disabled?: boolean
  readOnly?: boolean
  hidden?: boolean
  className?: string
  style?: React.CSSProperties
  options?: { label: string; value: string | number }[] // for select/multi
  multiSelectOptions?: MultiSelectOption[]
  multiple?: boolean // for select/multi
  arrayItemConfig?: ArrayItemFieldConfig[] // For dynamic-array type
  // fieldsConfig?: {
  //   key: string
  //   label: string
  //   placeholder?: string
  //   type?: "text" | "number"
  // }[] // for dynamic array
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
        {fields.map((fieldConfig) => {
          return fieldConfig.inputType === "dynamic-array" ? (
            <DynamicArrayField
              key={fieldConfig.key}
              label={fieldConfig.label ?? fieldConfig.key}
              form={form}
              name={fieldConfig.key}
              fieldsConfig={fieldConfig.arrayItemConfig || []}
            />
          ) : (
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
                        value={field.value ?? ""}
                        onChange={field.onChange}
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
                        value={field.value ?? ""}
                        onChange={field.onChange}
                      />
                    ) : (fieldConfig.inputType === "multi-select" && fieldConfig.multiSelectOptions) ? (
                      <MultiSelect
                        modalPopover={true}
                        options={fieldConfig.multiSelectOptions}
                        value={field.value ?? []}
                        defaultValue={field.value ?? []}
                        onValueChange={(val) => field.onChange(val ?? [])}
                        placeholder="Choose frameworks..."
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
                          <label key={String(opt.value)} className="flex items-center gap-2">
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
                          const parsedVal = typeof fieldConfig.options?.[0]?.value === "number" ? Number(val) : val
                          if (fieldConfig.multiple) {
                            const values = Array.isArray(field.value) ? [...field.value] : []
                            if (!values.includes(parsedVal)) values.push(parsedVal)
                            field.onChange(values)
                          } else {
                            field.onChange(parsedVal)
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
                            <SelectItem
                              key={String(opt.value)}
                              value={String(opt.value)}
                            >
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
          );
        })}
      </form>
    </Form>
  )
}



type DynamicArrayFieldProps<TSchema extends ZodType> = {
  name: Path<z.infer<TSchema> & FieldValues>
  label: string
  form: UseFormReturn<z.infer<TSchema> & FieldValues>
  fieldsConfig: ArrayItemFieldConfig[]
}

function DynamicArrayField<TSchema extends ZodType>({
  name,
  label,
  form,
  fieldsConfig,
}: DynamicArrayFieldProps<TSchema>) {
  type FieldValuesType = z.infer<TSchema> & FieldValues;

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: name as FieldArrayPath<FieldValuesType>,
  });

  // Add this type definition
  type ArrayItemType = {
    [key: string]: string | number | boolean;
  };


  const getDefaultItemValue = (): ArrayItemType => {
    const defaultItem: ArrayItemType = {};
    fieldsConfig.forEach(field => {
      defaultItem[field.key] =
        field.inputType === 'number' ? 0 :
          field.inputType === 'checkbox' ? false :
            field.inputType === 'select' && field.options?.length ? field.options[0].value :
              '';
    });
    return defaultItem;
  };


  return (
    <div className="space-y-4">
      <FormLabel>{label}</FormLabel>
      {fields.map((field, index) => (
        <div key={field.id} className="flex items-end gap-2 p-4 border rounded-lg">
          {fieldsConfig.map((subField) => {
            const fieldName = `${name}.${index}.${subField.key}` as Path<FieldValuesType>;

            return (
              <FormField
                key={subField.key}
                control={form.control}
                name={fieldName}
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <FormLabel className="text-xs">{subField.label}</FormLabel>
                    <FormControl>
                      {subField.inputType === "text" ? (
                        <Input
                          placeholder={subField.placeholder}
                          {...field}
                        />
                      ) : subField.inputType === "number" ? (
                        <Input
                          type="number"
                          placeholder={subField.placeholder}
                          value={field.value ?? ""}
                          onChange={(e) => field.onChange(e.target.valueAsNumber)}
                        />
                      ) : subField.inputType === "select" ? (
                        <Select
                          value={field.value}
                          onValueChange={field.onChange}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder={subField.placeholder} />
                          </SelectTrigger>
                          <SelectContent>
                            {subField.options?.map((option) => (
                              <SelectItem key={option.value} value={option.value}>
                                {option.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      ) : (
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      )}
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            );
          })}
          <Button
            type="button"
            variant="destructive"
            size="sm"
            onClick={() => remove(index)}
          >
            Remove
          </Button>
        </div>
      ))}
      <Button
        type="button"
        variant="outline"
        size="sm"
        onClick={() => append(getDefaultItemValue() as FieldArray<FieldValuesType, FieldArrayPath<FieldValuesType>>)}
      >
        + Add Item
      </Button>
    </div>
  );
}