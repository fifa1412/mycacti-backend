export const ExceptionList = [
    // XX -> Common Error //
    {
        code: 99,
        likeMessage: "auth/wrong-password",
        translateMessage: "Invalid password"
    },
    {
        code: 98,
        likeMessage: "auth/id-token-expired",
        translateMessage: "User token expired"
    },
    {
        code: 97,
        likeMessage: "auth/too-many-requests",
        translateMessage: "Too many requests, Please try again later"
    },
    {
        code: 96,
        likeMessage: "auth/user-not-found",
        translateMessage: "User not found"
    },

    // 422XXX -> Unprocessable Entity Error //
    {
        code: 422001,
        likeMessage: "auth/email-already-in-use",
        translateMessage: "Email already in use"
    },
    {
        code: 422002,
        likeMessage: "auth/weak-password",
        translateMessage: "Password is too weak"
    },
    {
        code: 422003,
        likeMessage: "auth/argument-error",
        translateMessage: "Invalid access token"
    },

    // Officer Error Group
    {
        code: 198,
        likeMessage: "jwt expired",
        translateMessage: "Officer token expired"
    },
];