'use client'

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@radix-ui/react-label";
import { useState } from "react";
import { Ruler, Weight } from "lucide-react";

export default function CalculadoraIMC() {
  const[altura, setAltura] = useState('');
  const [peso, setPeso] = useState('');
  const [imc, setImc] = useState<number|null>(null);

  const calcularIMC = () => {
    const alturaEmMetros = Number.parseFloat(altura)
    const pesoEmKg = Number.parseFloat(peso);

    if(isNaN(alturaEmMetros) || isNaN(pesoEmKg) || alturaEmMetros <= 0 || pesoEmKg <= 0){
      alert("Preencha todos os campos corretamente");
      return;
    }
    const imc = pesoEmKg / (alturaEmMetros * alturaEmMetros);
    setImc(Number.parseFloat(imc.toFixed(2)));
  }

  const obterCategoriaIMC = (imc: number) => {
   
    if(imc < 18.5){
      return 'Abaixo do peso';
    }
    if(imc < 25){
      return 'Peso normal';
    }
    if(imc < 30){
      return 'Sobrepeso';
    }
    if(imc < 35){
      return 'Obesidade I';
    }
    if(imc < 40){
      return 'Obesidade II';
    }
    return 'Obesidade III';
  }



  return (
      <Card className="w-full max-w-md border-primary ">
        <CardHeader className="bg-primary text-primary-foreground rounded-t-lg">
          <CardTitle className="text-2xl font-bold text-center">Calculadora de IMC</CardTitle>
        </CardHeader>
        <CardContent className="mt-4">
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="altura" className="text-primary">
                Altura (m)
              </Label>
              <div className="relative">
                <Ruler className="absolute left-3 top-1/2 transform -translate-y-1/2 text-primary" />
                <Input
                  id="altura"
                  type="number"
                  step="0.01"
                  placeholder="Ex: 1.75"
                  value={altura}
                  onChange={(e) => setAltura(e.target.value)}
                  className="pl-10 text-lg border-primary"
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="peso" className="text-primary">
                Peso (kg)
              </Label>
              <div className="relative">
                <Weight className="absolute left-3 top-1/2 transform -translate-y-1/2 text-primary" />
                <Input
                  id="peso"
                  type="number"
                  step="0.1"
                  placeholder="Ex: 70.5"
                  value={peso}
                  onChange={(e) => setPeso(e.target.value)}
                  className="pl-10 text-lg border-primary"
                />
              </div>
            </div>
            <Button onClick={calcularIMC} className="w-full text-lg py-6 bg-primary hover:bg-primary/90">
              Calcular IMC
            </Button>
            {imc !== null && (
              <div className="mt-6 p-4 bg-accent rounded-md border border-primary">
                <p className="text-xl font-semibold mb-2 text-primary">Seu IMC: {imc}</p>
                <p className="text-lg mb-2 text-primary">Categoria: {obterCategoriaIMC(imc)}</p>
                <ul className="text-sm space-y-1 mt-4 text-primary">
                  <li>Abaixo do peso: menos de 18.5</li>
                  <li>Peso normal: 18.5 a 24.9</li>
                  <li>Sobrepeso: 25 a 29.9</li>
                  <li>Obesidade grau I: 30 a 34.9</li>
                  <li>Obesidade grau II: 35 a 39.9</li>
                  <li>Obesidade grau III: 40 ou mais</li>
                </ul>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
  );
}
