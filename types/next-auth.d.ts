import { DefaultSession, DefaultUser } from "next-auth";
import { UserRole } from "./roles";

declare module "next-auth" {
  interface User extends DefaultUser {
    role: UserRole;
  }

  interface Session {
    user: {
      role: UserRole;
    } & DefaultSession["user"];
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    role: UserRole;
  }
}
