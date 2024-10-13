import {Config} from "./index";

const BASE_URL = process.env.apiV2NEW || "http://127.0.0.1:3333";
const BASE_URL_JAVA = process.env.apiJAVA || "http://127.0.0.1:3333";
/**
 * Variaveis que são automaticamente substituiveis no RequestHelper.httpRequest:
 */
export const BackEndRoutes = {
    getHost: (backend = true): string => {
        const $how_api = backend ? Config.BACK_API : Config.API_URL

        return $how_api || "http://127.0.0.1:8090/api/v1";
    },
    routes: {
        AUTH: {

        },
        AUTHENTICATED: {
           CENSO:{
               IMPORT: "/censo/importacao"
           },
           INTERNACAO:{
               LIST: "/internacoes"
           }
        },
        PUBLIC: {

        },
    },
};