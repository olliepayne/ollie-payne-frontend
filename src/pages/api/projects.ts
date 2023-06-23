import { NextApiRequest, NextApiResponse } from "next"

type ResponseData = {}

const handleFilterProjects = () => {

}

export default function handler (
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  if (req.method === "GET") {
    if (req.body)
  }
}
