import WebSocket from "ws";
import { useState } from "react";

// const clientWs = new WebSocket("ws://localhost:8100", {
//   perMessageDeflate: false,
// });

interface useSubscribeProps {
  eventName: string;
}

const useSubscribe = ({ eventName }: useSubscribeProps) => {
  const clientWs = new WebSocket("ws://localhost:8100");
  const [value, setValue] = useState<string>();

  // clientWs.on("open", () => {
  //   clientWs.on(eventName, (data) => {
  //     setValue(`${data}`);
  //   });
  // });

  return value;
};

export default useSubscribe;
