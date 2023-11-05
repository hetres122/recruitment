import ballerina/http;

type User record {|
    readonly int id;
    string email;
    string password;
|};

table<User> key(id) users = table [
    {id: 1, email: "test@gmail.com", password: "zaq1@WSX"},
    {id: 2, email: "admin@admin.com", password: "zaq1@WSX"},
    {id: 3, email: "test2@test.com", password: "zaq1@WSX"}
];

type ErrorDetails record {
    string message;
};

type UserNotFound record {|
    *http:NotFound;
    ErrorDetails body;
|};

type BadRequest record {|
    *http:BadRequest;
    ErrorDetails body;
|};

type Unauthorized record {|
    *http:Unauthorized;
    ErrorDetails body;
|};

type NewUser record {|
    string email;
    string password;
|};

type ResetPassword record {|
    string email;
|};

service /backend on new http:Listener(9090) {

    resource function get users() returns User[]|error {
        return users.toArray();
    }
    resource function get users/[int id]() returns User|UserNotFound|error {
        User? user = users[id];
        if user is () {
            UserNotFound userNotFound = {
                body: {message: string `No user with such ID found`}
            };
            return userNotFound;
        }
        return user;
    }
    resource function post users(NewUser newUser) returns http:Created|error {
        users.add({id: users.length() + 1, ...newUser});
        return http:CREATED;
    }

    resource function post users/resetPassword(ResetPassword resetPassword) returns http:Accepted|BadRequest|error {

        boolean emailFound = false;

        foreach User user in users {
            if (user.email == resetPassword.email) {
                emailFound = true;
                break;
            }
        }

        if (emailFound) {
            return http:ACCEPTED;
        } else {
            BadRequest badRequest = {
                body: {message: string `No user with such email found`}
            };
            return badRequest;
        }
    }

    resource function post auth/login(NewUser newUser) returns http:Ok|Unauthorized|error {

        boolean userFound = false;

        foreach User user in users {
            if (user.email == newUser.email && user.password == newUser.password) {
                userFound = true;
                break;
            }
        }
        if (userFound) {
            return http:OK;
        } else {
            Unauthorized unauthorized = {
                body: {message: string `Invalid login data`}
            };
            return unauthorized;
        }

    }

}
