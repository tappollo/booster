import { useContext, useEffect, useState } from "react";
import { NavigationContext } from "react-navigation";

export const useFocusedHook = () => {
  const [focused, setFocused] = useState(false);
  const navigation = useContext(NavigationContext);
  useEffect(() => {
    const didFocus = navigation.addListener("didFocus", () => setFocused(true));
    const willBlur = navigation.addListener("willBlur", () =>
      setFocused(false)
    );
    return () => {
      didFocus.remove();
      willBlur.remove();
    };
  }, [navigation]);
  return focused;
};
