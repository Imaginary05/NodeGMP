const { exec } = require('child_process');
const fs = require('fs');
const os = require('os');

const LOG_FILE = 'activityMonitor.log';

function getCurrentTimestamp() {
    return Math.floor(Date.now() / 1000);
}

function logToActivityMonitor(processInfo) {
    const timestamp = getCurrentTimestamp();
    const logLine = `${timestamp} : ${processInfo}\n`;
    fs.appendFile(LOG_FILE, logLine, (err) => {
        if (err) {
            console.error('Error appending to the log file:', err);
        }
    });
}

function getMostCpuIntensiveProcess() {
    if (os.type() === 'Windows_NT') {
        exec(
            'powershell "Get-Process | Sort-Object CPU -Descending | Select-Object -Property Name, CPU, WorkingSet -First 1 | ForEach-Object { $_.Name + \' \' + $_.CPU + \' \' + $_.WorkingSet }"',
            (error, stdout) => {
                if (error) {
                    console.error('Error running PowerShell command:', error);
                    return;
                }

                const processInfo = stdout.trim().replace(/\r?\n/g, ' ');
                console.log(processInfo);
                logToActivityMonitor(processInfo);
            }
        );
    } else {
        exec(
            'ps -A -o %cpu,%mem,comm | sort -nr | head -n 1',
            (error, stdout) => {
                if (error) {
                    console.error('Error running ps command:', error);
                    return;
                }

                const processInfo = stdout.trim().replace(/\r?\n/g, ' ');
                console.log(processInfo);
                logToActivityMonitor(processInfo);
            }
        );
    }
}

function monitorSystem() {
    setInterval(getMostCpuIntensiveProcess, 100); // Refresh rate: 10 times per second (100 ms)
}

// Start monitoring the system
monitorSystem();
