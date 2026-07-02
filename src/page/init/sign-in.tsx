import { Load, Title } from "../../shared/other/extra";
import { Fragment, useContext, useState } from "react";
import { AuthContext } from "../../context/auth-context";
import { Alert } from "../../shared/other/alert";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { InputGroup, InputGroupAddon, InputGroupInput } from "@/components/ui/input-group";
import { Lock, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";

const SignIn = () => {
    const { login, textAlert, typeAlert } = useContext(AuthContext)
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const [btnDisabled, setBtnDisabled] = useState(false)

    function handleLogin(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()

        login(email, password, setBtnDisabled)
    }

    return (
        <div className="min-h-dvh w-full flex items-center justify-center p-4 bg-[#f9fafb] relative">
            <div className="absolute inset-0 z-0"
                style={{
                    backgroundImage: `linear-gradient(to right, #e7e5e4 1px, transparent 1px), linear-gradient(to bottom, #e7e5e4 1px, transparent 1px)`,
                    backgroundSize: "20px 20px",
                    backgroundPosition: "0 0, 0 0",
                    maskImage: `repeating-linear-gradient(to right, black 0px, black 3px, transparent 3px, transparent 8px),
                    repeating-linear-gradient( to bottom, black 0px, black 3px, transparent 3px, transparent 8px),
                    radial-gradient(ellipse 80% 80% at 100% 100%, #000 50%, transparent 90%)`,
                    WebkitMaskImage: `repeating-linear-gradient(to right, black 0px, black 3px, transparent 3px, transparent 8px),
                    repeating-linear-gradient(to bottom, black 0px, black 3px, transparent 3px, transparent 8px),
                    radial-gradient(ellipse 80% 80% at 100% 100%, #000 50%, transparent 90%)`,
                    maskComposite: "intersect",
                    WebkitMaskComposite: "source-in",
                }}
            />
            <Fragment>
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
                                <Button disabled={btnDisabled} type="submit" className="w-full" variant="primary">
                                    {btnDisabled == false ? "Entrar" : <Load />}
                                </Button>
                            </Field>
                        </FieldGroup>
                    </form>
                </div>
                {
                    textAlert &&
                    <Alert text={textAlert} type={typeAlert} />
                }
            </Fragment>
        </div>
    );
}

export default SignIn;