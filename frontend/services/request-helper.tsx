import axios, { AxiosError, AxiosResponse } from "axios";
import {BackEndRoutes} from "../config/back-end-routes";

interface OptionsExternal {
    externalURL?: "";
    headers?: object;
    responseType?: any;
    signal?: AbortSignal;
}

interface RequestHttp {
    method: "DELETE" | "GET" | "POST" | "PUT" | "PATCH";
    path: string;
    base_back?: boolean;
    data?: object | [] | undefined;
    opts?: OptionsExternal | undefined;
    responseType?: any;
}

export class RequestHelper {
    // private static userContext: LoginResult | null = useAuth().getUserSession();

    static async httpRequest<T>({ method, path, base_back, data, opts, responseType }: RequestHttp) : Promise<AxiosResponse<T>> {
        const headers: any = opts?.headers ? opts.headers : {};

        console.log("headers", headers)
        // Adicionar token de autenticação se disponível
        // if (this.userContext?.token) {
        //   headers.Authorization = `Bearer ${this.userContext?.token}`;
        // }

        return axios({
            method: method,
            baseURL: opts?.externalURL ? "" : BackEndRoutes.getHost(base_back),
            url: `${path}`,
            data,
            headers: headers,
            responseType: responseType ?? undefined,
            signal: opts?.signal,
        });
    }

    static getQueryString(object: any) {
        if (!object) return "";

        if (typeof object === "string") return object;

        if (typeof object === "object") object = { ...object };

        let queryString = "";

        // Monta a querystring
        Object.keys(object).forEach((key) => {
            if (object[key] !== null && object[key] !== undefined && object[key] !== "") {
                if (queryString.length > 0) queryString += "&";
                queryString += key + "=" + encodeURIComponent(object[key]);
            }
        });

        return queryString;
    }

    static createAxiosError(message: string): AxiosError {
        return {
            name: "AxiosError",
            message,
            config: {} as any,
            isAxiosError: true,
            toJSON: () => ({}),
            response: {
                data: { error: message },
                status: 400,
                statusText: "Bad Request",
                headers: {},
                config: {},
            } as any,
        };
    }
}

export default RequestHelper;
