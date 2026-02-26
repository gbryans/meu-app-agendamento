'use client'

import { useState } from 'react'
import { supabase } from '@/lib/supabase'
import { PlusCircle, Loader2 } from 'lucide-react'

export default function CadastroServicos() {
  const [loading, setLoading] = useState(false)
  const [mensagem, setMensagem] = useState('')

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setLoading(true)
    setMensagem('')

    const formData = new FormData(event.currentTarget)
    const dados = {
      name: formData.get('name'),
      description: formData.get('description'),
      duration_minutes: Number(formData.get('duration')),
      price: Number(formData.get('price')),
      // Nota: No futuro, o professional_id virá do login
    }

    const { error } = await supabase.from('services').insert([dados])

    if (error) {
      setMensagem('Erro ao guardar: ' + error.message)
    } else {
      setMensagem('Serviço criado com sucesso!')
      event.currentTarget.reset() // Limpa o formulário
    }
    setLoading(false)
  }

  return (
    <div className="max-w-2xl mx-auto mt-10 p-6 bg-white rounded-xl shadow-md border">
      <h1 className="text-2xl font-bold mb-6 flex items-center gap-2">
        <PlusCircle className="text-blue-600" />
        Cadastrar Novo Serviço
      </h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Nome do Serviço</label>
          <input 
            name="name" 
            required 
            placeholder="Ex: Corte de Cabelo Masculino" 
            className="w-full p-2 border rounded-md mt-1 focus:ring-2 focus:ring-blue-500 outline-none"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Descrição (Opcional)</label>
          <textarea 
            name="description" 
            placeholder="Descreve o que inclui o serviço" 
            className="w-full p-2 border rounded-md mt-1 h-24"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Duração (minutos)</label>
            <input 
              name="duration" 
              type="number" 
              required 
              placeholder="30" 
              className="w-full p-2 border rounded-md mt-1"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Preço (R$)</label>
            <input 
              name="price" 
              type="number" 
              step="0.01" 
              required 
              placeholder="50.00" 
              className="w-full p-2 border rounded-md mt-1"
            />
          </div>
        </div>

        <button 
          type="submit" 
          disabled={loading}
          className="w-full bg-blue-600 text-white py-2 rounded-md font-semibold hover:bg-blue-700 transition disabled:bg-gray-400 flex justify-center items-center gap-2"
        >
          {loading ? <Loader2 className="animate-spin" /> : 'Guardar Serviço'}
        </button>

        {mensagem && (
          <p className={`text-center mt-4 p-2 rounded ${mensagem.includes('Erro') ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'}`}>
            {mensagem}
          </p>
        )}
      </form>
    </div>
  )
}