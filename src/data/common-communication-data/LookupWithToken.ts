import { CommonLookupValue } from "./CommonLookupValue";

/**
 * param untuk menerima token
 */
export interface LookupWithToken {
    /**
     * nama model object
     */
    modelName?: string;
    /**
     * id dari yang hendak di edit
     */
    dataIdAsString?: string;
    /**
     * id dari lookup yang di minta 
     */
    lookupIds?: string[];
    /**
     * token yang di terima
     */
    onTokenAccepted?: (token: string) => any;
    /**
     * handler pada saat data di terima
     */
    onLookupAccepted: (indexedLookup: { [id: string]: CommonLookupValue[] }) => any;

}