declare module "react-native-progress-display" {
  export default class RNProgressHud {
    public static showWithStatus: (msg: string) => void;
    public static dismiss: () => void;
  }
}
