import { useState } from 'react';
import { User, Bell, Download, Palette, Clock } from 'lucide-react';
import { currentUser } from '@/data/seedData';
import { useTheme } from '@/context/ThemeContext';

const Profile = () => {
  const [user, setUser] = useState(currentUser);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: user.name,
    theme: user.theme,
    timezone: user.timezone,
    morningReminderTime: user.morningReminderTime || '',
    eveningReminderTime: user.eveningReminderTime || ''
  });
  const { world, setWorld, isDark, toggleDark } = useTheme();

  const handleSave = () => {
    setUser({ ...user, ...formData });
    setIsEditing(false);
  };

  const handleExportData = () => {
    // Simulate data export
    const userData = {
      user,
      exportDate: new Date().toISOString()
    };
    
    const dataStr = JSON.stringify(userData, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    
    const link = document.createElement('a');
    link.href = url;
    link.download = `anima-data-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-background/10 pb-20">
      {/* Header */}
      <div className="px-6 pt-8 pb-6">
        <h1 className="font-heading text-2xl font-semibold text-foreground mb-2">
          Profile
        </h1>
        <p className="text-muted-foreground font-body">
          Personalize your wellness journey
        </p>
      </div>

      {/* Profile Card */}
      <div className="px-6 mb-6">
        <div className="glass rounded-3xl p-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
                <User className="h-8 w-8 text-primary" />
              </div>
              <div>
                <h2 className="font-heading text-xl font-semibold text-foreground">
                  {user.name}
                </h2>
                <p className="text-muted-foreground font-body text-sm">
                  {user.email}
                </p>
              </div>
            </div>
            <button
              onClick={() => setIsEditing(!isEditing)}
              className="px-4 py-2 bg-primary text-primary-foreground rounded-lg text-sm font-medium hover:bg-primary/90 transition-colors duration-200"
            >
              {isEditing ? 'Cancel' : 'Edit'}
            </button>
          </div>

          {/* Streak Display */}
          <div className="text-center">
            <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3">
              <span className="text-3xl font-heading font-bold text-primary">
                {user.streak}
              </span>
            </div>
            <h3 className="font-heading text-lg font-medium text-foreground mb-1">
              Day Streak
            </h3>
            <p className="text-muted-foreground font-body text-sm">
              Your consistent practice
            </p>
          </div>
        </div>
      </div>

      {/* Settings */}
      <div className="px-6">
        <h3 className="font-heading text-lg font-medium text-foreground mb-4">
          Settings
        </h3>
        
        <div className="space-y-4">
          {/* Name */}
          <div className="glass rounded-2xl p-4">
            <label className="flex items-center justify-between">
              <span className="font-medium text-foreground text-sm">Name</span>
              {isEditing ? (
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                  className="px-3 py-1 bg-muted border border-border rounded text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20"
                />
              ) : (
                <span className="text-muted-foreground text-sm">{user.name}</span>
              )}
            </label>
          </div>

          {/* Theme */}
          <div className="glass rounded-2xl p-4">
            <label className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Palette className="h-4 w-4 text-muted-foreground" />
                <span className="font-medium text-foreground text-sm">Theme</span>
              </div>
              <select
                value={world}
                onChange={(e) => setWorld(e.target.value as any)}
                className="px-3 py-1 bg-muted border border-border rounded text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20"
              >
                <option value="forest">Forest</option>
                <option value="ocean">Ocean</option>
                <option value="desert">Desert</option>
              </select>
            </label>
          </div>

          {/* Timezone */}
          <div className="glass rounded-2xl p-4">
            <label className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-muted-foreground" />
                <span className="font-medium text-foreground text-sm">Timezone</span>
              </div>
              {isEditing ? (
                <select
                  value={formData.timezone}
                  onChange={(e) => setFormData(prev => ({ ...prev, timezone: e.target.value }))}
                  className="px-3 py-1 bg-muted border border-border rounded text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20"
                >
                  <option value="America/New_York">Eastern Time</option>
                  <option value="America/Chicago">Central Time</option>
                  <option value="America/Denver">Mountain Time</option>
                  <option value="America/Los_Angeles">Pacific Time</option>
                </select>
              ) : (
                <span className="text-muted-foreground text-sm">{user.timezone.split('/')[1].replace('_', ' ')}</span>
              )}
            </label>
          </div>

          {/* Reminders */}
          <div className="glass rounded-2xl p-4">
            <div className="flex items-center gap-2 mb-3">
              <Bell className="h-4 w-4 text-muted-foreground" />
              <span className="font-medium text-foreground text-sm">Daily Reminders</span>
            </div>
            
            <div className="space-y-3">
              <label className="flex items-center justify-between text-sm">
                <span className="text-foreground">Morning</span>
                {isEditing ? (
                  <input
                    type="time"
                    value={formData.morningReminderTime}
                    onChange={(e) => setFormData(prev => ({ ...prev, morningReminderTime: e.target.value }))}
                    className="px-2 py-1 bg-muted border border-border rounded text-xs text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20"
                  />
                ) : (
                  <span className="text-muted-foreground">{user.morningReminderTime || 'Not set'}</span>
                )}
              </label>
              
              <label className="flex items-center justify-between text-sm">
                <span className="text-foreground">Evening</span>
                {isEditing ? (
                  <input
                    type="time"
                    value={formData.eveningReminderTime}
                    onChange={(e) => setFormData(prev => ({ ...prev, eveningReminderTime: e.target.value }))}
                    className="px-2 py-1 bg-muted border border-border rounded text-xs text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20"
                  />
                ) : (
                  <span className="text-muted-foreground">{user.eveningReminderTime || 'Not set'}</span>
                )}
              </label>
            </div>
          </div>

          {/* Export Data */}
          <div className="bg-card rounded-2xl p-4 border border-border/20">
            <button
              onClick={handleExportData}
              className="flex items-center justify-between w-full"
            >
              <div className="flex items-center gap-2">
                <Download className="h-4 w-4 text-muted-foreground" />
                <span className="font-medium text-foreground text-sm">Export My Data</span>
              </div>
              <span className="text-xs text-muted-foreground">Download JSON</span>
            </button>
          </div>
        </div>

        {/* Save Button */}
        {isEditing && (
          <button
            onClick={handleSave}
            className="w-full mt-6 py-3 px-6 bg-primary text-primary-foreground rounded-xl font-medium hover:bg-primary/90 transition-colors duration-200"
          >
            Save Changes
          </button>
        )}
      </div>
    </div>
  );
};

export default Profile;