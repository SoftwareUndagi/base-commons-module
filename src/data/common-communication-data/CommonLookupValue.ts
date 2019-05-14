/**
 * interface untuk lookup simple. ini bagian details
 */
export interface CommonLookupValue {
    /**
     * id dari data
     * column : id
     */
    id?: number;
    /**
     * kode lookup detail. ini untuk value
     * column : detail_code
     */
    detailCode?: string;
    /**
     * id LOV header
     * column : lov_id
     */
    lovId?: string;
    /**
     * label dari lookup
     * column : lov_label
     */
    label?: string;
    /**
     * value 1
     * column : val_1
     */
    value1?: string;
    /**
     * value 2
     * column : val_2
     */
    value2?: string;
    /**
     * key internalization dari data. di ambil dari local client
     * column : i18n_key
     */
    i18nKey?: string;
    /**
     * urutan data
     * column : seq_no
     */
    sequenceNo?: number;
}