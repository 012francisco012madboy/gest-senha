import { useContext, useEffect, useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";
import { Button } from "../ui/button";
import { Field, FieldGroup, FieldLabel } from "../ui/field";
import { InputGroup, InputGroupInput } from "../ui/input-group";
import { GlobalContext } from "@/context/global-context";
import { useAlert } from "@/provider/alert";
import authApi from "@/server/api";
import axios from "axios";
import { Spinner } from "../ui/spinner";
import { ICounter } from "@/interface/ICounter";

interface modalProps {
  counter: ICounter | undefined
  open: boolean;
  setOpen: (data: boolean) => void;
}

const EditCounterModal = ({ counter, open, setOpen }: modalProps) => {
  const { getListCounter } = useContext(GlobalContext)

  const { FailedAlert, SuccessAlert } = useAlert();

  const [disabledButton, setDisabledButton] = useState(false);

  const [reference, setReference] = useState("")

  useEffect(() => {
    if (counter) {
      setReference(counter.reference)
    }
  }, [counter])

  async function addService(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()

    if (reference == "") {
      return FailedAlert("Preencha a referência do balcão")
    }

    setDisabledButton(true)

    if (counter) {
      const id = counter.id

      try {
        const response = await authApi.patch("counter", {
          id,
          reference
        })

        SuccessAlert(response?.data.message)

        cleanInput()

        setOpen(false)

        getListCounter()
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
    setReference("")
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Editar balcão</DialogTitle>
        </DialogHeader>
        <form onSubmit={(e) => addService(e)}>
          <FieldGroup>
            <Field>
              <FieldLabel>Referência (A-Z ou 1-9)</FieldLabel>
              <InputGroup>
                <InputGroupInput
                  value={reference}
                  required
                  type="text"
                  placeholder="Digite a refrência do balcão"
                  onChange={(e) => setReference(e.target.value)}
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

export default EditCounterModal;
