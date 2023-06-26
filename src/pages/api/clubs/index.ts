import type { NextApiRequest, NextApiResponse } from 'next';
import { roqClient } from 'server/roq';
import { prisma } from 'server/db';
import { authorizationValidationMiddleware, errorHandlerMiddleware } from 'server/middlewares';
import { clubValidationSchema } from 'validationSchema/clubs';
import { convertQueryToPrismaUtil } from 'server/utils';
import { getServerSession } from '@roq/nextjs';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { roqUserId, user } = await getServerSession(req);
  switch (req.method) {
    case 'GET':
      return getClubs();
    case 'POST':
      return createClub();
    default:
      return res.status(405).json({ message: `Method ${req.method} not allowed` });
  }

  async function getClubs() {
    const data = await prisma.club
      .withAuthorization({
        roqUserId,
        tenantId: user.tenantId,
        roles: user.roles,
      })
      .findMany(convertQueryToPrismaUtil(req.query, 'club'));
    return res.status(200).json(data);
  }

  async function createClub() {
    await clubValidationSchema.validate(req.body);
    const body = { ...req.body };
    if (body?.club_membership?.length > 0) {
      const create_club_membership = body.club_membership;
      body.club_membership = {
        create: create_club_membership,
      };
    } else {
      delete body.club_membership;
    }
    if (body?.sighting?.length > 0) {
      const create_sighting = body.sighting;
      body.sighting = {
        create: create_sighting,
      };
    } else {
      delete body.sighting;
    }
    const data = await prisma.club.create({
      data: body,
    });
    return res.status(200).json(data);
  }
}

export default function apiHandler(req: NextApiRequest, res: NextApiResponse) {
  return errorHandlerMiddleware(authorizationValidationMiddleware(handler))(req, res);
}
