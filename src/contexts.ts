import React from "react";

import type { APIUser } from "discord-api-types";

declare interface User extends APIUser {
    token: string;
}


export const clientContext = React.createContext(null as User | null);
