import { logout } from "@services/authService";

interface Props {
    children: any;
}

function LogoutButton({ children }: Props) {

    const handleLogout = async () => {
        try {
            await logout();
            window.location.reload();
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <div
            onClick={handleLogout}
            className="flex items-center gap-4 text-white hover:text-gray-400 text-lg transition-all duration-300 cursor-pointer">
            {children}
        </div>
    )
}

export default LogoutButton