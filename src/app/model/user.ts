import { Post } from './post';

export class User {
    constructor(
        public email: string,
        public descricao: string,
        public foto_profile: any,
        public nome: string,
        public telefone: string,
        public status_bloqueado?: boolean,
        public foto_capa?: string,
        public galeria?: any[],
        public posts?: Post[],
        public id?: string
    ) { }
}
