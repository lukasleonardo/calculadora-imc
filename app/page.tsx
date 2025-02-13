'use client'
import { useEffect, useState } from "react"
import Image from "next/image"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import CalculadoraIMC from "../components/Calculadoras/CalculadoraIMC"
import { CalculadoraTemperatura } from "@/components/Calculadoras/CalculadoraTemperatura"
import { CalculadoraMedidasDist } from "@/components/Calculadoras/CalculadoraMedidasDist"
import { CalculadoraMoeda } from "@/components/Calculadoras/CalculadoraMoeda"
import { ImagensShortner } from "@/lib/Abrev"

export default function Home() {
  const [calculadora, setCalculadora] = useState('imc');
  const [image, setImage] = useState('./workout.svg');

  const renderCalculadora = () => {
    switch(calculadora) {
      case 'imc':
        return <CalculadoraIMC/>
      case 'temperatura':
        return <CalculadoraTemperatura/>
      case 'distance':
        return <CalculadoraMedidasDist/>
      case 'currency':
        return <CalculadoraMoeda/>
      default:
        return <CalculadoraIMC/>
    }
  }


  useEffect(() => {
    // switch (calculadora) {
    //   case "imc":
    //     setImage("./workout.svg");
    //     break;
    //   case "temperatura":
    //     setImage("./temp.svg");
    //     break;
    //   case "distance":
    //     setImage("./distance.svg");
    //     break;
    //   case "currency":
    //     setImage("./money.svg");
    //     break;
    //   default:
    //     setImage("./workout.svg");
    // }

    const template = ImagensShortner[calculadora]
    setImage(template)

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
          <SelectItem value="distance">Conversor de Medidas</SelectItem>
          <SelectItem value="temperatura">Conversor de Temperatura</SelectItem>
          <SelectItem value="currency">Conversor de Moeda</SelectItem>
        </SelectContent>
      </Select>
      {renderCalculadora()}
    </div>
  </main>
  );
}
