/* eslint-disable @typescript-eslint/camelcase */
import { IncomingWebhook } from "@slack/webhook";
import * as config from "../../server.json";
import { Doc, Profile } from "../../types";

const resizedImage = (url: string, width = 100, height = 100) => {
  return `${config.functionsRoot}/image-resize?url=${encodeURIComponent(
    url
  )}&width=${width}&height=${height}`;
};

const dbLink = (location: string) => {
  return `https://console.firebase.google.com/project/${
    config.projectId
  }/database/firestore/data~2F${encodeURIComponent(location).replace(
    /%/g,
    "~"
  )}`;
};

const webhook = new IncomingWebhook(config.slack.url);

export const sendNewUserToSlack = async (user: Doc<Profile>) => {
  await webhook.send({
    channel: config.slack.channel,
    username: "New User Bot",
    text: `${user.doc.name} has signed up`,
    attachments: [
      {
        author_name: user.doc.name,
        author_link: dbLink(`/userProfiles/${user.id}`),
        image_url: resizedImage(user.doc.avatar, 800, 800)
      }
    ]
  });
};
