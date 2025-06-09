import React from 'react';
import TabButton from '@/components/molecules/TabButton';
import Card from '@/components/atoms/Card';

const ReportsTabs = ({ selectedReport, setSelectedReport, reportTypes }) => {
  return (
    <Card className="mb-6 p-0">
      <div className="border-b border-surface-200">
        <nav className="flex space-x-8 px-6">
          {reportTypes.map((type) => (
            <TabButton
              key={type.id}
              label={type.label}
              icon={type.icon}
              isActive={selectedReport === type.id}
              onClick={() => setSelectedReport(type.id)}
            />
          ))}
        </nav>
      </div>
    </Card>
  );
};

export default ReportsTabs;