import { Button } from '../components/ui/button';

function Home() {
    return (
        <div className="p-5">
            <h1 className="font-semibold text-3xl mb-5">Leetcode dashboard</h1>
            <Button>Logout</Button>
        </div>
    );
}

export default Home;
