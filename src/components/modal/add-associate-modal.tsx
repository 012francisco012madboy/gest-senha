import { useContext, useEffect, useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";
import { Button } from "../ui/button";
import { Field, FieldGroup, FieldLabel } from "../ui/field";
import { GlobalContext } from "@/context/global-context";
import { useAlert } from "@/provider/alert";
import authApi from "@/server/api";
import axios from "axios";
import { Spinner } from "../ui/spinner";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "../ui/select";

interface modalProps {
  open: boolean;
  setOpen: (data: boolean) => void;
}

const AddAssociateModal = ({ open, setOpen }: modalProps) => {
  const { listCounter, listService, getListCounter, getListService, getListAssociate } = useContext(GlobalContext)

  const { FailedAlert, SuccessAlert } = useAlert();

  const [disabledButton, setDisabledButton] = useState(false);

  const [counter_id, setCounter_id] = useState("")
  const [service_id, setService_id] = useState("")

  useEffect(() => {
    cleanInput()
  }, [open])

  useEffect(() => {
    getListCounter()
    getListService()
  }, [])

  async function addAssociate(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()

    if (counter_id == "" || service_id == "") {
      return FailedAlert("Selecione todos os campos")
    }

    setDisabledButton(true)

    try {
      const response = await authApi.post("counter/service", {
        counter_id,
        service_id
      })

      SuccessAlert(response?.data.message)

      cleanInput()

      setOpen(false)

      getListAssociate()
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
    setCounter_id("")
    setService_id("")
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Associar</DialogTitle>
        </DialogHeader>
        <form onSubmit={(e) => addAssociate(e)}>
          <FieldGroup>
            <Select
              value={counter_id}
              onValueChange={setCounter_id}
            >
              <Field>
                <FieldLabel>Balcão</FieldLabel>
                <SelectTrigger>
                  <div className="flex items-center gap-2">
                    <SelectValue placeholder="Selecione o balcão" />
                  </div>
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {
                      listCounter?.map((each, i) => (
                        <SelectItem key={i} value={String(each.id)}>{each.reference}</SelectItem>
                      ))
                    }
                  </SelectGroup>
                </SelectContent>
              </Field>
            </Select>
            <Select
              value={service_id}
              onValueChange={setService_id}
            >
              <Field>
                <FieldLabel>Serviço</FieldLabel>
                <SelectTrigger>
                  <div className="flex items-center gap-2">
                    <SelectValue placeholder="Selecione o serviço" />
                  </div>
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {
                      listService?.map((each, i) => (
                        <SelectItem key={i} value={String(each.id)}>{each.name}</SelectItem>
                      ))
                    }
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

export default AddAssociateModal;
