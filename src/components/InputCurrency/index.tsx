import { useEffect, useState, InputHTMLAttributes } from "react";

interface InputMoneyProps extends InputHTMLAttributes<HTMLInputElement> {
  value: number;
  handleChange: (value: number | string) => void;
}

const DECIMAL_SIZE = 2;

export const InputCurrency = ({
  value,
  handleChange,
  ...props
}: InputMoneyProps) => {
  const [currentValue, setCurrentValue] = useState<string>(`${value}`);

  useEffect(() => {
    const valueString = `${value}`.replace("R$", "");

    if (!/\D/.test(valueString.replace(".", ""))) {
      setCurrentValue(value.toFixed(DECIMAL_SIZE).toString().replace(".", ","));
    }
  }, [value]);

  const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const valueRemoved = event.target.value.replace(",", "").replace("R$", "");

    const sizeSlice = valueRemoved.length - DECIMAL_SIZE;
    const newValue = [
      valueRemoved.slice(0, sizeSlice),
      ".",
      valueRemoved.slice(sizeSlice),
    ].join("");

    handleChange(newValue);
  };

  return <input value={currentValue} onChange={handleOnChange} {...props} />;
};
