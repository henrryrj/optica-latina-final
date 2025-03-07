import moment from "moment";

/**
 *
 * @param {String} query - El valor a buscar el values
 * @param {Object} values - Valores donde buscar
 * @param {[String]} filterKey - Array de key ppara buscar en values
 * @returns boolean
 */
export function filterValueInclude(query, values, filterKey) {
    query = query.toString().toLowerCase();
    const filtered = Object.assign({}, ...filterKey.map(key => ({ [key]: values[key] })));
    values = Object.values(filtered);
    let exactFilter = false;
    //Check comodin "=" para busquedas exactas
    if (query.charAt(0) === '=') {
        exactFilter = true;
    }

    if (exactFilter && query.length === 1) {
        return true;
    }

    else if (exactFilter && query.length > 1) {
        query = query.slice(1, query.length);
    }

    query = query.trim().toLowerCase();
    const salida = values.some(val => {
        if (val) {
            const formattedVal = val
                .toString()
                .toLowerCase()
                .trim();

            if (formattedVal.includes("-") && (moment(formattedVal, "YYYY-MM-DD", true).isValid() || moment(formattedVal, "YYYY-MM-DD HH:mm:ss.SSS", true).isValid())) {
                const validDate = moment(formattedVal, "YYYY-MM-DD").format("DD/MM/YYYY");
                if (exactFilter) {
                    return (validDate === query);
                } else {
                    return validDate.includes(query);
                }
            }
            if (exactFilter) {
                return val.toString().toLowerCase() === query;
            }
            return formattedVal.includes(query);
        }

        return false;
    });

    return salida;
}
export function formatDate(dateString) {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Asegura dos dígitos
    const day = String(date.getDate()).padStart(2, "0"); // Asegura dos dígitos
    return `${day}-${month}-${year}`;
}
export function formatDateTime(dateString) {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Asegura dos dígitos
    const day = String(date.getDate()).padStart(2, "0"); // Asegura dos dígitos
    const hours = String(date.getHours()).padStart(2, "0"); // Asegura dos dígitos
    const minutes = String(date.getMinutes()).padStart(2, "0"); // Asegura dos dígitos
    const seconds = String(date.getSeconds()).padStart(2, "0"); // Asegura dos dígitos

    return `${day}-${month}-${year} ${hours}:${minutes}:${seconds}`;
}
