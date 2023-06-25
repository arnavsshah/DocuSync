import { Button, Title } from "@mantine/core";

export const DebugDirectory = () => {
    return (<>
        <Title>Debug Directory</Title>
        <Button component="a" href="/docusync">DocuSync</Button>
        <Button component="a" href="/community">Community</Button>
        <Button component="a" href="/docs">Documentation</Button>
    </>);
}