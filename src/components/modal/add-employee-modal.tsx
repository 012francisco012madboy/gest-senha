import { useContext, useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";
import { Button } from "../ui/button";
import { Field, FieldGroup, FieldLabel } from "../ui/field";
import { InputGroup, InputGroupInput } from "../ui/input-group";
import { GlobalContext } from "@/context/global-context";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { useAlert } from "@/provider/alert";
import { Api } from "@/server/api";
import axios from "axios";
import { AuthContext } from "@/context/auth-context";
import { Spinner } from "../ui/spinner";

interface modalProps {
  open: boolean;
  setOpen: (data: boolean) => void;
}

const AddEmployeeModal = ({ open, setOpen }: modalProps) => {
  const { actCompany } = useContext(AuthContext)
  const { getListUser } = useContext(GlobalContext)

  const { FailedAlert, SuccessAlert } = useAlert();

  const [disabledButton, setDisabledButton] = useState(false);

  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [idType, setIdType] = useState("")
  const id_company = actCompany

  async function addEmployee(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()

    if (name == "" && email == "" && idType == "") {
      return FailedAlert("Preencha todos campos")
    }

    setDisabledButton(true)

    try {
      const response = await Api.post("user-add", {
        name,
        email,
        idType,
        id_company
      })

      SuccessAlert(response?.data.message)

      cleanInput()

      setOpen(false)

      actCompany && getListUser(actCompany)
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
    setIdType("-1")
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Adicionar funcionário</DialogTitle>
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
            <Select
              value={idType}
              onValueChange={setIdType}
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
                    <SelectItem value="2">Funcionário</SelectItem>
                    <SelectItem value="1">Administrador</SelectItem>
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
