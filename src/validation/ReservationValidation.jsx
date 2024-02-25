import * as Yup from "yup";

export const ReservationSchema = Yup.object().shape({
  name: Yup.string()
    .min(4, "Nome com no mínimo 4 caracteres")
    .max(100, "Nome com no máximo 100 caracteres")
    .required("Nome é obrigatório"),
  address: Yup.string()
    .min(4, "Endereço com no mínimo 4 caracteres")
    .max(100, "Endereço com no máximo 200 caracteres")
    .required("Endereço é obrigatório"),
  email: Yup.string()
    .email("Formato de e-mail inválido, name@... ")
    .required("E-mail é obrigatório"),
  quantityReservation: Yup.number()
    .typeError("Número")
    .required("A quantidade de reserva é obrigatória"),
  contact: Yup.string()
    .min(1, "Número é obrigatório")
    .max(11, "Número com no máximo 11 caracteres")
    .required("Número é obrigatório"),
});
