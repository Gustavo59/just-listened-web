import { Typography } from "antd";
import { useSession } from "next-auth/react";

import { CurrentSession } from "@/domain/entities/CurrentSession";

const { Title } = Typography;

export function HomePage() {
    const { data: session } = useSession() as CurrentSession;

    return <Title level={3}>Welcome, {session.user.name}!</Title>;
}
