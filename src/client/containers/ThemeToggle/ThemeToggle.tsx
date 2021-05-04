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
    background: 'relative block w-[50px] h-[24px] rounded-full transition duration-150 ease-in-out',
    icon: 'absolute top-[-1px]'
  },
  checked: {
    dot: 'translate-x-[26px] bg-white',
    background: 'bg-[#736000] border border-solid border-gray-300',
    icon: 'left-[4px]'
  },
  unchecked: {
    dot: 'translate-x-0 bg-white',
    background: 'bg-gray-700 border border-solid border-gray-300',
    icon: 'right-[4px]'
  }
};

const ThemeToggle: FC = () => {
  const [current, send] = useMachine(themeMachine);
  const [checked, updateCheck] = useState(false);
  const [uuid, updateUuid] = useState<string | undefined>(undefined);
  const dotRef = useRef(null);
  const checkKey = checked ? 'checked' : 'unchecked';

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
        <div className={`${theme.default.background} ${theme[checkKey].background}`}>
          <span className={`${theme.default.icon} ${theme[checkKey].icon}`} aria-hidden="true">{!checked ? '🌙' :  '☀️'}</span>
          <div className={`ring-offset-1 ${theme.default.dot} ${theme[checkKey].dot}`} ref={dotRef} />
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
