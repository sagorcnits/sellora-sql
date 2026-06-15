import authModel from "../models/auth.model";

export const authService = {
  async registerUser(user: any) {
    const result = await authModel.registerUser(user);

    return result;
  },
};
