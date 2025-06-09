import React from 'react';
import StatCard from '@/components/molecules/StatCard';

const DashboardMetricsGrid = ({ totalPatients, todaysAppointmentsCount, activeDepartmentsCount }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <StatCard
        icon="Users"
        title="Total Patients"
        value={totalPatients}
        iconBgClass="bg-primary/10"
        iconColorClass="text-primary"
        delay={0.1}
      />
      <StatCard
        icon="Calendar"
        title="Today's Appointments"
        value={todaysAppointmentsCount}
        iconBgClass="bg-accent/10"
        iconColorClass="text-accent"
        delay={0.2}
      />
      <StatCard
        icon="Building2"
        title="Active Departments"
        value={activeDepartmentsCount}
        iconBgClass="bg-success/10"
        iconColorClass="text-success"
        delay={0.3}
      />
      <StatCard
        icon="Clock"
        title="Avg Wait Time"
        value="15 min"
        iconBgClass="bg-warning/10"
        iconColorClass="text-warning"
        delay={0.4}
      />
    </div>
  );
};

export default DashboardMetricsGrid;