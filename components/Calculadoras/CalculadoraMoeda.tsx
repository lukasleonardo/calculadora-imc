import { ArrowLeftRight, CircleDollarSign } from "lucide-react";
import { use, useEffect, useRef, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";

export function CalculadoraMoeda() {
    const [currency, setCurrency] = useState('0.00');
    const [de, setDe] = useState('real');
    const [para, setPara] = useState('dolar');
    const [tag, setTag] = useState('BRL');
    const [resultado, setResultado] = useState<number|null>(null);

    const converterMoeda = () => {
        const val = Number.parseFloat(currency);
        if(isNaN(val)) return;
        let res:number
        if(de === 'real' && para === 'dolar'){ 
            res = val * 5.76
        }else if(de === 'dolar' && para === 'real'){ 
            res = val / 5.76
        }else if(de === 'real' && para === 'euro'){ 
            res = val * 6.00
        }else if(de === 'euro' && para === 'real'){ 
            res = val / 6.00
        }else if(de === 'real' && para === 'libra'){ 
            res = val * 7.18
        }else if(de === 'libra' && para === 'real'){ 
            res = val / 7.18
        }else{
            res = val
        }
        setResultado(Number.parseFloat(res.toFixed(2)));
    }
    const inverterMedida = () => {
      const temp = de;
      setDe(para);
      setPara(temp);
     }

    const firstRender = useRef(true);
         

    useEffect(() => {
        switch (tag) {
          case "real":
            setTag("BRL");
            break;
          case "dolar":
            setTag("USD");
            break;
          case "euro":
            setTag("EUR");
            break;
          case "libra":
            setTag("GBP");
            break;
        case "bitcoin":
            setTag("BIT");
            break;
          default:
            setTag("BRL");
        }
      }, [currency, de, para]);

    useEffect(() => {
        if (firstRender.current) {
        firstRender.current = false;
        return;
        }
    converterMoeda();
    }, [para]);
     
      

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
              </select>
            </div>
          </div>
          <Button onClick={converterMoeda} className="w-full bg-primary hover:bg-primary/90">
            Converter
          </Button>
          {resultado !== null && (
            <div className="mt-4 p-4 bg-accent rounded-md border border-primary">
              <p className="text-xl font-semibold text-primary">
                Resultado:{para.charAt(0).toUpperCase()}$:{resultado}
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    )
}