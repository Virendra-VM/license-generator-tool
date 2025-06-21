import { ipcMain } from 'electron';
import { getMachineId, generateLicenseKey, validateLicenseKey } from './license';

ipcMain.handle('get-machine-id', () => {
  return getMachineId();
});

ipcMain.handle('generate-license', (_, machineId: string, mode: string) => {
  return generateLicenseKey(machineId, mode);
});

ipcMain.handle('validate-license', (_, key: string, machineId: string, mode: string) => {
  return validateLicenseKey(key, machineId, mode);
});