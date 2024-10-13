import { backapi } from "../backapi";
import {BackEndRoutes} from "../../config/back-end-routes";
import {ICenso} from "../../types/censo/interface";
import RequestHelper from "../request-helper";

export class CensoImportService {
  static handle = async (data: ICenso[], params: any): Promise<any | false> => {

    const config = {
      headers: {
        Authorization: params.authorization, 
      },
    };

    // const response = await backapi.post(BackEndRoutes.routes.AUTHENTICATED.CENSO.IMPORT, data, config);
    const response = await RequestHelper.httpRequest({
      method: 'POST',
      path: BackEndRoutes.routes.AUTHENTICATED.CENSO.IMPORT,
      base_back: true,
      data: data,
      opts: config
    });
    console.log("asda", response)
    return response;
  };
}
