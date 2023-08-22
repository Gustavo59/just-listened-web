import { Button, Space, Typography } from "antd";
import { signIn } from "next-auth/react";

import { GoogleIcon } from "@/components/icons/GoogleIcon";

import style from "./index.module.css";

const { Text } = Typography;

export function LoginPage() {
    return (
        <div className={style.loginPage}>
            <section className={style.loginPage__Box}>
                <Space direction="vertical" size={25}>
                    <Text style={{ color: "white" }} strong>
                        Welcome to Just Listened
                    </Text>
                    <Button
                        size="large"
                        icon={<GoogleIcon />}
                        onClick={() => signIn("google")}
                    >
                        Sign in with Google
                    </Button>
                </Space>
            </section>
        </div>
    );
}

export const LOGIN_URL = "/login";
