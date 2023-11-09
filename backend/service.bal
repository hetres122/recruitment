import ballerina/http;
import ballerina/uuid;

table<UserModel> key(id) users = table [
    {id: "1", email: "test@gmail.com", password: "zaq1@WSX"},
    {id: "2", email: "admin@admin.com", password: "zaq1@WSX"},
    {id: "3", email: "test2@test.com", password: "zaq1@WSX"}
];

@http:ServiceConfig {
    cors: {
        allowOrigins: ["*"]
    }
}

service /backend on new http:Listener(9090) {

    resource function get users() returns UserModel[]|error {
        return users.toArray();
    }

    resource function get users/[string id]() returns UserModel|UserNotFoundModel|error {
        UserModel? user = users[id];
        if user is () {
            UserNotFoundModel userNotFound = {
                body: {message: string `No user with such ID found`}
            };
            return userNotFound;
        }
        return user;
    }

    resource function post users(NewUserModel newUser) returns CreateUserResponseModel|BadRequestModel|error {
        if (newUser.password.length() < 8) {
            BadRequestModel badRequest = {
                body: {message: string `Password is too short; it must be at least 8 characters long`}
            };
            return badRequest;
        }

        if (newUser.email.length() < 3) {
            BadRequestModel badRequest = {
                body: {message: string `Email is too short; it must be at least 3 characters long`}
            };
            return badRequest;
        }
        users.add({id: uuid:createType1AsString(), ...newUser});

        CreateUserResponseModel createUserResponse = {
            body: {email: newUser.email}
        };
        return createUserResponse;
    }

    resource function post users/resetPassword(ResetPasswordModel resetPassword) returns ResetPasswordResponseModel|BadRequestModel|error {
        boolean emailFound = false;

        foreach UserModel user in users {
            if (user.email == resetPassword.email) {
                emailFound = true;
                break;
            }
        }

        if (emailFound) {
            ResetPasswordResponseModel resetPasswordResponse = {
                body: {email: resetPassword.email}
            };
            return resetPasswordResponse;
        } else {
            BadRequestModel badRequest = {
                body: {message: string `No user with such email found`}
            };
            return badRequest;
        }
    }

    resource function post auth/login(NewUserModel newUser) returns AuthResponseModel|UnauthorizedModel|error {

        boolean userFound = false;

        foreach UserModel user in users {
            if (user.email == newUser.email && user.password == newUser.password) {
                userFound = true;
                break;
            }
        }
        if (userFound) {
            AuthResponseModel authResponse = {
                body: {email: newUser.email}
            };
            return authResponse;
        } else {
            UnauthorizedModel unauthorized = {
                body: {message: string `Invalid login data`}
            };
            return unauthorized;
        }

    }

}
