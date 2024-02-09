import passport from "passport";
import User from '../models/User.js'
// const GoogleStrategy = require('passport-google-oauth20').Strategy;
import dotenv from "dotenv";
import  OAuth2Strategy from "passport-google-oauth2";
const GoogleStrategy = OAuth2Strategy.Strategy;

dotenv.config()
passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_SECRET,
      callbackURL: 'http://localhost:3000/api/auth/google/callback',
      scope: ["profile", "email"],
    },
    async (accessToken, refreshToken, profile, done) => {
      try{
        let user = await User.findOne({email: profile.email})
        const name = profile.displayName;
        if(!user){
            user = new User({
                username: name,
                email: profile.email,
                password: profile.id,
            });
            await user.save();
        }
        return done(null, user);
      }catch (error){
        return done(error)
      }
    }
  )
);

passport.serializeUser((user, done) => {
  // Serialize user information (store user ID in the session)
  done(null, user);
});


passport.deserializeUser((user, done) => {
  // Deserialize user information (retrieve user from the session)
  done(null, user);
});

export default passport;
