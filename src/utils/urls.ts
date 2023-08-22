export function generateUrlParams(params: { [i: string]: any }) {
    if (!params) return "";

    if (!Object.values(params).filter((item) => item).length) return "";

    const urlParams = new URLSearchParams();
    for (const key in params) {
        if (params[key]) urlParams.append(key, params[key]);
    }

    return "?" + urlParams.toString();
}
