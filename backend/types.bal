import ballerina/http;

public type UserModel record {|
    readonly string id;
    string email;
    string password;
|};

public type ErrorDetailsBody record {
    string message;
};

public type UserDetailsBody record {
    NewUserModel user;
};

public type UserNotFoundModel record {|
    *http:NotFound;
    ErrorDetailsBody body;
|};

public type BadRequestModel record {|
    *http:BadRequest;
    ErrorDetailsBody body;
|};

public type UnauthorizedModel record {|
    *http:Unauthorized;
    ErrorDetailsBody body;
|};

public type NewUserModel record {|
    string email;
    string password;
|};

public type ResetPasswordModel record {|
    string email;
|};

public type AuthResponseModel record {|
    *http:Ok;
    UserDetailsBody body;
|};
