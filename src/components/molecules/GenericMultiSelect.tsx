import { useState, useEffect, useRef, JSX, useMemo, FocusEvent } from "react";
import { debounce } from "lodash";
import { useFormContext, Controller } from "react-hook-form";
import { Check } from "lucide-react";

export interface Option {
  value: number | string;
  label: string;
}

interface GenericMultiSelectProps {
  name: string;
  label?: string;
  isMulti?: boolean;
  searchFn: (query: string) => Promise<Option[] | null>;
  defaultFn?: () => Promise<Option[] | null>;
}

export const GenericMultiSelect = ({
  name,
  label,
  isMulti = false,
  searchFn,
  defaultFn,
}: GenericMultiSelectProps): JSX.Element => {
  const { control } = useFormContext();
  const [input, setInput] = useState("");
  const [options, setOptions] = useState<Option[]>([]);
  const [loading, setLoading] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  const inputRef = useRef<HTMLInputElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);

  const fetchOptions = async (query: string) => {
    if (!query) return;
    setLoading(true);
    try {
      const data = await searchFn(query);
      setOptions(data ?? []);
    } catch (err) {
      console.error("searchFn failed:", err);
      setOptions([]);
    } finally {
      setLoading(false);
    }
  };

  const fetchDefaultOptions = async () => {
    if (!defaultFn) return;
    setLoading(true);
    try {
      const data = await defaultFn();
      setOptions(data ?? []);
    } catch (err) {
      console.error("defaultFn failed:", err);
      setOptions([]);
    } finally {
      setLoading(false);
    }
  };

  const debouncedFetch = useMemo(() => debounce(fetchOptions, 300), [searchFn]);

  useEffect(() => {
    if (input.trim().length > 0) {
      void debouncedFetch(input);
    } else if (isFocused && defaultFn) {
      void fetchDefaultOptions();
    } else {
      setOptions([]);
    }
  }, [input, debouncedFetch, isFocused]);

  const handleBlur = (e: FocusEvent) => {
    if (!wrapperRef.current?.contains(e.relatedTarget)) {
      setIsFocused(false);
      setInput("");
      setOptions([]);
    }
  };

  return (
    <div className="mb-4 text-white" ref={wrapperRef} onBlur={handleBlur}>
      {label && (
        <label className="block mb-1 text-sm font-medium">{label}</label>
      )}

      <Controller
        name={name}
        control={control}
        defaultValue={isMulti ? [] : null}
        render={({ field }) => {
          const value = field.value;
          const selectedOptions: Option[] = isMulti
            ? (value ?? [])
            : value
              ? [value]
              : [];

          const isSelected = (option: Option) =>
            isMulti
              ? selectedOptions.some((v) => v.value === option.value)
              : selectedOptions[0]?.value === option.value;

          const handleSelect = (option: Option) => {
            if (isMulti) {
              if (!isSelected(option)) {
                field.onChange([...selectedOptions, option]);
              }
            } else {
              field.onChange(option);
              setInput("");
              setIsFocused(false);
              setOptions([]);
            }
          };

          const handleRemove = (option: Option) => {
            if (isMulti) {
              field.onChange(
                selectedOptions.filter((v) => v.value !== option.value)
              );
            } else {
              field.onChange(null);
            }
          };

          return (
            <div className="relative" onClick={() => inputRef.current?.focus()}>
              <div className="flex flex-wrap items-center gap-1 px-2 py-1 bg-slate-800/50 border border-brand-500/30 rounded text-white min-h-[40px] focus-within:ring-2 ring-brand-500">
                {selectedOptions.map((item) => (
                  <span
                    key={item.value}
                    className="bg-purple-600 text-white text-sm px-2 py-1 rounded-full flex items-center gap-1"
                  >
                    {item.label}
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleRemove(item);
                      }}
                      className="ml-1 focus:outline-none"
                    >
                      ✕
                    </button>
                  </span>
                ))}

                <input
                  ref={inputRef}
                  type="text"
                  value={input}
                  onChange={(e) => {
                    setInput(e.target.value);
                  }}
                  onFocus={() => {
                    setIsFocused(true);
                  }}
                  className="flex-grow bg-transparent border-none text-white focus:outline-none placeholder:text-gray-400 min-w-[60px]"
                  placeholder={selectedOptions.length === 0 ? "Search..." : ""}
                />
              </div>

              {isFocused && (
                <div className="absolute z-10 w-full border mt-1 rounded bg-white text-black shadow max-h-60 overflow-y-auto">
                  {loading ? (
                    <div className="p-2 text-gray-500 text-sm">Loading...</div>
                  ) : options.length === 0 ? (
                    <div className="p-2 text-gray-500 text-sm">
                      No results found
                    </div>
                  ) : (
                    options.map((option) => (
                      <div
                        key={option.value}
                        className={`p-2 cursor-pointer hover:bg-gray-100 flex items-center justify-between ${
                          isSelected(option) ? "bg-gray-100" : ""
                        }`}
                        onMouseDown={(e) => {
                          e.preventDefault();
                          handleSelect(option);
                        }}
                        tabIndex={0}
                      >
                        {option.label}
                        {isSelected(option) && (
                          <Check className="text-purple-600 w-4 h-4" />
                        )}
                      </div>
                    ))
                  )}
                </div>
              )}
            </div>
          );
        }}
      />
    </div>
  );
};

export default GenericMultiSelect;
