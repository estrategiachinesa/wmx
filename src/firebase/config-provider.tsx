
'use client';

import React, { createContext, useContext, ReactNode, useState, useEffect } from 'react';
import { doc, getDoc, setDoc, writeBatch } from 'firebase/firestore';
import { useFirestore } from './provider';
import { initializeFirebase } from '.';

// Define the shape of the configuration object
export interface AppConfig {
  hotmartUrl: string;
  exnovaUrl: string;
  iqOptionUrl: string;
  telegramUrl: string;
  hourlySignalLimit: number;
  correlationChance: number;
  registrationSecret: string;
}

// Define the state for the config context
interface ConfigContextState {
  config: AppConfig | null;
  isConfigLoading: boolean;
  configError: Error | null;
}

// Create the context with an initial undefined value
const ConfigContext = createContext<ConfigContextState | undefined>(undefined);

// Default configs to be used as a fallback and for initial creation
const defaultLinkConfig = {
    hotmartUrl: "https://pay.hotmart.com/E101943327K",
    exnovaUrl: "https://exnova.com/lp/start-trading/?aff=198544&aff_model=revenue&afftrack=",
    iqOptionUrl: "https://affiliate.iqoption.net/redir/?aff=198544&aff_model=revenue&afftrack=",
    telegramUrl: "https://t.me/Trader_Chines",
};

const defaultLimitConfig = {
    hourlySignalLimit: 3
};

// New remote config for correlation
const defaultRemoteValuesConfig = {
    correlationChance: 0.7
};

const defaultRegistrationConfig = {
    registrationSecret: "changeme"
};


const defaultConfig: AppConfig = {
    ...defaultLinkConfig,
    ...defaultLimitConfig,
    ...defaultRemoteValuesConfig,
    ...defaultRegistrationConfig
};

// Create the provider component
export const ConfigProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // For a static build, we won't fetch from Firestore. We'll use the defaults.
  const [configState, setConfigState] = useState<ConfigContextState>({
    config: defaultConfig,
    isConfigLoading: false, // Set to false as we are not loading anything.
    configError: null,
  });

  return (
    <ConfigContext.Provider value={configState}>
      {children}
    </ConfigContext.Provider>
  );
};

// Create the hook to use the config context
export const useAppConfig = (): ConfigContextState => {
  const context = useContext(ConfigContext);
  if (context === undefined) {
    throw new Error('useAppConfig must be used within a ConfigProvider');
  }
  return context;
};
