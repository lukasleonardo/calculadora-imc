'use client'
import { Label } from "@radix-ui/react-label";
import { Button } from "../ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { ArrowLeftRight, Thermometer } from "lucide-react";
import { Input } from "../ui/input";
import { use, useEffect, useRef, useState } from "react";

export function CalculadoraTemperatura() {
    const [ temperatura, setTemperatura ] = useState('');
    const [ de, setDe ] = useState('celsius');
    const [ para, setPara ] = useState('fahrenheit');
    const [ resultado, setResultado ] = useState<number|null>(null);


    const converterTemperatura = () => {
        const temp = Number.parseFloat(temperatura);
        if(isNaN(temp)) return;

        let res:number

        if(de === 'celsius' && para === 'fahrenheit'){
            res = (temp * (9/5))+32
        } else if(de === 'fahrenheit' && para === 'celsius'){
            res = (temp - 32) * (5/9)
        }else if(de === 'celsius' && para === 'kelvin'){
            res = temp + 273.15
        }else if(de === 'kelvin' && para === 'celsius'){
            res = temp - 273.15
        }else if(de === 'fahrenheit' && para === 'kelvin'){
            res = (temp - 32) * (5/9) + 273.15
        }else if(de === 'kelvin' && para === 'fahrenheit'){
            res = (temp - 273.15) * (9/5) + 32
        }else{
            res = temp
        }
        setResultado(Number.parseFloat(res.toFixed(2)));  
    }  

    const inverterMedida = () =>{
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
            converterTemperatura();
          }, [temperatura, de, para]);


    return (
        <Card className="w-full max-w-md border-primary">
      <CardHeader className="bg-primary text-primary-foreground rounded-t-lg">
        <CardTitle className="text-2xl font-bold text-center">Conversor de Temperatura</CardTitle>
      </CardHeader>
      <CardContent className="mt-4 space-y-4">
        <div>
          <Label htmlFor="temperatura" className="text-primary">
            Temperatura
          </Label>
          <div className="relative">
            <Thermometer className="absolute left-3 top-1/2 transform -translate-y-1/2 text-primary" />
            <Input
              id="temperatura"
              type="number"
              value={temperatura}
              onChange={(e) => setTemperatura(e.target.value)}
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
              <option value="celsius">Celsius</option>
              <option value="fahrenheit">Fahrenheit</option>
              <option value="kelvin">Kelvin</option>
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
              <option value="fahrenheit">Fahrenheit</option>
              <option value="celsius">Celsius</option>
              <option value="kelvin">Kelvin</option>
            </select>
          </div>
        </div>
        <Button onClick={converterTemperatura} className="w-full bg-primary hover:bg-primary/90">
          Converter
        </Button>
        {resultado !== null && (
          <div className="mt-4 p-4 bg-accent rounded-md border border-primary">
            <p className="text-xl font-semibold text-primary">
              Resultado: {resultado}°{para.charAt(0).toUpperCase()}
            </p>
          </div>
        )}
      </CardContent>
    </Card>
    )
}