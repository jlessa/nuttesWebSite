
export class IonicPost {
    constructor(
        public foto_postagem: string,
        public hora_postagem: string,
        public text_postagem: string,
        public timestamp: object,
        public total_comentarios: string,
        public total_curtidas: string,
        public id?: string
    ) { }
}
