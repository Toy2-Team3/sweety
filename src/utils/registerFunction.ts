export const debounce = <F extends (...args: string[]) => void>(
  func: F,
  delay: number,
) => {
  let timeoutId: NodeJS.Timeout | null = null;

  return function (this: object, ...args: Parameters<F>) {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }

    timeoutId = setTimeout(() => {
      func.apply(this, args);
      timeoutId = null;
    }, delay);
  };
};

export const isIdentificationValid = (identification: string) => {
  const regex = /^[0-9a-zA-Z]{8,}$/;
  return regex.test(identification);
};

export const isPasswordValid = (password: string) => {
  const passwordRegex = /^(?=.*[!@#$%^&*])(?=.*[a-zA-Z])(?=.*[0-9]).{5,}$/;
  return passwordRegex.test(password);
};

export const isIdentificationPasswordValid = (
  idendtification: string,
  password: string,
) => {
  return isIdentificationValid(idendtification) && isPasswordValid(password);
};

export const calculateMaxDate = () => {
  const currentDate = new Date();
  const maxDate = new Date(
    currentDate.getFullYear() - 19,
    currentDate.getMonth(),
    currentDate.getDate(),
  );
  return maxDate.toISOString().split("T")[0];
};

export const isNameValid = (userName: string) => {
  if (userName.length > 20) return false;
  const nameRegex = /^[A-Za-z가-힣]+$/;
  return nameRegex.test(userName);
};

export const isTallValid = (tall: string) => {
  const heightRegex = /^[0-9]+$/;
  const heightNumber = parseInt(tall, 10);

  return heightRegex.test(tall) && heightNumber >= 100 && heightNumber <= 250;
};
