import { FC, useState, useEffect, ChangeEvent } from 'react';
import { nanoid } from 'nanoid';

const theme = {
  default: {
    dot: 'dot absolute left-0 w-[26px] h-[26px] shadow rounded-full transition duration-150 ease-in-out transform',
    background: 'relative block w-[42px] h-[28px] rounded-full transition duration-150 ease-in-out'
  },
  checked: {
    dot: 'translate-x-[14px] bg-gray-100',
    background: 'bg-[#52D669] border border-solid border-transparent'
  },
  unchecked: {
    dot: 'translate-x-0 bg-gray-50',
    background: 'bg-gray-100 border border-solid border-gray-300'
  }
};

export type ToggleProps = {
  label: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
};

const Toggle: FC<ToggleProps> = ({ label, onChange }) => {
  const [checked, updateCheck] = useState(false);
  const [uuid, updateUuid] = useState<string | undefined>(undefined);
  const dotStyles = checked ? theme.checked.dot : theme.unchecked.dot;
  const backgroundStyles = checked ? theme.checked.background : theme.unchecked.background;

  useEffect(() => {
    if (!uuid) {
      updateUuid(nanoid());
    }
  }, [uuid]);

  const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    updateCheck(e.target.checked);
    onChange(e);
  };

  if (!uuid) return null;
  return (
    <div className="flex items-center justify-center w-auto">
      <label className="flex items-center cursor-pointer" htmlFor={uuid}>
        <div className={`${theme.default.background} ${backgroundStyles}`}>
          <div className={`${theme.default.dot} ${dotStyles}`} />
          <input
            type="checkbox"
            className="w-full h-full sr-only m-0"
            id={uuid}
            checked={checked}
            onChange={handleOnChange}
          />
        </div>
        <span className="sr-only">{label}</span>
      </label>
    </div>
  );
};

export default Toggle;
