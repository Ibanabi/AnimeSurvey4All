const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');

const app = express();


app.use('/api', createProxyMiddleware({
    target: 'https://sheetdb.io/api/v1/m0bc31xabftvt', 
    changeOrigin: true, 
    pathRewrite: { '^/api': '' }, 
    onProxyReq: (proxyReq, req, res) => {
        console.log(`Proxying request: ${req.method} ${req.url}`);
    },
    onProxyRes: (proxyRes, req, res) => {
        console.log(`Response from target: ${proxyRes.statusCode}`);
    },
}));

app.listen(3000, () => {
    console.log('Proxy server is running on http://localhost:3000');
});