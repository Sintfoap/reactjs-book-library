export function find_error_message_in_response(response) {
    if (response && response.data) {
        return response.status.toString() + ": " + JSON.stringify(response.data).replaceAll(/[\[\]\{\}"\\]/g, '').replaceAll(',', ' ').replaceAll(':', ': ')

    } else {
        console.log(response)
        return "Server failed to respond. Please reach out to your server administrator."
    }
}