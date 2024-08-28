import axiosClient from '../../axiosClient/axiosClient';
import User from '../model.test';
import { describe, expect, test } from '@jest/globals';

describe('test functions for the axiosClient instance class', () => {
  test('the register route, login, profile and delete user route', async () => {
    const user = new User().copy();
    const loginDetails = {
      data: user.username,
      password: user.password,
    };
    const registerResponse = await axiosClient.post(
      '/api/v1/auth/register',
      user
    );
    const userProfile = await registerResponse.data;
    await expect(userProfile.first_name).toEqual(user.first_name);
    const loginResponse = await axiosClient.post('/api/v1/auth/login', loginDetails);
    const userProfileAfterLogin = await loginResponse.data;
    await expect(userProfileAfterLogin.first_name).toEqual(user.first_name);
    const profileRouteResponse = await axiosClient.get('/api/v1/auth/profile')
    const userAfterProfileRoute = await profileRouteResponse.data
    await expect(userAfterProfileRoute.first_name).toEqual(user.first_name)
  });
});
