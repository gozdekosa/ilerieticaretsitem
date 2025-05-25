import * as yup from 'yup';

export const RegisterPageSchema = yup.object().shape({
    username: yup.string().required('Kullanıcı adı zorunludur'),
    password: yup.string().required('Şifre zorunludur'),
})