import React, { useState, useEffect } from 'react';

// Main App component
export default function App() {
  // State to manage user authentication (simulated)
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userRole, setUserRole] = useState(''); // 'admin' or 'employee'
  const [username, setUsername] = useState('');

  // State for inventory items
  const [inventory, setInventory] = useState([]);
  const [showAddItemModal, setShowAddItemModal] = useState(false);
  const [editingItem, setEditingItem] = useState(null); // Item being edited

  // State for form inputs
  const [itemName, setItemName] = useState('');
  const [itemQuantity, setItemQuantity] = useState('');
  // Corrected: Initialize itemLocation, itemSupplier, itemCondition with empty strings
  const [itemLocation, setItemLocation] = useState('');
  const [itemSupplier, setItemSupplier] = useState('');
  const [itemCondition, setItemCondition] = useState('');


  // State for messages (e.g., success/error)
  const [message, setMessage] = useState('');

  // Simulate initial authentication check (e.g., from a stored token)
  useEffect(() => {
    // In a real app, you'd check localStorage for a JWT or session cookie
    // and validate it with your backend.
    const storedAuth = localStorage.getItem('inventory_auth');
    if (storedAuth) {
      const { user, role } = JSON.parse(storedAuth);
      setIsAuthenticated(true);
      setUsername(user);
      setUserRole(role);
      // Simulate fetching inventory after successful login
      fetchInventory();
    }
  }, []);

  // Simulate fetching inventory data from backend
  const fetchInventory = async () => {
    setMessage('Fetching inventory...');
    try {
      // In a real application, this would be a fetch call to your Laravel API:
      // const response = await fetch('/api/inventory', {
      //   headers: { 'Authorization': `Bearer ${yourAuthToken}` }
      // });
      // const data = await response.json();
      // setInventory(data);

      // --- SIMULATED DATA ---
      await new Promise(resolve => setTimeout(resolve, 500)); // Simulate API delay
      const simulatedData = [
        { id: 1, name: 'Laptop', quantity: 15, location: 'Warehouse A', supplier: 'TechCorp', condition: 'New' },
        { id: 2, name: 'Monitor', quantity: 30, location: 'Warehouse B', supplier: 'DisplayCo', condition: 'Used - Good' },
        { id: 3, name: 'Keyboard', quantity: 50, location: 'Office Supply', supplier: 'Keytronics', condition: 'New' },
        { id: 4, name: 'Mouse', quantity: 45, location: 'Office Supply', supplier: 'Keytronics', condition: 'New' },
        { id: 5, name: 'Server Rack', quantity: 2, location: 'Server Room', supplier: 'RackSolutions', condition: 'New' },
      ];
      setInventory(simulatedData);
      setMessage('Inventory loaded successfully.');
    } catch (error) {
      console.error('Failed to fetch inventory:', error);
      setMessage('Failed to load inventory.');
    }
  };

  // Handle user login (simulated)
  const handleLogin = async (e) => {
    e.preventDefault();
    setMessage('Logging in...');
    // In a real app, this would be a fetch call to your Laravel API:
    // const response = await fetch('/api/login', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify({ username, password })
    // });
    // const data = await response.json();
    // if (data.success) {
    //   localStorage.setItem('inventory_auth', JSON.stringify({ user: data.username, role: data.role }));
    //   setIsAuthenticated(true);
    //   setUsername(data.username);
    //   setUserRole(data.role);
    //   fetchInventory();
    // } else {
    //   setMessage(data.message);
    // }

    // --- SIMULATED LOGIN ---
    await new Promise(resolve => setTimeout(resolve, 500)); // Simulate API delay
    if (username === 'admin' || username === 'employee') {
      const role = username === 'admin' ? 'admin' : 'employee';
      localStorage.setItem('inventory_auth', JSON.stringify({ user: username, role: role }));
      setIsAuthenticated(true);
      setUserRole(role);
      setMessage(`Logged in as ${username}.`);
      fetchInventory();
    } else {
      setMessage('Invalid username. Try "admin" or "employee".');
    }
  };

  // Handle user logout
  const handleLogout = () => {
    setIsAuthenticated(false);
    setUsername('');
    setUserRole('');
    setInventory([]);
    localStorage.removeItem('inventory_auth');
    setMessage('Logged out.');
  };

  // Open the add/edit item modal
  const openAddItemModal = (item = null) => {
    setEditingItem(item);
    if (item) {
      setItemName(item.name);
      setItemQuantity(item.quantity);
      setItemLocation(item.location);
      setItemSupplier(item.supplier);
      setItemCondition(item.condition);
    } else {
      setItemName('');
      setItemQuantity('');
      setItemLocation('');
      setItemSupplier('');
      setItemCondition('');
    }
    setShowAddItemModal(true);
  };

  // Close the add/edit item modal
  const closeAddItemModal = () => {
    setShowAddItemModal(false);
    setEditingItem(null);
  };

  // Handle adding or updating an inventory item
  const handleSubmitItem = async (e) => {
    e.preventDefault();
    setMessage('Saving item...');

    const newItem = {
      name: itemName,
      quantity: parseInt(itemQuantity),
      location: itemLocation,
      supplier: itemSupplier,
      condition: itemCondition,
    };

    try {
      if (editingItem) {
        // In a real app, this would be a PUT/PATCH call to your Laravel API:
        // const response = await fetch(`/api/inventory/${editingItem.id}`, {
        //   method: 'PUT',
        //   headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${yourAuthToken}` },
        //   body: JSON.stringify(newItem)
        // });
        // const updatedItem = await response.json();
        // setInventory(inventory.map(item => item.id === updatedItem.id ? updatedItem : item));

        // --- SIMULATED UPDATE ---
        await new Promise(resolve => setTimeout(resolve, 500));
        setInventory(inventory.map(item =>
          item.id === editingItem.id ? { ...item, ...newItem } : item
        ));
        setMessage('Item updated successfully!');
      } else {
        // In a real app, this would be a POST call to your Laravel API:
        // const response = await fetch('/api/inventory', {
        //   method: 'POST',
        //   headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${yourAuthToken}` },
        //   body: JSON.stringify(newItem)
        // });
        // const createdItem = await response.json();
        // setInventory([...inventory, createdItem]);

        // --- SIMULATED ADD ---
        await new Promise(resolve => setTimeout(resolve, 500));
        const newId = Math.max(...inventory.map(item => item.id), 0) + 1;
        setInventory([...inventory, { id: newId, ...newItem }]);
        setMessage('Item added successfully!');
      }
      closeAddItemModal();
    } catch (error) {
      console.error('Failed to save item:', error);
      setMessage('Failed to save item.');
    }
  };

  // Handle deleting an inventory item
  const handleDeleteItem = async (id) => {
    if (!window.confirm('Are you sure you want to delete this item?')) return; // Using window.confirm for simplicity, replace with custom modal in production

    setMessage('Deleting item...');
    try {
      // In a real app, this would be a DELETE call to your Laravel API:
      // const response = await fetch(`/api/inventory/${id}`, {
      //   method: 'DELETE',
      //   headers: { 'Authorization': `Bearer ${yourAuthToken}` }
      // });
      // if (response.ok) {
      //   setInventory(inventory.filter(item => item.id !== id));
      //   setMessage('Item deleted successfully!');
      // } else {
      //   setMessage('Failed to delete item.');
      // }

      // --- SIMULATED DELETE ---
      await new Promise(resolve => setTimeout(resolve, 500));
      setInventory(inventory.filter(item => item.id !== id));
      setMessage('Item deleted successfully!');
    } catch (error) {
      console.error('Failed to delete item:', error);
      setMessage('Failed to delete item.');
    }
  };

  // Render the application UI
  return (
    <div className="min-h-screen bg-gray-100 font-sans antialiased">
      {/* Tailwind CSS CDN */}
      <script src="https://cdn.tailwindcss.com"></script>
      <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet" />
      <style>
        {`
          body {
            font-family: 'Inter', sans-serif;
          }
          .modal-overlay {
            background-color: rgba(0, 0, 0, 0.5);
          }
        `}
      </style>

      {/* Header */}
      <header className="bg-gradient-to-r from-blue-600 to-purple-700 text-white p-4 shadow-lg">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-3xl font-bold rounded-md">
            Smart Inventory & Asset Management
          </h1>
          {isAuthenticated && (
            <div className="flex items-center space-x-4">
              <span className="text-lg">Welcome, {username} ({userRole})</span>
              <button
                onClick={handleLogout}
                className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded-lg shadow-md transition duration-300 ease-in-out transform hover:scale-105"
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </header>

      <main className="container mx-auto p-6">
        {/* Message Display */}
        {message && (
          <div className="bg-blue-100 border border-blue-400 text-blue-700 px-4 py-3 rounded-lg relative mb-6 shadow-sm" role="alert">
            <span className="block sm:inline">{message}</span>
          </div>
        )}

        {!isAuthenticated ? (
          /* Login Form */
          <div className="max-w-md mx-auto bg-white p-8 rounded-xl shadow-2xl mt-10 border border-gray-200">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Login to your Account</h2>
            <form onSubmit={handleLogin} className="space-y-5">
              <div>
                <label htmlFor="username" className="block text-gray-700 text-sm font-medium mb-2">Username:</label>
                <input
                  type="text"
                  id="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 transition duration-200 ease-in-out"
                  placeholder="Enter your username (admin or employee)"
                  required
                />
              </div>
              <div>
                <label htmlFor="password" className="block text-gray-700 text-sm font-medium mb-2">Password:</label>
                <input
                  type="password"
                  id="password"
                  value="password" // Placeholder for simulated password
                  onChange={() => {}} // No actual password handling for simulation
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-50 cursor-not-allowed"
                  placeholder="Password (any for demo)"
                  disabled
                />
                <p className="text-xs text-gray-500 mt-1">
                  (For demo, password is not checked. Use 'admin' or 'employee' as username.)
                </p>
              </div>
              <button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-lg shadow-lg transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
              >
                Login
              </button>
            </form>
          </div>
        ) : (
          /* Inventory Dashboard */
          <div className="bg-white p-8 rounded-xl shadow-2xl border border-gray-200">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-800">Current Inventory</h2>
              {userRole === 'admin' && (
                <button
                  onClick={() => openAddItemModal()}
                  className="bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-5 rounded-lg shadow-md transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50"
                >
                  Add New Item
                </button>
              )}
            </div>

            {inventory.length === 0 ? (
              <p className="text-gray-600 text-center py-10">No inventory items found. Add some!</p>
            ) : (
              <div className="overflow-x-auto">
                <table className="min-w-full bg-white border border-gray-200 rounded-lg">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Item Name</th>
                      <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Quantity</th>
                      <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Location</th>
                      <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Supplier</th>
                      <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Condition</th>
                      {userRole === 'admin' && (
                        <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                      )}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {inventory.map((item) => (
                      <tr key={item.id} className="hover:bg-gray-50">
                        <td className="py-4 px-6 whitespace-nowrap text-sm font-medium text-gray-900">{item.name}</td>
                        <td className="py-4 px-6 whitespace-nowrap text-sm text-gray-700">{item.quantity}</td>
                        <td className="py-4 px-6 whitespace-nowrap text-sm text-gray-700">{item.location}</td>
                        <td className="py-4 px-6 whitespace-nowrap text-sm text-gray-700">{item.supplier}</td>
                        <td className="py-4 px-6 whitespace-nowrap text-sm text-gray-700">{item.condition}</td>
                        {userRole === 'admin' && (
                          <td className="py-4 px-6 whitespace-nowrap text-sm font-medium">
                            <button
                              onClick={() => openAddItemModal(item)}
                              className="text-blue-600 hover:text-blue-900 mr-4 transition duration-150 ease-in-out"
                            >
                              Edit
                            </button>
                            <button
                              onClick={() => handleDeleteItem(item.id)}
                              className="text-red-600 hover:text-red-900 transition duration-150 ease-in-out"
                            >
                              Delete
                            </button>
                          </td>
                        )}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}
      </main>

      {/* Add/Edit Item Modal */}
      {showAddItemModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 modal-overlay">
          <div className="bg-white p-8 rounded-xl shadow-3xl max-w-lg w-full border border-gray-200 transform scale-100 transition-transform duration-300 ease-out">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-2xl font-bold text-gray-800">{editingItem ? 'Edit Item' : 'Add New Item'}</h3>
              <button
                onClick={closeAddItemModal}
                className="text-gray-500 hover:text-gray-700 text-3xl font-light"
              >
                &times;
              </button>
            </div>
            <form onSubmit={handleSubmitItem} className="space-y-4">
              <div>
                <label htmlFor="itemName" className="block text-gray-700 text-sm font-medium mb-1">Item Name:</label>
                <input
                  type="text"
                  id="itemName"
                  value={itemName}
                  onChange={(e) => setItemName(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>
              <div>
                <label htmlFor="itemQuantity" className="block text-gray-700 text-sm font-medium mb-1">Quantity:</label>
                <input
                  type="number"
                  id="itemQuantity"
                  value={itemQuantity}
                  onChange={(e) => setItemQuantity(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>
              <div>
                <label htmlFor="itemLocation" className="block text-gray-700 text-sm font-medium mb-1">Location:</label>
                <input
                  type="text"
                  id="itemLocation"
                  value={itemLocation}
                  onChange={(e) => setItemLocation(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>
              <div>
                <label htmlFor="itemSupplier" className="block text-gray-700 text-sm font-medium mb-1">Supplier:</label>
                <input
                  type="text"
                  id="itemSupplier"
                  value={itemSupplier}
                  onChange={(e) => setItemSupplier(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>
              <div>
                <label htmlFor="itemCondition" className="block text-gray-700 text-sm font-medium mb-1">Condition:</label>
                <select
                  id="itemCondition"
                  value={itemCondition}
                  onChange={(e) => setItemCondition(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 bg-white"
                  required
                >
                  <option value="">Select Condition</option>
                  <option value="New">New</option>
                  <option value="Used - Good">Used - Good</option>
                  <option value="Used - Fair">Used - Fair</option>
                  <option value="Damaged">Damaged</option>
                </select>
              </div>
              <div className="flex justify-end space-x-3 mt-6">
                <button
                  type="button"
                  onClick={closeAddItemModal}
                  className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-2 px-4 rounded-lg shadow-md transition duration-300 ease-in-out"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg shadow-md transition duration-300 ease-in-out transform hover:scale-105"
                >
                  {editingItem ? 'Update Item' : 'Add Item'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
