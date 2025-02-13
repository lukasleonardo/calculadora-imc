'use client'
import { Label } from "@/components/ui/label"
import { Button } from "../ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card"
import { ArrowLeftRight, Ruler } from "lucide-react"
import { Input } from "../ui/input"
import { useCallback, useEffect, useRef, useState } from "react"
import {UnidadesDeDistancia} from '../../lib/Units'
import { opcoesComprimento } from "@/lib/options"
import SelectComBusca from "../SeletorComBusca"

export function CalculadoraMedidasDist(){

    const [valor, setValor] = useState('');
    const [de, setDe] = useState('metro');
    const [para, setPara] = useState('pe');
    const [resultado, setResultado] = useState<number|null>(null);

    const converterMedida = useCallback(() => {
            const val = Number.parseFloat(valor);
            if (isNaN(val)) {
                setResultado(null);
                return;
            }
            if(de === para) return setResultado(Number((val).toFixed(2)));
    
            const chave = `${de}-${para}` as keyof typeof UnidadesDeDistancia;
            const taxa = UnidadesDeDistancia[chave];  


            if (taxa !== undefined) {
                setResultado(Number((val * taxa).toFixed(2)));
            } else {
                setResultado(null);
            }
        },[de, para, valor])
        

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
            <div className="relative">
              <Ruler className="absolute left-3 top-1/2 transform -translate-y-1/2 text-primary"/>
              <Input
                id="valor"
                type="number"
                value={valor}
                onChange={(e) => setValor(e.target.value)}
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
              <SelectComBusca options={opcoesComprimento} value={de} 
                                    onChange={setDe} placeholder="Selecione a unidade" />
            </div>
          <Button onClick={inverterMedida} className="bg-primary  hover:bg-primary/70">
            <ArrowLeftRight className="text-secondary" />
          </Button>
            <div className="w-2/5">
              <Label htmlFor="para" className="text-primary">
                Para
              </Label>
              <SelectComBusca options={opcoesComprimento} value={para} 
                                    onChange={setPara} placeholder="Selecione a unidade" />
            </div>
          </div>
          <Button onClick={converterMedida} className="w-full bg-primary hover:bg-primary/90">
            Converter
          </Button>
          {resultado !== null && (
            <div className="mt-4 p-4 bg-accent rounded-md border border-primary">
            <p className="text-xl font-semibold text-primary"> 
              Resultado: {resultado >= 1 ? resultado.toFixed(2) : resultado.toPrecision(3)} {para}
            </p>
          </div>
          )}
        </CardContent>
      </Card>)
}