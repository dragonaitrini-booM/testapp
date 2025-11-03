import React, { useState } from 'react';
import { Bot, User, Building, Bell, Shield, Key, Globe, Mail, Phone, MapPin, Save, Eye, EyeOff, Copy, RefreshCw, Trash2, Plus, Check, AlertCircle, Settings as SettingsIcon } from 'lucide-react';

export default function JoganiaSettings() {
  const [activeTab, setActiveTab] = useState('profile');
  const [isSaving, setIsSaving] = useState(false);
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Profile Settings State
  const [profileForm, setProfileForm] = useState({
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@company.com',
    jobTitle: 'Business Manager',
    companyName: 'Business Corp',
    industry: 'Technology',
    companySize: '11-50 employees',
    location: 'Port of Spain',
    phone: '+1 (868) 555-0100',
    timezone: 'America/Port_of_Spain',
    language: 'English'
  });

  // Security Settings State
  const [securityForm, setSecurityForm] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
    twoFactorEnabled: true,
    loginNotifications: true,
    passwordLastChanged: '2024-09-15'
  });

  // Notification Settings State
  const [notifications, setNotifications] = useState({
    email: {
      agentTraining: true,
      agentResponses: false,
      systemUpdates: true,
      weeklyReports: true,
      securityAlerts: true,
      marketingEmails: false
    },
    inApp: {
      agentStatus: true,
      newMessages: true,
      systemAlerts: true,
      trainingComplete: true
    },
    whatsapp: {
      businessHours: true,
      failedMessages: true,
      connectionIssues: true
    }
  });

  // API Keys State
  const [apiKeys, setApiKeys] = useState([
    { id: 1, name: 'Production API', key: 'jog_live_abc123...', created: '2024-10-01', lastUsed: '2 hours ago', permissions: ['read', 'write'] },
    { id: 2, name: 'Development API', key: 'jog_test_def456...', created: '2024-09-15', lastUsed: '1 week ago', permissions: ['read'] }
  ]);

  // Billing Settings State
  const [billingForm, setBillingForm] = useState({
    plan: 'Professional',
    billingCycle: 'monthly',
    currency: 'USD',
    autoRenew: true,
    billingEmail: 'billing@company.com',
    vatNumber: '',
    companyAddress: '123 Independence Square, Port of Spain, Trinidad & Tobago'
  });

  const handleSave = async (section: string) => {
    setIsSaving(true);
    // Simulate API call
    setTimeout(() => {
      setIsSaving(false);
      alert(`${section} settings saved successfully!`);
    }, 1500);
  };

  const generateNewAPIKey = () => {
    const newKey = {
      id: apiKeys.length + 1,
      name: 'New API Key',
      key: `jog_live_${Math.random().toString(36).substring(7)}...`,
      created: new Date().toISOString().split('T')[0],
      lastUsed: 'Never',
      permissions: ['read']
    };
    setApiKeys([...apiKeys, newKey]);
  };

  const deleteAPIKey = (id: number) => {
    if (confirm('Delete this API key? This action cannot be undone.')) {
      setApiKeys(apiKeys.filter(key => key.id !== id));
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    alert('Copied to clipboard!');
  };

  const tabs = [
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'security', label: 'Security', icon: Shield },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'api', label: 'API Keys', icon: Key },
    { id: 'billing', label: 'Billing', icon: Building },
    { id: 'preferences', label: 'Preferences', icon: SettingsIcon }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-16 h-16 bg-gradient-to-r from-teal-600 to-cyan-600 rounded-2xl flex items-center justify-center shadow-lg">
              <SettingsIcon className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-4xl font-bold text-gray-800">Settings</h1>
              <p className="text-gray-600">Manage your Jogania account and preferences • 🇹🇹</p>
            </div>
          </div>
        </div>

        <div className="flex gap-8">
          {/* Sidebar Navigation */}
          <div className="w-64 flex-shrink-0">
            <div className="bg-white rounded-2xl shadow-md border border-gray-200 p-2">
              <nav className="space-y-1">
                {tabs.map((tab) => {
                  const Icon = tab.icon;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition ${
                        activeTab === tab.id
                          ? 'bg-teal-50 text-teal-700 border border-teal-200 font-semibold'
                          : 'text-gray-700 hover:bg-gray-50'
                      }`}
                    >
                      <Icon className="w-5 h-5" />
                      {tab.label}
                    </button>
                  );
                })}
              </nav>
            </div>

            {/* Quick Stats */}
            <div className="bg-gradient-to-br from-teal-50 to-cyan-50 rounded-2xl p-4 mt-6 border border-teal-200">
              <h3 className="font-bold text-gray-800 mb-3">Account Status</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Plan</span>
                  <span className="font-semibold text-teal-700">Professional</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Active Agents</span>
                  <span className="font-semibold text-gray-800">2/3</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">API Calls</span>
                  <span className="font-semibold text-gray-800">8.2k</span>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            {/* PROFILE TAB */}
            {activeTab === 'profile' && (
              <div className="space-y-6">
                <div className="bg-white rounded-2xl shadow-md border border-gray-200 p-8">
                  <h2 className="text-2xl font-bold text-gray-800 mb-6">Profile Information</h2>

                  {/* Personal Information */}
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
                        <User className="w-5 h-5 text-teal-600" />
                        Personal Details
                      </h3>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-semibold text-gray-700 mb-2">First Name</label>
                          <input
                            type="text"
                            value={profileForm.firstName}
                            onChange={(e) => setProfileForm({...profileForm, firstName: e.target.value})}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:outline-none"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-semibold text-gray-700 mb-2">Last Name</label>
                          <input
                            type="text"
                            value={profileForm.lastName}
                            onChange={(e) => setProfileForm({...profileForm, lastName: e.target.value})}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:outline-none"
                          />
                        </div>
                      </div>

                      <div className="mt-4">
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          <Mail className="w-4 h-4 inline mr-1" />
                          Email Address
                        </label>
                        <input
                          type="email"
                          value={profileForm.email}
                          onChange={(e) => setProfileForm({...profileForm, email: e.target.value})}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:outline-none bg-gray-50"
                          disabled
                        />
                        <p className="text-xs text-gray-500 mt-1">Contact support to change your email</p>
                      </div>

                      <div className="grid grid-cols-2 gap-4 mt-4">
                        <div>
                          <label className="block text-sm font-semibold text-gray-700 mb-2">
                            <Phone className="w-4 h-4 inline mr-1" />
                            Phone Number
                          </label>
                          <input
                            type="tel"
                            value={profileForm.phone}
                            onChange={(e) => setProfileForm({...profileForm, phone: e.target.value})}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:outline-none"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-semibold text-gray-700 mb-2">Job Title</label>
                          <input
                            type="text"
                            value={profileForm.jobTitle}
                            onChange={(e) => setProfileForm({...profileForm, jobTitle: e.target.value})}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:outline-none"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Business Information */}
                    <div className="pt-6 border-t border-gray-200">
                      <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
                        <Building className="w-5 h-5 text-teal-600" />
                        Business Information
                      </h3>
                      <div className="space-y-4">
                        <div>
                          <label className="block text-sm font-semibold text-gray-700 mb-2">Company Name</label>
                          <input
                            type="text"
                            value={profileForm.companyName}
                            onChange={(e) => setProfileForm({...profileForm, companyName: e.target.value})}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:outline-none"
                          />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">Industry</label>
                            <select
                              value={profileForm.industry}
                              onChange={(e) => setProfileForm({...profileForm, industry: e.target.value})}
                              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:outline-none"
                            >
                              <option>Technology</option>
                              <option>Finance</option>
                              <option>Healthcare</option>
                              <option>Education</option>
                              <option>Government</option>
                              <option>Tourism</option>
                              <option>Other</option>
                            </select>
                          </div>
                          <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">Company Size</label>
                            <select
                              value={profileForm.companySize}
                              onChange={(e) => setProfileForm({...profileForm, companySize: e.target.value})}
                              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:outline-none"
                            >
                              <option>1-10 employees</option>
                              <option>11-50 employees</option>
                              <option>51-200 employees</option>
                              <option>201-500 employees</option>
                              <option>500+ employees</option>
                            </select>
                          </div>
                        </div>

                        <div>
                          <label className="block text-sm font-semibold text-gray-700 mb-2">
                            <MapPin className="w-4 h-4 inline mr-1" />
                            Location (Trinidad & Tobago)
                          </label>
                          <select
                            value={profileForm.location}
                            onChange={(e) => setProfileForm({...profileForm, location: e.target.value})}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:outline-none"
                          >
                            <option>Port of Spain</option>
                            <option>San Fernando</option>
                            <option>Chaguanas</option>
                            <option>Arima</option>
                            <option>Point Fortin</option>
                            <option>Other</option>
                          </select>
                        </div>
                      </div>
                    </div>

                    <div className="flex justify-end gap-3 pt-6 border-t border-gray-200">
                      <button className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition font-semibold">
                        Cancel
                      </button>
                      <button
                        onClick={() => handleSave('Profile')}
                        disabled={isSaving}
                        className="px-8 py-3 bg-gradient-to-r from-teal-600 to-cyan-600 text-white rounded-lg hover:opacity-90 transition font-semibold shadow-lg disabled:opacity-50 flex items-center gap-2"
                      >
                        {isSaving ? (
                          <>
                            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                            Saving...
                          </>
                        ) : (
                          <>
                            <Save className="w-4 h-4" />
                            Save Changes
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* SECURITY TAB */}
            {activeTab === 'security' && (
              <div>
                <h2 className="text-2xl font-bold text-gray-800 mb-6">Security Settings</h2>
                {/* Placeholder for Security Content */}
              </div>
            )}

            {/* NOTIFICATIONS TAB */}
            {activeTab === 'notifications' && (
              <div>
                <h2 className="text-2xl font-bold text-gray-800 mb-6">Notification Settings</h2>
                {/* Placeholder for Notification Content */}
              </div>
            )}

            {/* API TAB */}
            {activeTab === 'api' && (
              <div>
                <h2 className="text-2xl font-bold text-gray-800 mb-6">API Keys</h2>
                {/* Placeholder for API Content */}
              </div>
            )}

            {/* BILLING TAB */}
            {activeTab === 'billing' && (
              <div>
                <h2 className="text-2xl font-bold text-gray-800 mb-6">Billing Information</h2>
                {/* Placeholder for Billing Content */}
              </div>
            )}

            {/* PREFERENCES TAB */}
            {activeTab === 'preferences' && (
              <div>
                <h2 className="text-2xl font-bold text-gray-800 mb-6">Preferences</h2>
                {/* Placeholder for Preferences Content */}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
