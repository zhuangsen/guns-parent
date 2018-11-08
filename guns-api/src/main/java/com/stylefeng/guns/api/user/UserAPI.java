package com.stylefeng.guns.api.user;

public interface UserAPI {
    boolean login(String username, String password);

    boolean register(UserModel userModel);

    boolean checkUserName(String userName);
}
