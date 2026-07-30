import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";

export const Login = () => {
    return <div className="flex items-center justify-center min-h-screen">
        <form className="flex flex-col gap-2 bg-gray-50 border border-gray-100 rounded-2xl">
            <div>
                <label htmlFor="email">Email</label>
                <Input type="email" id="email" name="email" />
            </div>
            <div>
                <label htmlFor="password">Password</label>
                <Input type="password" id="password" name="password" />
            </div>
            <Button className="bg-brand text-white cursor-pointer w-full mt-4">Login</Button>
        </form>
    </div>
}