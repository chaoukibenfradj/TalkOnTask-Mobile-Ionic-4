export function convertBase64ToFile(base64: string) {
    const date = new Date().valueOf();
    let text = '';
    base64 = base64.slice(28);
    const possibleText = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (let i = 0; i < 5; i++) {
        text += possibleText.charAt(Math.floor(Math.random() * possibleText.length));
    }
    const pdfName = date + '.' + text + '.pdf';
    const pdfBlob = dataURItoBlob(base64);
    const imageFile = new File([pdfBlob], pdfName, { type: 'application/pdf' });
    return imageFile;
}

function dataURItoBlob(dataURI) {
    const byteString = window.atob(dataURI);
    const arrayBuffer = new ArrayBuffer(byteString.length);
    const int8Array = new Uint8Array(arrayBuffer);
    for (let i = 0; i < byteString.length; i++) {
        int8Array[i] = byteString.charCodeAt(i);
    }
    const blob = new Blob([int8Array], { type: 'application/pdf' });
    return blob;
}
