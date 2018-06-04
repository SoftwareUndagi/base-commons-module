/**
 * commons response dari data ajax request
 */
export interface CommonsAjaxResponse {
    /**
     * data yang di kembalikan ke client
     */
    data?: any;
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