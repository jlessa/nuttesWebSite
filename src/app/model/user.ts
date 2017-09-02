
export class User {
    constructor(
        public email: string,
        public descricao: string,
        public foto_capa: string,
        public foto_profile: object,
        public nome: string,
        public telefone: string,
        public id?: string
    ) { }
}
