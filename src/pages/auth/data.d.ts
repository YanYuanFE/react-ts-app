export interface LoginParams {
  phone: string;
  password: string;
}

export interface RegisterParams {
  name: string;
  password: string;
  confirm: string;
  phone: string;
}

export interface ResetPasParams {
  phone: string;
  old_password: string;
  new_password: string;
}

export interface StateType {
  current?: string;
  step?: {
    phone: string;
    old_password: string;
    new_password: string;
  };
}

export interface ModelType {
  namespace: string;
  state: StateType;
  effects: {
    submitStepForm: Effect;
  };
  reducers: {};
}
