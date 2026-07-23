import { Title } from "../../components/title";
import { useContext, useState } from "react";
import { AuthContext } from "../../context/auth-context";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { InputGroup, InputGroupAddon, InputGroupInput } from "@/components/ui/input-group";
import { Lock, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { Pattern } from "@/components/pattern";

const SignIn = () => {
    const { login } = useContext(AuthContext)
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const [disabledButton, setDisabledButton] = useState(false);

    function handleLogin(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()

        login(email, password, setDisabledButton)
    }

    return (
        <Pattern>
            <div className="max-w-md w-full p-8 pt-12 flex flex-col gap-8 rounded-xl shadow-xl border border-input z-10 bg-white">
                <Title title="INICIAR SESSÃO" />
                <form className="" onSubmit={(e) => handleLogin(e)}>
                    <FieldGroup>
                        <Field>
                            <FieldLabel>Email</FieldLabel>
                            <InputGroup>
                                <InputGroupInput
                                    required
                                    type="email"
                                    placeholder="Digite o seu email"
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                                <InputGroupAddon>
                                    <Mail />
                                </InputGroupAddon>
                            </InputGroup>
                        </Field>
                        <Field>
                            <FieldLabel>Senha</FieldLabel>
                            <InputGroup>
                                <InputGroupInput
                                    min={8}
                                    required
                                    type="password"
                                    placeholder="********"
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                                <InputGroupAddon>
                                    <Lock />
                                </InputGroupAddon>
                            </InputGroup>
                        </Field>
                        <Field orientation="horizontal">
                            <Button disabled={disabledButton} type="submit" className="w-full" variant="primary">
                                {disabledButton ? <Spinner /> : "Entrar"}
                            </Button>
                        </Field>
                    </FieldGroup>
                </form>
            </div>
        </Pattern>
    );
}

export default SignIn;