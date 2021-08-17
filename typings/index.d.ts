declare module "*.module.css";

interface ClientInfos {
    accent_color: null;
    avatar: string;
    discriminator: string;
    id: string;
    locale: string;
    username: string;
    token: string;
}

interface GuildInfos {
    name: string;
    id: string;
    icon: string | null;
    owner: boolean;
    permissions: string;
    features: string[];
}
