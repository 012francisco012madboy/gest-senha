import { useContext, useEffect, useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";
import { Button } from "../ui/button";
import { Field, FieldGroup, FieldLabel } from "../ui/field";
import { InputGroup, InputGroupInput } from "../ui/input-group";
import { GlobalContext } from "@/context/global-context";
import { useAlert } from "@/provider/alert";
import authApi from "@/server/api";
import axios from "axios";
import { IUser } from "@/interface/IUser";
import { Spinner } from "../ui/spinner";

interface modalProps {
  employee: Omit<IUser, 'role'> | undefined
  open: boolean;
  setOpen: (data: boolean) => void;
}

const EditEmployeeModal = ({ employee, open, setOpen }: modalProps) => {
  const { getListUser } = useContext(GlobalContext)

  const { FailedAlert, SuccessAlert } = useAlert();

  const [disabledButton, setDisabledButton] = useState(false);

  const [name, setName] = useState("")
  const [email, setEmail] = useState("")

  useEffect(() => {
    if (employee) {
      setName(employee.name);
      setEmail(employee.email);
    }
  }, [employee]);

  async function EditEmployee(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()

    if (name == "" || email == "") {
      return FailedAlert("Preencha todos campos")
    }

    setDisabledButton(true)

    if (employee) {
      const id = employee.id
      
      try {
        const response = await authApi.patch("user", {
          id,
          name,
          email
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
  }

  function cleanInput() {
    setName("")
    setEmail("")
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Editar funcionário</DialogTitle>
        </DialogHeader>
        <form onSubmit={(e) => EditEmployee(e)}>
          <FieldGroup>
            <Field>
              <FieldLabel>Nome</FieldLabel>
              <InputGroup>
                <InputGroupInput
                  required
                  type="text"
                  value={name}
                  placeholder="Digite o nome"
                  onChange={(e) => setName(e.target.value)}
                />
              </InputGroup>
            </Field>
            <Field>
              <FieldLabel>Email</FieldLabel>
              <InputGroup>
                <InputGroupInput
                  value={email}
                  required
                  type="email"
                  placeholder="Digite o email"
                  onChange={(e) => setEmail(e.target.value)}
                />
              </InputGroup>
            </Field>
            <Field orientation="horizontal">
              <Button
                disabled={disabledButton}
                type="submit"
                className="w-full"
                variant="primary"
              >
                {disabledButton ? <Spinner /> : "Atualizar"}
              </Button>
            </Field>
          </FieldGroup>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default EditEmployeeModal;
