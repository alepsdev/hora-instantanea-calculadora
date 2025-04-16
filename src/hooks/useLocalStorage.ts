
import { useState, useEffect } from "react";

// Hook personalizado para trabalhar com localStorage
export function useLocalStorage<T>(key: string, initialValue: T): [T, React.Dispatch<React.SetStateAction<T>>] {
  // Função para obter o valor inicial
  const getStoredValue = (): T => {
    try {
      const item = window.localStorage.getItem(key);
      // Se o item existir no localStorage, retorna o valor parseado
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error(`Erro ao recuperar ${key} do localStorage:`, error);
      return initialValue;
    }
  };

  // Inicializar o estado com o valor do localStorage ou o valor inicial
  const [storedValue, setStoredValue] = useState<T>(getStoredValue);

  // Atualizar o localStorage quando o estado mudar
  useEffect(() => {
    try {
      window.localStorage.setItem(key, JSON.stringify(storedValue));
    } catch (error) {
      console.error(`Erro ao salvar ${key} no localStorage:`, error);
    }
  }, [key, storedValue]);

  return [storedValue, setStoredValue];
}
