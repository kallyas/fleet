// utility function to parse error messages from django rest framework

export default function errorParser(error) {
    // example error object:
    // {"field_name": ["error message"]}
    // {"non_field_errors": ["error message"]}
    // {"non_field_errors": ["error message", "error message"]} etc.

    // if error is not an object, return it
    if (typeof error !== "object") {
        return error;
    }

    // if error is an object, parse it
    let parsedError = "";

    // check if error is like {status: 400, data: {message: "error message"}}
    if (error.message) {
        return error.message;
    }

    for (const [_, value] of Object.entries(error)) {
        parsedError += `Error: ${value.join(", ")}!`;
    }

    return parsedError;
}