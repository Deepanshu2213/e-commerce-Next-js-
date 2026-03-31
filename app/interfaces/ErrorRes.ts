interface ErrorRes {
  errors: Record<string, string[] | undefined>;
}

interface ResponseObj<T> {
  data: T[];
  message: string[];
}

export type ActionError = Promise<{
  errors: Record<string, string[] | undefined>;
}>;

export interface PaymentInfo {
  razorpay_order_id: string;
  razorpay_payment_id: string;
  razorpay_signature: string;
}

export type ReplaceWithString<T, K extends keyof T> =
  Omit<T, K> & {
    [P in K]: string;
  };

export type ReplaceAddTimestamp<T, K extends keyof T> = ReplaceWithString<T, K> & {
  createdAt: string;
  updatedAt: string;
}