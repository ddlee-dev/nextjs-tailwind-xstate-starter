import { FC, useState, useEffect, ChangeEvent, useRef } from 'react';
import { nanoid } from 'nanoid';
import toast from 'react-hot-toast';
import { useMachine } from '@xstate/react';
import { themeMachine } from '@/xstate/machines/themeToggle';
import { ThemeType, userTheme, setThemeToLocalStorage } from '@/utils/style';

const lightToast = () =>
  toast('Light Theme Activated', {
    icon: '☀️'
  });
const darkToast = () =>
  toast('Dark Theme Activated', {
    icon: '🌙',
    style: {
      backgroundColor: '#181818',
      color: 'white'
    }
  });

const theme = {
  default: {
    dot: 'dot absolute left-0 w-[22px] h-[22px] shadow rounded-full transition duration-150 ease-in-out transform',
    background: 'relative block w-[50px] h-[24px] rounded-full transition duration-150 ease-in-out'
  },
  checked: {
    dot: 'translate-x-[26px] bg-gray-100',
    background: 'bg-[#52D669] border border-solid border-transparent'
  },
  unchecked: {
    dot: 'translate-x-0 bg-gray-50',
    background: 'bg-gray-100 border border-solid border-gray-300'
  }
};

const ThemeToggle: FC = () => {
  const [current, send] = useMachine(themeMachine);
  const [checked, updateCheck] = useState(false);
  const [uuid, updateUuid] = useState<string | undefined>(undefined);
  const dotRef = useRef(null);
  const dotStyles = checked ? theme.checked.dot : theme.unchecked.dot;
  const backgroundStyles = checked ? theme.checked.background : theme.unchecked.background;

  useEffect(() => {
    if (!uuid) {
      const userThemePref = userTheme();
      if (userThemePref !== current.value) {
        send('TOGGLE_THEME');
        updateCheck(userThemePref === 'dark');
        setThemeToLocalStorage(userThemePref as ThemeType);
      }
      updateUuid(nanoid());
    }
  }, [uuid]);

  const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    updateCheck(e.target.checked);
    send('TOGGLE_THEME');
    if (e.target.checked) {
      darkToast();
    } else {
      lightToast();
    }
  };

  if (!uuid) return null;
  return (
    <div className="flex items-center justify-center w-auto">
      <label className="flex items-center cursor-pointer" htmlFor={uuid}>
        <div className={`${theme.default.background} ${backgroundStyles}`}>
          <div className={`ring-offset-1 ${theme.default.dot} ${dotStyles}`} ref={dotRef} />
          <input
            type="checkbox"
            className="w-full h-full sr-only m-0"
            id={uuid}
            checked={checked}
            tabIndex={0}
            onFocus={() => {
              if (dotRef && dotRef.current) {
                console.log('DOT REF', dotRef.current);
                // @ts-ignore
                dotRef.current.focus()
              }
            }}
            onChange={handleOnChange}
          />
        </div>
        <span className="sr-only">Toggle light/dark theme</span>
      </label>
    </div>
  );
};

export default ThemeToggle;
