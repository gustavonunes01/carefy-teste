import {AxiosResponse} from "axios";
import RequestHelper from "../request-helper";
import {FrontEndRoutes} from "../../config/front-end-routes";
import {InternacaoResponse} from "../../types/internacao/interface";

export class ListInternacaoFrontService {
  static async handle(): Promise<AxiosResponse<InternacaoResponse>> {
    return await RequestHelper.httpRequest({
      method: 'GET',
      path: FrontEndRoutes.API.INTERNACAO.LIST.route,
      base_back: false,
      data: undefined,
      opts: {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('authToken')}`,
        }
      }
    });
  }
}