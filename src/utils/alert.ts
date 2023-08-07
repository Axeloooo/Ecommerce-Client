import Swal, { SweetAlertResult } from "sweetalert2";
import { TicketInterface } from "../vite-env";

export class CustomAlert {
  static async showAlert(message: string): Promise<SweetAlertResult<any>> {
    return Swal.fire({
      title: `${message}`,
      icon: "question",
      showCancelButton: true,
      cancelButtonText: "Cancel",
      cancelButtonColor: "#EF4444",
      confirmButtonText: "Confirm",
      confirmButtonColor: "",
    });
  }
  static async showConfirmation(
    message: string
  ): Promise<SweetAlertResult<any>> {
    return Swal.fire({ title: `${message}`, icon: "success" });
  }

  static async showTicket(
    ticket: TicketInterface
  ): Promise<SweetAlertResult<any>> {
    return Swal.fire({
      title: "Receipt",
      html: `<div><p>Amount: <b>$${ticket.amount}</b></p><br><p>Date: <b>${ticket.purchase_datetime}</b></p><br><p>Purchaser: <b>${ticket.purchaser}</b></p><br><p>Code: <b>${ticket.code}</b></p></div>`,
      footer: `Ticket ID: ${ticket._id}`,
    });
  }

  static async showPaymentError(
    message: string
  ): Promise<SweetAlertResult<any>> {
    return Swal.fire({
      title: message,
      icon: "error",
    });
  }
}
