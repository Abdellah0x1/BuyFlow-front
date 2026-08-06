import axios from "axios";

type ApiErrorResponse = {
    message?: string
}

export function getApiErrorMessage(error: unknown, fallback: string) {
    if (axios.isAxiosError<ApiErrorResponse>(error)) {
        return error.response?.data?.message || fallback;
    }

    return fallback;
}
