import { MessageImageProps } from "react-native-gifted-chat";
import React, { useState } from "react";
import { Modal, TouchableOpacity } from "react-native";
import FastImage from "react-native-fast-image";
import ImageViewer from "react-native-image-zoom-viewer";

const ChatImageCell = (props: MessageImageProps<any>) => {
  const [show, setShow] = useState(false);
  return (
    <>
      <TouchableOpacity
        onPress={() => {
          setShow(true);
        }}
        style={props.containerStyle}
      >
        <FastImage
          css={`
            width: 150px;
            height: 100px;
            border-radius: 13px;
            margin: 3px;
          `}
          resizeMode="cover"
          source={{ uri: props.currentMessage.image }}
        />
      </TouchableOpacity>
      <Modal visible={show} transparent={true}>
        <ImageViewer
          onClick={() => setShow(false)}
          index={0}
          renderImage={ip => <FastImage {...ip} />}
          enableSwipeDown={true}
          onCancel={() => setShow(false)}
          imageUrls={[{ url: props.currentMessage.image }]}
        />
      </Modal>
    </>
  );
};

export default ChatImageCell;
