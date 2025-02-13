import { ArrowLeftRight, CircleDollarSign } from "lucide-react";
import { use, useCallback, useEffect, useRef, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import {TaxasDeCambio} from '../../lib/TaxasDeCambio'
import {Abrev} from '../../lib/Abrev'
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";

export function CalculadoraMoeda() {
    const [currency, setCurrency] = useState('0.00');
    const [de, setDe] = useState('real');
    const [para, setPara] = useState('dolar');
    const [tag, setTag] = useState(Abrev[para]);
    const [resultado, setResultado] = useState<number|null>(null);

    // data das moedas 12/02/2025
    const converterMoeda = useCallback(() => {
        const val = Number.parseFloat(currency);
        if (isNaN(val) || val <= 0) {
            setResultado(null);
            return;
        }
        if(de === para) return setResultado(Number((val).toFixed(2)));

        const chave = `${de}-${para}` as keyof typeof TaxasDeCambio;
        const taxa = TaxasDeCambio[chave]; 
        
        if (taxa !== undefined) {
            setResultado(Number((val * taxa).toFixed(2)));
        } else {
            setResultado(null);  
        }
    },[])

    const inverterMedida = () => {
      const temp = de;
      setDe(para);
      setPara(temp);
     }

    const firstRender = useRef(true);
         

    useEffect(() => {
        setTag(Abrev[para]);
      }, [currency, de, para]);

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
                <option value="real">Real</option>
                <option value="dolar">Dolar</option>
                <option value="euro">Euro</option>
                <option value="libra">Libra</option>
                <option value="bitcoin">Bitcoin</option>
                <option value="won">Won</option>
                <option value="iene">Iene</option>
                <option value="yuan">Yuan</option>
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
                <option value="real">Real</option>
                <option value="dolar">Dolar</option>
                <option value="euro">Euro</option>
                <option value="libra">Libra</option>
                <option value="bitcoin">Bitcoin</option>
                <option value="won">Won</option>
                <option value="iene">Iene</option>
                <option value="yuan">Yuan</option>
              </select>
            </div>
          </div>
          <Button onClick={converterMoeda} className="w-full bg-primary hover:bg-primary/90">
            Converter
          </Button>
          {resultado !== null && (
            <div className="mt-4 p-4 bg-accent rounded-md border border-primary">
              <p className="text-xl font-semibold text-primary">
                Resultado:{resultado} {tag}
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    )
}