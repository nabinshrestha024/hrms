import { Plus } from 'lucide-react';

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
    <div className="flex gap-2 flex-wrap">
      {options.map((option) => {
        const isSelected = value === option.value;

        return (
          <div
            key={option.value}
            onClick={() => onValueChange(option.value)}
            className="flex flex-col items-center cursor-pointer"
          >
            <div
              className={`w-7 h-7 rounded-full  ${
                isSelected ? 'border border-black' : ''
              }`}
              style={{ backgroundColor: option.color }}
            />

            {isSelected && (
              <span className="text-[12px] leading-4 font-normal mt-1 border text-secondary rounded-[2px] px-0.5 py-1 ">
                {option.color}
              </span>
            )}
          </div>
        );
      })}
      <div className="border w-7 h-7 rounded-full cursor-pointer p-1.75 flex justify-center items-center">
        <Plus className="text-[14px] text-secondary" />
      </div>
    </div>
  );
};
