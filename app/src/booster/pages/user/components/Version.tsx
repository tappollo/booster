import { useActionSheet } from "../../../functions/actionsheet";
import React, { useContext, useState } from "react";
import { AppRouteContext } from "../../Routes";
import useModalInput from "../../../components/useModalInput";
import { Clipboard, Text } from "react-native";
import {
  currentUserId,
  logout,
  promoteToAdmin,
  typedProfile,
} from "../../../functions/user";
import { getVersionString } from "../../../functions/utils";
import * as Sentry from "@sentry/react-native";
import { env } from "../../../../app.json";

const Version = () => {
  const showActionSheet = useActionSheet();
  const { resetRoute } = useContext(AppRouteContext);
  const { getInput, element } = useModalInput({
    title: "Password",
    autoCapitalize: "none",
    placeholder: "Aa123456",
  });
  const [fakeCrash, setFakeCrash] = useState(false);
  if (fakeCrash) {
    // @ts-ignore
    // eslint-disable-next-line no-undef
    fakeCrashMethod();
  }
  return (
    <>
      {element}
      <Text
        css={`
          text-align: center;
          color: lightgray;
        `}
        onLongPress={() => {
          showActionSheet(
            [
              {
                title: "Fake js crash",
                onPress: async () => {
                  setFakeCrash(true);
                },
              },
              {
                title: "Fake native crash",
                onPress: async () => {
                  Sentry.nativeCrash();
                },
              },
              {
                title: `Copy UID ${currentUserId()}`,
                onPress: async () => {
                  Clipboard.setString(currentUserId());
                },
              },
              {
                title: "Clear onboarding flag",
                onPress: async () => {
                  await typedProfile.update({ onboardingCompleted: 0 });
                  await logout();
                  resetRoute?.();
                },
              },
              {
                title: "Promote to admin",
                onPress: () => {
                  getInput(async (result) => {
                    await promoteToAdmin(result);
                  });
                },
              },
            ],
            { defaultCancel: true }
          );
        }}
      >
        {getVersionString()}
        {"\n"}
        {env}
      </Text>
    </>
  );
};

export default Version;
