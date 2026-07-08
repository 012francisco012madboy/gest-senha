import { useContext, useEffect, useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";
import { Button } from "../ui/button";
import { Field, FieldGroup, FieldLabel } from "../ui/field";
import { InputGroup, InputGroupInput } from "../ui/input-group";
import { GlobalContext } from "@/context/global-context";
import { useAlert } from "@/provider/alert";
import { Api } from "@/server/api";
import axios from "axios";
import { AuthContext } from "@/context/auth-context";
import { Spinner } from "../ui/spinner";
import { IDefault } from "@/interface/IDefault";

interface modalProps {
  service: IDefault | undefined
  open: boolean;
  setOpen: (data: boolean) => void;
}

const EditServiceModal = ({ service, open, setOpen }: modalProps) => {
  const { actCompany } = useContext(AuthContext)
  const { getListService } = useContext(GlobalContext)

  const { FailedAlert, SuccessAlert } = useAlert();

  const [disabledButton, setDisabledButton] = useState(false);

  const [name, setName] = useState("")

  useEffect(() => {
    if (service) {
      setName(service.name)
    }
  }, [service])

  async function addService(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()

    if (name == "") {
      return FailedAlert("Preencha todos campos")
    }

    setDisabledButton(true)

    if (service) {
      try {
        const response = await Api.put(`service-update/${service.id}`, {
          name
        })

        SuccessAlert(response?.data.message)

        cleanInput()

        setOpen(false)

        actCompany && getListService(actCompany)
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
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Adicionar serviço</DialogTitle>
        </DialogHeader>
        <form onSubmit={(e) => addService(e)}>
          <FieldGroup>
            <Field>
              <FieldLabel>Serviço</FieldLabel>
              <InputGroup>
                <InputGroupInput
                  value={name}
                  required
                  type="text"
                  placeholder="Digite o nome do serviço"
                  onChange={(e) => setName(e.target.value)}
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

export default EditServiceModal;
