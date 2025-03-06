import LoginForgot from "@/components/auth/LoginForgot";
import LogoutButton from "@/components/auth/LogoutButton";
import { getServerSession } from "next-auth";


export default async function forgotPass() {
    const session = await getServerSession();
    
    return (
        <main className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="max-w-md w-full space-y-8 p-8 bg-white rounded-lg shadow-lg">
                <div className="text-center">
                    <h2 className="mt-6 text-3xl font-bold text-gray-900">DTI-Controller</h2>
                    <p className="mt-2 text-sm text-gray-600">
                        Sisema de controle de estoque e OS
                    </p>
                    <p className="mt-2 text-sm text-gray-300">
                        Recuperação de senha
                    </p> 
                </div>
                <LoginForgot />
                <LogoutButton/>
            </div>
        </main>
    )
}