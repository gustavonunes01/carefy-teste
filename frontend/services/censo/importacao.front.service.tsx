import { backapi } from "../backapi";
import {CensoReponse, DataReponseCenso, ICenso, ReturnReponseCenso} from "../../types/censo/interface";
import {AxiosResponse} from "axios";
import RequestHelper from "../request-helper";
import {BackEndRoutes} from "../../config/back-end-routes";
import {FrontEndRoutes} from "../../config/front-end-routes";

export class CensoImportFrontService {
  static async handle(data: ICenso[]): Promise<AxiosResponse<ReturnReponseCenso>> {
    return await RequestHelper.httpRequest({
      method: 'POST',
      path: FrontEndRoutes.API.CENSO.IMPORT.route,
      base_back: false,
      data: data,
      opts: {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('authToken')}`,
        }
      }
    });
  }
}