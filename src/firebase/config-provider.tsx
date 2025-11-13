
'use client';

import React, { createContext, useContext, ReactNode, useState, useEffect } from 'react';
import { doc, getDoc } from 'firebase/firestore';
import { useFirestore } from './provider';

// Define the shape of the configuration object
export interface AppConfig {
  hotmartUrl: string;
  exnovaUrl: string;
  iqOptionUrl: string;
  telegramUrl: string;
}

// Define the state for the config context
interface ConfigContextState {
  config: AppConfig | null;
  isConfigLoading: boolean;
  configError: Error | null;
}

// Create the context with an initial undefined value
const ConfigContext = createContext<ConfigContextState | undefined>(undefined);

// Default config to be used as a fallback
const defaultConfig: AppConfig = {
    hotmartUrl: "https://pay.hotmart.com/E101943327K",
    exnovaUrl: "https://exnova.com/lp/start-trading/?aff=198544&aff_model=revenue&afftrack=",
    iqOptionUrl: "https://affiliate.iqoption.net/redir/?aff=198544&aff_model=revenue&afftrack=",
    telegramUrl: "https://t.me/Trader_Chines"
};


// Create the provider component
export const ConfigProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const firestore = useFirestore(); // Use the hook to get Firestore instance

  const [configState, setConfigState] = useState<ConfigContextState>({
    config: null,
    isConfigLoading: true,
    configError: null,
  });

  useEffect(() => {
    if (!firestore) {
      // If firestore is not available, stop loading and maybe set an error
      // or use default config
      setConfigState({
        config: defaultConfig,
        isConfigLoading: false,
        configError: new Error("Firestore is not available."),
      });
      return;
    }

    const fetchConfig = async () => {
      const configRef = doc(firestore, 'appConfig', 'links');
      try {
        const docSnap = await getDoc(configRef);
        if (docSnap.exists()) {
          setConfigState({
            config: docSnap.data() as AppConfig,
            isConfigLoading: false,
            configError: null,
          });
        } else {
          // Document does not exist, use default config and log a warning
          console.warn("Configuration document not found. Using default links. Create 'appConfig/links' in Firestore.");
          setConfigState({
            config: defaultConfig,
            isConfigLoading: false,
            configError: null, // Not a hard error, we have fallbacks
          });
        }
      } catch (error) {
        console.error("Error fetching remote config, using defaults:", error);
        setConfigState({
          config: defaultConfig,
          isConfigLoading: false,
          configError: error instanceof Error ? error : new Error('Failed to fetch config'),
        });
      }
    };

    fetchConfig();
  }, [firestore]); // Re-fetch if the firestore instance changes

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
