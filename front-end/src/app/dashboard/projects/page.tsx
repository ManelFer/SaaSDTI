'use client';

import DashboardLayout from '@/components/layout/DashboardLayout';

export default function ProjectsPage() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-800">Projects</h1>
          <button className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700">
            New Project
          </button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Project Cards */}
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-semibold text-gray-800">Project Alpha</h3>
            <p className="text-gray-600 mt-2">Description of Project Alpha</p>
            <div className="mt-4 flex justify-between items-center">
              <span className="text-sm text-gray-500">Status: In Progress</span>
              <button className="text-indigo-600 hover:text-indigo-800">View Details</button>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-semibold text-gray-800">Project Beta</h3>
            <p className="text-gray-600 mt-2">Description of Project Beta</p>
            <div className="mt-4 flex justify-between items-center">
              <span className="text-sm text-gray-500">Status: Planning</span>
              <button className="text-indigo-600 hover:text-indigo-800">View Details</button>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-semibold text-gray-800">Project Gamma</h3>
            <p className="text-gray-600 mt-2">Description of Project Gamma</p>
            <div className="mt-4 flex justify-between items-center">
              <span className="text-sm text-gray-500">Status: Completed</span>
              <button className="text-indigo-600 hover:text-indigo-800">View Details</button>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
} 