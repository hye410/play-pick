declare global {
  interface Window {
    Kakao: {
      isInitialized: () => boolean;
      init: (key?: string) => void;
      Share: {
        sendDefault: (object) => void;
      };
    };
  }
}

export {};
