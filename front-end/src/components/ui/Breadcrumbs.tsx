'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { ChevronRight } from 'lucide-react';


export default function Breadcrumbs() {
  const pathname = usePathname();
  const paths = pathname.split('/').filter(Boolean);

  return (
    <nav className="hidden md:flex items-center text-sm">
      {paths.map((path, index) => {
        const href = `/${paths.slice(0, index + 1).join('/')}`;
        const isLast = index === paths.length - 1;
        const name = path.charAt(0).toUpperCase() + path.slice(1);

        return (
          <div key={path} className="flex items-center">
            {!isLast ? (
              <>
                <Link
                  href={href}
                  className="text-gray-500 hover:text-blue-600 transition-colors"
                >
                  {name}
                </Link>
                <ChevronRight className="w-4 h-4 mx-2 text-gray-400" />
              </>
            ) : (
              <span className="text-gray-700 font-medium">{name}</span>
            )}
          </div>
        );
      })}
    </nav>
  );
}