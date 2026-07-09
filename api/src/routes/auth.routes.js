import "dotenv/config";
import { Router } from "express";
import { findOrCreateUser } from "../repositories/user.repository.js";
import axios from "axios";
import jwt from "jsonwebtoken";

const router = Router();

router.get("/google", (req, res) => {
  const params = new URLSearchParams({
    client_id: process.env.GOOGLE_CLIENT_ID,
    redirect_uri: process.env.GOOGLE_CALLBACK_URL,
    response_type: "code",
    scope: "profile email",
  });

  res.redirect(`https://accounts.google.com/o/oauth2/v2/auth?${params}`);
});

router.get("/google/callback", async (req, res) => {
  try {
    const { code } = req.query;

    // step 1 — exchange code for access token
    const { data: tokenData } = await axios.post(
      "https://oauth2.googleapis.com/token",
      {
        code,
        client_id: process.env.GOOGLE_CLIENT_ID,
        client_secret: process.env.GOOGLE_CLIENT_SECRET,
        redirect_uri: process.env.GOOGLE_CALLBACK_URL,
        grant_type: "authorization_code",
      },
    );

    // step 2 — use access token to get user info from google
    const { data: profile } = await axios.get(
      "https://www.googleapis.com/oauth2/v2/userinfo",
      {
        headers: { Authorization: `Bearer ${tokenData.access_token}` },
      },
    );
    // profile looks like:
    // { id, name, email, picture }

    // step 3 — find or create user in db
    const user = await findOrCreateUser(profile);
    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });
    res.redirect(`${process.env.CLIENT_URL}?token=${token}`);
  } catch (err) {
    console.error(err);
    res.redirect(`${process.env.CLIENT_URL}/login?error=true`);
  }
});

export default router;
