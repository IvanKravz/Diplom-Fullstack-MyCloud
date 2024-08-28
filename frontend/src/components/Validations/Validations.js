export const loginValidate = "^[A-Z][a-zA-Z0-9]{4,20}$"
export const passwordValidate = "(?=.*[0-9])(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z!@#$%^&*]{6,}"

export const getReadableFileSizeString = (fileSizeInBytes) => {
    var i = -1;
    var byteUnits = [' kB', ' MB', ' GB', ' TB', 'PB', 'EB', 'ZB', 'YB'];
    do {
        fileSizeInBytes.size /= 1024;
        i++;
    } while (fileSizeInBytes.size > 1024);

    const filesSize = Math.max(fileSizeInBytes.size, 0.1).toFixed(2) + byteUnits[i];
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
    return getReadableFileSizeString({ size })
}
