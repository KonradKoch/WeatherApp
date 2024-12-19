import { Inter } from 'next/font/google';
import { Menu } from './Menu';
import { ReactNode, useState } from 'react';
import { DayContext } from '../context/context';

const inter = Inter({
  subsets: ['latin'],
});

export default function Layout({
  children,
}: {
  children: ReactNode;
}) {
  const [dayIndex, setDayIndex] = useState(0);

  return (
    <div className={inter.className}>
      <Menu dayIndex={dayIndex} setDayIndex={setDayIndex} />
      <DayContext.Provider value={{ dayIndex, setDayIndex }}>
        {children}
      </DayContext.Provider>
    </div>
  );
}

