'use client'
import { useEffect, useState } from "react"
import Image from "next/image"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import CalculadoraIMC from "../components/Calculadoras/CalculadoraIMC"
import { CalculadoraTemperatura } from "@/components/Calculadoras/CalculadoraTemperatura"
import{CalculadoraMedidas} from "@/components/Calculadoras/CalculadoraMedidas"


export default function Home() {
  const [calculadora, setCalculadora] = useState('imc');
  const [image, setImage] = useState('./workout.svg');

  const renderCalculadora = () => {
    switch(calculadora) {
      case 'imc':
        return <CalculadoraIMC/>
      case 'temperatura':
        return <CalculadoraTemperatura/>
      case 'medidas':
        return <CalculadoraMedidas/>
      default:
        return <CalculadoraIMC/>
    }
  }


  useEffect(() => {
    switch (calculadora) {
      case "imc":
        setImage("./workout.svg");
        break;
      case "temperatura":
        setImage("./temp.svg");
        break;
      case "medidas":
        setImage("./speed.svg");
        break;
      default:
        setImage("./workout.svg");
    }
  }, [calculadora]);

  return (
    <main className="flex flex-col lg:flex-row items-center justify-center min-h-screen gap-8 p-4 bg-secondary">
    <Image
      src={image}
      alt="Imagem ilustrativa"
      width={400}
      height={400}
      className="rounded-lg"
    />
    <div className="w-full max-w-md space-y-4">
      <Select onValueChange={setCalculadora} defaultValue="imc">
        <SelectTrigger className="w-full border-primary">
          <SelectValue placeholder="Selecione uma calculadora" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="imc">Calculadora de IMC</SelectItem>
          <SelectItem value="medidas">Conversor de Medidas</SelectItem>
          <SelectItem value="temperatura">Conversor de Temperatura</SelectItem>
        </SelectContent>
      </Select>
      {renderCalculadora()}
    </div>
  </main>
  );
}
