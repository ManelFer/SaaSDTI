import { useRouter } from 'next/navigation'
import Image from 'next/image'

export default function DashboardHeader() {
  const router = useRouter()

  const handleLogout = () => {
    // Clear auth token
    document.cookie = 'auth-token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;'
    router.push('/auth/login')
  }

  return (
    <header className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <div className="flex-shrink-0 flex items-center">
              <h1 className="text-xl font-bold text-gray-900">Dashboard</h1>
            </div>
          </div>
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <div className="flex items-center space-x-4">
                <div className="flex items-center">
                  <Image
                    className="h-8 w-8 rounded-full"
                    src="/default-avatar.png"
                    alt="User avatar"
                    width={32}
                    height={32}
                  />
                  <span className="ml-2 text-sm font-medium text-gray-700">
                    John Doe
                  </span>
                </div>
                <button
                  onClick={handleLogout}
                  className="ml-4 px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Logout
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
} 