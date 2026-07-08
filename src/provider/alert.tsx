import { createContext, useContext, ReactNode } from "react"
import { toast } from "sonner"

type AlertContextProps = {
  SuccessAlert: (message: string) => void
  FailedAlert: (message: string) => void
  PermitionAlert: (
    title: string,
    description: string,
    onConfirm: () => void
  ) => void
}

const AlertContext = createContext<AlertContextProps | null>(null)

export function AlertProvider({ children }: { children: ReactNode }) {

  const SuccessAlert = (message: string) => {
    toast.success(message, {
      duration: 2500,
    })
  }

  const FailedAlert = (message: string) => {
    toast.error(message, {
      duration: 2500,
    })
  }

  const PermitionAlert = (
    title: string,
    description: string,
    onConfirm: () => void
  ) => {
    toast(title, {
      description,
      action: {
        label: "Sim",
        onClick: onConfirm,
      },
      actionButtonStyle: {
        background: "#001f3f"
      },
      cancel: {
        label: "Não",
        onClick: () => { }
      },
      cancelButtonStyle: {
        color: "#001f3f"
      },
      style: {
        color: "#001f3f"
      },
      duration: Infinity, // fica até o user decidir
    })
  }

  return (
    <AlertContext.Provider value={{ SuccessAlert, FailedAlert, PermitionAlert }}>
      {children}
    </AlertContext.Provider>
  )
}

export function useAlert() {
  const context = useContext(AlertContext)
  if (!context) {
    throw new Error("useAlert must be used within AlertProvider")
  }
  return context
}