import React, { createContext, useContext, useState, ReactNode } from 'react';

// Define the context type
export interface DayContextProps {
  dayIndex: number;
  setDayIndex: React.Dispatch<React.SetStateAction<number>>;
}

// Create the context
export const DayContext = createContext<DayContextProps | undefined>(undefined);
