'use client'
import { Label } from "@/components/ui/label"
import { Button } from "../ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card"
import { ArrowLeftRight } from "lucide-react"
import { Input } from "../ui/input"
import { useEffect, useRef, useState } from "react"

export function CalculadoraMedidasDist(){

    const [valor, setValor] = useState('');
    const [de, setDe] = useState('metros');
    const [para, setPara] = useState('pés');
    const [resultado, setResultado] = useState<number|null>(null);

    const converterMedida = () => {
        const val = Number.parseFloat(valor);
        if(isNaN(val)) return;
        let res:number
        if(de === 'metros' && para === 'pés'){
            res = val * 3.281
        }else if(de === 'pés' && para === 'metros'){
            res = val / 3.281
        }else if(de === 'metros' && para === 'jardas'){
            res = val * 1.094
        }else if(de === 'jardas' && para === 'metros'){
            res = val / 1.094
        }else if(de === 'pés' && para === 'jardas'){
            res = val / 3
        }else if(de === 'jardas' && para === 'pés'){
            res = val * 3
        }else if(de === 'metros' && para === 'milhas'){
            res = val / 1609
        }else if(de === 'milhas' && para === 'metros'){
            res = val * 1609
        }else if(de === 'pés' && para === 'milhas'){
            res = val / 5280
        }else if(de === 'milhas' && para === 'pés'){
            res = val * 5280
        }else if(de === 'jardas' && para === 'milhas'){
            res = val / 1760
        }else if(de === 'milhas' && para === 'jardas'){
            res = val * 1760
        }else if(de=== 'metro' && para === 'km'){
          res = val / 1000
        }else if(de === 'km' && para === 'metros'){
          res = val * 1000
        }else if(de === 'milhas' && para === 'km'){
          res = val * 1.609
        }else if(de === 'km' && para === 'milhas'){
          res = val / 1.609
        }else{
          res = val
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
        converterMedida();
      }, [de, para, valor])

    return(<Card className="w-full max-w-md border-primary">
        <CardHeader className="bg-primary text-primary-foreground rounded-t-lg">
          <CardTitle className="text-2xl font-bold text-center">Conversor de Medidas</CardTitle>
        </CardHeader>
        <CardContent className="mt-4 space-y-4">
          <div >
            <Label htmlFor="valor" className="text-primary">
              Valor
            </Label>
            <Input
              id="valor"
              type="number"
              value={valor}
              onChange={(e) => setValor(e.target.value)}
              className="border-primary"
              placeholder="Digite o valor"
            />
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
                <option value="metros">Metros</option>
                <option value="pés">Pés</option>
                <option value="jardas">Jardas</option>
                <option value="milhas">Milhas</option>
                <option value="km">Kilometros</option>
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
                <option value="metros">Metros</option>
                <option value="pés">Pés</option>
                <option value="jardas">Jardas</option>
                <option value="milhas">Milhas</option>
                <option value="km">Kilometros</option>
              </select>
            </div>
          </div>
          <Button onClick={converterMedida} className="w-full bg-primary hover:bg-primary/90">
            Converter
          </Button>
          {resultado !== null && (
            <div className="mt-4 p-4 bg-accent rounded-md border border-primary">
              <p className="text-xl font-semibold text-primary">
                Resultado: {resultado} {para}
              </p>
            </div>
          )}
        </CardContent>
      </Card>)
}