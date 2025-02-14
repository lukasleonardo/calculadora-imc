import type { SelectOption } from "@/components/SeletorComBusca"

interface CurrencyData {
  currencies: SelectOption[]
  exchangeRates: { [key: string]: number }
  lastUpdated: number
}

const CACHE_KEY = "currencyData"
// 1 hora
// /const CACHE_EXPIRATION = 60 * 60 * 1000 
//1 dia
const CACHE_EXPIRATION = 24 * 60 * 60 * 1000;
let currencyData: CurrencyData = {
  currencies: [],
  exchangeRates: {},
  lastUpdated: 0,
}

let requestDate: string;


function obterDataRequisicao () {
  const data = new Date();  // Cria um objeto Date com a data e hora atuais

  const dia = String(data.getDate()).padStart(2, '0'); // Dia do mês (com 2 dígitos)
  const mes = String(data.getMonth() + 1).padStart(2, '0'); // Mês (com 2 dígitos)
  const ano = data.getFullYear(); // Ano com 4 dígitos
  const hora = String(data.getHours()).padStart(2, '0'); // Hora com 2 dígitos
  const minutos = String(data.getMinutes()).padStart(2, '0'); // Minutos com 2 dígitos

  // Formata como "DD/MM/YYYY HH:mm"
  return `${dia}/${mes}/${ano} ${hora}:${minutos}`;
};



function loadFromCache(): boolean {
  if (typeof window === "undefined") return false // Não tenta carregar do cache no lado do servidor

  const cachedData = localStorage.getItem(CACHE_KEY)
  if (cachedData) {
    const parsedData = JSON.parse(cachedData) as CurrencyData
    if (Date.now() - parsedData.lastUpdated < CACHE_EXPIRATION) {
      currencyData = parsedData
      return true
    }
  }
  return false
}

function saveToCache() {
  if (typeof window === "undefined") return // Não tenta salvar no cache no lado do servidor

  localStorage.setItem(CACHE_KEY, JSON.stringify(currencyData))
}

export async function updateCurrencyData() {
  if (loadFromCache()) {
    console.log(requestDate)
    console.log("Dados de moeda carregados do cache")
    return
  }

  const APP_ID = process.env.NEXT_PUBLIC_OPENEXCHANGERATES_APP_ID

  if (!APP_ID) {
    console.error("Open Exchange Rates APP_ID não configurado")
    return
  }

  try {
    // Buscar taxas de câmbio
    const ratesResponse = await fetch(`https://openexchangerates.org/api/latest.json?app_id=${APP_ID}`)
    const ratesData = await ratesResponse.json()
    requestDate = obterDataRequisicao();
    console.log(requestDate)
    // Buscar nomes das moedas
    const currenciesResponse = await fetch(`https://openexchangerates.org/api/currencies.json`)
    const currenciesData = await currenciesResponse.json()

    // Atualizar o objeto currencyData
    currencyData.exchangeRates = ratesData.rates
    currencyData.currencies = Object.entries(currenciesData).map(([code, name]) => ({
      value: code,
      label: `${code} - ${name as string}`,
    }))
    currencyData.lastUpdated = Date.now()

    saveToCache()
    console.log("Dados de moeda atualizados com sucesso e salvos no cache")
  } catch (error) {
    console.error("Erro ao atualizar dados de moeda:", error)
  }
}

export function getCurrencyData(): CurrencyData {
  if (currencyData.currencies.length === 0) {
    loadFromCache()
  }
  requestDate = obterDataRequisicao();
  console.log(requestDate)
  return currencyData
}

export function convertCurrency(amount: number, from: string, to: string): number {
  const rates = currencyData.exchangeRates
  if (!rates[from] || !rates[to]) {
    throw new Error("Taxa de câmbio não disponível para uma das moedas")
  }

  // Converter para USD primeiro (base da API), depois para a moeda de destino
  const amountInUSD = amount / rates[from]
  return amountInUSD * rates[to]
}

