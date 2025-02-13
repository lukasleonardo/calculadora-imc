import { ArrowLeftRight, CircleDollarSign } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import {TaxasDeCambio} from '../../lib/TaxasDeCambio'
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { buscarTaxaDeCambioAPI } from "@/api/exchangeRates";

interface TaxasDeCambio {
  [key: string]: number; 
}

const obterDataRequisicao = () => {
  const data = new Date();  // Cria um objeto Date com a data e hora atuais

  const dia = String(data.getDate()).padStart(2, '0'); // Dia do mês (com 2 dígitos)
  const mes = String(data.getMonth() + 1).padStart(2, '0'); // Mês (com 2 dígitos)
  const ano = data.getFullYear(); // Ano com 4 dígitos
  const hora = String(data.getHours()).padStart(2, '0'); // Hora com 2 dígitos
  const minutos = String(data.getMinutes()).padStart(2, '0'); // Minutos com 2 dígitos

  // Formata como "DD/MM/YYYY HH:mm"
  return `${dia}/${mes}/${ano} ${hora}:${minutos}`;
};


export function CalculadoraMoeda() {
    const [currency, setCurrency] = useState('0.00');
    const [de, setDe] = useState('BRL');
    const [para, setPara] = useState('USD');
    const [resultado, setResultado] = useState<number|null>(null);
    const [cache, setCache] = useState<TaxasDeCambio>({});  // Cache das taxas de câmbio
    const [cacheTimestamp, setCacheTimestamp] = useState<number | null>(null);

    // data das moedas 12/02/2025
    const converterMoeda = useCallback(async () => {
        const val = Number.parseFloat(currency);
        let lastRequestDate;
        if (isNaN(val) || val <= 0) {
            setResultado(null);
            return;
        }
        if(de === para) return setResultado(Number((val).toFixed(2)));
        const chave = `${de}-${para}`;
        //const hora = 360000;
        const dia = 86400000;
        if(cache[chave] && cacheTimestamp && Date.now() - cacheTimestamp < dia) {
          console.log("using cache" + lastRequestDate)
            setResultado(Number((val * cache[chave]).toFixed(2)));
            return
        }
      

        try{
          const taxa = await buscarTaxaDeCambioAPI(de, para)
          if(taxa !== undefined) {
            lastRequestDate = obterDataRequisicao(); // salva data da ultima requisição
            // Atualiza o cache com a nova taxa
            setCache((prevCache) => ({ ...prevCache, [chave]: taxa }));
            setCacheTimestamp(Date.now());  // Atualiza o timestamp do cache
            setResultado(Number((val * taxa).toFixed(2)));
            console.log("using api, cache atualizado"+ lastRequestDate)
          }else{
            throw new Error('Taxa não encontrada na API');
          }

        }catch(e){          
          const taxaLocal = TaxasDeCambio[chave as keyof typeof TaxasDeCambio];
          console.log("using local")
            if (taxaLocal !== undefined) {
              setResultado(Number((val * taxaLocal).toFixed(2)));
            } else {
                setResultado(null);
            }
        }

    },[de, para, currency, cache, cacheTimestamp, TaxasDeCambio, setResultado])

    const inverterMedida = () => {
      const temp = de;
      setDe(para);
      setPara(temp);
     }

    const firstRender = useRef(true);
         

    useEffect(() => {
        if (firstRender.current) {
        firstRender.current = false;
        return;
        }
    converterMoeda();
    }, [,currency,de,para]);
     
      

    return (
        <Card className="w-full max-w-md border-primary">
        <CardHeader className="bg-primary text-primary-foreground rounded-t-lg">
          <CardTitle className="text-2xl font-bold text-center">Conversor de Moeda</CardTitle>
        </CardHeader>
        <CardContent className="mt-4 space-y-4">
          <div>
            <Label htmlFor="moeda" className="text-primary">
            Moeda
            </Label>
            <div className="relative">
              <CircleDollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-primary" />
              <Input
                id="moeda"
                type="number"
                value={currency}
                onChange={(e) => setCurrency(e.target.value)}
                className="pl-10 border-primary"
                placeholder="Digite a temperatura"
              />
            </div>
          </div>
          <div className="flex justify-between items-end">
            <div className="w-2/5">
              <Label htmlFor="de" className="text-primary">
                De
              </Label>
              <select
                id="de"
                value={de}
                onChange={(e) => setDe(e.target.value)}
                className="w-full p-2 border border-primary rounded"
              >
                <option value="BRL">Real</option>
                <option value="USD">Dolar</option>
                <option value="EUR">Euro</option>
                <option value="GBP">Libra</option>
                <option value="BTC">Bitcoin</option>
                <option value="KRW">Won</option>
                <option value="JPY">Iene</option>
                <option value="CNY">Yuan</option>
              </select>
            </div>
            <Button onClick={inverterMedida} className="bg-primary  hover:bg-primary/70">
              <ArrowLeftRight className="text-secondary" />
            </Button>
            <div className="w-2/5">
              <Label htmlFor="para" className="text-primary">
                Para
              </Label>
              <select
                id="para"
                value={para}
                onChange={(e) => setPara(e.target.value)}
                className="w-full p-2 border border-primary rounded"
              >
                <option value="BRL">Real</option>
                <option value="USD">Dolar</option>
                <option value="EUR">Euro</option>
                <option value="GBP">Libra</option>
                <option value="BTC">Bitcoin</option>
                <option value="KRW">Won</option>
                <option value="JPY">Iene</option>
                <option value="CNY">Yuan</option>
              </select>
            </div>
          </div>
          <Button onClick={converterMoeda} className="w-full bg-primary hover:bg-primary/90">
            Converter
          </Button>
          {resultado !== null && (
            <div className="mt-4 p-4 bg-accent rounded-md border border-primary">
              <p className="text-xl font-semibold text-primary">
                Resultado:{resultado} {para}
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    )
}