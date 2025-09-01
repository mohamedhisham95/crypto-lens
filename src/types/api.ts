export type BaseAPIError = {
  status: number;
  message: string;
};

export type APIError = {
  success: false;
  code: number;
  message: string;
};
