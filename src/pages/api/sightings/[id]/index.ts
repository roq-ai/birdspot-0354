import type { NextApiRequest, NextApiResponse } from 'next';
import { roqClient } from 'server/roq';
import { prisma } from 'server/db';
import { errorHandlerMiddleware } from 'server/middlewares';
import { sightingValidationSchema } from 'validationSchema/sightings';
import { HttpMethod, convertMethodToOperation, convertQueryToPrismaUtil } from 'server/utils';
import { getServerSession } from '@roq/nextjs';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { roqUserId, user } = await getServerSession(req);
  await prisma.sighting
    .withAuthorization({
      roqUserId,
      tenantId: user.tenantId,
      roles: user.roles,
    })
    .hasAccess(req.query.id as string, convertMethodToOperation(req.method as HttpMethod));

  switch (req.method) {
    case 'GET':
      return getSightingById();
    case 'PUT':
      return updateSightingById();
    case 'DELETE':
      return deleteSightingById();
    default:
      return res.status(405).json({ message: `Method ${req.method} not allowed` });
  }

  async function getSightingById() {
    const data = await prisma.sighting.findFirst(convertQueryToPrismaUtil(req.query, 'sighting'));
    return res.status(200).json(data);
  }

  async function updateSightingById() {
    await sightingValidationSchema.validate(req.body);
    const data = await prisma.sighting.update({
      where: { id: req.query.id as string },
      data: {
        ...req.body,
      },
    });

    return res.status(200).json(data);
  }
  async function deleteSightingById() {
    const data = await prisma.sighting.delete({
      where: { id: req.query.id as string },
    });
    return res.status(200).json(data);
  }
}

export default function apiHandler(req: NextApiRequest, res: NextApiResponse) {
  return errorHandlerMiddleware(handler)(req, res);
}
