'use client'

import Choices from 'choices.js'
import 'choices.js/public/assets/styles/choices.min.css'
import {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
} from 'react'

export type ChoiceOption = {
  value: string
  label: string
  disabled?: boolean
}

export type ChoiceGroup = {
  label: string
  disabled?: boolean
  options: ChoiceOption[]
}

export type ChoiceSelectProps = {
  options?: ChoiceOption[]
  groups?: ChoiceGroup[]
  placeholder?: string
  search?: boolean
  removeItem?: boolean
  sorting?: boolean
  multiple?: boolean
  limit?: number
  disabled?: boolean
  value?: string | string[]
  defaultValue?: string | string[]
  onChange?: (value: string | string[]) => void
  id?: string
  name?: string
  className?: string
  ariaLabel?: string
}

// Imperative ref so consumers can programmatically read/set value
export type ChoiceSelectRef = {
  getValue: () => string | string[]
  setValue: (v: string | string[]) => void
}

const ChoiceSelect = forwardRef<ChoiceSelectRef, ChoiceSelectProps>(function ChoiceSelect(
  {
    options = [],
    groups,
    placeholder,
    search = true,
    removeItem = false,
    sorting = false,
    multiple = false,
    limit,
    disabled = false,
    value,
    defaultValue,
    onChange,
    id,
    name,
    className,
    ariaLabel,
  },
  ref,
) {
  const selectRef = useRef<HTMLSelectElement | null>(null)
  const instanceRef = useRef<Choices | null>(null)

  useImperativeHandle(ref, () => ({
    getValue: () => (instanceRef.current?.getValue(true) as string | string[]) ?? '',
    setValue: (v) => {
      if (!instanceRef.current) return
      if (Array.isArray(v)) instanceRef.current.setChoiceByValue(v)
      else instanceRef.current.setChoiceByValue([v])
    },
  }))

  // Init once
  useEffect(() => {
    if (!selectRef.current) return
    const instance = new Choices(selectRef.current, {
      placeholderValue: placeholder,
      searchEnabled: search,
      removeItemButton: removeItem,
      shouldSort: sorting,
      maxItemCount: limit,
      allowHTML: false,
      shouldSortItems: false,
    })
    instanceRef.current = instance
    if (disabled) instance.disable()

    const el = selectRef.current
    const listener = (e: Event) => {
      const v = (e.target as HTMLSelectElement).value
      onChange?.(multiple ? (instance.getValue(true) as string[]) : v)
    }
    el.addEventListener('change', listener)

    return () => {
      el.removeEventListener('change', listener)
      instance.destroy()
      instanceRef.current = null
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // Keep external value in sync (one-way controlled)
  useEffect(() => {
    if (!instanceRef.current || value === undefined) return
    const current = instanceRef.current.getValue(true)
    const target = Array.isArray(value) ? value : [value]
    const same = Array.isArray(current)
      ? current.length === target.length && current.every((v, i) => v === target[i])
      : current === value
    if (!same) {
      instanceRef.current.setChoiceByValue(target)
    }
  }, [value])

  return (
    <select
      ref={selectRef}
      id={id}
      name={name}
      multiple={multiple}
      defaultValue={defaultValue}
      aria-label={ariaLabel}
      className={className ?? 'form-input'}
    >
      {placeholder && !multiple && <option value="">{placeholder}</option>}
      {groups
        ? groups.map((g) => (
            <optgroup key={g.label} label={g.label} disabled={g.disabled}>
              {g.options.map((opt) => (
                <option key={opt.value} value={opt.value} disabled={opt.disabled}>
                  {opt.label}
                </option>
              ))}
            </optgroup>
          ))
        : options.map((opt) => (
            <option key={opt.value} value={opt.value} disabled={opt.disabled}>
              {opt.label}
            </option>
          ))}
    </select>
  )
})

export default ChoiceSelect
