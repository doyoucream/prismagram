import { prisma } from "../../../generated/prisma-client";

export default {
    User: {
        fullName: parent => {
            return `${parent.firstName} ${parent.lastName}`;
        },
        isFollowing: ( parent, _, { request } ) => {
            const { user } = request;
            const { id: parentId } = parent; // 상대방 id
            try {
                return prisma.$exists.user({
                    AND: [
                        { id: user.id },
                        { following_some: { id: parentId } }
                    ]
                });
            } catch {
                return false;
            }
        },
        isSelf: ( parent, _, { request } ) => {
            const { user } = request;
            const { id: parentId } = parent; // 상대방 id
            return user.id === parentId;
        }
    }
};