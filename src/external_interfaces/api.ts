import {
    InternalExcept,
    NetworkExcept,
    UnauthorizedExcept,
} from "@/domain/exceptions";

export async function api(request: Request, exceptions?: Map<number, Error>) {
    const exceptionMap = new Map<number, Error>([
        [500, new InternalExcept()],
        [503, new NetworkExcept()],
        [403, new UnauthorizedExcept()],
    ]);

    const req = await fetch(request);
    const exception =
        exceptionMap.get(req.status) || exceptions?.get(req.status);

    if (exception) throw exception;
    return req;
}
