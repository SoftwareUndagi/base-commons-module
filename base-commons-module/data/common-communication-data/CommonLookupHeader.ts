import { CommonLookupValue } from "./CommonLookupValue";

/**
 * header common lookup
 */
export interface CommonLookupHeader {
    /**
     * id dari lookup
     * column : lov_id
     */
    id: string;
    /**
     * catatan dalam LOV
     * column : lov_remark
     */
    remark?: string;
    /**
     *  lookup details
     */
    details?: CommonLookupValue[];
    /**
     * versi dari lookup
     */
    version?: string;
}