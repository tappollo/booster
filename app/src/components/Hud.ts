import RNProgressHud from "react-native-progress-display";

export const showWith = <T, U>(msg: string, f: (x: T) => U) => (x: T) => {
  RNProgressHud.showWithStatus(msg);
  return f(x);
};
export const dissmisWith = <T, U>(f: (x: T) => U) => (x: T) => {
  RNProgressHud.dismiss();
  return f(x);
};
export const withHud = <T, U>(msg: string, f: (x: T) => Promise<U>) =>
  showWith(msg, (x: T) => f(x).finally(RNProgressHud.dismiss));
