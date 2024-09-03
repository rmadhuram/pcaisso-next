// From: https://medium.com/@nouraldin.alsweirki/pub-sub-pattern-in-react-example-c5bbd08fa02f

import { useEffect } from "react";
import { EventEmitter } from "eventemitter3";

const emitter = new EventEmitter();

export const useSub = (event: string, callback: any) => {
  const unsubscribe = () => {
    emitter.off(event, callback);
  };

  useEffect(() => {
    emitter.on(event, callback);
    return unsubscribe;
  }, []);

  return unsubscribe;
};

export const usePub = () => {
  return (event: string, data: any) => {
    emitter.emit(event, data);
  };
};
