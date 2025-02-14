'use client'
import { useEffect, useState } from "react"
import Image from "next/image"
import CalculadoraIMC from "../components/Calculadoras/CalculadoraIMC"
import { CalculadoraTemperatura } from "@/components/Calculadoras/CalculadoraTemperatura"
import { CalculadoraMedidasDist } from "@/components/Calculadoras/CalculadoraMedidasDist"
import { CalculadoraMoeda } from "@/components/Calculadoras/CalculadoraMoeda"
import { CalculadoraVelocidade } from "@/components/Calculadoras/CalculadoraVelocidade"
import { ImagensShortner } from "@/lib/utils"
import SelectComBusca, { SelectOption } from "@/components/SeletorComBusca"


const calculadoras: SelectOption[] = [
  { value: "imc", label: "Calculadora de IMC" },
  { value: "distance", label: "Conversor de Medidas" },
  { value: "temperatura", label: "Conversor de Temperatura" },
  { value: "currency", label: "Conversor de Moedas" },
  { value: "velocidade", label: "Conversor de Velocidade" },
]
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
      case 'velocidade':
        return <CalculadoraVelocidade/>
      default:
        return <CalculadoraIMC/>
    }
  }


  useEffect(() => {
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
    <SelectComBusca
            options={calculadoras}
            value={calculadora}
            onChange={setCalculadora}
            placeholder="Selecione uma calculadora"
          />
      {renderCalculadora()}
    </div>
  </main>
  );
}
