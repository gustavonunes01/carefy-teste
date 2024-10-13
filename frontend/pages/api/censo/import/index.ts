import type { NextApiRequest, NextApiResponse } from "next";
import Logout from "../../../../services/auth/logout.service";
import {CensoImportService} from "../../../../services/censo/import.service";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    try {

      const response = await CensoImportService.handle(req.body, req.headers);
      res.status(200).json(response.data);
    } catch (error: any) {
      console.log('asdasda', error.response.data)
      res.status(422).json(error?.response?.data);
    }
  }
}
