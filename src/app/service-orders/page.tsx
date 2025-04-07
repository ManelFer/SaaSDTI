'use client';

import { useState, useEffect } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { db } from '@/lib/database';
import toast from 'react-hot-toast';

interface ServiceOrder {
  id: number;
  customer_name: string;
  device_model: string;
  problem_description: string;
  status: 'pending' | 'solved';
  technician: string;
  created_at: string;
}

export default function ServiceOrdersPage() {
  const [serviceOrders, setServiceOrders] = useState<ServiceOrder[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<'all' | 'pending' | 'solved'>('all');
  const [formData, setFormData] = useState({
    customer_name: '',
    device_model: '',
    problem_description: '',
    technician: '',
  });

  useEffect(() => {
    fetchServiceOrders();
  }, []);

  const fetchServiceOrders = async () => {
    try {
      const database = await db;
      const orders = await database.all('SELECT * FROM service_orders ORDER BY created_at DESC');
      setServiceOrders(orders);
    } catch (error) {
      console.error('Error fetching service orders:', error);
      toast.error('Failed to fetch service orders');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const database = await db;
      await database.run(
        'INSERT INTO service_orders (customer_name, device_model, problem_description, status, technician) VALUES (?, ?, ?, ?, ?)',
        [formData.customer_name, formData.device_model, formData.problem_description, 'pending', formData.technician]
      );
      toast.success('Service order created successfully');
      setIsModalOpen(false);
      setFormData({
        customer_name: '',
        device_model: '',
        problem_description: '',
        technician: '',
      });
      fetchServiceOrders();
    } catch (error) {
      console.error('Error creating service order:', error);
      toast.error('Failed to create service order');
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleStatusChange = async (id: number, newStatus: 'pending' | 'solved') => {
    try {
      const database = await db;
      await database.run(
        'UPDATE service_orders SET status = ? WHERE id = ?',
        [newStatus, id]
      );
      toast.success('Status updated successfully');
      fetchServiceOrders();
    } catch (error) {
      console.error('Error updating status:', error);
      toast.error('Failed to update status');
    }
  };

  const filteredOrders = serviceOrders.filter(order => {
    const matchesSearch = 
      order.customer_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.device_model?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.technician?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.problem_description?.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesFilter = 
      filterStatus === 'all' ||
      order.status === filterStatus;

    return matchesSearch && matchesFilter;
  });

  return (
    <DashboardLayout>
      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Service Orders</h1>
          <button
            onClick={() => setIsModalOpen(true)}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            Create Order
          </button>
        </div>

        {/* Search and Filter */}
        <div className="mb-6 flex gap-4">
          <input
            type="text"
            placeholder="Search orders..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="px-4 py-2 border rounded-md flex-1"
          />
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value as 'all' | 'pending' | 'solved')}
            className="px-4 py-2 border rounded-md"
          >
            <option value="all">All Status</option>
            <option value="pending">Pending</option>
            <option value="solved">Solved</option>
          </select>
        </div>

        {/* Service Orders Table */}
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Customer
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Device Model
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Problem
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Technician
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Created At
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredOrders.map((order) => (
                <tr key={order.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {order.customer_name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {order.device_model}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500">
                    {order.problem_description}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {order.technician}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      order.status === 'solved' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {order.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {new Date(order.created_at).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <button
                      onClick={() => handleStatusChange(order.id, order.status === 'solved' ? 'pending' : 'solved')}
                      className="text-blue-600 hover:text-blue-900"
                    >
                      {order.status === 'solved' ? 'Mark as Pending' : 'Mark as Solved'}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Create Order Modal */}
        {isModalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="bg-white rounded-lg p-6 w-full max-w-md">
              <h2 className="text-xl font-bold mb-4">Create Service Order</h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Customer Name</label>
                  <input
                    type="text"
                    name="customer_name"
                    value={formData.customer_name}
                    onChange={handleInputChange}
                    required
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Device Model</label>
                  <input
                    type="text"
                    name="device_model"
                    value={formData.device_model}
                    onChange={handleInputChange}
                    required
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Problem Description</label>
                  <textarea
                    name="problem_description"
                    value={formData.problem_description}
                    onChange={handleInputChange}
                    required
                    rows={3}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Technician</label>
                  <input
                    type="text"
                    name="technician"
                    value={formData.technician}
                    onChange={handleInputChange}
                    required
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>
                <div className="flex justify-end space-x-3">
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700"
                  >
                    Create Order
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
} 