import store from '../../redux/store';
import {
  registerUser,
  loginUser,
  reset,
  deleteUser,
} from '../../redux/reducers/userReducer';
import User from '../model.test';
import { describe, expect, test, beforeEach } from '@jest/globals';
import UserInterface from '../../interfaces/userData';

beforeEach(async () => {
  await store.dispatch(reset());
  const defaultStorage = await store.getState();
  await expect(defaultStorage.user.first_name).toBe('');
});

describe('test part of the global state', () => {
  test('tests that the user params sent are those receives from the server', async () => {
    // const defaultStorage = await store.getState();
    const params: UserInterface = new User().copy();
    await store.dispatch(registerUser(params));
    const updatedStorage = await store.getState();
    const userProfile = await updatedStorage.user;
    await expect(userProfile.first_name).toBe(params.first_name);
    await expect(userProfile.last_name).toBe(params.last_name);
  });

  test('tests that if the params for login are correct, the user profile would be updated', async () => {
    const params: UserInterface = new User().copy();
    const data = params.username,
      password = params.password;
    await store.dispatch(registerUser(params));
    await store.dispatch(loginUser({ data, password }));
    const updatedStorage = await store.getState();
    const userProfile = await updatedStorage.user;
    await expect(userProfile.first_name).toBe(params.first_name);
    await expect(userProfile.last_name).toBe(params.last_name);
  });

  test('tests that the user profile ise deleted from the server', async () => {
    const params: UserInterface = new User().copy();
    const data = params.username,
      password = params.password;
    await store.dispatch(registerUser(params));
    await store.dispatch(loginUser({ data, password }));
    // const u = await store.getState();

    // console.log(u)
    // await setTimeout(() => console.log('done'), 2000)
    await store.dispatch(deleteUser());
    const updatedStorage = await store.getState();
    const userProfile = await updatedStorage.user;
    await expect(userProfile.first_name).toBe('');
  });
});
