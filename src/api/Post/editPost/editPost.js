import { isAuthenticated } from "../../../middlewares";
import { prisma } from "../../../../generated/prisma-client";

const EDIT = "EDIT";
const DELETE = "DELETE";

export default {
  Mutation: {
    editPost: async (_, args, { request }) => {
      isAuthenticated(request);
      const { user } = request;
      const { id, caption, location, action } = args;
      const post = await prisma.$exists.post({ id, user: { id: user.id } });
      if (post) {
        if (action === EDIT) {
          return prisma.updatePost({
            data: { caption, location },
            where: { id }
          });
        } else if (action === DELETE) {
          return prisma.deletePost({ id });
        }
      } else {
        throw Error("You Can't do that!");
      }
    }
  }
};
