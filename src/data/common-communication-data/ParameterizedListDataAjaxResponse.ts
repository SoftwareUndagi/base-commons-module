/**
 * untuk data response list
 */
export interface ParameterizedListDataAjaxResponse<DATA> {
    /**
     * data yang di kembalikan ke client
     */
    data?: DATA[];
    /**
     * flag have error atau tidak
     */
    haveError: boolean;
    /**
     * error code. ini untuk register error ke berapa
     */
    errorCode?: string;
    /**
     * additional error
     */
    errorMessage?: string;
}