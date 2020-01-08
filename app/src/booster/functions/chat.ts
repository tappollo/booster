import { useEffect } from "react";
import database from "@react-native-firebase/database";
import { currentUserId } from "./user";
import { AppState, AppStateStatus } from "react-native";

export const useUpdatePing = () => {
  useEffect(() => {
    const ref = database().ref(`userStatus/${currentUserId()}`);
    ref.update({ online: true }).catch();
    ref
      .onDisconnect()
      .update({ disconnectedAt: database.ServerValue.TIMESTAMP, online: false })
      .catch();
    const onAppStateChange = (status: AppStateStatus) => {
      if (status === "active") {
        ref.update({ online: true }).catch();
      } else {
        ref.update({ online: false }).catch();
      }
    };
    AppState.addEventListener("change", onAppStateChange);
    return () => {
      ref
        .onDisconnect()
        .cancel()
        .catch();
      AppState.removeEventListener("change", onAppStateChange);
    };
  }, []);
};
