import Link from 'next/link';
import { useRouter } from 'next/router';
import { FiHome, FiClipboard, FiBox, FiTrash2 } from 'react-icons/fi';

const menuItems = [
    {
        name: 'Dashboard',
        icon: <FiHome size={20} />,
        path: '/dashboard',
    },
    {
        name: 'Os',
        icon: <FiClipboard size={20} />,
        path: '/cadastro/os',
    },
    {
        name: 'Estoque',
        icon: <FiBox size={20} />,
        path: '/cadastro/estoque',
    },
    {
        name: 'Lixão',
        icon: <FiTrash2 size={20} />,
        path: '/cadastro/lixao',
    }
];

export default function Sidebar() {
    const router = useRouter();
    return (
        <div className='w-64 bg-blue-800 text-white'>
            <div className='p-4 boarder-b border-blue-700'>
                <h1 className='text-xl font-bold'>Sistema Informática</h1>
            </div>
            <nav className='p-4'>
                <ul className='space-y-2'>
                    {menuItems.map((item) => (
                        <li key={item.path}>
                            <Link href={item.path} className={`flex items-center p-2 rounded-md hover:bg-blue-700 ${router.pathname === item.path ? 'bg-blue-700' : ''}`}>
                                <span className='mr-3'>{item.icon}</span>
                            </Link>
                        </li>
                    ))}
                </ul>
            </nav>
        </div>
    )

}
