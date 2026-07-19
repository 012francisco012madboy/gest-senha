import { useContext, useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";
import { Button } from "../ui/button";
import { Field, FieldGroup, FieldLabel } from "../ui/field";
import { InputGroup, InputGroupInput } from "../ui/input-group";
import { GlobalContext } from "@/context/global-context";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { useAlert } from "@/provider/alert";
import authApi from "@/server/api";
import axios from "axios";
import { Spinner } from "../ui/spinner";

interface modalProps {
  open: boolean;
  setOpen: (data: boolean) => void;
}

const AddEmployeeModal = ({ open, setOpen }: modalProps) => {
  const { getListUser } = useContext(GlobalContext)

  const { FailedAlert, SuccessAlert } = useAlert();

  const [disabledButton, setDisabledButton] = useState(false);

  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [passwordConfirm, setPasswordConfirm] = useState("")
  const [idRole, setIdRole] = useState("")

  async function addEmployee(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()

    if (name == "" || email == "" || password == "" || passwordConfirm == "") {
      return FailedAlert("Preencha todos campos")
    }

    if (password != passwordConfirm) {
      return FailedAlert("As senhas não coincidem")
    }

    if (idRole != "2" && idRole != "3") {
      return FailedAlert("Selecione a permissão")
    }

    setDisabledButton(true)

    try {
      const response = await authApi.post("user", {
        name,
        email,
        idRole,
        password,
        passwordConfirm
      })

      SuccessAlert(response?.data.message)

      cleanInput()

      setOpen(false)

      getListUser()
    }
    catch (e) {
      if (axios.isAxiosError(e)) {
        FailedAlert(e?.response?.data.message || "Erro inesperado")
      }
      else {
        FailedAlert("Erro inesperado")
      }
    }
    finally {
      setDisabledButton(false)
    }
  }

  function cleanInput() {
    setName("")
    setEmail("")
    setIdRole("")
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Adicionar usuário</DialogTitle>
        </DialogHeader>
        <form onSubmit={(e) => addEmployee(e)}>
          <FieldGroup>
            <Field>
              <FieldLabel>Nome</FieldLabel>
              <InputGroup>
                <InputGroupInput
                  required
                  type="text"
                  placeholder="Digite o nome"
                  onChange={(e) => setName(e.target.value)}
                />
              </InputGroup>
            </Field>
            <Field>
              <FieldLabel>Email</FieldLabel>
              <InputGroup>
                <InputGroupInput
                  required
                  type="email"
                  placeholder="Digite o email"
                  onChange={(e) => setEmail(e.target.value)}
                />
              </InputGroup>
            </Field>
            <Field>
              <FieldLabel>Password</FieldLabel>
              <InputGroup>
                <InputGroupInput
                  required
                  type="password"
                  placeholder="Digite a senha"
                  onChange={(e) => setPassword(e.target.value)}
                />
              </InputGroup>
            </Field>
            <Field>
              <FieldLabel>Confirmar password</FieldLabel>
              <InputGroup>
                <InputGroupInput
                  required
                  type="password"
                  placeholder="Confirme a senha"
                  onChange={(e) => setPasswordConfirm(e.target.value)}
                />
              </InputGroup>
            </Field>
            <Select
              value={idRole}
              onValueChange={setIdRole}
            >
              <Field>
                <FieldLabel>Permissão</FieldLabel>
                <SelectTrigger>
                  <div className="flex items-center gap-2">
                    <SelectValue placeholder="Selecione a permissão" />
                  </div>
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value="3">Atendente</SelectItem>
                    <SelectItem value="2">Administrador</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Field>
            </Select>
            <Field orientation="horizontal">
              <Button
                disabled={disabledButton}
                type="submit"
                className="w-full"
                variant="primary"
              >
                {disabledButton ? <Spinner /> : "Adicioanr"}
              </Button>
            </Field>
          </FieldGroup>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddEmployeeModal;
