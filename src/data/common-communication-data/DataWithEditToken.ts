/**
 * data dengan token untuk edit. ini untuk memfetch data sekali + edit data
 */
export interface DataWithEditToken<DATA> {
    /**
     * token untuk edit data
     */
    editDataToken: string;
    /**
     * data untuk di edit
     */
    data: DATA;
}