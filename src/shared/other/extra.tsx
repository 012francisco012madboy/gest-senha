import { useContext } from "react";
import { AuthContext } from "../../context/auth-context";

interface titleProps{
     title: string
}

export const Title = ({title}: titleProps) => {
     return ( 
          <div className="w-full text-center">
               <strong className="text-xl uppercase text-brand-secondary">{title}</strong>
          </div>
     );
}

export const SubTitle = ({title}: titleProps) => {
     return ( 
          <div className="w-full">
               <strong className="text-lg uppercase text-brand-secondary">{title}</strong>
          </div>
     );
}

interface buttonProps{
     modal: string
}

export const Button = ({ modal } : buttonProps) => {
    const { setShowModal } = useContext(AuthContext)
    
    return ( 
          <div className="button-container">
               <button
                    type="button"
                    onClick={
                         () => setShowModal(modal)
                    }
               >
                    Adicionar
               </button>
          </div>
    );
}