const express = require('express');
const odbc = require('odbc');
const app = express();
const port = 3005; // Make sure this is 3005 to match the Grafana datasource configuration

// Update these with your IBM i details or use environment variables
const connectionString = `DRIVER=/opt/ibm/iaccess/lib64/libcwbodbc.so;SYSTEM=192.168.240.1;UID=ISAAL;PWD=mask8080;`;

app.get('/api/status', async (req, res) => {
    try {
        const connection = await odbc.connect(connectionString);
        
        // Example SQL: Fetch CPU and ASP (Disk) usage from IBM i services
        const sql = `select ELAPSED_CPU_USED from QSYS2.SYSTEM_STATUS_INFO_BASIC`;
        const result = await connection.query(sql);
        
        await connection.close();
        
        // Send data as JSON
        res.json(result[0]);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Failed to connect to IBM i", details: error.message });
    }
});

app.listen(port, () => {
    console.log(`IBM i Adapter listening at http://localhost:${port}`);
});