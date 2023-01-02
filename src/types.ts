export type ApiError = {
  type: "error";
  messages: string[];
};

export type AccountAuthResponse =
  | {
      type: "success";
    }
  | ApiError;

export type AccountLoginResponse =
  | {
      type: "success";
    }
  | ApiError;
