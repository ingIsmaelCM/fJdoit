function unidades(num: number) {
    switch (num) {
        case 0:
            return 'Cero';
        case 1:
            return 'Un';
        case 2:
            return 'Dos';
        case 3:
            return 'Tres';
        case 4:
            return 'Cuatro';
        case 5:
            return 'Cinco';
        case 6:
            return 'Seis';
        case 7:
            return 'Siete';
        case 8:
            return 'Ocho';
        case 9:
            return 'Nueve';
        default:
            return '';
    }
}

function decenasY(strSin:string, numUnidades:number) {
    if (numUnidades > 0) {
        return strSin + ' y ' + unidades(numUnidades);
    }
    return strSin;
}

function decenas(num: number) {
    var numDecena = Math.floor(num / 10);
    var numUnidad = num - numDecena * 10;

    switch (numDecena) {
        case 1:
            switch (numUnidad) {
                case 0:
                    return 'Diez';
                case 1:
                    return 'Once';
                case 2:
                    return 'Doce';
                case 3:
                    return 'Trece';
                case 4:
                    return 'Catorce';
                case 5:
                    return 'Quince';
                default:
                    return 'Dieci' + unidades(numUnidad).toLowerCase();
            }
        case 2:
            switch (numUnidad) {
                case 0:
                    return 'Veinte';
                default:
                    return 'Veinti' + unidades(numUnidad).toLowerCase();
            }
        case 3:
            return decenasY('Treinta', numUnidad);
        case 4:
            return decenasY('Cuarenta', numUnidad);
        case 5:
            return decenasY('Cincuenta', numUnidad);
        case 6:
            return decenasY('Sesenta', numUnidad);
        case 7:
            return decenasY('Setenta', numUnidad);
        case 8:
            return decenasY('Ochenta', numUnidad);
        case 9:
            return decenasY('Noventa', numUnidad);
        case 0:
            return unidades(numUnidad);
        default:
            return '';
    }
}

function centenas(num: number) {
    var numCentenas = Math.floor(num / 100);
    var numDecenas = num - numCentenas * 100;

    switch (numCentenas) {
        case 1:
            if (numDecenas > 0) {
                return 'Ciento ' + decenas(numDecenas);
            }
            return 'Cien';
        case 2:
            return 'Doscientos ' + decenas(numDecenas);
        case 3:
            return 'Trescientos ' + decenas(numDecenas);
        case 4:
            return 'Cuatrocientos ' + decenas(numDecenas);
        case 5:
            return 'Quinientos ' + decenas(numDecenas);
        case 6:
            return 'Seiscientos ' + decenas(numDecenas);
        case 7:
            return 'Setecientos ' + decenas(numDecenas);
        case 8:
            return 'Ochocientos ' + decenas(numDecenas);
        case 9:
            return 'Novecientos ' + decenas(numDecenas);
        default:
            return decenas(numDecenas);
    }
}

function seccion(num: number, divisor:number, strSingular:string, strPlural: string) {
    var numCientos = Math.floor(num / divisor);
    var numResto = num - numCientos * divisor;

    var letras = '';

    if (numCientos > 0) {
        if (numCientos > 1) {
            letras = centenas(numCientos) + ' ' + strPlural;
        } else {
            letras = strSingular;
        }
    }

    if (numResto > 0) {
        letras += '';
    }

    return letras;
}

function miles(num: number) {
    var divisor = 1000;
    var numCientos = Math.floor(num / divisor);
    var numResto = num - numCientos * divisor;
    var strMiles = seccion(num, divisor, 'Un Mil', 'Mil');
    var strCentenas = centenas(numResto);

    if (strMiles === '') {
        return strCentenas;
    }

    return (strMiles + ' ' + strCentenas).trim();
}

function millones(num: number) {
    var divisor = 1000000;
    var numCientos = Math.floor(num / divisor);
    var numResto = num - numCientos * divisor;
    var strMillones = seccion(num, divisor, 'Un Millón de', 'Millones de');
    var strMiles = miles(numResto);

    if (strMillones === '') {
        return strMiles.replace(/Cero/gi,'');
    }

    const res = (strMillones + ' ' + strMiles).trim();
    return  res.replace(/Cero/gi,'')
}

export default function NumerosALetras(num: number) {
    const  data = {
        numero: num,
        enteros: Math.floor(num),
        centavos: Math.round(num * 100) - Math.floor(num) * 100,
    };
    const result = data.centavos ?
        (`${millones(data.enteros)} punto ${millones(data.centavos)}`).trim() :
        (millones(data.enteros)).trim();
    return result.endsWith(" Cero")
        ? result.replace(/_([^ Cero]*)$/, '$1')
        : result

}


