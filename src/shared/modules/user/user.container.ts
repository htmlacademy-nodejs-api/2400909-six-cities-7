import { Container } from "inversify";
import { Component } from "../../types/component.enum.js";
import { UserEntity, UserModel } from "./user.entity.js";

export function createUserContainer() {
  const userContainer = new Container();
  userContainer.bind<types.ModelType<UserEntity>>(Component.UserModel).toConstantValue(UserModel);

  return userContainer;
}
