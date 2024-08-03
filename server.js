const express = require('express');
const axios = require('axios');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

// Enable CORS
app.use(cors());

// Parse application/json
app.use(bodyParser.json());
// Parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// Replace with your sandbox credentials
const apiKey = 'key_live_MTH2GDBR4ix66rudnakP2xhVIgJuPf8M';
const accessToken = 'eyJhbGciOiJIUzUxMiJ9.eyJhdWQiOiJBUEkiLCJyZWZyZXNoX3Rva2VuIjoiZXlKaGJHY2lPaUpJVXpVeE1pSjkuZXlKaGRXUWlPaUpCVUVraUxDSnpkV0lpT2lKdWFYTm9ZVzUwYTJoaGRISnBNRGsxUUdkdFlXbHNMbU52YlNJc0ltRndhVjlyWlhraU9pSnJaWGxmYkdsMlpWOU5WRWd5UjBSQ1VqUnBlRFkyY25Wa2JtRnJVREo0YUZaSlowcDFVR1k0VFNJc0ltbHpjeUk2SW1Gd2FTNXpZVzVrWW05NExtTnZMbWx1SWl3aVpYaHdJam94TnpVME1URTFNelV6TENKcGJuUmxiblFpT2lKU1JVWlNSVk5JWDFSUFMwVk9JaXdpYVdGMElqb3hOekl5TlRjNU16VXpmUS5KUWZ2R214Z2NqSkpPVmxTT0pQQmxjMUQtajloQ2R4YWhtQlhjS3pIQmQ1Q2oxTmJ2dmlPbS0zRVdmVmt2Ykl1UFJhZ3k4S2s2OVNEb0NLQlJBdTlXZyIsInN1YiI6Im5pc2hhbnRraGF0cmkwOTVAZ21haWwuY29tIiwiYXBpX2tleSI6ImtleV9saXZlX01USDJHREJSNGl4NjZydWRuYWtQMnhoVklnSnVQZjhNIiwiaXNzIjoiYXBpLnNhbmRib3guY28uaW4iLCJleHAiOjE3MjI2NjU3NTMsImludGVudCI6IkFDQ0VTU19UT0tFTiIsImlhdCI6MTcyMjU3OTM1M30.GjGB4HB6IMYhM1QzKzEOuPSrMYf7fS6bgG3aNsm5tG7s-CP3d6Jbe1GbnPTa-j2mizyisYZA_X9N024cSP2AZw';

// Endpoint to fetch bank name using VPA
app.get('/vpa/:vpa', async (req, res) => {
    const { vpa } = req.params;

    const options = {
        method: 'GET',
        url: `https://api.sandbox.co.in/bank/upi/${vpa}`,
        headers: {
            accept: 'application/json',
            authorization: accessToken,
            'x-api-key': apiKey,
        },
    };

    try {
        const response = await axios.request(options);
        const nameAtBank = response.data.data.name_at_bank;
        console.log(nameAtBank);
        res.status(200).json({ nameAtBank });
    } catch (error) {
        res.status(500).json({
            message: 'Failed to fetch bank details',
            error: error.response ? error.response.data : error.message,
        });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
