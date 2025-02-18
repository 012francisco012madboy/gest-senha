import { useState } from "react";
import FloatingWindow from "./float";

const App: React.FC = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <div>
      <button onClick={() => setIsOpen(true)}>Abrir Janela Flutuante</button>
      {isOpen && (
        <FloatingWindow onClose={() => setIsOpen(false)}>
          <h2>Janela Flutuante</h2>
          <p>Este é um conteúdo renderizado fora da aba do navegador.</p>
        </FloatingWindow>
      )}
    </div>
  );
};

export default App;
