import { notFound } from 'next/navigation';
import { WeekContent } from './week-content';

export function generateStaticParams() {
  return Array.from({ length: 5 }, (_, i) => ({
    weekNumber: (i + 1).toString(),
  }));
}

type PageProps = {
  params: {
    weekNumber: string;
  };
};

export default function WeekPage({ params }: PageProps) {
  const { weekNumber } = params;
  const week = parseInt(weekNumber, 10);
  
  if (isNaN(week) || week < 1 || week > 5) {
    notFound();
  }

  return <WeekContent />;
}
