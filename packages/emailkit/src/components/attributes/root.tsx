import * as React from 'react';

export interface AttributesRootProps {
    children?: React.ReactNode;
}

export function AttributesRoot({
    children,
}: AttributesRootProps): React.JSX.Element {
    return <>{children}</>;
}

AttributesRoot.displayName = 'Attributes.Root';
