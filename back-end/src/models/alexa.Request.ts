export interface AlexaRequest {
    request: {
      type: string;
      intent: {
        name: string;
        slots: {
          [key: string]: {
            value: string;
          };
        };
      };
    };
  }
  