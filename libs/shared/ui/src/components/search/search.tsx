import { Search } from 'lucide-react';
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from '../../primitives/input-group';

export const SearchBar = ({
  searchResult,
  placeholder,
  className,
  value,
  onChange,
}: {
  placeholder: string;
  className?: string;
  searchResult?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) => {
  return (
    <InputGroup
      className={`rounded-[6px] bg-white border border-border flex items-center ${className}`}
    >
      <InputGroupInput
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="text-secondary-foreground font-medium text-sm"
      />
      <InputGroupAddon>
        <Search className="text-secondary-foreground" />
      </InputGroupAddon>
      <InputGroupAddon align="inline-end">{searchResult}</InputGroupAddon>
    </InputGroup>
  );
};
