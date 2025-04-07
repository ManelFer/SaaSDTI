'use client';

import React, { useState, useEffect } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { db } from '@/lib/database';
import toast from 'react-hot-toast';

interface InventoryItem {
  id: number;
  product_name: string;
  model: string;
  heritage: string;
  lot: string;
  is_listed: boolean;
  created_at: string;
}

export default function InventoryPage() {
  const [inventoryItems, setInventoryItems] = useState<InventoryItem[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterListed, setFilterListed] = useState<'all' | 'listed' | 'unlisted'>('all');
  const [formData, setFormData] = useState({
    product_name: '',
    model: '',
    heritage: '',
    lot: '',
    is_listed: true,
  });

  useEffect(() => {
    fetchInventoryItems();
  }, []);

  const fetchInventoryItems = async () => {
    try {
      const database = await db;
      const items = await database.all('SELECT * FROM inventory ORDER BY created_at DESC');
      setInventoryItems(items);
    } catch (error) {
      console.error('Error fetching inventory items:', error);
      toast.error('Failed to fetch inventory items');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const database = await db;
      await database.run(
        'INSERT INTO inventory (product_name, model, heritage, lot, is_listed) VALUES (?, ?, ?, ?, ?)',
        [formData.product_name, formData.model, formData.heritage, formData.lot, formData.is_listed ? 1 : 0]
      );
      toast.success('Item added successfully');
      setIsModalOpen(false);
      setFormData({
        product_name: '',
        model: '',
        heritage: '',
        lot: '',
        is_listed: true,
      });
      fetchInventoryItems();
    } catch (error) {
      console.error('Error adding inventory item:', error);
      toast.error('Failed to add inventory item');
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const generateReport = async () => {
    try {
      const database = await db;
      const items = await database.all('SELECT * FROM inventory ORDER BY product_name');
      
      // Create a Word document with the inventory data
      const doc = new DOMParser().parseFromString(`
        <!DOCTYPE html>
        <html>
          <head>
            <title>Inventory Report</title>
            <style>
              table { border-collapse: collapse; width: 100%; }
              th, td { border: 1px solid black; padding: 8px; text-align: left; }
              th { background-color: #f2f2f2; }
            </style>
          </head>
          <body>
            <h1>Inventory Report</h1>
            <p>Generated on: ${new Date().toLocaleDateString()}</p>
            <table>
              <tr>
                <th>Product Name</th>
                <th>Model</th>
                <th>Heritage</th>
                <th>Lot</th>
                <th>Listed</th>
              </tr>
              ${items.map(item => `
                <tr>
                  <td>${item.product_name}</td>
                  <td>${item.model || '-'}</td>
                  <td>${item.heritage || '-'}</td>
                  <td>${item.lot || '-'}</td>
                  <td>${item.is_listed ? 'Yes' : 'No'}</td>
                </tr>
              `).join('')}
            </table>
          </body>
        </html>
      `, 'text/html');

      // Convert to blob and download
      const blob = new Blob([doc.documentElement.outerHTML], { type: 'application/msword' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'inventory_report.doc';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);

      toast.success('Report generated successfully');
    } catch (error) {
      console.error('Error generating report:', error);
      toast.error('Failed to generate report');
    }
  };

  const filteredItems = inventoryItems.filter(item => {
    const matchesSearch = 
      item.product_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.model?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.heritage?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.lot?.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesFilter = 
      filterListed === 'all' ||
      (filterListed === 'listed' && item.is_listed) ||
      (filterListed === 'unlisted' && !item.is_listed);

    return matchesSearch && matchesFilter;
  });

  return (
    <DashboardLayout>
      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Inventory Management</h1>
          <div className="flex gap-4">
            <button
              onClick={generateReport}
              className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
            >
              Generate Report
            </button>
            <button
              onClick={() => setIsModalOpen(true)}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
              Add Item
            </button>
          </div>
        </div>

        {/* Search and Filter */}
        <div className="mb-6 flex gap-4">
          <input
            type="text"
            placeholder="Search items..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="px-4 py-2 border rounded-md flex-1"
          />
          <select
            value={filterListed}
            onChange={(e) => setFilterListed(e.target.value as 'all' | 'listed' | 'unlisted')}
            className="px-4 py-2 border rounded-md"
          >
            <option value="all">All Items</option>
            <option value="listed">Listed Only</option>
            <option value="unlisted">Unlisted Only</option>
          </select>
        </div>

        {/* Inventory Table */}
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Product Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Model
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Heritage
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Lot
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Listed
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Created At
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredItems.map((item) => (
                <tr key={item.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {item.product_name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {item.model}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {item.heritage}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {item.lot}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      item.is_listed ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                    }`}>
                      {item.is_listed ? 'Listed' : 'Unlisted'}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {new Date(item.created_at).toLocaleDateString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Add Item Modal */}
        {isModalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="bg-white rounded-lg p-6 w-full max-w-md">
              <h2 className="text-xl font-bold mb-4">Add New Item</h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Product Name</label>
                  <input
                    type="text"
                    name="product_name"
                    value={formData.product_name}
                    onChange={handleInputChange}
                    required
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Model</label>
                  <input
                    type="text"
                    name="model"
                    value={formData.model}
                    onChange={handleInputChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Heritage</label>
                  <input
                    type="text"
                    name="heritage"
                    value={formData.heritage}
                    onChange={handleInputChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Lot</label>
                  <input
                    type="text"
                    name="lot"
                    value={formData.lot}
                    onChange={handleInputChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    name="is_listed"
                    checked={formData.is_listed}
                    onChange={handleInputChange}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <label className="ml-2 block text-sm text-gray-900">
                    List in Inventory
                  </label>
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
                    Add Item
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