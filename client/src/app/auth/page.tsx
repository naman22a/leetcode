import { Button } from '@/components/ui/button';

function Auth() {
    return (
        <div className="p-5">
            <h1 className="font-semibold text-3xl mb-5">Login with Github</h1>
            <a href={`${process.env.NEXT_PUBLIC_API_ENDPOINT}/auth/github`}>
                <Button>Login</Button>
            </a>
        </div>
    );
}

export default Auth;
