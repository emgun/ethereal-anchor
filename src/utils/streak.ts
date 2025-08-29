import { DailyActivity } from '@/types';

export const checkStreakActivity = (activities: DailyActivity[], date: string): boolean => {
  const activity = activities.find(a => a.date === date);
  if (!activity) return false;
  
  return (activity.journalComplete && (activity.breathworkComplete || activity.meditationComplete));
};

export const calculateStreak = (activities: DailyActivity[]): number => {
  const today = new Date();
  let streak = 0;
  
  for (let i = 0; i < activities.length; i++) {
    const checkDate = new Date(today);
    checkDate.setDate(today.getDate() - i);
    const dateString = checkDate.toISOString().split('T')[0];
    
    if (checkStreakActivity(activities, dateString)) {
      streak++;
    } else {
      break;
    }
  }
  
  return streak;
};

export const getTodayActivity = (): string => {
  return new Date().toISOString().split('T')[0];
};