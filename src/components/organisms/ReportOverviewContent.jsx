import React from 'react';
import { motion } from 'framer-motion';
import StatCard from '@/components/molecules/StatCard';
import Card from '@/components/atoms/Card';
import ApperIcon from '@/components/ApperIcon';
import EmptyState from '@/components/atoms/EmptyState';

const ReportOverviewContent = ({ metrics }) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      className="space-y-6"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          icon="Calendar"
          title="Total Appointments"
          value={metrics.totalAppointments}
          iconBgClass="bg-primary/10"
          iconColorClass="text-primary"
          delay={0.1}
        />
        <StatCard
          icon="CheckCircle"
          title="Completed"
          value={metrics.completedAppointments}
          iconBgClass="bg-success/10"
          iconColorClass="text-success"
          delay={0.2}
        />
        <StatCard
          icon="Users"
          title="Total Patients"
          value={metrics.totalPatients}
          iconBgClass="bg-accent/10"
          iconColorClass="text-accent"
          delay={0.3}
        />
        <StatCard
          icon="TrendingUp"
          title="Completion Rate"
          value={`${metrics.completionRate}%`}
          iconBgClass="bg-warning/10"
          iconColorClass="text-warning"
          delay={0.4}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card motionProps={{ initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, transition: { delay: 0.5 } }}>
          <h3 className="text-lg font-medium text-surface-900 mb-4">Appointments by Status</h3>
          <div className="space-y-4">
            {metrics.appointmentsByStatus.map((item) => (
              <div key={item.status} className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div
                    className={`w-4 h-4 rounded-full ${
                      item.status === 'Completed' ? 'bg-success' :
                      item.status === 'Confirmed' ? 'bg-primary' :
                      item.status === 'Scheduled' ? 'bg-info' : 'bg-error'
                    }`}
                  ></div>
                  <span className="text-surface-900">{item.status}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-surface-900 font-medium">{item.count}</span>
                  <div className="w-20 bg-surface-200 rounded-full h-2">
                    <div
                      className={`h-2 rounded-full ${
                        item.status === 'Completed' ? 'bg-success' :
                        item.status === 'Confirmed' ? 'bg-primary' :
                        item.status === 'Scheduled' ? 'bg-info' : 'bg-error'
                      }`}
                      style={{
                        width: metrics.totalAppointments > 0
                          ? `${(item.count / metrics.totalAppointments) * 100}%`
                          : '0%'
                      }}
                    ></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Card>

        <Card motionProps={{ initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, transition: { delay: 0.6 } }}>
          <h3 className="text-lg font-medium text-surface-900 mb-4">Department Activity</h3>
          <div className="space-y-4">
            {metrics.appointmentsByDepartment
              .sort((a, b) => b.count - a.count)
              .slice(0, 5)
              .map((dept) => (
              <div key={dept.name} className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-surface-900 font-medium">{dept.name}</span>
                  <span className="text-surface-600">{dept.count} appointments</span>
                </div>
                <div className="w-full bg-surface-200 rounded-full h-2">
                  <div
                    className="bg-primary h-2 rounded-full transition-all duration-300"
                    style={{
                      width: metrics.totalAppointments > 0
                        ? `${(dept.count / metrics.totalAppointments) * 100}%`
                        : '0%'
                    }}
                  ></div>
                </div>
                <div className="flex justify-between text-sm text-surface-500">
                  <span>Avg wait: {dept.avgWaitTime} min</span>
                  <span>{metrics.totalAppointments > 0
                    ? Math.round((dept.count / metrics.totalAppointments) * 100)
                    : 0}%</span>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </motion.div>
  );
};

export default ReportOverviewContent;