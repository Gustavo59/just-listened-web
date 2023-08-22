import { ReactNode, createContext, useContext, useState } from "react";

import { Spin } from "antd";

const LoadingContext = createContext<any>({});

export function LoadingProvider(props: { children: ReactNode }) {
    const [isLoading, setIsLoading] = useState(false);
    const providerValue = {
        setIsLoading,
    };
    return (
        <LoadingContext.Provider value={providerValue}>
            <Spin size="large" spinning={isLoading}>
                {props.children}
            </Spin>
        </LoadingContext.Provider>
    );
}

export const useLoading = () => useContext(LoadingContext);
