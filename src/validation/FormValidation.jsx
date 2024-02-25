import * as Yup from "yup";

export const FormSchema = Yup.object().shape({
  fullname: Yup.string()
    .min(4, "Nome com no mínimo 4 caracteres")
    .max(100, "Nome com no máximo 100 caracteres")
    .required("Nome completo é obrigatório"),
  address: Yup.string()
    .min(4, "Endereço com no mínimo 4 caracteres")
    .max(100, "Nome com no máximo 300 caracteres")
    .required("Endereço é obrigatório"),
  contact: Yup.string()
    .min(1, "Número é obrigatório")
    .max(11, "Número com no máximo 11 caracteres")
    .required("Número é obrigatório"),
  email: Yup.string()
    .email("Formato de e-mail inválido, name@... ")
    .required("E-mail é obrigatório"),
  message: Yup.string()
    .min(10, "Menssagem com no mínimo 10 caracteres")
    .required("Messagem é obrigatório"),
});
