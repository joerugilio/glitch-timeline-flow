
export interface ParsedPeriod {
  startDate: Date;
  endDate: Date;
  duration: number; // in months
}

export const parsePeriod = (period: string): ParsedPeriod => {
  const [start, end] = period.split(' - ');
  
  const startDate = parseDate(start.trim());
  const endDate = end?.trim() === 'Present' ? new Date() : parseDate(end?.trim() || '');
  
  const duration = getDurationInMonths(startDate, endDate);
  
  return {
    startDate,
    endDate,
    duration
  };
};

const parseDate = (dateStr: string): Date => {
  if (!dateStr) return new Date();
  
  // Handle "Present"
  if (dateStr.toLowerCase() === 'present') {
    return new Date();
  }
  
  // Handle "YYYY" format
  if (/^\d{4}$/.test(dateStr)) {
    return new Date(parseInt(dateStr), 0, 1);
  }
  
  // Handle "Month YYYY" format
  const monthYear = dateStr.match(/^(\w+)\s+(\d{4})$/);
  if (monthYear) {
    const months = [
      'january', 'february', 'march', 'april', 'may', 'june',
      'july', 'august', 'september', 'october', 'november', 'december'
    ];
    const monthIndex = months.findIndex(m => m.startsWith(monthYear[1].toLowerCase()));
    return new Date(parseInt(monthYear[2]), monthIndex >= 0 ? monthIndex : 0, 1);
  }
  
  // Fallback
  return new Date(dateStr);
};

const getDurationInMonths = (start: Date, end: Date): number => {
  const yearDiff = end.getFullYear() - start.getFullYear();
  const monthDiff = end.getMonth() - start.getMonth();
  return yearDiff * 12 + monthDiff;
};

export const getTimelineRange = (positions: any[]): { start: Date; end: Date; totalMonths: number } => {
  const periods = positions.map(p => parsePeriod(p.period));
  const startDates = periods.map(p => p.startDate);
  const endDates = periods.map(p => p.endDate);
  
  const start = new Date(Math.min(...startDates.map(d => d.getTime())));
  const end = new Date(Math.max(...endDates.map(d => d.getTime())));
  
  return {
    start,
    end,
    totalMonths: getDurationInMonths(start, end)
  };
};
