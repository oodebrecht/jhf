
const fs = require('fs');
const https = require('https');

const url = 'https://api.allorigins.win/raw?url=https://www.flashscore.com/football/brazil/';

https.get(url, (res) => {
    let html = '';
    res.on('data', chunk => html += chunk);
    res.on('end', () => {
        const now = new Date().toISOString();
        const content = `<!DOCTYPE html><html><head><meta charset="UTF-8"><title>Jogos do Dia</title></head><body><h1>Atualizado em ${now}</h1><pre>${html.substring(0, 1000)}...</pre></body></html>`;
        fs.writeFileSync('jogos.html', content);
        console.log('Arquivo jogos.html atualizado!');
    });
}).on('error', err => console.error('Erro ao buscar dados:', err));
