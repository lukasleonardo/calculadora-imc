'use client'

import { Label } from "@radix-ui/react-select"
import { Button } from "../ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card"
import { ArrowLeftRight } from "lucide-react"
import { Input } from "../ui/input"
import { useState } from "react"

export function CalculadoraMedidas(){

    const [valor, setValor] = useState('0');
    const [de, setDe] = useState('metros');
    const [para, setPara] = useState('pés');
    const [resultado, setResultado] = useState<number|null>(null);

    const converterMedida = () => {}



    return(<Card className="w-full max-w-md border-primary">
        <CardHeader className="bg-primary text-primary-foreground rounded-t-lg">
          <CardTitle className="text-2xl font-bold text-center">Conversor de Medidas</CardTitle>
        </CardHeader>
        <CardContent className="mt-4 space-y-4">
          <div>
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
          <div className="flex justify-between items-center">
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
              </select>
            </div>
            <ArrowLeftRight className="text-primary" />
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
                <option value="pés">Pés</option>
                <option value="metros">Metros</option>
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