"use client";

import ImageUpload from "@/components/ImageUpload";
import { Separator } from "@/components/separator";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { CaretSortIcon, CheckIcon } from "@radix-ui/react-icons";
import { useFieldArray } from "react-hook-form";
import { FaTrash } from "react-icons/fa6";
import { TiPlus } from "react-icons/ti";

const founderType = [
  { label: "Person", value: "PERSON" },
  { label: "Organization", value: "ORGANIZATION" },
  { label: "Company", value: "COMPANY" },
] as const;

export const FounderCard = ({
  form,
  loading,
}: {
  form: any;
  loading: boolean;
}) => {
  const founderFormArray = useFieldArray({
    control: form.control,
    name: "founders",
  });
  const addNewFounder = () => {
    if (founderFormArray.fields.length === 0) {
      founderFormArray.append({
        name: null,
        photo: null,
        type: null,
        url: null,
      });
      return;
    }
    const lastField = founderFormArray.fields[
      founderFormArray.fields.length - 1
    ] as any;
    if (
      lastField.name === null &&
      lastField.photo === null &&
      lastField.type === null &&
      lastField.url === null
    ) {
      return;
    }

    founderFormArray.insert(founderFormArray.fields.length, {
      name: null,
      photo: null,
      type: null,
      url: null,
    });
  };

  return (
    <>
      {founderFormArray.fields.map((field, index) => (
        <div key={field.id} className="border p-2 rounded-md">
          <div className="flex items-center justify-between p-2">
            <h3>Founder {index + 1}</h3>
            <Button
              disabled={loading}
              variant="destructive"
              size="sm"
              onClick={() => founderFormArray.remove(index)}
            >
              <FaTrash className="h-4 w-4" />
            </Button>
          </div>
          <Separator className="mb-2" />
          <FormField
            control={form.control}
            name={`founders.${index}.photo`}
            render={({ field }) => (
              <FormItem>
                <FormLabel htmlFor={`founders.${index}.photo`}>Photo</FormLabel>
                <FormControl>
                  <ImageUpload
                    value={field.value}
                    disabled={loading}
                    onChange={(url) => field.onChange(url)}
                    onRemove={() => field.onChange("")}
                    multiple={false}
                    maxFiles={1}
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name={`founders.${index}.name`}
            render={({ field }) => (
              <FormItem>
                <FormLabel htmlFor={`founders.${index}.name`}>Name</FormLabel>
                <FormControl>
                  <Input disabled={loading} {...field} />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name={`founders.${index}.type`}
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>type</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant="outline"
                        role="combobox"
                        className={cn(
                          "w-[200px] justify-between",
                          !field.value && "text-muted-foreground"
                        )}
                      >
                        {field.value
                          ? founderType.find(
                              (type) => type.value === field.value
                            )?.label
                          : "Select type"}
                        <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-[200px] p-0">
                    <Command>
                      <CommandInput
                        placeholder="Search framework..."
                        className="h-9"
                      />
                      <CommandEmpty>No framework found.</CommandEmpty>
                      <CommandGroup>
                        <CommandItem
                          value="PERSON"
                          onSelect={() => {
                            field.onChange("PERSON");
                          }}
                        >
                          Person
                          <CheckIcon
                            className={cn(
                              "ml-auto h-4 w-4",
                              "PERSON" === field.value
                                ? "opacity-100"
                                : "opacity-0"
                            )}
                          />
                        </CommandItem>
                        <CommandItem
                          value="ORGANIZATION"
                          onSelect={() => {
                            field.onChange("ORGANIZATION");
                          }}
                        >
                          Organization
                          <CheckIcon
                            className={cn(
                              "ml-auto h-4 w-4",
                              "ORGANIZATION" === field.value
                                ? "opacity-100"
                                : "opacity-0"
                            )}
                          />
                        </CommandItem>
                        <CommandItem
                          value="COMPANY"
                          onSelect={() => {
                            field.onChange("COMPANY");
                          }}
                        >
                          Company
                          <CheckIcon
                            className={cn(
                              "ml-auto h-4 w-4",
                              "COMPANY" === field.value
                                ? "opacity-100"
                                : "opacity-0"
                            )}
                          />
                        </CommandItem>
                        {/* {founderType.map((type) => (
                          <CommandItem
                            value={type.label}
                            key={type.value}
                            onSelect={() => {
                              field.onChange(type.value);
                            }}
                          >
                            {type.label}
                            <CheckIcon
                              className={cn(
                                "ml-auto h-4 w-4",
                                type.value === field.value
                                  ? "opacity-100"
                                  : "opacity-0"
                              )}
                            />
                          </CommandItem>
                        ))} */}
                      </CommandGroup>
                    </Command>
                  </PopoverContent>
                </Popover>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name={`founders.${index}.url`}
            render={({ field }) => (
              <FormItem>
                <FormLabel htmlFor={`founders.${index}.url`}>Url</FormLabel>
                <FormControl>
                  <Input disabled={loading} {...field} />
                </FormControl>
              </FormItem>
            )}
          />
        </div>
      ))}
      <AddFounderButton onClick={addNewFounder} />
    </>
  );
};

const AddFounderButton = ({ onClick }: { onClick: () => void }) => {
  return (
    <div className="w-64 h-64 flex items-center border rounded-xl">
      <Button
        onClick={onClick}
        variant="outline"
        className="mx-auto py-4 h-16 gap-2"
      >
        <TiPlus className="h-8 w-8" />
        <span>Add Founder</span>
      </Button>
    </div>
  );
};
