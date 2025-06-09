import React from 'react';
import ApperIcon from '@/components/ApperIcon';
import Button from '@/components/atoms/Button';
import Card from '@/components/atoms/Card';

const AppointmentCalendarControls = ({
  currentView,
  setCurrentView,
  selectedDate,
  setSelectedDate
}) => {
  const handleDateChange = (direction) => {
    const newDate = new Date(selectedDate);
    if (currentView === 'day') {
      newDate.setDate(newDate.getDate() + direction);
    } else if (currentView === 'week') {
      newDate.setDate(newDate.getDate() + (direction * 7));
    } else { // month
      newDate.setMonth(newDate.getMonth() + direction);
    }
    setSelectedDate(newDate);
  };

  const displayDateRange = () => {
    if (currentView === 'day') {
      return selectedDate.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
    } else if (currentView === 'week') {
      const weekStart = new Date(selectedDate);
      weekStart.setDate(selectedDate.getDate() - selectedDate.getDay());
      const weekEnd = new Date(weekStart);
      weekEnd.setDate(weekStart.getDate() + 6);
      return `Week of ${weekStart.toLocaleDateString()} - ${weekEnd.toLocaleDateString()}`;
    } else {
      return selectedDate.toLocaleDateString('en-US', { year: 'numeric', month: 'long' });
    }
  };

  return (
    <Card className="mb-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
        <div className="flex items-center space-x-4">
          <div className="flex bg-surface-100 rounded-lg">
            {['day', 'week', 'month'].map((view) => (
              <Button
                key={view}
                onClick={() => setCurrentView(view)}
                className={`px-4 py-2 text-sm font-medium rounded-lg ${
                  currentView === view
                    ? 'bg-primary text-white'
                    : 'text-surface-600 hover:text-surface-900'
                }`}
                whileHover={false}
                whileTap={false}
              >
                {view.charAt(0).toUpperCase() + view.slice(1)}
              </Button>
            ))}
          </div>
          <div className="flex items-center space-x-2">
            <Button
              onClick={() => handleDateChange(-1)}
              className="p-2 hover:bg-surface-100 rounded-lg"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <ApperIcon name="ChevronLeft" size={16} />
            </Button>
            <span className="text-lg font-medium text-surface-900 min-w-[200px] text-center">
              {displayDateRange()}
            </span>
            <Button
              onClick={() => handleDateChange(1)}
              className="p-2 hover:bg-surface-100 rounded-lg"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <ApperIcon name="ChevronRight" size={16} />
            </Button>
          </div>
        </div>
        <Button
          onClick={() => setSelectedDate(new Date())}
          className="px-4 py-2 border border-surface-300 text-surface-700 rounded-lg hover:bg-surface-50"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Today
        </Button>
      </div>
    </Card>
  );
};

export default AppointmentCalendarControls;