export const loginValidate = "^[A-Z][a-zA-Z0-9]{4,20}$"
export const passwordValidate = "(?=.*[0-9])(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z!@#$%^&*]{6,}"

export const regexLogin = new RegExp("^[A-Z][a-zA-Z0-9]{3,20}$");
export const regexPassword = new RegExp("(?=.*[0-9])(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z!@#$%^&*]{6,}");
export const regexEmail = new RegExp("^[A-Za-z0-9][\-_\.\+\!\#\$\%\&\'\*\/\=\?\^\`\{\|]{0,1}([a-z0-9][\-_\.\+\!\#\$\%\&\'\*\/\=\?\^\`\{\|]{0,1})*[a-z0-9]@[a-z0-9][-\.]{0,1}([a-z][-\.]{0,1})*[a-z0-9]\.[a-z0-9]{1,}([\.\-]{0,1}[a-z]){0,}[a-z0-9]{0,}$")

export const loginText = 'Разрешены латинские буквы и цифры, первый символ — буква, длина от 4 до 20 символов!'
export const loginPassword = 'Разрешено не менее 6 символов: как минимум одна заглавная буква, одна цифра и один специальный символ!'
export const loginEmail = 'Неверный формат Email'

export const getReadableFileSizeString = (size) => {
    let sizeFile = Number(size)

    var i = -1;
    var byteUnits = [' kB', ' MB', ' GB', ' TB', 'PB', 'EB', 'ZB', 'YB'];
    do {
        sizeFile /= 1024;
        i++;
    } while (sizeFile > 1024);

    const filesSize = Math.max(sizeFile, 0.1).toFixed(2) + byteUnits[i];
    return filesSize
}

export function getSize(files) {
    let list_size = []
    files.map((file) => {
        list_size.push(Number((file.size).split((' '))[0]))
    })

    if (list_size.length === 0) {
        return
    }

    const size = Math.round(list_size.reduce((accumulator, current) => accumulator + current));
    return getReadableFileSizeString(size)
}

// export const apiUrl = 'http://89.111.175.49:80/api'
export const apiUrl = 'http://127.0.0.1:8000/api'
