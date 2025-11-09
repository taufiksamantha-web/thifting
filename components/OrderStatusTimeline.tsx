
import React from 'react';
import { Order } from '../types';

interface OrderStatusTimelineProps {
  status: Order['status'];
}

const OrderStatusTimeline: React.FC<OrderStatusTimelineProps> = ({ status }) => {
  const statuses: Order['status'][] = ['Pending', 'Paid', 'Shipped', 'Delivered'];
  const currentStatusIndex = statuses.indexOf(status);

  return (
    <div className="flex items-center justify-between w-full my-8">
      {statuses.map((s, index) => {
        const isCompleted = index <= currentStatusIndex;
        const isCurrent = index === currentStatusIndex;

        return (
          <React.Fragment key={s}>
            <div className="flex flex-col items-center text-center w-20">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300
                  ${isCompleted ? 'bg-accent text-background' : 'bg-secondary text-text-muted'}
                  ${isCurrent ? 'ring-4 ring-accent/50' : ''}`}
              >
                {isCompleted ? (
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                ) : (
                  <div className="w-3 h-3 bg-primary rounded-full"></div>
                )}
              </div>
              <p className={`mt-2 text-xs font-semibold ${isCompleted ? 'text-text-main' : 'text-text-muted'}`}>{s}</p>
            </div>
            {index < statuses.length - 1 && (
              <div className={`flex-1 h-1 mx-2 rounded-full transition-all duration-300 ${index < currentStatusIndex ? 'bg-accent' : 'bg-secondary'}`}></div>
            )}
          </React.Fragment>
        );
      })}
    </div>
  );
};

export default OrderStatusTimeline;
