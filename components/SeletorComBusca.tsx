"use client"

import * as React from "react"
import { Check, ChevronsUpDown } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { useTextOverflow } from "@/hooks/useTextOverflow"

export interface SelectOption {
  value: string
  label: string
}

interface SelectComBuscaProps {
  options: SelectOption[]
  value: string
  onChange: (value: string) => void
  placeholder?: string
}

export default function SelectComBusca({
  options,
  value,
  onChange,
  placeholder = "Selecione uma opção...",
}: SelectComBuscaProps) {
  const [open, setOpen] = React.useState(false)
  const { isOverflowing, textRef, containerRef } = useTextOverflow();

  const selectedLabel = value ? options.find((option) => option.value 
  === value)?.label : placeholder


  return (
    <Popover open={open} onOpenChange={setOpen} >
      <PopoverTrigger asChild >
      <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-full justify-between relative group"
        >
          <div ref={containerRef} className="flex-1 overflow-hidden">
            <span ref={textRef} className="block truncate">
              {selectedLabel}
            </span>
          </div>
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          {isOverflowing && (
            <div className="absolute left-0 right-0 top-full mt-1 p-2 bg-popover text-popover-foreground rounded-md shadow-md opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50">
              {selectedLabel}
            </div>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-full p-0">
        <Command>
          <CommandInput placeholder="Buscar opção..." />
          <CommandList>
            <CommandEmpty>Nenhuma opção encontrada.</CommandEmpty>
            <CommandGroup>
              {options.map((option) => (
                <CommandItem
                  key={option.value}
                  onSelect={() => {
                    onChange(option.value)
                    setOpen(false)
                  }}
                >
                  <Check className={cn("mr-2 h-4 w-4", value === option.value ? "opacity-100" : "opacity-0")} />
                  {option.label}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}

