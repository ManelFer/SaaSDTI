'use client';

import { useState, useEffect } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { db } from '@/lib/database';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, Title } from 'chart.js';
import { Pie, Bar } from 'react-chartjs-2';
import toast from 'react-hot-toast';

ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, Title);

interface DashboardStats {
  totalServiceOrders: number;
  pendingServiceOrders: number;
  totalInventoryItems: number;
  listedInventoryItems: number;
  totalDumpItems: number;
}

export default function DashboardPage() {
  const [stats, setStats] = useState<DashboardStats>({
    totalServiceOrders: 0,
    pendingServiceOrders: 0,
    totalInventoryItems: 0,
    listedInventoryItems: 0,
    totalDumpItems: 0,
  });

  useEffect(() => {
    fetchDashboardStats();
  }, []);

  const fetchDashboardStats = async () => {
    try {
      const database = await db;
      
      const [serviceOrders] = await database.all(`
        SELECT 
          COUNT(*) as total,
          SUM(CASE WHEN status = 'pending' THEN 1 ELSE 0 END) as pending
        FROM service_orders
      `);

      const [inventory] = await database.all(`
        SELECT 
          COUNT(*) as total,
          SUM(CASE WHEN is_listed = 1 THEN 1 ELSE 0 END) as listed
        FROM inventory
      `);

      const [dumpItems] = await database.all(`
        SELECT COUNT(*) as total
        FROM dump_items
      `);

      setStats({
        totalServiceOrders: serviceOrders.total,
        pendingServiceOrders: serviceOrders.pending,
        totalInventoryItems: inventory.total,
        listedInventoryItems: inventory.listed,
        totalDumpItems: dumpItems.total,
      });
    } catch (error) {
      console.error('Error fetching dashboard stats:', error);
      toast.error('Failed to fetch dashboard statistics');
    }
  };

  const serviceOrdersData = {
    labels: ['Solved', 'Pending'],
    datasets: [
      {
        data: [
          stats.totalServiceOrders - stats.pendingServiceOrders,
          stats.pendingServiceOrders,
        ],
        backgroundColor: ['#10B981', '#F59E0B'],
      },
    ],
  };

  const inventoryData = {
    labels: ['Listed', 'Unlisted'],
    datasets: [
      {
        data: [stats.listedInventoryItems, stats.totalInventoryItems - stats.listedInventoryItems],
        backgroundColor: ['#10B981', '#EF4444'],
      },
    ],
  };

  const dumpItemsData = {
    labels: ['Dump Items'],
    datasets: [
      {
        label: 'Total Items',
        data: [stats.totalDumpItems],
        backgroundColor: '#6366F1',
      },
    ],
  };

  return (
    <DashboardLayout>
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-6">Dashboard</h1>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-lg font-semibold text-gray-700">Service Orders</h3>
            <p className="text-3xl font-bold text-gray-900">{stats.totalServiceOrders}</p>
            <p className="text-sm text-gray-500">
              {stats.pendingServiceOrders} pending
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-lg font-semibold text-gray-700">Inventory Items</h3>
            <p className="text-3xl font-bold text-gray-900">{stats.totalInventoryItems}</p>
            <p className="text-sm text-gray-500">
              {stats.listedInventoryItems} listed
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-lg font-semibold text-gray-700">Dump Items</h3>
            <p className="text-3xl font-bold text-gray-900">{stats.totalDumpItems}</p>
          </div>
        </div>

        {/* Charts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-lg font-semibold text-gray-700 mb-4">
              Service Orders Status
            </h3>
            <div className="h-64">
              <Pie data={serviceOrdersData} />
            </div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-lg font-semibold text-gray-700 mb-4">
              Inventory Status
            </h3>
            <div className="h-64">
              <Pie data={inventoryData} />
            </div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow lg:col-span-2">
            <h3 className="text-lg font-semibold text-gray-700 mb-4">
              Dump Items Overview
            </h3>
            <div className="h-64">
              <Bar
                data={dumpItemsData}
                options={{
                  responsive: true,
                  maintainAspectRatio: false,
                  scales: {
                    y: {
                      beginAtZero: true,
                    },
                  },
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}