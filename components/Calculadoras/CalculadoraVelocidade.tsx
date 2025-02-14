
import { ArrowLeftRight, Gauge } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Button } from "../ui/button";
import { useCallback, useEffect, useRef, useState } from "react";
import { UnidadesDeVelocidade } from "@/lib/Units";
import SelectComBusca from "../SeletorComBusca";
import { opcoesVelocidade } from "@/lib/options";




export function CalculadoraVelocidade() {
    const [ de, setDe ] = useState('mps');
    const [ para, setPara ] = useState('mps');
    const [velocidade, setVelocidade] = useState('');
    const [resultado, setResultado] = useState<number|null>(null);

    const converterVelocidade = useCallback(() => {
        const val = Number.parseFloat(velocidade);
        if (isNaN(val)) {
            setResultado(null);
            return;}
        if(de === para) return setResultado(Number((val).toFixed(2)));

        const chave = `${de}-${para}` as keyof typeof UnidadesDeVelocidade;
        const taxa = UnidadesDeVelocidade[chave];
        if (taxa !== undefined) {
            setResultado(Number((val * taxa).toFixed(2)));
        } else {
            console.log('Taxa de conversão não encontrada');
            setResultado(null);
        }
    },[de,para,velocidade])


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
        converterVelocidade();
        }, [velocidade,de,para]);
         

    return(
        <Card className="w-full max-w-md border-primary">
      <CardHeader className="bg-primary text-primary-foreground rounded-t-lg">
        <CardTitle className="text-2xl font-bold text-center">Conversor de Velocidades</CardTitle>
      </CardHeader>
      <CardContent className="mt-4 space-y-4">
        <div>
          <Label htmlFor="velocidade" className="text-primary">
            Velocidade
          </Label>
          <div className="relative">
            <Gauge className="absolute left-3 top-1/2 transform -translate-y-1/2 text-primary" /> 
            <Input
              id="velocidade"
              type="number"
              value={velocidade}
              onChange={(e) => setVelocidade(e.target.value)}
              className="pl-10 border-primary"
              placeholder="Digite a velocidade"
            />
          </div>
        </div>
        <div className="flex justify-between items-end">
          <div className="w-2/5">
            <Label htmlFor="de" className="text-primary">
              De
            </Label>
            <SelectComBusca options={opcoesVelocidade} value={de} 
            onChange={setDe} placeholder="Selecione a unidade" />
          </div>
          <Button onClick={inverterMedida} className="bg-primary  hover:bg-primary/70">
            <ArrowLeftRight className="text-secondary" />
          </Button>
          <div className="w-2/5">
            <Label htmlFor="para" className="text-primary">
              Para
            </Label>
            <SelectComBusca options={opcoesVelocidade} value={para} 
            onChange={setPara} placeholder="Selecione a unidade" />
            
          </div>
        </div>
        <Button onClick={converterVelocidade} className="w-full bg-primary hover:bg-primary/90">
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
    </Card>
    )
}