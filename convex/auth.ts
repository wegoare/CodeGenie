import { MutationCtx,QueryCtx } from "./_generated/server";

export const verifyAuth = async (ctx: QueryCtx | MutationCtx) => {
  const identity = await ctx.auth.getUserIdentity();

  console.log("Convex Identity:", identity);

  if (!identity) {
    throw new Error("unauthorized");
  }

  return identity;
};