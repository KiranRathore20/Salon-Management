import { LucideIcon } from "lucide-react";
import { Card } from 'react-bootstrap';

interface MetricCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  action?: React.ReactNode;
  color?: string;
}

export const MetricCard = ({ title, value, icon: Icon, action, color = "primary" }: MetricCardProps) => {
  return (
    <Card className="h-100 shadow-sm border-0 hover-shadow-lg transition-all duration-200">
      <Card.Body className="d-flex align-items-center justify-content-between p-4">
        <div className="d-flex align-items-center">
          <div className={`rounded-circle bg-${color} d-flex align-items-center justify-content-center me-3`} 
               style={{width: '48px', height: '48px'}}>
            <Icon className="text-white" size={24} />
          </div>
          <div>
            <p className="text-muted mb-1 small">{title}</p>
            <h4 className="mb-0 fw-bold text-dark">{value}</h4>
          </div>
        </div>
        {action && <div>{action}</div>}
      </Card.Body>
    </Card>
  );
};