type Option = {
  label: string;
  value: string;
  color: string;
};

interface Props {
  options: Option[];
  value?: string;
  onValueChange: (value: string) => void;
}

export const ColorOptionRadioGroup = ({
  options,
  value,
  onValueChange,
}: Props) => {
  return (
    <div role="radiogroup" className="flex gap-2 flex-wrap">
      {options.map((option) => {
        const isSelected = value === option.value;

        return (
          <button
            key={option.value}
            type="button"
            role="radio"
            aria-checked={isSelected}
            aria-label={option.label}
            onClick={() => onValueChange(option.value)}
            className="flex flex-col items-center cursor-pointer bg-transparent border-none p-0"
          >
            <div
              className={`w-7 h-7 rounded-full ${
                isSelected ? 'border border-black' : ''
              }`}
              style={{ backgroundColor: option.color }}
            />

            {isSelected && (
              <span className="text-[12px] leading-4 font-normal mt-1 border text-secondary rounded-[2px] px-0.5 py-1">
                {option.color}
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
};
