import { machineIdSync } from 'node-machine-id';
import crypto from 'crypto';

const SECRET_SALT = 'snapstock-2025-key@123!'; 

export const getMachineId = (): string => {
  return machineIdSync();
};

export const generateLicenseKey = (machineId: string, mode: string): string => {
  const data = `${machineId}::${mode}::${SECRET_SALT}`;
  return crypto.createHash('sha256').update(data).digest('hex');
};

export const validateLicenseKey = (inputKey: string, machineId: string, mode: string): boolean => {
  const expectedKey = generateLicenseKey(machineId, mode);
  return inputKey === expectedKey;
};