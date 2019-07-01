import styled from "styled-components";
import {
  Image,
  StyleProp,
  Text,
  TouchableOpacity,
  View,
  ViewStyle
} from "react-native";
import { Conversation, Doc, Message } from "../../../functions/types";
import React, { useEffect, useState } from "react";
import { formatDistanceStrict, isAfter, subSeconds } from "date-fns";
import {
  targetInChat,
  useUnreadCount,
  useUserStatus
} from "../../../functions/chat";

const useCurrentTime = (refreshInterval: number) => {
  const [time, setTime] = useState(new Date());
  useEffect(() => {
    const subscription = setInterval(() => {
      setTime(new Date());
    }, refreshInterval);
    return () => {
      clearInterval(subscription);
    };
  }, [refreshInterval]);
  return time;
};

const OnlineIndicator = (props: {
  userId: string;
  style: StyleProp<ViewStyle>;
}) => {
  const { value, loading } = useUserStatus(props.userId);
  if (loading) {
    return null;
  }
  return (
    <View
      style={[
        {
          width: 10,
          height: 10,
          borderRadius: 5,
          backgroundColor: value && value.online ? "green" : "#CCCCCC"
        },
        props.style
      ]}
    />
  );
};

const renderLastMessage = (message?: Message) => {
  if (!message) {
    return "start chatting...";
  }
  if (message.image == null) {
    return message.text;
  } else {
    return "image file";
  }
};

const ConversationCell = (
  props: Doc<Conversation> & { onPress: () => void }
) => {
  const { userDetails, latestMessage, updatedAt } = props.doc;
  const user = userDetails[targetInChat(props.doc)];
  return (
    <ConversationCell.Container onPress={props.onPress}>
      <ConversationCell.Avatar source={{ uri: user.photoURL }} />
      <View style={{ flex: 1 }}>
        <ConversationCell.Title>{user.displayName}</ConversationCell.Title>
        <ConversationCell.LastMessage>
          {renderLastMessage(latestMessage)}
        </ConversationCell.LastMessage>
      </View>
      <View style={{ alignItems: "flex-end" }}>
        <ConversationCell.Date date={updatedAt.toDate()} />
        <ConversationCell.Unread conversationId={props.id} />
      </View>
      <OnlineIndicator
        userId={targetInChat(props.doc)}
        style={{ position: "absolute", left: 44, bottom: 20 }}
      />
    </ConversationCell.Container>
  );
};

ConversationCell.UnreadContainer = styled(View)`
  width: 20px;
  height: 20px;
  border-radius: 10px;
  background-color: red;
  align-items: center;
  justify-content: center;
  margin-top: 3px;
`;

ConversationCell.Unread = (props: { conversationId: string }) => {
  const unreadCount = useUnreadCount(props.conversationId);
  if (unreadCount == null || unreadCount === 0) {
    return null;
  }
  return (
    <ConversationCell.UnreadContainer>
      <ConversationCell.UnreadText>{unreadCount}</ConversationCell.UnreadText>
    </ConversationCell.UnreadContainer>
  );
};

ConversationCell.UnreadText = styled(Text)`
  color: white;
  font-size: 15px;
  font-weight: bold;
`;

ConversationCell.Date = (props: { date: Date }) => {
  const isWithIn30s = isAfter(props.date, subSeconds(new Date(), 30));
  const currentTime = useCurrentTime(1000 * (isWithIn30s ? 1 : 60));
  return (
    <ConversationCell.DateText>
      {formatDistanceStrict(props.date, currentTime)}
    </ConversationCell.DateText>
  );
};

ConversationCell.DateText = styled(Text)`
  font-size: 14px;
  color: #898989;
`;

ConversationCell.LastMessage = styled(Text).attrs({
  numberOfLines: 2
})`
  font-size: 14px;
  color: #898989;
`;

ConversationCell.Avatar = styled(Image)`
  background: #d8d8d8;
  width: 44px;
  height: 44px;
  border-radius: 22px;
  margin-right: 10px;
`;

ConversationCell.Title = styled(Text)`
  font-size: 18px;
  color: #070707;
  font-weight: 600;
`;

ConversationCell.Container = styled(TouchableOpacity)`
  flex-direction: row;
  background: #ffffff;
  box-shadow: 0 5px 13px rgba(0, 0, 0, 0.14);
  border-radius: 6px;
  margin: 10px 15px 5px;
  height: 80px;
  padding: 10px;
  align-items: center;
  elevation: 5;
`;

export default ConversationCell;
