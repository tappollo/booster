import RNProgressHud from "react-native-progress-display";
import { Alert } from "react-native";

export const withHud = <T, U>(msg: string, f: (x: T) => Promise<U>) => (
  x: T
) => {
  RNProgressHud.showWithStatus(msg);
  return f(x).finally(RNProgressHud.dismiss);
};

export const withAlert = <T, U>(
  title: string,
  msg: (e: any) => string | undefined = _ => undefined,
  f: (x: T) => Promise<U>
) => (x: T) => f(x).catch(e => Alert.alert(title, msg(e)));
