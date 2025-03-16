import React from 'react';
import { X, Bell, CalendarClock, FileText, BookOpen, CheckCircle2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';

// Mock notifications data - would come from API in a real app
const notifications = [
  {
    id: 1,
    title: 'DC Meeting Scheduled',
    message: 'Your DC meeting has been scheduled for November 15th, 2024 at 10:00 AM.',
    time: '2 hours ago',
    type: 'meeting',
    read: false,
  },
  {
    id: 2,
    title: 'Publication Approved',
    message: 'Your journal paper has been approved by your supervisor.',
    time: '1 day ago',
    type: 'publication',
    read: false,
  },
  {
    id: 3,
    title: 'Comprehensive Exam Results',
    message: 'Results are out',
    time: '3 days ago',
    type: 'exam',
    read: true,
  },

];

const iconMap = {
  meeting: CalendarClock,
  publication: BookOpen,
  exam: FileText,
  course: CheckCircle2,
  default: Bell,
};

const NotificationPanel = ({ open, onClose }) => {
  return (
    <div
      className={cn(
        'fixed top-16 right-4 w-96 max-w-[90vw] bg-card shadow-lg rounded-lg border border-border z-50',
        'transform transition-all duration-300 ease-in-out origin-top-right',
        open ? 'scale-100 opacity-100' : 'scale-95 opacity-0 pointer-events-none'
      )}
    >
      <div className="flex items-center justify-between p-4 border-b border-border">
        <h3 className="font-semibold text-lg">Notifications</h3>
        <Button variant="ghost" size="icon" onClick={onClose}>
          <X className="h-4 w-4" />
        </Button>
      </div>

      <ScrollArea className="max-h-[70vh]">
        {notifications.length > 0 ? (
          <div className="divide-y divide-border">
            {notifications.map((notification) => {
              const Icon = iconMap[notification.type] || iconMap.default;

              return (
                <div
                  key={notification.id}
                  className={cn(
                    'p-4 hover:bg-muted/50 transition-colors',
                    !notification.read && 'bg-primary/5'
                  )}
                >
                  <div className="flex gap-3">
                    <div
                      className={cn(
                        'h-10 w-10 rounded-full flex items-center justify-center flex-shrink-0',
                        !notification.read ? 'bg-primary/10 text-primary' : 'bg-muted text-muted-foreground'
                      )}
                    >
                      <Icon className="h-5 w-5" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className={cn(
                        'font-medium text-sm',
                        !notification.read && 'text-primary'
                      )}>
                        {notification.title}
                      </p>
                      <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
                        {notification.message}
                      </p>
                      <p className="text-xs text-muted-foreground mt-1">
                        {notification.time}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="p-8 text-center text-muted-foreground">
            <Bell className="h-10 w-10 mx-auto mb-3 opacity-40" />
            <p>No notifications yet</p>
          </div>
        )}
      </ScrollArea>

      <div className="p-3 border-t border-border flex justify-between">
        <Button variant="ghost" size="sm">Mark all as read</Button>
        <Button variant="ghost" size="sm">Clear all</Button>
      </div>
    </div>
  );
};

export default NotificationPanel;
