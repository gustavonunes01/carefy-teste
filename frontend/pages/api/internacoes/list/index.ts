import type { NextApiRequest, NextApiResponse } from "next";
import {CensoImportService} from "../../../../services/censo/import.service";
import {ListInternacaoService} from "../../../../services/internacao/list.service";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    try {
      const response = await ListInternacaoService.handle(req.body, req.headers);
      res.status(200).json(response.data);
    } catch (error: any) {
      console.log('asdasda', error.response.data)
      res.status(422).json(error?.response?.data);
    }
  }
}
