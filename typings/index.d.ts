declare module "*.module.css";

interface ServerData {
    id: string;
    name: string;
    icon: string | null;
    ranking: {
        users: ServerRankingUser[];
    };
}

interface ServerRankingUser {
    id: string;
    username: string;
    avatarURL: string;
    discriminator: string;
    xp: number;
    lvl: number;
}
