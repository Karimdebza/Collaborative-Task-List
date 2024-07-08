export interface AlexaResponse {
    version: string;
    response: {
      outputSpeech: {
        type: string;
        text: string;
      };
      shouldEndSession: boolean;
    };
  }
  