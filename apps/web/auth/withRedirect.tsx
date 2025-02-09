import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export function withRedirect<T extends object>(
    Component: React.FC<T>,
    isAuthRoute = false
) {
    return async function PageWithRedirect(props: T) {
        const cookiesStore = await cookies();
        const token = cookiesStore.get('token');

        const noAuth = !isAuthRoute && !token;

        if (noAuth) {
            redirect('/login');
        }

        return <Component {...props} />;
    };
}
