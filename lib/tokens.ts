import { v4 as uuidv4 } from "uuid";

import { db } from "@/lib/db";
import { getVerificationTokenByEmail } from "@/data/verification-token";

export const generateVerificationToken = async (email: string) => {

  // get the token from the uuidv4 function
const token = uuidv4();

  // expire the token in 1 hour
  const expires = new Date(new Date().getTime() + 3600 * 1000);

  // check if there is an existing token for the email
  const existingToken = await getVerificationTokenByEmail(email);

  // if there is an existing token, delete it from the database
  if (existingToken) {
    await db.verificationToken.delete({
      where: {
        id: existingToken.id,
      },
    });
  }

  // generate a new token and save it to the database
  const verficationToken = await db.verificationToken.create({
    data: {
      email,
      token,
      expires,
    }
  });

  return verficationToken;
};
