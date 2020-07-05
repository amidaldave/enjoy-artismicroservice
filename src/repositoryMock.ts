import { Repository } from "typeorm";

// eslint-disable-next-line @typescript-eslint/ban-ts-ignore
// @ts-ignore
export const repositoryMockFactory: () => 
MockType<Repository<any>> = jest.fn(() => ({
  findOne: jest.fn(),
  find: jest.fn(),
  update: jest.fn(),
  remove: jest.fn(),
  save: jest.fn()
 }));
 export type MockType<T> = {
  [P in keyof T]: jest.Mock<{}>;
 };
