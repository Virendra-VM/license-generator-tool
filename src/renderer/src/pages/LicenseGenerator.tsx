import React, { useState, useEffect } from 'react';
import {
    Box, Paper, Typography, TextField, Button, MenuItem, Stack, Snackbar, Alert
} from '@mui/material';

const modeOptions = [
    { label: 'Inventory', value: 'inventory' },
    { label: 'CRM', value: 'crm' },
    { label: 'Sales (Full)', value: 'sales' },
];



const LicenseGenerator = () => {
    const [mode, setMode] = useState('inventory');
    const [licenseKey, setLicenseKey] = useState('');
    const [snackbar, setSnackbar] = useState(false);
    const [currentMachineId, setCurrentMachineId] = useState('');
    const [targetMachineId, setTargetMachineId] = useState('');

    useEffect(() => {
        window.licenseAPI.getMachineId().then((id) => {
            setCurrentMachineId(id);
            setTargetMachineId(id); // optional: prefill target with current
        });
    }, []);

    const handleGenerate = async () => {
        const key = await window.licenseAPI.generateLicense(targetMachineId, mode);
        setLicenseKey(key);
    };

    return (
        <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
            <Paper elevation={6} sx={{ p: 4, width: 480, borderRadius: 4 }}>
                <Typography variant="h5" gutterBottom>🔐 License Key Generator</Typography>

                <Stack spacing={3}>
                    <Box>
                        <Typography variant="caption" color="text.secondary" gutterBottom>
                            Your Current Machine ID:
                        </Typography>

                        <Box
                            sx={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: 1,
                                p: 1,
                                mb: 2,
                                border: '1px dashed #ccc',
                                borderRadius: 2,
                                backgroundColor: '#f9f9f9',
                                wordBreak: 'break-all',
                                fontFamily: 'monospace',
                            }}
                        >
                            <Box flexGrow={1}>{currentMachineId || 'Loading...'}</Box>
                            <Button
                                size="small"
                                variant="outlined"
                                onClick={() => {
                                    navigator.clipboard.writeText(currentMachineId);
                                    setSnackbar(true);
                                }}
                            >
                                Copy
                            </Button>
                        </Box>
                    </Box>

                    <TextField
                        label="Machine ID"
                        value={targetMachineId}
                        onChange={(e) => setTargetMachineId(e.target.value)}
                        fullWidth
                        placeholder="Enter target PC's Machine ID"
                    />
                    <TextField label="Mode" select value={mode} onChange={(e) => setMode(e.target.value)} fullWidth>
                        {modeOptions.map((opt) => (
                            <MenuItem key={opt.value} value={opt.value}>
                                {opt.label}
                            </MenuItem>
                        ))}
                    </TextField>
                    <Button variant="contained" onClick={handleGenerate}>Generate License</Button>
                    <TextField
                        label="License Key"
                        value={licenseKey}
                        fullWidth
                        multiline
                        rows={3}
                        InputProps={{
                            readOnly: true,
                        }}
                    />
                    <Button
                        variant="outlined"
                        onClick={() => {
                            navigator.clipboard.writeText(licenseKey);
                            setSnackbar(true);
                        }}
                    >
                        Copy Key
                    </Button>
                </Stack>
            </Paper>

            <Snackbar open={snackbar} autoHideDuration={2000} onClose={() => setSnackbar(false)}>
                <Alert onClose={() => setSnackbar(false)} severity="success" sx={{ width: '100%' }}>
                    License key copied!
                </Alert>
            </Snackbar>
        </Box>
    );
};

export default LicenseGenerator;