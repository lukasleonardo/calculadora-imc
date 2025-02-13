// Função para buscar a taxa de câmbio via API
export const buscarTaxaDeCambioAPI = async (moedaOrigem:string, moedaDestino:string) => {
    const apiKey = process.env.OPENEXCHANGERATES_APP_ID;  // Usa a chave da API armazenada no .env
    const urlBase = process.env.OPENEXCHANGERATES_BASE_URL;  // URL base da API

    const url = `${urlBase}/latest.json?app_id=${apiKey}`;

    try {
        const response = await fetch(url);
        const data = await response.json();

        if (!data || !data.rates) {
            throw new Error('Dados de câmbio não encontrados');
        }

        // Obtendo a taxa de câmbio entre as moedas especificadas
        const taxaOrigem = data.rates[moedaOrigem];
        const taxaDestino = data.rates[moedaDestino];

        if (taxaOrigem && taxaDestino) {
            return taxaDestino / taxaOrigem;
        } else {
            throw new Error('Taxas de câmbio não encontradas');
        }
    } catch (error) {
        console.error('Erro ao buscar taxa de câmbio na API:', error);
        throw error;
    }
};






// $.get('https://openexchangerates.org/api/latest.json', {app_id: 'YOUR_APP_ID'}, function(data) {
//     console.log(data);
// });