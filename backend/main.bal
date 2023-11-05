import ballerina/http;

type User record {|
    int id;
    string email;
    string password;
|};

    User[] users = [
        {id:1, email: "test@gmail.com", password: "zaq1@WSX"},
        {id:2, email: "admin@admin.com", password: "zaq1@WSX"},
        {id:3, email: "test2@test.com", password: "zaq1@WSX"}
    ];
service /backend on new http:Listener(9090) {


    resource function get users() returns User[]|error {
        return users;
    }
}
