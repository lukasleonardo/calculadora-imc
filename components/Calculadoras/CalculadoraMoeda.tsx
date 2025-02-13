import { ArrowLeftRight, CircleDollarSign } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import {TaxasDeCambio} from '../../lib/TaxasDeCambio'
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import SelectComBusca from "../SeletorComBusca";
import { opcoesMoedas } from "@/lib/options";

import { convertCurrency, getCurrencyData, updateCurrencyData } from "@/lib/currencyUtils"

interface TaxasDeCambio {
  [key: string]: number; 
}




export function CalculadoraMoeda() {
    const [currency, setCurrency] = useState('');
    const [de, setDe] = useState('USD');
    const [para, setPara] = useState('USD');
    const [resultado, setResultado] = useState<number|null>(null);
    const [currencyOptions, setCurrencyOptions] = useState(getCurrencyData().currencies)

    useEffect(() => {
      const fetchData = async () => {
        await updateCurrencyData()
        setCurrencyOptions(getCurrencyData().currencies)
      }
      fetchData()
    }, [])

    // data das moedas 12/02/2025
    const converterMoeda = useCallback(async () => {
        const val = Number.parseFloat(currency);
        

        if (isNaN(val) ) {
            console.log('Valor inválido');
            return;
        }
        if(de === para) return setResultado(Number((val).toFixed(2)));
        const chave = `${de}-${para}`;


        try{
          const resultadoConversao = convertCurrency(val, de, para);
          setResultado(Number((resultadoConversao).toFixed(2)));

        }catch(e){          
          const taxaLocal = TaxasDeCambio[chave as keyof typeof TaxasDeCambio];
          console.log("using local")
            if (taxaLocal !== undefined) {
              setResultado(Number((val * taxaLocal).toFixed(2)));
            } else {
                setResultado(null);
            }
        }

    },[de, para, currency, TaxasDeCambio, setResultado])

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
                placeholder="Digite o valor"
              />
            </div>
          </div>
          <div className="flex justify-between items-end">
            <div className="w-2/5">
              <Label htmlFor="de" className="text-primary">
                De
              </Label>
              <SelectComBusca options={currencyOptions||opcoesMoedas} value={de} 
                                      onChange={setDe} placeholder="Selecione a unidade" /> 
            </div>
            <Button onClick={inverterMedida} className="bg-primary  hover:bg-primary/70">
              <ArrowLeftRight className="text-secondary" />
            </Button>
            <div className="w-2/5">
              <Label htmlFor="para" className="text-primary">
                Para
              </Label>
              <SelectComBusca options={currencyOptions||opcoesMoedas} value={para} 
                                      onChange={setPara} placeholder="Selecione a unidade" /> 
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