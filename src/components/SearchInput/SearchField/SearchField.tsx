import React, { useRef } from 'react';
import styles from './SearchField.module.css';

interface SearchFieldProps {
  value: string;
  defaultValue: string;
  onChange: (value: string) => void;
}

const SearchField: React.FC<SearchFieldProps> = ({
  value,
  defaultValue,
  onChange,
}) => {
  const textInput = useRef<HTMLInputElement>(null);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
  };

  const inputProps = value
    ? { value, onChange: handleChange }
    : { defaultValue };

  return (
    <input
      ref={textInput}
      className={styles.input}
      type="text"
      placeholder="Search"
      {...inputProps}
    />
  );
};

export default SearchField;
