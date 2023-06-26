import type { NextApiRequest, NextApiResponse } from 'next';
import { roqClient } from 'server/roq';
import { prisma } from 'server/db';
import { authorizationValidationMiddleware, errorHandlerMiddleware } from 'server/middlewares';
import { clubMembershipValidationSchema } from 'validationSchema/club-memberships';
import { convertQueryToPrismaUtil } from 'server/utils';
import { getServerSession } from '@roq/nextjs';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { roqUserId, user } = await getServerSession(req);
  switch (req.method) {
    case 'GET':
      return getClubMemberships();
    case 'POST':
      return createClubMembership();
    default:
      return res.status(405).json({ message: `Method ${req.method} not allowed` });
  }

  async function getClubMemberships() {
    const data = await prisma.club_membership
      .withAuthorization({
        roqUserId,
        tenantId: user.tenantId,
        roles: user.roles,
      })
      .findMany(convertQueryToPrismaUtil(req.query, 'club_membership'));
    return res.status(200).json(data);
  }

  async function createClubMembership() {
    await clubMembershipValidationSchema.validate(req.body);
    const body = { ...req.body };

    const data = await prisma.club_membership.create({
      data: body,
    });
    return res.status(200).json(data);
  }
}

export default function apiHandler(req: NextApiRequest, res: NextApiResponse) {
  return errorHandlerMiddleware(authorizationValidationMiddleware(handler))(req, res);
}
