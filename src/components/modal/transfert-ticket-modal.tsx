import { useContext, useEffect, useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";
import { Button } from "../ui/button";
import { Field, FieldGroup, FieldLabel } from "../ui/field";
import { GlobalContext } from "@/context/global-context";
import { useAlert } from "@/provider/alert";
import authApi from "@/server/api";
import axios from "axios";
import { Spinner } from "../ui/spinner";
import Cookies from "js-cookie";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { InputGroup, InputGroupInput } from "../ui/input-group";

interface modalProps {
  open: boolean;
  setOpen: (data: boolean) => void;
}

const TransfertTicketModal = ({ open, setOpen }: modalProps) => {
  const { getListServiceActive, listService, lastTicket, setLastTicket } = useContext(GlobalContext)

  const { FailedAlert, SuccessAlert } = useAlert();

  const [disabledButton, setDisabledButton] = useState(false);

  const [service_id, setService_id] = useState("");

  useEffect(() => {
    getListServiceActive()
  }, [getListServiceActive])

  async function transferred(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()

    if (!lastTicket) {
      return FailedAlert("Nenhuma senha em atendimento")
    }

    if (service_id == "") {
      return FailedAlert("Selecione o serviço")
    }

    setDisabledButton(true)
    try {
      const response = await authApi.patch("ticket/transferred", {
        service_id
      })
      SuccessAlert(response?.data.message)
      setLastTicket(undefined)
      Cookies.remove("gs-last-ticket")
      setOpen(false)
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

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Transefir senha</DialogTitle>
        </DialogHeader>
        <form onSubmit={(e) => transferred(e)}>
          <FieldGroup>
            <Field>
              <FieldLabel>Senha</FieldLabel>
              <InputGroup>
                <InputGroupInput
                  value={lastTicket?.reference}
                  disabled
                  required
                  type="text"
                  placeholder="Digite o nome do serviço"
                />
              </InputGroup>
            </Field>
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
                {disabledButton ? <Spinner /> : "Atualizar"}
              </Button>
            </Field>
          </FieldGroup>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default TransfertTicketModal;
