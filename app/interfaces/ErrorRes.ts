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
