/**
 * generate UUID
 */
export function generateUUID(): string {
    let d = new Date().getTime();
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c: any) => {
        var r = (d + Math.random() * 16) % 16 | 0;
        d = Math.floor(d / 16);
        return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16);
    });

}
/**
 * check apakah object null atau tidak
 */
export function isNull(variable: any): boolean {
    return (variable == null || typeof variable === 'undefined');
}

/**
 * glue method, clone object, hanya di level 1 saja. bukan deep clone
 * @param variable variable untuk di clone
 */
export function cloneObject(variable: any): any {
    if (isNull(variable)) {
        return null;
    }
    return Object.assign({}, variable);
}
/**
 * clone object dengan recursive clone. hanya salin object sederhana
 * @param variable variable untuk di salin
 */
export function deepCloneObject(variable: any): any {
    if (isNull(variable)) {
        return null;
    }
    let rtvl: any = {};
    // let keys: string [] = Object.keys(variable) ; 
    __deepCloneWorkerRecursive(variable, rtvl, false);
    return rtvl;
}

/**
 * insert data baru ke dalam index tertentu
 * @param theArray array yang akan di insert kan data
 * @param newData data baru untuk di insert
 * @param index index baru untuk data
 */
export function insertAtArray(theArray: any[], newData: any, index: number): any {
    if (index >= theArray.length - 1) {
        theArray.push(newData);
        return;
    }

    let blk: any[] = theArray.splice(index, theArray.length - 1);
    theArray.push(newData);
    theArray.push(...blk);
}
/**
 * recursive clone dengan rubah current date menjadi string
 * @param currentData data current level
 * @param destination variable penampung
 * @param convertDateToIso convert date menjadi iso string atau bukan
 */
export function __deepCloneWorkerRecursive(currentData: any, destination: any, convertDateToIso?: boolean): any {
    // let d: Date ; 
    let keys: string[] = Object.keys(currentData);
    for (let k of keys) {
        let val: any = currentData[k];
        let chkNull: boolean = isNull(currentData[k]);
        if (chkNull) {
            if (k.startsWith('$')) {
                destination[k] = null;
            }
            continue;
        } else if (Array.isArray(val)) {
            let dstArr: any[] = [];
            destination[k] = dstArr;
            let arrData: any[] = val;
            for (let r of arrData) {
                if (isNull(r)) {
                    dstArr.push(null);
                } else if (['number', 'string'].indexOf(typeof r) >= 0) {
                    dstArr.push(r);
                } else if (r.getDate !== null && typeof r.getDate === 'function') {
                    let valDt: any = r;
                    if (!(!isNull(convertDateToIso) || !convertDateToIso)) {
                        valDt = makeIsoDate(r);
                    }
                    dstArr.push(makeIsoDate(valDt));
                } else {
                    let rBaru: any = {};
                    __deepCloneWorkerRecursive(r, rBaru);
                    dstArr.push(rBaru);
                }
            }
        } else if (['number', 'string'].indexOf(typeof val) >= 0) {
            destination[k] = val;
        } else if (val.getDate !== null && typeof val.getDate === 'function') {
            if (!isNull(convertDateToIso) || !convertDateToIso) {
                destination[k] = val;
            } else {
                destination[k] = makeIsoDate(val);
            }
        } else {
            destination[k] = {};
            __deepCloneWorkerRecursive(val, destination[k]);
        }
    }
}

/**
 * membuat string 0 leaded kalau misal kurang dari 10
 * @param n number untuk di buat zero leaded string
 */
export function makeZeroLeadedString(n: number): string {
    let s: any = null;
    if (isNull(n)) {
        return s;
    }
    if (n <= 9) {
        return '0' + n;
    }
    return n + '';
}

/**
 * konversi dari tanggal ke iso date
 * @param date 
 */
export function makeIsoDate(date: Date): string {
    let s1: any = null;
    if (isNull(date)) {
        return s1;
    }
    let s: string = date.getFullYear() + '-' + makeZeroLeadedString(date.getMonth() + 1) + '-' + makeZeroLeadedString(date.getDate());
    return s;
}

/**
 * membuat iso datetime
 * @param date date untuk di proses
 */
export function makeIsoDateTime(date: Date): string {
    let sIso: any = null;
    if (isNull(date)) {
        return sIso;
    }
    let s: string = date.getFullYear() + '-' + makeZeroLeadedString(date.getMonth() + 1) + '-' + makeZeroLeadedString(date.getDate()) + ' ' +
        makeZeroLeadedString(date.getHours()) + ':' + makeZeroLeadedString(date.getMinutes()) + ':' + makeZeroLeadedString(date.getSeconds()) + '.' + date.getMilliseconds();
    return s;
}
/**
 * generate salinan object . semua object dengan tipe date akan di ganti menjadi string. ini di lakukan karena pada saat transmisi data sering ada perbedaan timestamp
 * @param data data yang perlu di clone dan di konversi
 */
export function cloneObjectMakeDateObjectStringVariable(data: any): any {
    if (isNull(data)) {
        return null;
    }
    let sln: any = {};
    __deepCloneWorkerRecursive(data, sln, true);
    return sln;
}
/**
 * salin data dari source ke dest. field by field
 * @param source sumber data
 * @param dest ke mana data akan di salin
 */
export function copyProperty(source: any, dest: any, exclusions?: string[]) {
    if (isNull(source) || isNull(dest)) {
        return;
    }
    let actualExc: string[] = [];
    let nextLvlExcl: { [id: string]: string[] } = {};
    if (!isNull(exclusions)) {
        for (let ex of exclusions!) {
            let idxDot: number = ex.indexOf('.');
            if (idxDot >= 0) { // ok exclude di masukan dalam level berikutnya
                let arrKey: string[] = ex.split('.');
                let prfx: string = arrKey[0];
                arrKey.splice(0, 1);
                let next: string = arrKey.join('.');
                let arrContr: string[] = nextLvlExcl[prfx] || null;
                if (isNull(arrContr)) {
                    arrContr = [];
                    nextLvlExcl[prfx] = arrContr;
                }
                arrContr.push(next);
            } else {// ini tipe flat
                actualExc.push(ex);
            }
        }
    }
    let keys: string[] = Object.keys(source);
    for (var k of keys) {
        if (actualExc.indexOf(k) >= 0) {
            continue;
        }
        let o: any = source[k];
        if (isNull(o)) {
            try {
                delete dest[k];
                continue;
            } catch (exc) {
                console.log('[CommmonUtils.copyProperty] gagal hapus field : ', k, ' dari object : ', dest, '.error :', exc);
            }
        } else {
            if (typeof o === 'object') {
                if (!isNull(o.getDate)) {
                    dest[k] = source;
                    continue;
                } else {
                    dest[k] = {};
                    copyProperty(o, dest[k], nextLvlExcl[k]);
                    continue;
                }
            } else {
                dest[k] = o;
                continue;
            }
        }
    }
}

/**
 * read nested variable
 */
export function readNested(variable: any, path: string): any {
    try {
        if (isNull(variable)) {
            return null;
        }
        if (isNull(path) || path.length === 0) {
            return null;
        }
        if (path.indexOf('.') === -1) {
            return variable[path];
        }
        let arr: string[] = path.split('.');
        let currData: any = variable;
        for (var p of arr) {
            currData = currData[p];
            if (isNull(currData)) {
                return null;
            }
        }
        return currData;

    } catch (exc) {
        console.warn('Gagal read data , error : ', exc);
    }

}

/**
 * menaruh data dengan deep scan 
 */
export function setValueHelper(variable: any, path: string, value: any) {
    if (isNull(variable)) {
        return;
    }
    if (path.indexOf('.') === -1) {
        variable[path] = value;
        return;
    }
    let arr: string[] = path.split('.');
    let ltstKey: string = arr[arr.length - 1];
    arr.splice(arr.length - 1, 1);
    let currData: any = variable;
    for (var p of arr) {
        if (isNull(currData[p])) {
            currData[p] = {};
        }
        currData = currData[p];
    }
    currData[ltstKey] = value;
}

/**
 * membaca dari dalam data. semua yang di start from :. misal :<br/>
 * <pre>
 * select a from table where param = :param1 and column2 = :param2 
 * </pre><br/>
 * ini berarti parameter adalah : 
 * <ol>
 * <li>param1</li>
 * <li>param2</li>
 * </ol>
 * @param sourceData 
 */
export function extractParameterListFromString(sourceData: string): string[] {
    let rtvl: string[] = [];
    const recurseWorker: (currentQuery: string, resultContainer: string[]) => void = (currentQuery: string, resultContainer: string[]) => {
        const idxTitikDua: number = currentQuery.indexOf(':');
        if (idxTitikDua < 0) {
            return;
        }
        const txtAfterTitik: string = currentQuery.substr(idxTitikDua + 1);
        const idxSpasi: number = txtAfterTitik.indexOf(' ');
        const idxSlashN: number = txtAfterTitik.indexOf('\n');
        const idxSlashR: number = txtAfterTitik.indexOf('\r');

        let endOfParamIndex: number = -1;
        if (idxSpasi >= 0 && (idxSpasi < idxSlashN || idxSlashN < 0) && (idxSpasi < idxSlashR || idxSlashR < 0)) {
            endOfParamIndex = idxSpasi;
        }
        if (idxSlashN >= 0 && (idxSlashN < idxSpasi || idxSpasi < 0) && (idxSlashN < idxSlashR || idxSlashR < 0)) {
            endOfParamIndex = idxSlashN;
        } else if (idxSlashR > 0 && (idxSlashR < idxSpasi || idxSpasi < 0) && (idxSlashR < idxSlashN || idxSlashN < 0)) {
            endOfParamIndex = idxSlashR;
        }
        if (endOfParamIndex >= 0) {
            const afterParam: string = txtAfterTitik.substr(endOfParamIndex + 1);
            const param: string = txtAfterTitik.substr(0, endOfParamIndex);
            if (resultContainer.indexOf(param) < 0) {
                resultContainer.push(param);
            }

            recurseWorker(afterParam, resultContainer);
        } else {
            const param: string = txtAfterTitik;
            if (resultContainer.indexOf(param) < 0) {
                resultContainer.push(param);
            }
        }
    };
    let salinan: string = sourceData + '';
    recurseWorker(salinan, rtvl);
    return rtvl;

}
