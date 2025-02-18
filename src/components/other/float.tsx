import { useEffect, useRef } from "react";
import { createRoot } from 'react-dom/client'

interface FloatingWindowProps {
     children: React.ReactNode;
     onClose: () => void;
}

const FloatingWindow: React.FC<FloatingWindowProps> = ({ children, onClose }) => {
     const newWindow = useRef<Window | null>(null);

     useEffect(() => {
          // Abre uma nova janela flutuante
          newWindow.current = window.open(
               "",
               "",
               "width=400,height=300,left=200,top=100,resizable=no,menubar=no,toolbar=no,location=no,status=no,scrollbars=no"
          );

          if (newWindow.current) {
               newWindow.current.document.body.innerHTML = "<div id='root'></div>";
               const rootElement = newWindow.current.document.getElementById("root");

               if (rootElement) {
                    createRoot(rootElement).render(children);
               }

               // Fecha a janela quando o usuário tentar fechá-la manualmente
               newWindow.current.onbeforeunload = () => {
                    onClose();
               };
          }

          // Fecha a janela quando o componente for desmontado
          return () => {
               if (newWindow.current) {
                    newWindow.current.close();
               }
          };
     }, [children, onClose]);

     return null;
};

export default FloatingWindow;
