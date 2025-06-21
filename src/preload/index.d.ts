import { ElectronAPI } from '@electron-toolkit/preload'
import { contextBridge, ipcRenderer } from 'electron'


declare global {
  interface Window {
    electron: ElectronAPI
    api:{
  };

  licenseAPI: {
    getMachineId(): Promise<string>;
    generateLicense(machineId: string, mode: string): Promise<string>;
    validateLicense(key: string, machineId: string, mode: string): Promise<boolean>;
  };

}

// Extend the Window interface to include the licenseAPI

