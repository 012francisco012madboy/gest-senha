import { useEffect } from "react";
import { Title } from "../other/extra";

const Main = () => {
    useEffect(() =>{
        const button = document.querySelector("form button")
        const each_serv = document.querySelectorAll(".services .each_serv")

        each_serv.forEach((Element) =>{
            Element.addEventListener("click", ()=>{
                each_serv.forEach((mood) => mood.classList.remove("active"))
                Element.classList.add("active")
                button?.classList.add("active")
            })
        })
    })
    return (
        <div className="main">
            <Title title="Criar senhas"/>
            <div className="services">
                <div className="each_serv">
                    <p>Depósito</p>
                    <strong>02</strong>
                </div>
                <div className="each_serv">
                    <p>Levantamento</p>
                    <strong>05</strong>
                </div>
                <div className="each_serv">
                    <p>Criação de conta</p>
                    <strong>08</strong>
                </div>
                <div className="each_serv">
                    <p>Bloqueiar conta</p>
                    <strong>11</strong>
                </div>
                <div className="each_serv">
                    <p>Segunda via do cartão</p>
                    <strong>14</strong>
                </div>
            </div>
            <form action="">
                <input type="text" style={{display: "none"}} />
                <button type="submit">Confirmar</button>
            </form>
        </div>
    );
}
 
export default Main;