import useLocalStorage from './useLocalStorage';

const regex = /^[A-Za-z0-9 ]+$/;

const useInput = (key, initValue) => {
  const [value, setValue] = useLocalStorage(key, initValue);

  const reset = () => setValue(initValue);

  const attributeObj = {
    value,
    onChange: (e) => {
      if (e.target.value === '' || regex.test(e.target.value))
        setValue(e.target.value);
    },
  };

  return [value, reset, attributeObj];
};

export default useInput;
